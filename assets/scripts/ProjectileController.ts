import NetworkManager from "./NetworkManager";
import PlayerController from "./PlayerController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ProjectileController extends cc.Component {
    
    protected isLocal: boolean = false;
    protected uid: string = "";
        
    protected attackType: string = "";
    protected damage: number = 0;
    protected kbScale: number = 0;
    
    protected rb: cc.RigidBody = null;


    protected onLoad(): void {
        this.rb = this.getComponent(cc.RigidBody);    
    }


    /** Called this when instantiating in GameManager */ 
    public initialize(
        isLocal: boolean,
        uid: string,
        attackType: string,
        damage: number = 0,
        kbScale: number = 0
    ){
        this.isLocal = isLocal;
        this.uid = uid;
        this.attackType = attackType;
        this.damage = damage;
        this.kbScale = kbScale;

        this.scheduleAutoDestroy();
    }


    private scheduleAutoDestroy(){
        // Destroy automatically after DURATION seconds
        const DURATION = 5;

        this.scheduleOnce(() => {
            NetworkManager.instance.destroyPrefab(this.uid);
        }, DURATION);
    }


    // DONT OVERRIDE THIS IN CHILD CLASS
    onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider) {
        // Only handle bullets that are shot by yourself
        if(!this.isLocal) return;

        let otherPlayer = otherCollider.node.getComponent(PlayerController);

        // Hit other player!
        if (otherPlayer && !otherPlayer.isLocal) {
            // console.log(`Projectile hit ${otherPlayer.sessionId}`)
            
            let fromPos = selfCollider.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
            let toPos = otherCollider.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
            let kbVec = toPos.sub(fromPos).normalize().multiplyScalar(this.kbScale);
            
            NetworkManager.instance.attack(
                this.attackType,
                otherPlayer.sessionId,
                otherCollider.node.x,
                otherCollider.node.y,
                this.damage,
                kbVec.x,
                kbVec.y
            );

            // DON'T WRITE this.node.destroy();
            NetworkManager.instance.destroyPrefab(this.uid);
        }
        
        // TODO: 
        // Currently, this prefab will be destroyed if it hits anything else that's not player
        // but it should only be destroyed if hitting floor or wall
        else if (!otherPlayer) {
            NetworkManager.instance.destroyPrefab(this.uid);
        }

    }
}
