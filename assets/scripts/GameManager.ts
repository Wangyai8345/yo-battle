// import BulletController from "./BulletController";
import AudioManager from "./AudioManager";
import NetworkManager, { GAMESTATE } from "./NetworkManager";
import PlayerController from "./PlayerController";
import ProjectileController from "./ProjectileController";


const {ccclass, property} = cc._decorator;



@ccclass
export default class GameManager extends cc.Component {
    
    @property(cc.Prefab)
    groundMonkPrefab: cc.Prefab = null;

    // TODO: more character's prefab
    
    @property(cc.Prefab)
    attackHitBoxPrefab: cc.Prefab = null;
    
    @property(cc.Prefab)
    exampleProjectilePrefab: cc.Prefab = null;
    
    @property(cc.Label)
    timerLabel: cc.Label = null;
   
    @property(cc.Label)
    winnerLabel: cc.Label = null;
    
    @property(cc.Label)
    heartLabel: cc.Label = null;



    public static instance: GameManager = null;
    private playerNodes: cc.Node[] = [];
    private prefabNodes: Map<string, cc.Node> = new Map();
    private isReady: boolean = false;



    onLoad() {
        let physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
        
        if (GameManager.instance === null) {
            GameManager.instance = this;
        }
        else{
            this.node.destroy();
            return;
        }
    }


    protected onDestroy(): void {
        if (GameManager.instance === this) {
            GameManager.instance = null;
        }
    }


    protected start(): void {
        NetworkManager.instance.initGameScene();
        AudioManager.playMusic('BGM');
        this.setAutoQuitSchedule();
    }
    
    
    setAutoQuitSchedule(){
        // If after WAIT_TIME seconds not ready
        // (maybe the other player quit or taking too long)
        // then terminate the game
        
        const WAIT_TIME = 5;
        
        this.scheduleOnce(() => {
            if(!this.isReady){
                cc.warn(`Auto quit triggered`);
                NetworkManager.instance.quitServer();
                this.gameTerminated();
            }
        }, WAIT_TIME);
    }


    // TODO: Add more prefab based on character string
    getPlayerPrefab(character: string){
        switch(character){
            case "ground_monk":
                return this.groundMonkPrefab;
            default:
                return this.groundMonkPrefab;
        }
    }


    spawnPlayer(player: any, sessionId: string, isLocal: boolean): cc.Node{
        let playerNode = cc.instantiate(this.getPlayerPrefab(player.character));

        this.playerNodes.push(playerNode);

        // Basic properties
        playerNode.active = false;

        playerNode.name = `P${player.id}`;
        
        playerNode.parent = cc.find("Canvas");
        
        playerNode.setPosition(player.x, player.y);

        // Player Name Label
        let labelNode = new cc.Node('Player Label');
        labelNode.color = cc.color(0, 0, 0);
        const label = labelNode.addComponent(cc.Label);
        label.string = `${player.name}`;
        label.fontSize = 14;
        labelNode.parent = playerNode;
        labelNode.setPosition(0, 30, 0);
        
        // HP Label
        let labelNode2 = new cc.Node('HP Label');
        labelNode2.color = cc.color(0, 0, 0);
        const label2 = labelNode2.addComponent(cc.Label);
        label2.string = `HP: ${player.hp}`;
        label2.fontSize = 12;
        labelNode2.parent = playerNode;
        labelNode2.setPosition(0, 60, 0);
        
        // Player Controller
        let controller = playerNode.getComponent(PlayerController);
        controller.isLocal = isLocal;
        controller.sessionId = sessionId;
        controller.id = player.id;
        controller.hp = player.hp;
        
        // Set rb to Static if nonlocal
        if(!isLocal){
            let rb = playerNode.getComponent(cc.RigidBody);
            if(rb){
                // rb.type = cc.RigidBodyType.Static;
                // rb.active = false;
                rb.active = false;
                rb.type = cc.RigidBodyType.Static;
                rb.active = true;
            }
        }

        return playerNode;
    }


    spawnMap(mapName: string){
        console.log(`Spawned Map: ${mapName}`);

        // TODO: spawn map prefab by mapName
        switch(mapName){

        }
    }


    updateTimer(timer: number){
        if(this.timerLabel) this.timerLabel.string = timer.toString();
    }


    updateHeartLabel(){
        let str: string = ''
        this.playerNodes.forEach((node) => {
            let controller = node.getComponent(PlayerController);
            str += `P${controller.id}: ${controller.heart}❤️ `;
        })
        if(this.heartLabel) this.heartLabel.string = str;
    }


    gameReady(){
        this.isReady = true;
        this.playerNodes.forEach((node) => {
            node.active = true;
        });
    }
    

    gameStart(){
        this.playerNodes.forEach((node) => {
            node.getComponent(PlayerController).onRestart();
            node.getComponent(PlayerController).isControllable = true;
        });
    }


    gameBreak(){
        this.playerNodes.forEach((node) => {
            node.getComponent(PlayerController).isControllable = false;
        });
    }


    gameEnd(){
        const winner = NetworkManager.instance.getRoomState().winner;
        if(this.winnerLabel) this.winnerLabel.string = `Winner: ${winner}`;
    }


    gameTerminated(){
        cc.director.loadScene("join_room_scene");
    }


    handleSpawnPrefab(prefabName: string, infos: any){
        // prefabName is the same as NetworkManager.instance.spawnPrefab(prefabName)
        // Every infos contains
        // .uid: the unique id for this prefab
        // .isLocal: whether is prefab is created locally

        let node: cc.Node = null;

        switch(prefabName){
            case "exampleProjectilePrefab":
                node = cc.instantiate(this.exampleProjectilePrefab);
                
                node.setPosition(infos.x, infos.y);
                
                let rb = node.getComponent(cc.RigidBody);
                if (rb) {
                    rb.linearVelocity = cc.v2(300, 0);
                    rb.awake = true;
                }

                let controller = node.getComponent(ProjectileController);
                controller.initialize(
                    infos.isLocal,
                    infos.uid,
                    "exampleProjectileAttack",
                    10,
                    0
                );

                break;
            
            // TODO: more prefabs types
                
            default:
                break;
        }
        
        if(node){
            this.prefabNodes.set(infos.uid, node);
            cc.find("Canvas").addChild(node);
        }
    }


    handleDestroyPrefab(prefabId: string){
        if(this.prefabNodes.has(prefabId)){
            this.prefabNodes.get(prefabId).destroy();
            this.prefabNodes.delete(prefabId);
        }
    }
}
