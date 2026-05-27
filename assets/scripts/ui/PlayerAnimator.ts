const { ccclass, property } = cc._decorator;

/**
 * PlayerAnimator
 * 掛在 Player 節點上，根據 playerIndex 監聽對應按鍵觸發動畫。
 *
 * P1 (playerIndex = 0)：
 *   A/D/Space = 移動/跳躍
 *   H / K     = 橫向攻擊 → attackSide
 *   U         = 上攻擊   → attackUp
 *   J         = 下攻擊   → attackDown
 *   B         = 空中攻擊 → attackAir
 *   N         = 特殊技能 → attackSp（upgradeLevel >= 1）
 *
 * P2 (playerIndex = 1)：
 *   ←/→/↑    = 移動/跳躍
 *   I / O     = 橫向攻擊 → attackSide
 *   Y         = 上攻擊   → attackUp
 *   G         = 下攻擊   → attackDown
 *   T         = 空中攻擊 → attackAir
 *   R         = 特殊技能 → attackSp（upgradeLevel >= 1）
 */
@ccclass
export default class PlayerAnimator extends cc.Component {

    // 每個方向攻擊對應的 clip 名稱（可在 Inspector 依角色調整）
    @property
    clipAttackSide: string = 'attack1';

    @property
    clipAttackUp: string = 'attack2';

    @property
    clipAttackDown: string = 'attack2';

    @property
    clipAttackAir: string = 'attack1';

    @property
    clipAttackSp: string = 'attack_sp';

    // 0 = P1，1 = P2
    @property
    playerIndex: number = 0;

    // 升級等級：0=基礎，1=解鎖特殊技能
    @property
    upgradeLevel: number = 0;

    private _anim: cc.Animation = null;
    private _rb: cc.RigidBody = null;
    private _currentClip: string = '';
    private _onGround: boolean = false;
    private _locked: boolean = false;

    onLoad() {
        this._anim = this.getComponent(cc.Animation);
        this._rb   = this.getComponent(cc.RigidBody);
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

        // 翻轉角色面向
        if (vx > 10)  this.node.scaleX =  Math.abs(this.node.scaleX);
        if (vx < -10) this.node.scaleX = -Math.abs(this.node.scaleX);

        // 動畫優先順序
        if (!this._onGround) {
            this._play('jump');
        } else if (Math.abs(vx) > 10) {
            this._play('run');
        } else {
            this._play('idle');
        }
    }

    // ── 公開方法供核心邏輯組直接呼叫 ──────────────
    public playAnim(clipName: string) {
        const loopClips = ['idle', 'run', 'jump'];
        if (loopClips.indexOf(clipName) !== -1) {
            this._play(clipName);
        } else {
            this._playOnce(clipName);
        }
    }
    // ────────────────────────────────────────────

    private _onKeyDown(e: cc.Event.EventKeyboard) {
        const key = e.keyCode;

        if (this.playerIndex === 0) {
            // ── P1 攻擊鍵：H/K=橫向, U=上, J=下, B=空中, N=特殊 ──
            if (key === cc.macro.KEY.h || key === cc.macro.KEY.k) {
                this._playOnce(this.clipAttackSide);
            } else if (key === cc.macro.KEY.u) {
                this._playOnce(this.clipAttackUp);
            } else if (key === cc.macro.KEY.j) {
                this._playOnce(this.clipAttackDown);
            } else if (key === cc.macro.KEY.b) {
                this._playOnce(this.clipAttackAir);
            } else if (key === cc.macro.KEY.n) {
                this._playOnce(this.clipAttackSp);
            }
        } else {
            // ── P2 攻擊鍵：I/O=橫向, Y=上, G=下, T=空中, R=特殊 ──
            if (key === cc.macro.KEY.i || key === cc.macro.KEY.o) {
                this._playOnce(this.clipAttackSide);
            } else if (key === cc.macro.KEY.y) {
                this._playOnce(this.clipAttackUp);
            } else if (key === cc.macro.KEY.g) {
                this._playOnce(this.clipAttackDown);
            } else if (key === cc.macro.KEY.t) {
                this._playOnce(this.clipAttackAir);
            } else if (key === cc.macro.KEY.r) {
                this._playOnce(this.clipAttackSp);
            }
        }
        // 受傷 / 死亡 由 playAnim() 呼叫，不走鍵盤
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

    private _playOnce(clipName: string) {
        this._locked = true;
        this._currentClip = clipName;
        this._anim.play(clipName);
    }

    private _onAnimFinished(type: string, state: cc.AnimationState) {
        if (state.name !== 'death') {
            this._locked = false;
            this._currentClip = '';
        }
    }
}
