import AudioManager from "./AudioManager";
import CameraController from "./managers/CameraController";
import GameManager from "./GameManager";
import ParticleEffectManager from "./ParticleEffectManager";
import PlayerController from "./PlayerController";
import { resolvePlayerController } from "./PlayerControllerResolver";

const DEBUG_MODE = true;
function debug(msg: string){
    if(!DEBUG_MODE) return;
    console.log(`[Network Manager]: ${msg}`);
}


export enum GAMESTATE{
	INIT,		// Initial state
	READY,		// Ready up, player can't move 
	GAME,		// Player start fighting
	BREAK,		// When one player is dead
	END,		// Time runs out or one player lost all hp
	TERMINATED 	// Game completely end
};

export type GameOverData = {
    winnerName: string;
    winnerPrefab: cc.Prefab | null;
    winnerCharacter: string | null;
    matchStats: MatchStatsData | null;
};

export type RoundStatData = {
    round: number;
    p1DealtPercent: number;
    p2DealtPercent: number;
    result: string;
};

export type MatchStatsData = {
    p1Name: string;
    p2Name: string;
    totalP1Dealt: number;
    totalP2Dealt: number;
    p1RoundWins: number;
    p2RoundWins: number;
    rounds: RoundStatData[];
};





const {ccclass, property} = cc._decorator;

@ccclass
export default class NetworkManager extends cc.Component {

    public static instance: NetworkManager = null;

    private client: any = null;
    private room: any = null; 
    private callbacks: any = null;
    private localSessionId: string = "";
    private connectedToRemote = false;

    // Map sessionId to cc.Node
    private playerNodes: Map<string, cc.Node> = new Map();

    // Saves player client before entering game scene
    private pendingPlayers: Map<string, any> = new Map();

    // Execute when receiving "S_pendingResolvedSignal" from server
    private onMatchReadyCallback: Function = null;
    private quitPromise: Promise<void> | null = null;
    private _isDuplicate: boolean = false;
    private gameOverData: GameOverData | null = null;
    private isTransitioningToGameOver = false;



    onLoad() {
        // singleton
        if (NetworkManager.instance === null) {
            NetworkManager.instance = this;

            // persist node even if scene changed
            cc.game.addPersistRootNode(this.node);
        }
        else {
            this._isDuplicate = true;
            this.node.destroy();
            return;
        }
    }


    protected start(): void {
        // CC2.4.x calls start() even after destroy() in onLoad — guard against it
        if (this._isDuplicate) return;

        // connectClient(false):    test on localhost
        // connectClient(true):     test on remote server
        this.connectClient(true);
        AudioManager.initVolumes();
    }


    connectClient(isRemote: boolean = false){
        const ColyseusJS = (window as any).Colyseus;
        
        if(!ColyseusJS){
            cc.error("Colyseus plugin is not loaded, please import new_colyseus.js as plugin in Cocos Creator");
            return;
        }

        this.connectedToRemote = isRemote;

        const remoteHost = "yo-battle.onrender.com";
        const localHost = "localhost"
        
        let targetHost = localHost;
        let targetPort: number | undefined = 2567;
        let isSecure = false;

        if(isRemote){
            targetHost = remoteHost;
            targetPort = undefined;
            isSecure = true;
        }
        
        this.client = new ColyseusJS.Client({
            hostname: targetHost,
            port: targetPort,
            secure: isSecure
        });
        
        console.log(`Host: ${targetHost}, Port: ${targetPort}, isSecure: ${isSecure}, isRemote: ${isRemote}`);
        
        if(!this.client) cc.warn("[NetworkManager] Failed to init client");
    }


    // Helper functions _______________________________________________________________


    public isLocal(sessionId: string){
        return this.localSessionId === sessionId;
    }

    private isValidNode(node: cc.Node | null | undefined): node is cc.Node {
        return !!node && cc.isValid(node, true);
    }

    private isValidAnimation(animation: cc.Animation | null | undefined): animation is cc.Animation {
        return !!animation && cc.isValid(animation, true);
    }

    private destroyTrackedPlayerNode(sessionId: string) {
        const node = this.playerNodes.get(sessionId);
        if (this.isValidNode(node)) {
            node.destroy();
        }
        this.playerNodes.delete(sessionId);
    }


