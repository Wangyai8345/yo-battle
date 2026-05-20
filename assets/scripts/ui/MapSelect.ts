import UIManager from '../managers/UIManager';

const { ccclass } = cc._decorator;

@ccclass
export default class MapSelect extends cc.Component {

    private _selectedMap: number = 0;

    onMapClick(event: cc.Event, mapIndex: string) {
        this._selectedMap = Number(mapIndex);
        cc.log(`[MapSelect] Selected map ${this._selectedMap}`);
    }

    onConfirmClick() {
        cc.director.loadScene('battle');
    }

    onBackClick() {
        UIManager.instance.showScreen('CharSelect');
    }
}
