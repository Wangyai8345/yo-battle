import GroundMonkController from './GroundMonkController';

const { ccclass, property } = cc._decorator;

@ccclass
export default class CharacterSelectUI extends cc.Component {
    // @property(GroundMonkController)
    // player: GroundMonkController = null;

    // @property(cc.Button)
    // monkButton: cc.Button = null;

    // @property(cc.Button)
    // priestessButton: cc.Button = null;

    // @property(cc.Button)
    // hashashinButton: cc.Button = null;

    // onLoad() {
    //     this.bind(this.monkButton, 1);
    //     this.bind(this.priestessButton, 2);
    //     this.bind(this.hashashinButton, 3);
    // }

    // private bind(btn: cc.Button, presetIndex: number) {
    //     if (!btn || !this.player) {
    //         return;
    //     }

    //     btn.node.on('click', () => {
    //         this.player.switchPresetByIndex(presetIndex);
    //     }, this);
    // }
}