    private sendToServer(messageName: string, message?: any) {
        if (!this.room) return;

        if (arguments.length === 1){
            this.room.send(messageName);
        }
        else {
            this.room.send(messageName, message);
        }
    }


    generateUniqueId(length: number = 16): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for(let i = 0; i < length; i++){
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result + Date.now().toString(16);
    }


    getPlayerControllerOf(sessionId: string): PlayerController{
        let node = this.playerNodes.get(sessionId);
        return resolvePlayerController(node);
    }




    // Callbacks & Message listeners _______________________________________________________________


    private setupPlayerListeners(player: any, sessionId: string){

        if(!this.isLocal(sessionId)) {
            this.callbacks.listen(player, "x", (newX: number) => {
                let controller = this.getPlayerControllerOf(sessionId);
                if(controller) controller.setTargetPosition(newX, player.y)
            });
            
            this.callbacks.listen(player, "y", (newY: number) => {
                let controller = this.getPlayerControllerOf(sessionId);
                if(controller) controller.setTargetPosition(player.x, newY)
            });

            this.callbacks.listen(player, "scaleX", (newScaleX: number) => {
                let node = this.playerNodes.get(sessionId);
                if (this.isValidNode(node)) {
                    node.scaleX = newScaleX;
                }
            });
            
            this.callbacks.listen(player, "hp", (newHP: number) => {
                let controller = this.getPlayerControllerOf(sessionId);
                if(controller) controller.setTargetHp(newHP);
            });

        }

        this.callbacks.listen(player, "heart", (newHeart: number) => {
            let controller = this.getPlayerControllerOf(sessionId);
            if(controller) controller.setHeart(newHeart);
        });

    }


