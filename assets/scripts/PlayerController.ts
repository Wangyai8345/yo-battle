import NetworkManager from "./NetworkManager";
import GameManager from "./GameManager";
import AttackHitBox from "./AttackHitbox";

const {ccclass, property} = cc._decorator;


@ccclass
export default abstract class PlayerController extends cc.Component {
    
    // @property
    // speed: number = 100;
    // @property
    // jumpSpeed: number = 280;
    // @property
    // coyoteTime: number = 0.2;
    // @property
    // maxHP: number = 100;
    
    public hp: number = 0;
    public heart: number = 0;
    protected rb: cc.RigidBody = null;
    public anim: cc.Animation = null;
    public isControllable: boolean = false;

    // Network related
    public isLocal: boolean = true;
    public sessionId: string = "";
    public id: number = 1;  // 1 or 2 for p1 or p2
    private targetX: number = 0;
    private targetY: number = 0;


    // Abstract Classes
    protected abstract localUpdate(dt: number): void;

    protected abstract localOnKeyDown(event: cc.Event.EventKeyboard): void;

    protected abstract localOnKeyUp(event: cc.Event.EventKeyboard): void;

    public abstract beAttacked(attackType: string, damage: number, knockback: cc.Vec2): void;
   
    protected abstract onDeath(): void;

    public abstract onRestart(): void;



