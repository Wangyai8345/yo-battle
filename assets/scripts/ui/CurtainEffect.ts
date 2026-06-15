const { ccclass, property } = cc._decorator;

/**
 * CurtainEffect
 * 上下黑幕展開效果，掛在 Canvas 下
 * battle.fire 和 Mainmenu.fire 都可以用
 */
@ccclass
export default class CurtainEffect extends cc.Component {

    @property(cc.Node)
    topCurtain: cc.Node = null;

    @property(cc.Node)
    bottomCurtain: cc.Node = null;

    @property
    openDuration: number = 0.7;

    @property
    openDelay: number = 0.1;

    private readonly CLOSED_TOP    =  270;
    private readonly CLOSED_BOTTOM = -270;
    private readonly OPEN_TOP      =  900;
    private readonly OPEN_BOTTOM   = -900;

    onLoad() {
        // 初始：遮住全螢幕
        if (this.topCurtain) {
            this.topCurtain.active = true;
            this.topCurtain.y = this.CLOSED_TOP;
        }
        if (this.bottomCurtain) {
            this.bottomCurtain.active = true;
            this.bottomCurtain.y = this.CLOSED_BOTTOM;
        }
        this.scheduleOnce(() => this.open(), this.openDelay);
    }

    open(callback?: () => void) {
        if (this.topCurtain) {
            this.topCurtain.active = true;
            this.topCurtain.y = this.CLOSED_TOP;
            cc.tween(this.topCurtain)
                .to(this.openDuration, { y: this.OPEN_TOP }, { easing: 'cubicOut' })
                .call(() => { if (this.topCurtain) this.topCurtain.active = false; })
                .start();
        }
        if (this.bottomCurtain) {
            this.bottomCurtain.active = true;
            this.bottomCurtain.y = this.CLOSED_BOTTOM;
            cc.tween(this.bottomCurtain)
                .to(this.openDuration, { y: this.OPEN_BOTTOM }, { easing: 'cubicOut' })
                .call(() => {
                    if (this.bottomCurtain) this.bottomCurtain.active = false;
                    if (callback) callback();
                })
                .start();
        }
    }

    close(callback?: () => void) {
        if (this.topCurtain) {
            this.topCurtain.active = true;
            this.topCurtain.y = this.OPEN_TOP;
            cc.tween(this.topCurtain)
                .to(0.5, { y: this.CLOSED_TOP }, { easing: 'cubicIn' })
                .start();
        }
        if (this.bottomCurtain) {
            this.bottomCurtain.active = true;
            this.bottomCurtain.y = this.OPEN_BOTTOM;
            cc.tween(this.bottomCurtain)
                .to(0.5, { y: this.CLOSED_BOTTOM }, { easing: 'cubicIn' })
                .call(() => { if (callback) callback(); })
                .start();
        }
    }
}