    private setupRoomListeners() {

        this.callbacks.onAdd("players", (player: any, sessionId: string) => {
            debug(`onAdd: ${sessionId}`);
            this.pendingPlayers.set(sessionId, player);
        });
         

        this.callbacks.onRemove("players", (player: any, sessionId: string) => {
            debug(`onRemove: ${sessionId}`);
            
            if (this.pendingPlayers.has(sessionId)) {
                this.pendingPlayers.delete(sessionId);
            }

            if (this.playerNodes.has(sessionId)) {
                this.destroyTrackedPlayerNode(sessionId);
            }
        });
          

        this.callbacks.listen("isPending", (isPending: boolean) => {
            if (!isPending && this.onMatchReadyCallback) this.onMatchReadyCallback();
        });


        this.callbacks.listen("gameState", (currentGameState: number) => {
            const gameManager = GameManager.instance;
            switch(currentGameState){
                case GAMESTATE.READY:
                    gameManager?.gameReady();
					break;

				case GAMESTATE.GAME:
                    gameManager?.gameStart();
					break;

				case GAMESTATE.BREAK:
					gameManager?.gameBreak();
					break;

				case GAMESTATE.END:
                    if (!this.isTransitioningToGameOver) {
                        gameManager?.gameEnd();
                    }
					break;

				case GAMESTATE.TERMINATED:
                    if (!this.isTransitioningToGameOver) {
                        this.terminateAndReturnToLobby();
                    }
					break;
            }
        });


        this.callbacks.listen("timer", (timer: number) => {
            GameManager.instance?.updateTimer(timer);
        });


        this.room.onMessage("S_playSoundEffect", (message: { senderId: string, clipName: string, volume: number }) => {
            debug(`S_playSoundEffect, From: ${message.senderId}, ClipName: ${message.clipName}`);

            AudioManager.playEffect(message.clipName, message.volume);
        });
        
        
        this.room.onMessage("S_playAnimation", (message: { senderId: string, clipName: string }) => {
            debug(`S_playAnimation, From: ${message.senderId}, ClipName: ${message.clipName}`);
            
            let controller = this.getPlayerControllerOf(message.senderId);
            if (controller && this.isValidAnimation(controller.anim)) {
                controller.anim.play(message.clipName);
            }
        });


        this.room.onMessage("S_stopAnimation", (message: { senderId: string, clipName: string }) => {
            debug(`S_stopAnimation, From: ${message.senderId}, ClipName: ${message.clipName}`);
            
            let controller = this.getPlayerControllerOf(message.senderId);
            if (controller && this.isValidAnimation(controller.anim)) {
                controller.anim.stop(message.clipName);
            }
        });


        this.room.onMessage("S_playerDead", (message: { sessionId: string }) => {
            debug(`S_playerDead, SessionId: ${message.sessionId}`);

            // 死亡爆炸：不論攻守方皆觸發（onDeath 只在防守方，這裡補攻擊方那側）
            if (!this.isLocal(message.sessionId)) {
                const deadNode = this.playerNodes.get(message.sessionId);
                if (deadNode && cc.isValid(deadNode)) {
                    const worldPos = deadNode.convertToWorldSpaceAR(cc.v2(0, 0));
                    ParticleEffectManager.playDeath(worldPos, cc.find('Canvas'));
                }
            }
            // 死亡：大幅 Camera Shake（兩邊客戶端都觸發）
            CameraController.instance?.shake(0.55, 30);

            let controller = this.getPlayerControllerOf(message.sessionId);
            if (controller) {
                controller.syncDeathState();
            }
        });


        this.room.onMessage("S_resetPositions", 
            (message: { positions: { sessionId: string, x: number, y: number }[] }) => {
                message.positions.forEach(data => {
                    let node = this.playerNodes.get(data.sessionId);
                    let controller = resolvePlayerController(node);
                    if (!node || !controller) {
                        cc.warn(`[NetworkManager] Missing controller while resetting position for ${data.sessionId}`);
                        return;
                    }
                    controller.snapToPosition(data.x, data.y);
                });
            }
        );


        this.room.onMessage("S_resetHp", () => {
            this.playerNodes.forEach((node) => {
                let controller = resolvePlayerController(node);
                if (controller) {
                    controller.setTargetHp(100);
                }
            })
        });


        this.room.onMessage("S_attackResult", 
            (message: { 
                isValid: boolean,
                attackType: string,
				targetSessionId: string,
				damage: number,
				kbX: number,
				kbY: number
            }) => {
                debug(`S_attackResult, isValid: ${message.isValid}, attackType: ${message.attackType}`);
                
                if (message.isValid) {
                    GameManager.instance?.recordLocalAttackDamage(message.targetSessionId, message.damage);

                    // 每次有效攻擊：Camera Shake（兩邊客戶端都觸發）
                    CameraController.instance?.shake(0.18, 7);

                    if (this.isLocal(message.targetSessionId)) {
                        // 防守方客戶端：走 beAttacked()，內部會觸發 hit spark
                        let controller = this.getPlayerControllerOf(message.targetSessionId);
                        if (controller) {
                            controller.beAttacked(
                                message.attackType,
                                message.damage,
                                cc.v2(message.kbX, message.kbY)
                            );
                        }
                    } else {
                        // 攻擊方客戶端：beAttacked() 不會在這裡呼叫，手動噴 hit spark
                        const targetNode = this.playerNodes.get(message.targetSessionId);
                        if (targetNode && cc.isValid(targetNode)) {
                            const worldPos = targetNode.convertToWorldSpaceAR(cc.v2(0, 0));
                            ParticleEffectManager.playHit(worldPos, cc.find('Canvas'));
                        }
                    }
                }
            }
        );


        this.room.onMessage("S_spawnPrefab", (message: { senderId: string, prefabName: string, infos: any }) => {
            debug(`S_spawnPrefab`);
            GameManager.instance?.handleSpawnPrefab(message.prefabName, message.infos);
        });
        
        
        this.room.onMessage("S_destroyPrefab", (message: {uid: string}) => {
            debug(`S_destroyPrefab`);
            GameManager.instance?.handleDestroyPrefab(message.uid);
        });


        this.room.onMessage("S_playerTeleport", (message: {senderId: string, x: number, y: number}) => {
            debug(`S_playerTeleport called by ${message.senderId}`);
            let controller = this.getPlayerControllerOf(message.senderId);
            if (controller) {
                controller.snapToPosition(message.x, message.y);
            }
        });

    }   


    // APIs ____________________________________________________________________________________________
    

    public getRoomState(){
        return this.room.state;
    }


    public getGameState(){
        return this.getRoomState().gameState;
    }


    public setGameOverData(data: GameOverData | null) {
        this.gameOverData = data;
    }


    public getGameOverData(): GameOverData | null {
        return this.gameOverData;
    }


