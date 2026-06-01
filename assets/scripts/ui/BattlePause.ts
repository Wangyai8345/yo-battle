import SettingPanel from './SettingPanel';

const { ccclass, property } = cc._decorator;

/**
 * BattlePause
 * 掛在 battle.fire 的 Canvas 或任意節點上
 * 監聽 ESC 鍵，開啟/關閉暫停選單
 */
@ccclass
export default class BattlePause extends cc.Component {

    @property(SettingPanel)
    settingPanel: SettingPanel = null;

    private _isPaused: boolean = false;
    private _canvasKeyHandler: ((e: KeyboardEvent) => void) | null = null;

    onEnable() {
        const canvas = cc.game.canvas as HTMLCanvasElement;
        if (this._canvasKeyHandler) canvas.removeEventListener('keydown', this._canvasKeyHandler);
        this._canvasKeyHandler = (e: KeyboardEvent) => {
            if (e.keyCode === 27) { // ESC
                e.preventDefault();
                this._togglePause();
            }
        };
        canvas.addEventListener('keydown', this._canvasKeyHandler);
    }

    onDisable() {
        if (this._canvasKeyHandler && cc.game.canvas) {
            (cc.game.canvas as HTMLCanvasElement).removeEventListener('keydown', this._canvasKeyHandler);
            this._canvasKeyHandler = null;
        }
    }

    private _togglePause() {
        if (!this.settingPanel) return;
        if (this._isPaused) {
            this.settingPanel.onCloseClick();
            this._isPaused = false;
        } else {
            this.settingPanel.openFromBattle();
            this._isPaused = true;
        }
    }
}
