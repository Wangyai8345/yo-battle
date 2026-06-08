import UIManager from '../managers/UIManager';
import SettingPanel from './SettingPanel';
import AudioManager from '../AudioManager';

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainMenu extends cc.Component {

    @property(SettingPanel)
    settingPanel: SettingPanel = null;

    onLoad() {
        AudioManager.stopMusic();
    }

    onButtonHover() {
        AudioManager.playEffect('touch', 0.6);
    }

    onStartClick() {
        AudioManager.playEffect('click', 0.7);
        UIManager.instance.showScreen('CharSelect');
    }

    onSettingsClick() {
        AudioManager.playEffect('click', 0.7);
        if (this.settingPanel) this.settingPanel.openFromMenu();
    }
}
