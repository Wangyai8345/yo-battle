const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayerController extends cc.Component {
    @property
    speed: number = 250;

    @property
    jumpSpeed: number = 1000;

    @property(cc.Node)
    leftAttackNode: cc.Node = null;

    @property(cc.Node)
    rightAttackNode: cc.Node = null;

    @property(cc.Node)
    upAttackNode: cc.Node = null;

    @property(cc.Node)
    downAttackNode: cc.Node = null;

    @property(cc.Node)
    rightJumpAttackNode: cc.Node = null;

    @property(cc.Node)
    leftJumpAttackNode: cc.Node = null;

    private rb: cc.RigidBody = null;
    private moveDir: number = 0;
    private onGround: boolean = false;
    private toLeft: boolean = false;
    private toRight: boolean = false;
    private hasJumpAttacked: boolean = false;
    private keyMap: { [key: number]: boolean } = {};
    private speedUpCounter:number = 0;
    private speedUpTimer:number = 0;

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;

        this.rb = this.getComponent(cc.RigidBody);

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        cc.director.getPhysicsManager().debugDrawFlags =
        cc.PhysicsManager.DrawBits.e_aabbBit |
        cc.PhysicsManager.DrawBits.e_shapeBit;
        cc.log("left hitbox group =", this.leftAttackNode.group);
        cc.log("right hitbox group =", this.rightAttackNode.group);
    }

    update(dt: number) {
        let v = this.rb.linearVelocity;
        v.x = this.moveDir * this.speed;
        this.rb.linearVelocity = v;

        this.leftAttackNode.setPosition(cc.v2(-60, 25));
        this.rightAttackNode.setPosition(cc.v2(60, 25));
        this.downAttackNode.setPosition(cc.v2(0, -80));
        this.upAttackNode.setPosition(cc.v2(0, 80));
        this.rightJumpAttackNode.setPosition(cc.v2(60, 25));
        this.leftJumpAttackNode.setPosition(cc.v2(-60, 25));

        if(this.speedUpCounter == 3){
            this.speedUpTimer += dt;
            if(this.speedUpTimer >= 4){
                this.speedUpCounter = 0;
                this.speedUpTimer = 0;
            }
        }
        // console.log("counter:"+ this.speedUpCounter);
        // console.log("timer:"+ this.speedUpTimer);
    }

    onKeyDown(event: cc.Event.EventKeyboard) {
        this.keyMap[event.keyCode] = true;
        if(event.keyCode === cc.macro.KEY.a) {
            this.toLeft = true;
            if(this.toLeft && !this.toRight) this.moveDir = -1;
            else if(!this.toLeft && this.toRight) this.moveDir = 1;
            else this.moveDir = 0;

        }
        if(event.keyCode === cc.macro.KEY.d) {
            this.toRight = true;
            if(this.toLeft && !this.toRight) this.moveDir = -1;
            else if(!this.toLeft && this.toRight) this.moveDir = 1;
            else this.moveDir = 0;
        }
        if(event.keyCode === cc.macro.KEY.space && this.onGround) {
            let v = this.rb.linearVelocity;
            v.y = this.jumpSpeed;
            this.rb.linearVelocity = v;
            this.onGround = false;
        }
        if(event.keyCode === cc.macro.KEY.s && !this.onGround) {
            let v = this.rb.linearVelocity;
            v.y = -400;
            this.rb.linearVelocity = v;
        }
        if(event.keyCode === cc.macro.KEY.k) this.rightAttack();
        else if(event.keyCode === cc.macro.KEY.j) this.downAttack();
        else if(event.keyCode === cc.macro.KEY.h) this.leftAttack();
        else if(event.keyCode === cc.macro.KEY.u) this.upAttack();
        if(event.keyCode === cc.macro.KEY.b){
            if(this.keyMap[cc.macro.KEY.a])this.leftJumpAttack();
            else if(this.keyMap[cc.macro.KEY.d])this.rightJumpAttack();
        }
        if(event.keyCode === cc.macro.KEY.n)this.speedUp();
    }

    onKeyUp(event: cc.Event.EventKeyboard) {
        this.keyMap[event.keyCode] = false;
        if(event.keyCode === cc.macro.KEY.a ){
            this.toLeft = false;
            if(this.toLeft && !this.toRight) this.moveDir = -1;
            else if(!this.toLeft && this.toRight) this.moveDir = 1;
            else this.moveDir = 0;
        }
        if(event.keyCode === cc.macro.KEY.d){
            this.toRight = false;
            if(this.toLeft && !this.toRight) this.moveDir = -1;
            else if(!this.toLeft && this.toRight) this.moveDir = 1;
            else this.moveDir = 0;
        }
        if(event.keyCode === cc.macro.KEY.space) {
            if(this.rb.linearVelocity.y > 0){
                this.rb.linearVelocity = cc.v2(this.rb.linearVelocity.x,this.rb.linearVelocity.y * 0.4);
            }
        }
        if(event.keyCode === cc.macro.KEY.b) {
            if(this.keyMap[cc.macro.KEY.a])this.leftJumpAttackNode.active = false;
            else if(this.keyMap[cc.macro.KEY.d])this.rightJumpAttackNode.active = false;
        }
    }

    onBeginContact(contact, selfCollider, otherCollider) {
        if (otherCollider.node.name === "Platform") {
            this.onGround = true;
            this.hasJumpAttacked = false;
        }
    }
    onEndContact(contact, selfCollider, otherCollider) {
        if (otherCollider.node.name === "Platform") {
            this.onGround = false;
        }
    }
    leftAttack(){
        console.log("left attack");
        this.leftAttackNode.active = true;
        this.leftAttackNode.setPosition(cc.v2(-60, 25));

        const col = this.leftAttackNode.getComponent(cc.PhysicsBoxCollider);
        col.enabled = true;
        col.apply();

        const rb = this.leftAttackNode.getComponent(cc.RigidBody);
        rb.syncPosition(true);

        this.scheduleOnce(() => {
            col.enabled = false;
            col.apply();

            this.leftAttackNode.active = false;
        }, 0.1);
    }

    rightAttack(){
        console.log("right attack");
        this.rightAttackNode.active = true;
        this.rightAttackNode.setPosition(cc.v2(60, 25));

        const col = this.rightAttackNode.getComponent(cc.PhysicsBoxCollider);
        col.enabled = true;
        col.apply();

        const rb = this.rightAttackNode.getComponent(cc.RigidBody);
        rb.syncPosition(true);

        this.scheduleOnce(() => {
            col.enabled = false;
            col.apply();

            this.rightAttackNode.active = false;
        }, 0.1);
    }

    upAttack(){
        console.log("up attack");
        this.upAttackNode.active = true;
        this.upAttackNode.setPosition(cc.v2(0, 80));

        const col = this.upAttackNode.getComponent(cc.PhysicsBoxCollider);
        col.enabled = true;
        col.apply();

        const rb = this.upAttackNode.getComponent(cc.RigidBody);
        rb.syncPosition(true);

        this.scheduleOnce(() => {
            col.enabled = false;
            col.apply();

            this.upAttackNode.active = false;
        }, 0.1);
    }

    downAttack(){
        console.log("down attack");
        this.downAttackNode.active = true;
        this.downAttackNode.setPosition(cc.v2(0, -80));

        const col = this.downAttackNode.getComponent(cc.PhysicsBoxCollider);
        col.enabled = true;
        col.apply();

        const rb = this.downAttackNode.getComponent(cc.RigidBody);
        rb.syncPosition(true);

        this.scheduleOnce(() => {
            col.enabled = false;
            col.apply();

            this.downAttackNode.active = false;
        }, 0.1);
    }

    rightJumpAttack(){
        if (this.hasJumpAttacked) return;
        this.hasJumpAttacked = true;
        console.log("right Jump attack");
        this.rightJumpAttackNode.active = true;
        //this.jumpAttackNode.setPosition(cc.v2(0, 80));

        const col = this.rightJumpAttackNode.getComponent(cc.PhysicsBoxCollider);
        col.enabled = true;
        col.apply();

        const rb = this.rightJumpAttackNode.getComponent(cc.RigidBody);
        rb.syncPosition(true);
        let v = this.rb.linearVelocity;
        v.y += 300;
        this.rb.linearVelocity = v;

        this.scheduleOnce(() => {
            col.enabled = false;
            col.apply();

            this.rightJumpAttackNode.active = false;
        }, 0.3);
    }

    leftJumpAttack(){
        if (this.hasJumpAttacked) return;
        this.hasJumpAttacked = true;
        console.log("left Jump attack");
        this.leftJumpAttackNode.active = true;
        //this.jumpAttackNode.setPosition(cc.v2(0, 80));

        const col = this.leftJumpAttackNode.getComponent(cc.PhysicsBoxCollider);
        col.enabled = true;
        col.apply();

        const rb = this.leftJumpAttackNode.getComponent(cc.RigidBody);
        rb.syncPosition(true);
        let v = this.rb.linearVelocity;
        v.y += 300;
        this.rb.linearVelocity = v;

        this.scheduleOnce(() => {
            col.enabled = false;
            col.apply();

            this.leftJumpAttackNode.active = false;
        }, 0.3);
    }
    speedUp(){
        if(this.speedUpCounter >= 3)return
        this.speedUpCounter += 1;
        console.log("speed up");
        this.speed += 500;
        this.scheduleOnce(() => {
            this.speed -= 500;
        }, 0.04);
    }
}