    public async transitionToGameOverScene(data: GameOverData, sceneName: string = "gameover") {
        if (this.isTransitioningToGameOver) {
            if (this.gameOverData && !this.gameOverData.matchStats && data.matchStats) {
                this.gameOverData = data;
            }
            return;
        }

        this.gameOverData = data;
        this.isTransitioningToGameOver = true;

        try {
            await this.quitServer();
        } catch (error) {
            cc.warn("[NetworkManager] Failed to quit server before loading gameover scene", error);
        } finally {
            cc.director.loadScene(sceneName, () => {
                const finalData = this.gameOverData || data;
                const canvas = cc.find("Canvas");
                const panelNode =
                    cc.find("Canvas/GameOverPanel") ||
                    cc.find("GameOverPanel");

                if (!panelNode) {
                    cc.error("[NetworkManager] GameOverPanel node not found after loading gameover scene");
                    return;
                }

                const panel = panelNode.getComponent("GameOverPanel") as any;

                if (!panel || typeof panel.show !== "function") {
                    cc.error("[NetworkManager] GameOverPanel component missing or show() unavailable");
                    return;
                }

                panel.show(
                    finalData.winnerName,
                    finalData.winnerCharacter || null,
                    finalData.matchStats || null
                );
            });
        }
    }


    /** @usage called at Join Game Scene when player clicked join game button */
    public async connectToServer(roomName: string, chosenCharacter: string, onMatchReady: Function) {
        try{
            this.onMatchReadyCallback = onMatchReady;
            this.gameOverData = null;
            this.isTransitioningToGameOver = false;

            this.room = await this.client.joinOrCreate("my_room", { 
                customRoomName: roomName,
                chosenCharacter: chosenCharacter
            });

            this.localSessionId = this.room.sessionId;
            this.callbacks = (window as any).Colyseus.Callbacks.get(this.room);
            
            this.setupRoomListeners();
            this.sendToServer("C_connectedSignal");

            debug(`Successfully connected! Local Session ID: ${this.localSessionId}`);
        }
        catch(e){
            cc.error("Failed to connect to server:", e);
            throw e;
        }
    }


    public async terminateAndReturnToLobby() {
        await this.quitServer();
        // this.quitServer();
        GameManager.instance?.gameTerminated();
    }


    public async quitServer(){
        if (this.quitPromise) {
            return this.quitPromise;
        }
        
        this.quitPromise = this.performQuitServer();
        try {
            await this.quitPromise;
        }
        finally {
            this.quitPromise = null;
        }
    }
    
    
    /** @usage called at Join Game Scene when player clicked quit game button */
    private async performQuitServer() {
        try {
    		// FIXED: quit server logic
            if (!this.room) return;

            debug(`Leaving room: ${this.room.name} (Session ID: ${this.localSessionId})`);
            
            const roomToLeave = this.room;

            if (this.connectedToRemote) {
                if (roomToLeave) {
                    roomToLeave.removeAllListeners(); // 拔掉外層所有監聽

                    const internalRoom = roomToLeave as any;

                    if (internalRoom._reconnectionAttempts !== undefined) {
                        internalRoom._reconnectionAttempts = 15; // 填滿次數，讓它下次直接退出
                    }
                    
                    if (internalRoom.reconnection) {
                        internalRoom.reconnection.maxAttempts = 0; // 強制歸零
                        internalRoom.reconnection.enabled = false;   // 關閉重連開關
                        internalRoom.reconnection.attempts = 15;    // 偽裝目前嘗試次數
                        internalRoom.reconnection.reset = () => {};
                        internalRoom.reconnection.backoff = () => {};
                    }

                    try {
                        if (roomToLeave.connection) {
                            if (typeof roomToLeave.connection.close === "function") {
                                roomToLeave.connection.close();
                            } else if (roomToLeave.connection.ws) {
                                roomToLeave.connection.ws.close();
                            }
                        }
                    }
                    catch(e) {
                        cc.warn("關閉 Socket 異常 (可忽略):", e);
                    }
                }
            }
            else{
                await roomToLeave.leave(true);
            }

            
            // clean local things
            this.room = null; 

            Array.from(this.playerNodes.keys()).forEach((sessionId) => { this.destroyTrackedPlayerNode(sessionId); });
            this.pendingPlayers.clear();
            this.localSessionId = "";
            this.onMatchReadyCallback = null;
            this.callbacks = null;
            
            debug("Successfully quit server!");
        }
        catch (e) {
            cc.error("Failed to quit server:", e);
            throw e;
        }
    }


