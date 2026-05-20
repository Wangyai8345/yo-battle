import UIManager from '../managers/UIManager';

const { ccclass } = cc._decorator;

@ccclass
export default class MainMenu extends cc.Component {

    onStartClick() {
        UIManager.instance.showScreen('CharSelect');
    }

    onSettingsClick() {
        cc.log('[MainMenu] Settings screen not yet implemented');
    }
}
