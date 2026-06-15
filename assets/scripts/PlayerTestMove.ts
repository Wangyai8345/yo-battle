const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayerTestMove extends cc.Component {

    @property
    moveSpeed: number = 400;

    @property
    jumpForce: number = 800;

    // 0 = P1（A/D/Space），1 = P2（←/→/↑）
    @property
    playerIndex: number = 0;

    private _rb: cc.RigidBody = null;
    private _onGround: boolean = false;
    private _moveLeft: boolean = false;
    private _moveRight: boolean = false;

    onLoad() {
        this._rb = this.getComponent(cc.RigidBody);
        cc.director.getPhysicsManager().enabled = true;
    }

    onEnable() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this._onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,   this._onKeyUp,   this);
    }

    onDisable() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this._onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,   this._onKeyUp,   this);
    }

    update() {
        if (!this._rb) return;
        const moveX = (this._moveRight ? 1 : 0) - (this._moveLeft ? 1 : 0);
        const vy = this._rb.linearVelocity.y;
        this._rb.linearVelocity = cc.v2(moveX * this.moveSpeed, vy);
    }

    private _onKeyDown(e: cc.Event.EventKeyboard) {
        const leftKey  = this.playerIndex === 0 ? cc.macro.KEY.a     : cc.macro.KEY.left;
        const rightKey = this.playerIndex === 0 ? cc.macro.KEY.d     : cc.macro.KEY.right;
        const jumpKey  = this.playerIndex === 0 ? cc.macro.KEY.space : cc.macro.KEY.up;

        if (e.keyCode === leftKey)  this._moveLeft  = true;
        if (e.keyCode === rightKey) this._moveRight = true;
        if (e.keyCode === jumpKey && this._onGround) {
            this._rb.linearVelocity = cc.v2(this._rb.linearVelocity.x, this.jumpForce);
            this._onGround = false;
        }
    }

    private _onKeyUp(e: cc.Event.EventKeyboard) {
        const leftKey  = this.playerIndex === 0 ? cc.macro.KEY.a    : cc.macro.KEY.left;
        const rightKey = this.playerIndex === 0 ? cc.macro.KEY.d    : cc.macro.KEY.right;

        if (e.keyCode === leftKey)  this._moveLeft  = false;
        if (e.keyCode === rightKey) this._moveRight = false;
    }

    onBeginContact(contact, selfCollider, otherCollider) {
        this._onGround = true;
    }

    onEndContact(contact, selfCollider, otherCollider) {
        this._onGround = false;
    }
}
