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
        apiKey: "AIzaSyBuGBqqZ0XUI4SjSWVLVCnhiqy09lP3NSY",
        authDomain: "yo-battle-9921a.firebaseapp.com",
        databaseURL: "https://yo-battle-9921a-default-rtdb.firebaseio.com",
        projectId: "yo-battle-9921a",
        storageBucket: "yo-battle-9921a.firebasestorage.app",
        messagingSenderId: "11338410793",
        appId: "1:11338410793:web:6024406c092e262af86538",
        measurementId: "G-62530V6NLT"
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
