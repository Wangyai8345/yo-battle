import UIManager from '../managers/UIManager';
import NetworkManager from '../NetworkManager';
import AudioManager from '../AudioManager';

const { ccclass, property } = cc._decorator;

/**
 * SettingPanel / PauseMenu
 * 從 MainMenu 開啟：隱藏 Resume 按鈕
 * 從戰鬥中開啟：顯示 Resume 按鈕，暫停遊戲
 */
@ccclass
export default class SettingPanel extends cc.Component {

    @property(cc.Slider)
    bgmSlider: cc.Slider = null;

    @property(cc.Slider)
    sfxSlider: cc.Slider = null;

    @property(cc.Label)
    bgmValueLabel: cc.Label = null;

    @property(cc.Label)
    sfxValueLabel: cc.Label = null;

    @property(cc.Label)
    titleLabel: cc.Label = null;

    @property(cc.Node)
    confirmDialog: cc.Node = null;

    private _isInBattle: boolean = false;

    /** 從 MainMenu 開啟 */
    public openFromMenu() {
        this._isInBattle = false;
        if (this.titleLabel) this.titleLabel.string = 'SETTINGS';
        this.node.active = true;
        this._syncSliders();
    }

    /** 從戰鬥中開啟（暫停遊戲） */
    public openFromBattle() {
        this._isInBattle = true;
        if (this.titleLabel) this.titleLabel.string = 'PAUSED';
        this.node.active = true;
        this.node.setSiblingIndex(this.node.parent.childrenCount - 1);
        this._setPlayersVisible(false);
        this._syncSliders();
        cc.director.pause();
    }

    onEnable() {
        this._syncSliders();
    }

    private _syncSliders() {
        const bgm = cc.audioEngine.getMusicVolume();
        const sfx = cc.audioEngine.getEffectsVolume();
        if (this.bgmSlider) this.bgmSlider.progress = bgm;
        if (this.sfxSlider) this.sfxSlider.progress = sfx;
        this._updateBgmLabel(bgm);
        this._updateSfxLabel(sfx);
    }

    onBgmSliderChange(slider: cc.Slider) {
        const vol = slider.progress;
        cc.audioEngine.setMusicVolume(vol);
        cc.sys.localStorage.setItem('vol_bgm', vol.toString());
        this._updateBgmLabel(vol);
    }

    onSfxSliderChange(slider: cc.Slider) {
        const vol = slider.progress;
        AudioManager.setSfxVolume(vol);
        cc.sys.localStorage.setItem('vol_sfx', vol.toString());
        this._updateSfxLabel(vol);
    }

    private _updateBgmLabel(vol: number) {
        if (this.bgmValueLabel) this.bgmValueLabel.string = Math.round(vol * 100) + '%';
    }

    private _updateSfxLabel(vol: number) {
        if (this.sfxValueLabel) this.sfxValueLabel.string = Math.round(vol * 100) + '%';
    }

    /** 隱藏/顯示所有玩家角色節點 */
    private _setPlayersVisible(visible: boolean) {
        const canvas = cc.find('Canvas');
        if (!canvas) return;
        canvas.children.forEach(child => {
            if (child.name === 'P1' || child.name === 'P2') {
                child.opacity = visible ? 255 : 0;
            }
        });
    }

    onButtonHover() {
        AudioManager.playEffect('touch', 0.6);
    }

    /** 繼續遊戲（戰鬥中用） */
    onResumeClick() {
        AudioManager.playEffect('click', 0.7);
        if (this._isInBattle) cc.director.resume();
        this.node.active = false;
    }

    /** 關閉設定（回原本畫面） */
    onCloseClick() {
        AudioManager.playEffect('click', 0.7);
        if (this._isInBattle) {
            cc.director.resume();
            this._setPlayersVisible(true);
        }
        this.node.active = false;
    }

    /** EXIT 按鈕：顯示確認對話框 */
    onExitClick() {
        AudioManager.playEffect('click', 0.7);
        if (this.confirmDialog) this.confirmDialog.active = true;
    }

    /** 確認離開 */
    onConfirmExit() {
        cc.director.resume();
        this.node.active = false;
        AudioManager.stopMusic();
        if (NetworkManager.instance) {
            NetworkManager.instance.quitServer()
                .catch(() => {})
                .then(() => { cc.director.loadScene('Mainmenu'); });
        } else {
            cc.director.loadScene('Mainmenu');
        }
    }

    /** 取消離開 */
    onCancelExit() {
        if (this.confirmDialog) this.confirmDialog.active = false;
    }

    /** 回主選單（舊介面保留相容） */
    onReturnMenuClick() {
        this.onExitClick();
    }
}
