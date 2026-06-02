// import BulletController from "./BulletController";
import AudioManager from "./AudioManager";
import NetworkManager, { GAMESTATE } from "./NetworkManager";
import PlayerController from "./PlayerController";
import { resolvePlayerController } from "./PlayerControllerResolver";
import ProjectileController from "./ProjectileController";


const {ccclass, property} = cc._decorator;



@ccclass
export default class GameManager extends cc.Component {
    
    @property(cc.Prefab)
    groundMonkPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    waterPriestessPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    windHeroPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    arrowHeroPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    metalHeroPrefab: cc.Prefab = null;
    
    @property(cc.Prefab)
    attackHitBoxPrefab: cc.Prefab = null;
    
    @property(cc.Prefab)
    exampleProjectilePrefab: cc.Prefab = null;

    @property(cc.Prefab)
    arrowProjectilePrefab: cc.Prefab = null;

    @property(cc.Prefab)
    arrowBeamPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    map0Prefab: cc.Prefab = null;

    @property(cc.Prefab)
    map1Prefab: cc.Prefab = null;

    @property(cc.Prefab)
    map2Prefab: cc.Prefab = null;

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


    getPlayerPrefab(character: string){
        switch(character){
            case "ground_monk":
                return this.groundMonkPrefab;
            case "water_priestess":
                return this.waterPriestessPrefab || this.groundMonkPrefab;
            case "wind":
            case "wind_hero":
            case "wind_hashashin":
                return this.windHeroPrefab || this.groundMonkPrefab;
            case "arrow":
            case "arrow_hero":
            case "leaf_ranger":
                return this.arrowHeroPrefab || this.groundMonkPrefab;
            case "metal":
            case "metal_hero":
            case "metalhero":
            case "metal_bladekeeper":
                return this.metalHeroPrefab || this.groundMonkPrefab;
            default:
                cc.warn(`[GameManager] Unsupported character "${character}", fallback to groundMonkPrefab`);
                return this.groundMonkPrefab;
        }
    }


    private resolvePlayerController(playerNode: cc.Node): PlayerController {
        return resolvePlayerController(playerNode);
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
        let controller = this.resolvePlayerController(playerNode);
        if (!controller) {
            cc.error(`[GameManager] Missing PlayerController on prefab for character "${player.character}"`);
            return playerNode;
        }
        controller.isLocal = isLocal;
        controller.sessionId = sessionId;
        controller.id = player.id;
        controller.hp = player.hp;
        
        // Set rb to Static if nonlocal
        if(!isLocal){
            let rb = playerNode.getComponent(cc.RigidBody);
            if(rb){
                rb.active = false;
                rb.type = cc.RigidBodyType.Kinematic;
                rb.active = true;
                rb.linearVelocity = cc.v2(0, 0);
                rb.angularVelocity = 0;
            }
        }

        return playerNode;
    }


    spawnMap(mapName: string){
        console.log(`Spawned Map: ${mapName}`);

        let mapPrefab: cc.Prefab = null;
        switch(mapName){
            case "map0": mapPrefab = this.map0Prefab; break;
            case "map1": mapPrefab = this.map1Prefab; break;
            case "map2": mapPrefab = this.map2Prefab; break;
            default: mapPrefab = this.map0Prefab; break;
        }

        if(mapPrefab){
            const mapNode = cc.instantiate(mapPrefab);
            mapNode.parent = cc.find("Canvas");
            mapNode.setPosition(0, 0);
        }
    }


    updateTimer(timer: number){
        if(this.timerLabel) this.timerLabel.string = timer.toString();
    }


    updateHeartLabel(){
        let str: string = ''
        this.playerNodes.forEach((node) => {
            let controller = this.resolvePlayerController(node);
            if (controller) {
                str += `P${controller.id}: ${controller.heart}❤️ `;
            }
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
            const controller = this.resolvePlayerController(node);
            if (controller) {
                controller.onRestart();
                controller.isControllable = true;
            }
        });
    }


    gameBreak(){
        this.playerNodes.forEach((node) => {
            const controller = this.resolvePlayerController(node);
            if (controller) {
                controller.isControllable = false;
            }
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

        const exampleProjectilePrefabName = this.exampleProjectilePrefab
            ? this.exampleProjectilePrefab.name
            : "exampleProjectilePrefab";
        const arrowProjectilePrefabName = this.arrowProjectilePrefab
            ? this.arrowProjectilePrefab.name
            : "arrowProjectilePrefab";
        const arrowBeamPrefabName = this.arrowBeamPrefab
            ? this.arrowBeamPrefab.name
            : "arrowBeamPrefab";

        switch(prefabName){
            case exampleProjectilePrefabName:
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

            case arrowProjectilePrefabName:
                if (!this.arrowProjectilePrefab) {
                    cc.warn("[GameManager] arrowProjectilePrefab is not assigned");
                    break;
                }

                node = cc.instantiate(this.arrowProjectilePrefab);
                node.active = true;
                node.setPosition(infos.x, infos.y);
                node.scaleX = Math.abs(node.scaleX) * (infos.direction >= 0 ? 1 : -1);

                let arrowRb = node.getComponent(cc.RigidBody);
                if (arrowRb) {
                    arrowRb.gravityScale = 0;
                    arrowRb.enabledContactListener = true;
                    arrowRb.linearVelocity = cc.v2((infos.speed || 0) * (infos.direction || 1), infos.vy || 0);
                    arrowRb.awake = true;
                }

                let arrowController = node.getComponent(ProjectileController);
                if (arrowController) {
                    arrowController.initialize(
                        infos.isLocal,
                        infos.uid,
                        infos.attackType || "arrowRangedAttack",
                        infos.damage || 0,
                        infos.kbScale || 0,
                        infos.lifetime || 0.8
                    );
                }

                break;

            case arrowBeamPrefabName:
                if (!this.arrowBeamPrefab) {
                    cc.warn("[GameManager] arrowBeamPrefab is not assigned");
                    break;
                }

                node = cc.instantiate(this.arrowBeamPrefab);
                node.active = false;
                node.setPosition(infos.x, infos.y);
                node.scaleX = Math.abs(node.scaleX) * (infos.direction >= 0 ? 1 : -1);

                let beamSprite = node.getComponent(cc.Sprite);
                if (!beamSprite) {
                    beamSprite = node.addComponent(cc.Sprite);
                } else {
                    beamSprite.enabled = false;
                }

                let beamAnim = node.getComponent(cc.Animation);
                node.active = true;
                if (beamSprite) {
                    beamSprite.enabled = true;
                }
                if (beamAnim) {
                    const clips = beamAnim.getClips();
                    const clipName = infos.animationName
                        || (clips && clips.length > 0 && clips[0] ? clips[0].name : "");
                    if (clipName) {
                        beamAnim.play(clipName);
                    }
                }

                if (infos.isLocal && infos.duration > 0) {
                    this.scheduleOnce(() => {
                        if (this.prefabNodes.has(infos.uid)) {
                            NetworkManager.instance.destroyPrefab(infos.uid);
                        }
                    }, infos.duration);
                }

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
