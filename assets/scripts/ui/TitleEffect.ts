const { ccclass, property } = cc._decorator;

/**
 * TitleEffect
 * 主選單 Logo 進場動畫：從上滑入 + 彈跳縮放
 * 掛在 Logo / 遊戲名稱圖片節點上
 */
@ccclass
export default class TitleEffect extends cc.Component {

    @property
    slideOffsetY: number = 150;   // 從原始位置往上偏移多少開始

    @property
    delay: number = 0.35;         // 等黑幕展開後再播

    @property
    duration: number = 0.55;      // 滑入時間

    private _originY: number = 0;
    private _originScale: number = 1;

    onLoad() {
        this._originY     = this.node.y;
        this._originScale = this.node.scale;

        // 初始狀態：在上方、縮小、透明
        this.node.y       = this._originY + this.slideOffsetY;
        this.node.scale   = this._originScale * 0.75;
        this.node.opacity = 0;

        this.scheduleOnce(() => this._play(), this.delay);
    }

    private _play() {
        cc.tween(this.node)
            .to(this.duration, {
                y: this._originY,
                scale: this._originScale * 1.06,
                opacity: 255
            }, { easing: 'cubicOut' })
            .to(0.1, { scale: this._originScale * 0.97 })
            .to(0.08, { scale: this._originScale })
            .start();
    }
}
