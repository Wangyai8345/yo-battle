import UIManager from '../managers/UIManager';

const { ccclass, property } = cc._decorator;

@ccclass
export default class CharSelect extends cc.Component {

    // selectedIndex per player: -1 means not yet chosen
    private _p1Selection: number = -1;
    private _p2Selection: number = -1;

    onCharCardClick(event: cc.Event, playerAndIndex: string) {
        const [player, index] = playerAndIndex.split(',').map(Number);
        if (player === 0) this._p1Selection = index;
        if (player === 1) this._p2Selection = index;
        cc.log(`[CharSelect] P${player + 1} selected card ${index}`);
    }

    onConfirmClick() {
        UIManager.instance.showScreen('MapSelect');
    }

    onBackClick() {
        UIManager.instance.showScreen('MainMenu');
    }
}
