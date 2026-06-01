import AudioManager from "./AudioManager";
import GameManager from "./GameManager";
import PlayerController from "./PlayerController";

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





const {ccclass, property} = cc._decorator;

@ccclass
export default class NetworkManager extends cc.Component {

    public static instance: NetworkManager = null;

    private client: any = null;
    private room: any = null; 
    private callbacks: any = null;
    private localSessionId: string = "";

    // Map sessionId to cc.Node
    private playerNodes: Map<string, cc.Node> = new Map();

    // Saves player client before entering game scene
    private pendingPlayers: Map<string, any> = new Map();

    // Execute when receiving "S_pendingResolvedSignal" from server
    private onMatchReadyCallback: Function = null;



    onLoad() {
        // singleton
        if (NetworkManager.instance === null) {
            NetworkManager.instance = this;

            // persist node even if scene changed
            cc.game.addPersistRootNode(this.node); 
        } 
        else {
            this.node.destroy();
            return;
        }
    }


    protected start(): void {
        const ColyseusJS = (window as any).Colyseus;
        
        if(!ColyseusJS){
            cc.error("Colyseus plugin is not loaded, please import new_colyseus.js as plugin in Cocos Creator");
            return;
        }

        let targetHost = "localhost";

        if (typeof window !== 'undefined' && window.location) {
            const currentHost = window.location.hostname;
            if (currentHost && currentHost !== "") {
                targetHost = currentHost;
            }
        }
        
        this.client = new ColyseusJS.Client({
            hostname: targetHost,           // server IP
            port: 2567,                     // server Port
            secure: false                   // 如果未來改用 wss/https 再設為 true
        });
        
        console.log(`[NetworkManager] Target Host: ${targetHost}`);
        if(!this.client) cc.warn("[NetworkManager] Failed to init client");
    }


    // Helper functions _______________________________________________________________


    public isLocal(sessionId: string){
        return this.localSessionId === sessionId;
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
        if(!node) return null;
        return node.getComponent(PlayerController);
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
                if(node) node.scaleX = newScaleX;
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
                this.playerNodes.get(sessionId).destroy();
                this.playerNodes.delete(sessionId);
            }
        });
          

        this.callbacks.listen("isPending", (isPending: boolean) => {
            if(!isPending) this.onMatchReadyCallback();
        });


        this.callbacks.listen("gameState", (currentGameState: number) => {
            switch(currentGameState){
                case GAMESTATE.READY:
                    GameManager.instance.gameReady();
					break;

				case GAMESTATE.GAME:
                    GameManager.instance.gameStart();
					break;

				case GAMESTATE.BREAK:
					GameManager.instance.gameBreak();
					break;

				case GAMESTATE.END:
                    GameManager.instance.gameEnd();
					break;

				case GAMESTATE.TERMINATED:
                    this.quitServer();
                    GameManager.instance.gameTerminated();
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
            if(controller && controller.anim) controller.anim.play(message.clipName);
        });


        this.room.onMessage("S_stopAnimation", (message: { senderId: string, clipName: string }) => {
            debug(`S_stopAnimation, From: ${message.senderId}, ClipName: ${message.clipName}`);
            
            let controller = this.getPlayerControllerOf(message.senderId);
            if(controller && controller.anim) controller.anim.stop(message.clipName);
        });


        this.room.onMessage("S_resetPositions", 
            (message: { positions: { sessionId: string, x: number, y: number }[] }) => {
                message.positions.forEach(data => {
                    let node = this.playerNodes.get(data.sessionId);
                    node.setPosition(data.x, data.y);
                    node.getComponent(PlayerController).setTargetPosition(data.x, data.y);
                });
            }
        );


        this.room.onMessage("S_resetHp", () => {
            this.playerNodes.forEach((node) => {
                node.getComponent(PlayerController).setTargetHp(100);
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
                
                if(message.isValid && this.isLocal(message.targetSessionId)){
                    let controller = this.getPlayerControllerOf(message.targetSessionId);
                    if(controller) {
                        controller.beAttacked(
                            message.attackType,
                            message.damage,
                            cc.v2(message.kbX, message.kbY)
                        );
                    }
                }
            }
        );


        this.room.onMessage("S_spawnPrefab", (message: { senderId: string, prefabName: string, infos: any }) => {
            debug(`S_spawnPrefab`);
            GameManager.instance.handleSpawnPrefab(message.prefabName, message.infos);
        });
        
        
        this.room.onMessage("S_destroyPrefab", (message: {uid: string}) => {
            debug(`S_destroyPrefab`);
            GameManager.instance.handleDestroyPrefab(message.uid);
        });

    }   


    // APIs ____________________________________________________________________________________________
    

    public getRoomState(){
        return this.room.state;
    }


    public getGameState(){
        return this.getRoomState().gameState;
    }


    /** @usage called at Join Game Scene when player clicked join game button */
    public async connectToServer(roomName: string, chosenCharacter: string, onMatchReady: Function) {
        try{
            this.onMatchReadyCallback = onMatchReady;

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


    /** @usage called at Join Game Scene when player clicked quit game button */
    public async quitServer(){
        try {
            if(!this.room) return;
            debug(`Leaving room: ${this.room.name} (Session ID: ${this.localSessionId})`);
            
            // server function
            await this.room.leave(true);
            
            // clear local things
            this.playerNodes.forEach((node) => {
                if(cc.isValid(node)) node.destroy();
            });
            this.playerNodes.clear(); 
            this.pendingPlayers.clear();
            this.localSessionId = "";
            this.onMatchReadyCallback = null;
            this.callbacks = null;
            this.room = null;

            debug("Successfully quit server");
        }
        catch(e){
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
}