    protected onLoad(): void {
        cc.director.getPhysicsManager().enabled = true;

        this.rb = this.getComponent(cc.RigidBody);
        this.anim = this.getComponent(cc.Animation);

        if (!this.rb) {
            cc.error('[PlayerController] Missing RigidBody on player node');
            return;
        }

        if (!this.anim) {
            cc.error('[PlayerController] Missing Animation on player node');
            return;
        }

        this.rb.enabledContactListener = true;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        // TODO: delete this
        cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_shapeBit;
    }


    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }


    protected start(): void {
        this.targetX = this.node.x;
        this.targetY = this.node.y;
    }


    public setTargetPosition(x: number, y: number) {
        this.targetX = x;
        this.targetY = y;
    }


    public setTargetHp(newHp: number){
        this.hp = newHp;
        this.node.getChildByName("HP Label").getComponent(cc.Label).string = `HP: ${newHp}`;
    }

    public syncDeathState() {
        this.onDeath();
    }


    public setHeart(newHeart: number){
        this.heart = newHeart;
        GameManager.instance.updateHeartLabel();
    }


    protected update(dt: number): void {
        if(this.isLocal){
            this.localUpdate(dt);
            NetworkManager.instance.sendPositionToServer(this.node.x, this.node.y);
            NetworkManager.instance.sendScaleXToServer(this.node.scaleX);
        }
        else{
            this.interpolation(dt);
        }
    }


    interpolation(dt: number){
        let dx = this.targetX - this.node.x;
        let dy = this.targetY - this.node.y;
        let distanceSquared = dx * dx + dy * dy;

        // Directly set to target if too close
        const EPSILON = 0.1;
        if(distanceSquared < EPSILON){
            this.node.x = this.targetX;
            this.node.y = this.targetY;
            return;
        }

        const MOVEMENT_SHARPNESS = 25;
        let ratio = Math.min(dt * MOVEMENT_SHARPNESS, 1); // prevent overshoot if dt spike
        this.node.x = cc.misc.lerp(this.node.x, this.targetX, ratio);
        this.node.y = cc.misc.lerp(this.node.y, this.targetY, ratio);
    }


    onKeyDown(event: cc.Event.EventKeyboard) {
        if(!this.isLocal) return;
        if(!(!!this.node && this.node.activeInHierarchy)) return;
        if(!this.isControllable) return;
        
        this.localOnKeyDown(event);
    }
    
    
    onKeyUp(event: cc.Event.EventKeyboard) {
        if(!this.isLocal) return;
        if(!(!!this.node && this.node.activeInHierarchy)) return;
        // if(!this.isControllable) return;

        this.localOnKeyUp(event);
    }


    deductHp(amount: number){
        if(!this.isLocal) return;

        this.hp = Math.min(Math.max(0, this.hp - amount), 100);

        NetworkManager.instance.sendHpToServer(this.hp);
        this.node.getChildByName("HP Label").getComponent(cc.Label).string = `HP: ${this.hp}`;
        
        if(this.hp <= 0) {
            this.onDeath();
            NetworkManager.instance.playerDead();
        }
    }


    protected spawnAttackHitBox(
        attackType: string,
        center: cc.Vec2,
        size: cc.Vec2,
        duration: number,
        damage: number = 0,
        kbScale: number = 0
    ) {
        if (!this.isLocal) return;

        let node = cc.instantiate(GameManager.instance.attackHitBoxPrefab);
        node.parent = this.node;

        let script = node.getComponent(AttackHitBox);
        script.init(attackType, this.sessionId, center, size, duration, damage, kbScale);
    }





    // _______________________________ TEST ZONE _______________________________
    
    // beAttacked(attackType: string, fromX: number, fromY: number){
    //     if(!this.isLocal) return;
        
    //     switch(attackType){
    //         case "groundMonkNormalAttack":
    //             this.deductHp(2);
    //         break;
    //         case "groundMonkSpecialAttack":
    //             this.deductHp(5);
    //         break;
    //         case "groundMonkAirAttack":
    //             this.deductHp(3);
    //         break;
    //     }
    // }

    
    // jump(){
    //     if(!this.isLocal) return;
    //     if(!this.isGrounded) return;
    //     if(this.isJumping) return;
        
    //     this.rb.linearVelocity = cc.v2(this.rb.linearVelocity.x, this.jumpSpeed);
    //     this.isJumping = true;
    // }


    // onBeginContact(contact: cc.PhysicsContact, self: cc.Collider, other: cc.Collider){
    //     if(!this.isLocal) return;

    //     if(other.node.name === "Floor"){
    //         // if the collsion is on bottom
    //         if(contact.getWorldManifold().normal.y < 0){
    //             this.groundColliders.add(other);
    //             this.isGrounded = true;
    //             this.isJumping = false;
    //         }
    //     }
    //     else if(other.node.name === "Out Of Bound Trigger"){
    //         NetworkManager.instance.playerDead();
    //     }
    //     else if(other.node.name === "Player"){
    //         if(this.isAttacking){
    //             this.isAttacking = false;
    //             let otherId = other.node.getComponent(PlayerController).sessionId;
    //             NetworkManager.instance.attack("attackType1", otherId, other.node.x, other.node.y);
    //         }
    //     }
    // }   


    // onEndContact(contact: cc.PhysicsContact, self: cc.Collider, other: cc.Collider){
    //     if(!this.isLocal) return;

    //     if(other.node.name === "Floor"){
    //         if(this.groundColliders.has(other)){
    //             this.groundColliders.delete(other);
                
    //             // Player is not on ground,
    //             // however we set isGrounded to false AFTER coyoteTime
    //             if(this.groundColliders.size === 0){    
    //                 this.scheduleOnce(() => {
    //                     if(this.groundColliders.size > 0) return;
    //                     this.isGrounded = false;
    //                 }, this.coyoteTime);
    //             }
    //         }
    //     }
    // }


    // debug(){
    //     if(!this.isLocal) return;
    //     NetworkManager.instance.playAudio("coin");
    // }
    
    
    // attack(){
    //     if(!this.isLocal) return;

    //     this.isAttacking = true;
    //     this.scheduleOnce(()=>{this.isAttacking = false}, 0.1);
    // }


    // shootBullet(){
    //     NetworkManager.instance.spawnPrefab("bulletPrefab", {
    //         x: this.node.x,
    //         y: this.node.y,
    //         vx: 100,
    //         vy: 0
    //     });
    // }
}
