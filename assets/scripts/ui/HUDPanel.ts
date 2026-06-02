const { ccclass, property } = cc._decorator;

@ccclass
export default class HUDPanel extends cc.Component {

    @property(cc.Sprite)
    hpBarFG: cc.Sprite = null;

    @property(cc.Label)
    knockbackLabel: cc.Label = null;

    setHP(current: number, max: number) {
        if (!this.hpBarFG) return;
        const ratio = cc.misc.clampf(current / max, 0, 1);
        this.hpBarFG.fillRange = ratio;
        if (this.knockbackLabel) {
            this.knockbackLabel.string = `${Math.round(ratio * 100)}%`;
        }
    }

    setKnockback(percent: number) {
        if (!this.knockbackLabel) return;
        this.knockbackLabel.string = `${Math.floor(percent)}%`;
    }
}
