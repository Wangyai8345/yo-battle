import NetworkManager from "./NetworkManager";
import GameManager from "./GameManager";
import AttackHitBox from "./AttackHitbox";
import UIManager from "./managers/UIManager";
import ScreenEffect from "./ui/ScreenEffect";

const { ccclass, property } = cc._decorator;


@ccclass
export default abstract class PlayerController extends cc.Component {
    protected static readonly WATER_PRIESTESS_SKILL3_CONTROL_PREFIX = "waterPriestessSkill3Control:";

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
    private crowdControlRemaining: number = 0;

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

        //cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_shapeBit;
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


    public snapToPosition(x: number, y: number) {
        this.targetX = x;
        this.targetY = y;
        this.applyRemotePosition(x, y);
    }


    public setTargetHp(newHp: number) {
        this.hp = newHp;
        this.node.getChildByName("HP Label").getComponent(cc.Label).string = `HP: ${newHp}`;
        if (UIManager.instance) UIManager.instance.updateHP(this.id - 1, newHp, 100);
    }

    protected isGroundNode(node: cc.Node | null): boolean {
        if (!node) {
            return false;
        }

        const configuredGroundNodeName = (this as any).groundNodeName;
        const normalizedNodeName = (node.name || "").toLowerCase();
        const normalizedConfiguredName = typeof configuredGroundNodeName === "string"
            ? configuredGroundNodeName.toLowerCase()
            : "";

        return normalizedNodeName === normalizedConfiguredName
            || normalizedNodeName === "platform"
            || normalizedNodeName.startsWith("platform_")
            || normalizedNodeName.startsWith("terrain")
            || normalizedNodeName.startsWith("ground")
            || normalizedNodeName.startsWith("floor");
    }

    protected clearAnimationFinishedListener(callback: Function): void {
        const animation = this.anim;
        if (!animation || !cc.isValid(animation, true)) {
            return;
        }

        const callbackTable = (animation as any)._callbackTable;
        if (!callbackTable || typeof callbackTable !== "object") {
            return;
        }

        animation.off("finished", callback, this);
    }

    protected listenForAnimationFinishedOnce(callback: Function): boolean {
        const animation = this.anim;
        if (!animation || !cc.isValid(animation, true)) {
            return false;
        }

        const callbackTable = (animation as any)._callbackTable;
        if (!callbackTable || typeof callbackTable !== "object") {
            return false;
        }

        this.clearAnimationFinishedListener(callback);
        animation.once("finished", callback, this);
        return true;
    }

    protected updateCrowdControl(dt: number): void {
        this.crowdControlRemaining = Math.max(0, this.crowdControlRemaining - Math.max(0, dt));
    }

    protected applyCrowdControl(duration: number): void {
        this.crowdControlRemaining = Math.max(
            this.crowdControlRemaining,
            Math.max(0, duration)
        );
    }

    protected isCrowdControlled(): boolean {
        return this.crowdControlRemaining > 0;
    }

    protected getCrowdControlRemaining(): number {
        return this.crowdControlRemaining;
    }

    protected consumeCrowdControl(): void {
        this.crowdControlRemaining = 0;
    }

    protected parseTaggedDuration(attackType: string, prefix: string): number {
        if (!attackType || !attackType.startsWith(prefix)) {
            return 0;
        }

        const rawValue = attackType.slice(prefix.length);
        const parsedValue = Number(rawValue);
        return Number.isFinite(parsedValue) ? Math.max(0, parsedValue) : 0;
    }

    public syncDeathState() {
        this.onDeath();
    }


    public setHeart(newHeart: number) {
        this.heart = newHeart;
        GameManager.instance.updateHeartLabel();
    }


    protected update(dt: number): void {
        if (this.isLocal) {
            this.checkOutOfBoundsDeath();
            this.localUpdate(dt);
            NetworkManager.instance.sendPositionToServer(this.node.x, this.node.y);
            NetworkManager.instance.sendScaleXToServer(this.node.scaleX);
        }
        else {
            this.interpolation(dt);
        }
    }

    private checkOutOfBoundsDeath(): void {
        if (this.hp <= 0) {
            return;
        }

        const map3Node = cc.find("Canvas/Map3");
        if (!map3Node || !map3Node.activeInHierarchy) {
            return;
        }

        if (this.node.y <= -800) {
            this.deductHp(999);
        }
    }


    interpolation(dt: number) {
        let dx = this.targetX - this.node.x;
        let dy = this.targetY - this.node.y;
        let distanceSquared = dx * dx + dy * dy;

        // Directly set to target if too close
        const EPSILON = 0.1;
        if (distanceSquared < EPSILON) {
            this.applyRemotePosition(this.targetX, this.targetY);
            return;
        }

        const MOVEMENT_SHARPNESS = 25;
        let ratio = Math.min(dt * MOVEMENT_SHARPNESS, 1); // prevent overshoot if dt spike
        this.applyRemotePosition(
            cc.misc.lerp(this.node.x, this.targetX, ratio),
            cc.misc.lerp(this.node.y, this.targetY, ratio)
        );
    }


    private applyRemotePosition(x: number, y: number) {
        this.node.setPosition(x, y);

        if (!this.rb) {
            return;
        }

        this.rb.linearVelocity = cc.v2(0, 0);
        this.rb.angularVelocity = 0;
        this.rb.syncPosition(true);
        this.rb.awake = true;
    }


    onKeyDown(event: cc.Event.EventKeyboard) {
        if (!this.isLocal) return;
        if (!(!!this.node && this.node.activeInHierarchy)) return;
        if (!this.isControllable) return;

        this.localOnKeyDown(event);
    }


    onKeyUp(event: cc.Event.EventKeyboard) {
        if (!this.isLocal) return;
        if (!(!!this.node && this.node.activeInHierarchy)) return;
        // if(!this.isControllable) return;

        this.localOnKeyUp(event);
    }


    deductHp(amount: number) {
        if (!this.isLocal) return;

        this.hp = Math.min(Math.max(0, this.hp - amount), 100);

        NetworkManager.instance.sendHpToServer(this.hp);
        this.node.getChildByName("HP Label").getComponent(cc.Label).string = `HP: ${this.hp}`;
        if (UIManager.instance) UIManager.instance.updateHP(this.id - 1, this.hp, 100);

        if (this.hp <= 0) {
            if (ScreenEffect.instance) ScreenEffect.instance.shake();
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
