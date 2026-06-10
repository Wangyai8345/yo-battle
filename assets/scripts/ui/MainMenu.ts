import UIManager from '../managers/UIManager';
import SettingPanel from './SettingPanel';
import AccountScreen from './AccountScreen';
import AudioManager from '../AudioManager';
import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainMenu extends cc.Component {

    @property(SettingPanel)
    settingPanel: SettingPanel = null;

    @property(AccountScreen)
    accountScreen: AccountScreen = null;

    /** 所有 Menu 按鈕的容器節點（開 Panel 時隱藏） */
    @property(cc.Node)
    menuButtons: cc.Node = null;

    start() {
    const firebaseConfig = {
      apiKey: "AIzaSyCsy69T3t_FNuOyjct5fvd-ZLIM3dKTmZ0",
      authDomain: "cocos-firebase-tutorial.firebaseapp.com",
      databaseURL:
        "https://cocos-firebase-tutorial-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "cocos-firebase-tutorial",
      storageBucket: "cocos-firebase-tutorial.firebasestorage.app",
      messagingSenderId: "1058980190093",
      appId: "1:1058980190093:web:8396b10065f55f60268fc4",
    };

    if (getApps().length === 0) {
        const app = initializeApp(firebaseConfig);
        console.log("Firebase initialized:", app);
    }
  }

    onLoad() {
        AudioManager.playMusic('遊戲登入背景音樂');
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
        if (this.menuButtons) this.menuButtons.active = false;
        if (this.settingPanel) this.settingPanel.openFromMenu(() => {
            if (this.menuButtons) this.menuButtons.active = true;
        });
    }

    onLoginClick() {
        AudioManager.playEffect('click', 0.7);
        if (this.menuButtons) this.menuButtons.active = false;
        if (this.accountScreen) this.accountScreen.open(() => {
            if (this.menuButtons) this.menuButtons.active = true;
        });
    }

    onLeaderboardClick() {
        AudioManager.playEffect('click', 0.7);
        cc.director.loadScene('leaderboard');
    }
}
