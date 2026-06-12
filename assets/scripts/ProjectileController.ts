import NetworkManager from "./NetworkManager";
import PlayerController from "./PlayerController";
import { resolvePlayerController } from "./PlayerControllerResolver";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ProjectileController extends cc.Component {
    
    protected isLocal: boolean = false;
    protected uid: string = "";
        
    protected attackType: string = "";
    protected damage: number = 0;
    protected kbScale: number = 0;
    protected hitSessionIds: Set<string> = new Set<string>();
    
    protected rb: cc.RigidBody = null;


    protected onLoad(): void {
        this.rb = this.getComponent(cc.RigidBody);
        if (this.rb) {
            this.rb.enabledContactListener = true;
        }
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

        // this.scheduleAutoDestroy();
    }


    public onDespawn(){
        this.hitSessionIds.clear();
    }


    // private scheduleAutoDestroy(){
    //     if (!this.isLocal) {
    //         return;
    //     }

    //     this.scheduleOnce(() => {
    //         NetworkManager.instance.destroyPrefab(this.uid);
    //     }, this.lifetime);
    // }


    // DONT OVERRIDE THIS IN CHILD CLASS
    onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider) {
        // Only handle bullets that are shot by yourself
        if(!this.isLocal) return;

        // Ignore projectile-vs-projectile collisions so multi-shot attacks do not self-destruct on spawn.
        if (otherCollider.node.getComponent(ProjectileController)) {
            return;
        }

        let otherPlayer = resolvePlayerController(otherCollider.node);

        // Hit other player!
        if (otherPlayer && !otherPlayer.isLocal) {
            if (this.hitSessionIds.has(otherPlayer.sessionId)) {
                return;
            }

            this.hitSessionIds.add(otherPlayer.sessionId);
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

            if (!this.shouldPierceTargets()) {
                NetworkManager.instance.destroyPrefab(this.uid);
            }
        }
        
        // TODO: 
        // Currently, this prefab will be destroyed if it hits anything else that's not player
        // but it should only be destroyed if hitting floor or wall
        else if (!otherPlayer) {
            if (!this.shouldIgnoreObstacleCollision(otherCollider)) {
                NetworkManager.instance.destroyPrefab(this.uid);
            }
        }

    }

    protected shouldPierceTargets(): boolean {
        return this.isDragonProjectile();
    }

    protected shouldIgnoreObstacleCollision(_otherCollider: cc.PhysicsCollider): boolean {
        return this.isDragonProjectile();
    }

    private isDragonProjectile(): boolean {
        return this.attackType === "fireDragonAttack";
    }
}