    /** Spawning all pendingPlayers,
     * @usage called at GameManager in start() */
    public initGameScene(){
        debug("GameScene is ready");
        
        // Spawn Map
        GameManager.instance.spawnMap(this.getRoomState().mapName);

        // Spawn all players in pendingPlayers
        this.pendingPlayers.forEach((player, sessionId) => {
            // Prevent repeat
            if (this.playerNodes.has(sessionId)) return; 
            
            let isLocal: boolean = this.isLocal(sessionId);

            // Implement spawnPlayer in GameManager
            let playerNode = GameManager.instance.spawnPlayer(player, sessionId, isLocal);

            this.playerNodes.set(sessionId, playerNode);

            this.setupPlayerListeners(player, sessionId);

            debug(`Spawned player node: ${sessionId}, isLocal = ${isLocal}`);
        });

        this.pendingPlayers.clear();
        this.sendToServer("C_enteredGameSignal");
    }


    /** @usage called at PlayerController update() */
    public sendPositionToServer(x: number, y: number) {
        this.sendToServer("C_sendPosition", { x, y });
    }
    
    
    /** @usage called at PlayerController update() */
    public sendScaleXToServer(scaleX: number) {
        this.sendToServer("C_sendScaleX", { scaleX });
    }
    
    
    /** @usage called at PlayerController when hp is modified */
    public sendHpToServer(hp: number) {
        this.sendToServer("C_sendHp", { hp });
    }


    /** @usage called when you want to play an audio globally */
    public playSoundEffect(clipName: string, volume: number = 1){
        // First play locally
        AudioManager.playEffect(clipName, volume);

        // Then play to server
        this.sendToServer("C_playSoundEffect", {
            clipName: clipName,
            volume: volume
        });
    }


    /** @usage called when you start playing an animation. */
    public playAnimation(clipName: string){
        // First play locally
        let controller = this.getPlayerControllerOf(this.localSessionId);
        if(controller && controller.anim) controller.anim.play(clipName);
        
        // Then play to server
        this.sendToServer("C_playAnimation", clipName);
    }
    
    
    /** @usage called when you stop playing an animation. */
    public stopAnimation(clipName: string){
        // First stop locally
        let controller = this.getPlayerControllerOf(this.localSessionId);
        if(controller && controller.anim) controller.anim.stop(clipName);
        
        // Then stop to server
        this.sendToServer("C_stopAnimation", clipName);
    }


    /** @usage called when player is dead */
    public playerDead(){
        this.sendToServer("C_playerDead");
    }

    
    /** @usage when the other player is being attacked
     * @param attackType string to distinguish attack type, resolve later in PlayerController.beAttacked(attackType)
     * @param targetSessionId the sessionId of the node that's being attacked
     * @param hitX collision other.node.x
     * @param hitY collision other.node.y
     * @param damage damage to other player
     * @param kbY knockback X
     * @param kbY knockback Y */
    public attack(
        attackType: string,
        targetSessionId: string,
        hitX: number,
        hitY: number,
        damage: number,
        kbX: number,
        kbY: number
    ){
        this.sendToServer("C_checkAttack", { 
            attackType: attackType,
            targetSessionId: targetSessionId,
            hitX: hitX,
            hitY: hitY,
            damage: damage,
            kbX: kbX,
            kbY: kbY
        });
    }


    /** @usage when a prefab is being spawned, resolve later in GameManager.handleSpawnPrefab(prefabName, info) 
     * @param prefabName the name of the prefab
     * @param infos the data of the prefab*/
    public spawnPrefab(prefabName: string, infos: any){
        let uid = this.generateUniqueId();

        // First spawn locally
        GameManager.instance.handleSpawnPrefab(prefabName, {uid: uid, isLocal: true, ...infos});

        // Then spawn to server
        this.sendToServer("C_spawnPrefab", {prefabName: prefabName, infos: {uid: uid, isLocal: false, ...infos}})
    }
    
    
    public destroyPrefab(uid: string){
        GameManager.instance.handleDestroyPrefab(uid);
        this.sendToServer("C_destroyPrefab", uid);
    }


    /**@usage When a player is teleporting, use this function so nonlocal player will
     * use snapToPosition instead of interpolation to update this player*/
    public playerTeleport(x: number, y: number) {
        this.sendToServer("C_playerTeleport", { x, y });
    }
}
