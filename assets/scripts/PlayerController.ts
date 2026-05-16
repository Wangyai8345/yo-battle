const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayerController extends cc.Component {
    @property
    speed: number = 250;

    @property
    jumpSpeed: number = 500;

    private rb: cc.RigidBody = null;
    private moveDir: number = 0;
    private onGround: boolean = false;

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;

        this.rb = this.getComponent(cc.RigidBody);

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    update(dt: number) {
        let v = this.rb.linearVelocity;
        v.x = this.moveDir * this.speed;
        this.rb.linearVelocity = v;
    }

    onKeyDown(event: cc.Event.EventKeyboard) {
        if(event.keyCode === cc.macro.KEY.a) {
            this.moveDir = -1;
        }
        if(event.keyCode === cc.macro.KEY.d) {
            this.moveDir = 1;
        }
        if(event.keyCode === cc.macro.KEY.space && this.onGround) {
            let v = this.rb.linearVelocity;
            v.y = this.jumpSpeed;
            this.rb.linearVelocity = v;
            this.onGround = false;
        }
    }

    onKeyUp(event: cc.Event.EventKeyboard) {
        if ( event.keyCode === cc.macro.KEY.a || event.keyCode === cc.macro.KEY.d  ) {
            this.moveDir = 0;
        }
    }

    onBeginContact(contact, selfCollider, otherCollider) {
        if (otherCollider.node.name === "Platform") {
            this.onGround = true;
        }
    }
}