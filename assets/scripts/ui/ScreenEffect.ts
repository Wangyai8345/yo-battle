const { ccclass, property } = cc._decorator;

/**
 * ScreenEffect
 * 掛在 game.fire 的 Canvas 或 Main Camera 節點上
 * 提供畫面搖晃效果
 */
@ccclass
export default class ScreenEffect extends cc.Component {

    public static instance: ScreenEffect = null;

    @property
    shakeDuration: number = 0.4;

    @property
    shakeMagnitude: number = 20;

    private _originPos: cc.Vec2 = cc.v2(0, 0);
    private _shaking: boolean = false;

    onLoad() {
        ScreenEffect.instance = this;
        this._originPos = cc.v2(this.node.x, this.node.y);
    }

    onDestroy() {
        if (ScreenEffect.instance === this) ScreenEffect.instance = null;
    }

    /** 搖晃畫面（HP歸0時呼叫） */
    public shake() {
        if (this._shaking) return;
        this._shaking = true;

        const mag = this.shakeMagnitude;
        const dur = this.shakeDuration / 6;

        cc.tween(this.node)
            .to(dur, { x: this._originPos.x + mag, y: this._originPos.y + mag })
            .to(dur, { x: this._originPos.x - mag, y: this._originPos.y - mag })
            .to(dur, { x: this._originPos.x + mag * 0.5, y: this._originPos.y - mag * 0.5 })
            .to(dur, { x: this._originPos.x - mag * 0.5, y: this._originPos.y + mag * 0.5 })
            .to(dur, { x: this._originPos.x + mag * 0.2, y: this._originPos.y })
            .to(dur, { x: this._originPos.x, y: this._originPos.y })
            .call(() => { this._shaking = false; })
            .start();
    }
}
