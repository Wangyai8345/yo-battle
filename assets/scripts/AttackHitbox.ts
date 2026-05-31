import NetworkManager from "./NetworkManager";
import PlayerController from "./PlayerController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AttackHitBox extends cc.Component {
    
    private rb: cc.RigidBody = null;
    private attackType: string = "";
    private attackerSessionId: string = "";
    private center: cc.Vec2 = null;
    private kbScale: number = 0;
    private damage: number = 0;


    protected onLoad(): void {
        this.rb = this.getComponent(cc.RigidBody);    
    }


    public init(
        attackType: string,
        attackerSessionId: string,
        center: cc.Vec2,
        size: cc.Vec2,
        duration: number,
        damage: number = 0,
        kbScale: number = 0
    ) { 
        this.attackType = attackType;

        this.attackerSessionId = attackerSessionId;

        this.node.setPosition(center.x, center.y);

        this.center = center;

        let boxCollider = this.getComponent(cc.PhysicsBoxCollider);
        if(boxCollider){
            boxCollider.size.width = size.x;
            boxCollider.size.height = size.y;
            boxCollider.apply();
        }
        else{
            cc.warn("No PhysicsBoxCollider on AttackHitBox");
        }

        this.damage = damage;
        this.kbScale = kbScale;

        this.node.active = true;

        this.scheduleOnce(() => {
            this.node.destroy();
        }, duration);
    }


    update(){
        // Follow player
        this.node.setPosition(this.center.x, this.center.y);
        if (this.rb) this.rb.syncPosition(true);
    }


    onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider) {
        // Attacker of this hitbox must be local
        if(!NetworkManager.instance.isLocal(this.attackerSessionId)) return;

        let otherPlayer = otherCollider.node.getComponent(PlayerController);

        // Hit other player!
        if (otherPlayer && otherPlayer.sessionId !== this.attackerSessionId) {
            // console.log(`AttackHitBox hit ${otherPlayer.sessionId}`)
            
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

            this.node.destroy();
        }
    }


    public getAttackType() { this.attackType; }
}