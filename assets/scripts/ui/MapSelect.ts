import UIManager from '../managers/UIManager';
import AudioManager from '../AudioManager';

const { ccclass, property } = cc._decorator;

/**
 * MapSelect
 * ←/→ 移動游標，Space 選定/取消，Enter 確認
 */
@ccclass
export default class MapSelect extends cc.Component {

    @property([cc.Node])
    mapCards: cc.Node[] = [];

    @property(cc.Node)
    warningLabel: cc.Node = null;

    // 供 battle scene 讀取
    public static selectedMap: number = -1;

    private _curIdx: number = 0;
    private _selectedIdx: number = -1;
    private _confirmed: boolean = false;
    private readonly TOTAL: number = 3;

    private _canvasKeyHandler: ((e: KeyboardEvent) => void) | null = null;

    onEnable() {
        console.log('[MapSelect] onEnable');
        this._curIdx = 0;
        this._selectedIdx = -1;
        this._confirmed = false;
        this._refresh();

        const canvas = cc.game.canvas as HTMLCanvasElement;
        if (this._canvasKeyHandler) {
            canvas.removeEventListener('keydown', this._canvasKeyHandler);
        }
        this._canvasKeyHandler = (e: KeyboardEvent) => {
            console.log('[MapSelect] canvas key:', e.keyCode);
            if (this._confirmed) return;
            const k = e.keyCode;
            if (k === 37 || k === 65) { this._curIdx = (this._curIdx - 1 + this.TOTAL) % this.TOTAL; AudioManager.playEffect('touch', 0.6); this._refresh(); }
            if (k === 39 || k === 68) { this._curIdx = (this._curIdx + 1) % this.TOTAL; AudioManager.playEffect('touch', 0.6); this._refresh(); }
            if (k === 32) {
                e.preventDefault();
                if (this._selectedIdx === this._curIdx) { this._selectedIdx = -1; }
                else { this._selectedIdx = this._curIdx; }
                AudioManager.playEffect('click', 0.7);
                this._refresh();
            }
            if (k === 13) {
                if (this._selectedIdx >= 0) {
                    if (this.warningLabel) this.warningLabel.active = false;
                    this._doConfirm();
                } else {
                    if (this.warningLabel) {
                        this.warningLabel.active = true;
                        this.warningLabel.getComponent(cc.Label).string = 'Please select a map first !';
                        this.scheduleOnce(() => { if (this.warningLabel) this.warningLabel.active = false; }, 2);
                    }
                }
            }
        };
        canvas.addEventListener('keydown', this._canvasKeyHandler);
        canvas.focus();
        console.log('[MapSelect] canvas keyboard registered');
        cc.director.preloadScene('battle');
    }

    onDisable() {
        console.log('[MapSelect] onDisable!');
        if (this._canvasKeyHandler && cc.game.canvas) {
            (cc.game.canvas as HTMLCanvasElement).removeEventListener('keydown', this._canvasKeyHandler);
            this._canvasKeyHandler = null;
        }
    }

    private _onKey(e: cc.Event.EventKeyboard) {
        // 保留給直接測試用
        if (this._confirmed) return;
        const k = e.keyCode;

        if (k === cc.macro.KEY.a || k === cc.macro.KEY.left) {
            this._curIdx = (this._curIdx - 1 + this.TOTAL) % this.TOTAL;
            this._refresh();
        }
        if (k === cc.macro.KEY.d || k === cc.macro.KEY.right) {
            this._curIdx = (this._curIdx + 1) % this.TOTAL;
            this._refresh();
        }

        // Space：選定 / 取消
        if (k === cc.macro.KEY.space) {
            if (this._selectedIdx === this._curIdx) {
                this._selectedIdx = -1;
            } else {
                this._selectedIdx = this._curIdx;
            }
            this._refresh();
        }

        // Enter：確認（需已選定）
        if (k === cc.macro.KEY.enter) {
            if (this._selectedIdx >= 0) {
                if (this.warningLabel) this.warningLabel.active = false;
                this._doConfirm();
            } else {
                if (this.warningLabel) {
                    this.warningLabel.active = true;
                    this.warningLabel.getComponent(cc.Label).string = 'Please select a map first !';
                    this.scheduleOnce(() => { if (this.warningLabel) this.warningLabel.active = false; }, 2);
                }
            }
        }
    }

    private _doConfirm() {
        this._confirmed = true;
        MapSelect.selectedMap = this._selectedIdx;
        this._refresh();
        cc.director.loadScene('battle');
    }

    private _refresh() {
        for (let i = 0; i < this.mapCards.length; i++) {
            const card = this.mapCards[i];
            if (!card) continue;

            const isCursor   = (i === this._curIdx);
            const isSelected = (i === this._selectedIdx);

            card.scale = isCursor ? 1.1 : 1.0;

            // DimOverlay：游標停留亮，其他略暗
            const dim = card.getChildByName('DimOverlay');
            if (dim) dim.opacity = isCursor ? 0 : 80;

            // SelectFrame：游標或選定時顯示
            const frame = card.getChildByName('SelectFrame');
            if (frame) frame.active = isCursor || isSelected;

            // MapNameLabel：選定後變黃色，否則白色
            const lbl = card.getChildByName('MapNameLabel');
            if (lbl) {
                const label = lbl.getComponent(cc.Label);
                if (label) {
                    label.node.color = isSelected
                        ? new cc.Color(255, 220, 50)   // 黃色
                        : new cc.Color(255, 255, 255);  // 白色
                }
            }
        }
    }

    // 滑鼠點擊（再點同一張取消選定）
    // CustomEventData 支援 "0" 或 "0,0" 兩種格式
    onButtonHover() {
        AudioManager.playEffect('touch', 0.6);
    }

    onMapClick(event: cc.Event, mapIndex: string) {
        if (this._confirmed) return;
        const parts = mapIndex.split(',').map(Number);
        const idx = parts.length > 1 ? parts[1] : parts[0];
        if (isNaN(idx)) return;
        AudioManager.playEffect('touch', 0.6);
        if (this._curIdx === idx && this._selectedIdx === idx) {
            this._selectedIdx = -1;   // 再點同一張 → 取消選定
        } else {
            this._curIdx = idx;
            this._selectedIdx = idx;
        }
        this._refresh();
    }

    onConfirmClick() {
        if (this._selectedIdx >= 0 && !this._confirmed) {
            if (this.warningLabel) this.warningLabel.active = false;
            AudioManager.playEffect('click', 0.7);
            this._doConfirm();
        } else if (!this._confirmed) {
            if (this.warningLabel) {
                this.warningLabel.active = true;
                this.warningLabel.getComponent(cc.Label).string = 'Please select a map first !';
                this.scheduleOnce(() => { if (this.warningLabel) this.warningLabel.active = false; }, 2);
            }
        }
    }

    onBackClick() {
        AudioManager.playEffect('click', 0.7);
        UIManager.instance.showScreen('CharSelect');
    }
}
