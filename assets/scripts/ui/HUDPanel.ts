const { ccclass, property } = cc._decorator;

@ccclass
export default class HUDPanel extends cc.Component {

    @property(cc.Sprite)
    hpBarFG: cc.Sprite = null;

    @property(cc.Label)
    knockbackLabel: cc.Label = null;

    setHP(current: number, max: number) {
        if (!this.hpBarFG) return;
        this.hpBarFG.fillRange = cc.misc.clampf(current / max, 0, 1);
    }

    setKnockback(percent: number) {
        if (!this.knockbackLabel) return;
        this.knockbackLabel.string = `${Math.floor(percent)}%`;
    }
}
