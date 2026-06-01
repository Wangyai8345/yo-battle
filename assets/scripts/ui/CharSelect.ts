import UIManager from '../managers/UIManager';

const { ccclass, property } = cc._decorator;

/**
 * CharSelect
 * ←/→ 移動游標，Space 選定/取消，Enter 確認
 */
@ccclass
export default class CharSelect extends cc.Component {

    @property([cc.Node])
    cards: cc.Node[] = [];

    @property(cc.Node)
    warningLabel: cc.Node = null;

    @property([cc.SpriteFrame])
    charSprites: cc.SpriteFrame[] = [];

    @property([cc.String])
    charNames: string[] = [
        'GROUND MONK',
        'WATER PRIESTESS',
        'WIND HASHASHIN',
        'LEAF RANGER',
        'FIRE KNIGHT',
        'METAL BLADEKEEPER'
    ];

    private _total: number = 6;
    private _curIdx: number = 0;
    private _selectedIdx: number = -1;
    private _confirmed: boolean = false;

    // 供網路模組讀取
    public selectedIndex: number = -1;
    // 相容隊友的 P1/P2 欄位
    private _p1Selection: number = -1;
    private _p2Selection: number = -1;

    onLoad() {
        this._total = this.cards.length || this.charNames.length;
        this._refresh();
    }

    onEnable() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this._onKey, this);
        if (cc.game.canvas) (cc.game.canvas as HTMLCanvasElement).focus();
        this._curIdx = 0;
        this._selectedIdx = -1;
        this._confirmed = false;
        this.selectedIndex = -1;
        this._refresh();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this._onKey, this);
    }

    onDisable() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this._onKey, this);
    }

    private _onKey(e: cc.Event.EventKeyboard) {
        cc.log('[CharSelect] key received:', e.keyCode);
        if (this._confirmed) return;
        const k = e.keyCode;

        if (k === cc.macro.KEY.a || k === cc.macro.KEY.left) {
            this._curIdx = (this._curIdx - 1 + this._total) % this._total;
            this._refresh();
        }
        if (k === cc.macro.KEY.d || k === cc.macro.KEY.right) {
            this._curIdx = (this._curIdx + 1) % this._total;
            this._refresh();
        }
        if (k === cc.macro.KEY.space) {
            if (this._selectedIdx === this._curIdx) {
                this._selectedIdx = -1;
            } else {
                this._selectedIdx = this._curIdx;
            }
            this._refresh();
        }
        if (k === cc.macro.KEY.enter) {
            if (this._selectedIdx >= 0) {
                if (this.warningLabel) this.warningLabel.active = false;
                this._doConfirm();
            } else {
                if (this.warningLabel) {
                    this.warningLabel.active = true;
                    this.warningLabel.getComponent(cc.Label).string = 'Please select a character first !';
                    this.scheduleOnce(() => { if (this.warningLabel) this.warningLabel.active = false; }, 2);
                }
            }
        }
    }

    // 角色 index 對應 server 用的字串
    private readonly _charKeys: string[] = [
        'ground_monk',
        'water_priestess',
        'wind_hashashin',
        'leaf_ranger',
        'fire_knight',
        'metal_bladekeeper'
    ];

    private _doConfirm() {
        this._confirmed = true;
        this.selectedIndex = this._selectedIdx;
        this._p1Selection = this._selectedIdx;

        // 存到 localStorage，讓 JoinRoomScene 讀取
        const charKey = this._charKeys[this._selectedIdx] || 'ground_monk';
        localStorage.setItem('selectedCharacter', charKey);
        cc.log('[CharSelect] selectedCharacter saved:', charKey);

        this._refresh();
        UIManager.instance.showScreen('MapSelect');
    }

    private _refresh() {
        for (let i = 0; i < this.cards.length; i++) {
            const card = this.cards[i];
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

            // NameLabel：選定後變黃色，否則白色
            const lbl = card.getChildByName('NameLabel');
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

    public reset() {
        this._curIdx = 0;
        this._selectedIdx = -1;
        this._confirmed = false;
        this.selectedIndex = -1;
        this._refresh();
    }

    // 相容隊友的 click 介面
    onCharCardClick(event: cc.Event, playerAndIndex: string) {
        const parts = playerAndIndex.split(',').map(Number);
        const index = parts.length > 1 ? parts[1] : parts[0];
        this._curIdx = index;
        this._selectedIdx = index;
        this._refresh();
    }

    onConfirmClick() {
        if (this._selectedIdx >= 0 && !this._confirmed) {
            if (this.warningLabel) this.warningLabel.active = false;
            this._doConfirm();
        } else if (!this._confirmed) {
            if (this.warningLabel) {
                this.warningLabel.active = true;
                this.warningLabel.getComponent(cc.Label).string = 'Please select a character first !';
                this.scheduleOnce(() => { if (this.warningLabel) this.warningLabel.active = false; }, 2);
            }
        }
    }

    onBackClick() {
        this.reset();
        UIManager.instance.showScreen('MainMenu');
    }
}
