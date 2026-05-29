import PlayerController from './ground_monk_pctrl';

const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayerHud extends cc.Component {
    @property(PlayerController)
    player: PlayerController = null;

    @property(cc.ProgressBar)
    hpBar: cc.ProgressBar = null;

    @property(cc.Label)
    hpLabel: cc.Label = null;

    @property(cc.Label)
    stateLabel: cc.Label = null;

    update(dt: number) {
        if (!this.player) {
            return;
        }

        const ratio = this.player.getHpRatio();
        if (this.hpBar) {
            this.hpBar.progress = Math.max(0, Math.min(1, ratio));
        }

        if (this.hpLabel) {
            this.hpLabel.string = `${Math.ceil(this.player.getHp())} / ${Math.ceil(this.player.getMaxHp())}`;
        }

        if (this.stateLabel) {
            this.stateLabel.string = this.player.getIsDead() ? 'DEAD' : 'ALIVE';
        }
    }
}
