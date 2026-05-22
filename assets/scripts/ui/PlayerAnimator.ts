const { ccclass, property } = cc._decorator;

/**
 * PlayerAnimator
 * 掛在 Player 節點上，根據狀態自動切換動畫。
 * 測試按鍵：J=attack1, K=attack2, L=takehit, O=death
 */
@ccclass
export default class PlayerAnimator extends cc.Component {

    private _anim: cc.Animation = null;
    private _rb: cc.RigidBody = null;
    private _currentClip: string = '';
    private _onGround: boolean = false;
    private _locked: boolean = false; // 播一次性動畫時鎖住

    onLoad() {
        this._anim = this.getComponent(cc.Animation);
        this._rb   = this.getComponent(cc.RigidBody);

        // 監聽一次性動畫結束後解鎖
        if (this._anim) {
            this._anim.on('finished', this._onAnimFinished, this);
        }
    }

    onEnable() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this._onKeyDown, this);
    }

    onDisable() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this._onKeyDown, this);
    }

    update() {
        if (!this._rb || !this._anim || this._locked) return;

        const vx = this._rb.linearVelocity.x;
        const vy = this._rb.linearVelocity.y;

        // 翻轉角色面向
        if (vx > 10)  this.node.scaleX =  Math.abs(this.node.scaleX);
        if (vx < -10) this.node.scaleX = -Math.abs(this.node.scaleX);

        // 動畫優先順序
        if (!this._onGround && vy < -50) {
            this._play('fall');
        } else if (!this._onGround) {
            this._play('jump');
        } else if (Math.abs(vx) > 10) {
            this._play('run');
        } else {
            this._play('idle');
        }
    }

    // 測試用按鍵
    private _onKeyDown(e: cc.Event.EventKeyboard) {
        if (e.keyCode === cc.macro.KEY.j) this._playOnce('attack1');
        if (e.keyCode === cc.macro.KEY.k) this._playOnce('attack2');
        if (e.keyCode === cc.macro.KEY.l) this._playOnce('takehit');
        if (e.keyCode === cc.macro.KEY.o) this._playOnce('death');
    }

    onBeginContact(contact, selfCollider, otherCollider) {
        this._onGround = true;
    }

    onEndContact(contact, selfCollider, otherCollider) {
        this._onGround = false;
    }

    private _play(clipName: string) {
        if (this._currentClip === clipName) return;
        this._currentClip = clipName;
        this._anim.play(clipName);
    }

    // 播放一次性動畫（攻擊/受傷/死亡），播完自動解鎖
    private _playOnce(clipName: string) {
        this._locked = true;
        this._currentClip = clipName;
        this._anim.play(clipName);
    }

    private _onAnimFinished(type: string, state: cc.AnimationState) {
        // death 播完就停住，其他解鎖回到一般狀態
        if (state.name !== 'death') {
            this._locked = false;
            this._currentClip = '';
        }
    }
}
