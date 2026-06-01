import UIManager from '../managers/UIManager';

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
        this._updateBgmLabel(vol);
    }

    onSfxSliderChange(slider: cc.Slider) {
        const vol = slider.progress;
        cc.audioEngine.setEffectsVolume(vol);
        this._updateSfxLabel(vol);
    }

    private _updateBgmLabel(vol: number) {
        if (this.bgmValueLabel) this.bgmValueLabel.string = Math.round(vol * 100) + '%';
    }

    private _updateSfxLabel(vol: number) {
        if (this.sfxValueLabel) this.sfxValueLabel.string = Math.round(vol * 100) + '%';
    }

    /** 繼續遊戲（戰鬥中用） */
    onResumeClick() {
        if (this._isInBattle) cc.director.resume();
        this.node.active = false;
    }

    /** 關閉設定（回原本畫面） */
    onCloseClick() {
        if (this._isInBattle) cc.director.resume();
        this.node.active = false;
    }

    /** EXIT 按鈕：顯示確認對話框 */
    onExitClick() {
        if (this.confirmDialog) this.confirmDialog.active = true;
    }

    /** 確認離開 */
    onConfirmExit() {
        cc.director.resume();
        this.node.active = false;
        cc.director.loadScene('Mainmenu');
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
