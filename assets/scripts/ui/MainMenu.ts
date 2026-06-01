import UIManager from '../managers/UIManager';
import SettingPanel from './SettingPanel';

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainMenu extends cc.Component {

    @property(SettingPanel)
    settingPanel: SettingPanel = null;

    onStartClick() {
        UIManager.instance.showScreen('CharSelect');
    }

    onSettingsClick() {
        if (this.settingPanel) this.settingPanel.openFromMenu();
    }
}
