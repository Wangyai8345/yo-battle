import HUDPanel from '../ui/HUDPanel';

const { ccclass, property } = cc._decorator;

type ScreenName = 'MainMenu' | 'CharSelect' | 'MapSelect' | 'Battle' | 'Result';

@ccclass
export default class UIManager extends cc.Component {

    static instance: UIManager = null;

    @property(cc.Node)
    mainMenuScreen: cc.Node = null;

    @property(cc.Node)
    charSelectScreen: cc.Node = null;

    @property(cc.Node)
    mapSelectScreen: cc.Node = null;

    @property(cc.Node)
    battleHUD: cc.Node = null;

    @property(cc.Node)
    resultScreen: cc.Node = null;

    @property(HUDPanel)
    p1Panel: HUDPanel = null;

    @property(HUDPanel)
    p2Panel: HUDPanel = null;

    private _screens: { [key in ScreenName]: cc.Node } = null;

    onLoad() {
        UIManager.instance = this;
        this._screens = {
            MainMenu: this.mainMenuScreen,
            CharSelect: this.charSelectScreen,
            MapSelect: this.mapSelectScreen,
            Battle: this.battleHUD,
            Result: this.resultScreen,
        };
    }

    showScreen(screen: ScreenName) {
        for (const name in this._screens) {
            const node = this._screens[name as ScreenName];
            if (node) node.active = (name === screen);
        }
    }

    updateHP(playerIndex: number, current: number, max: number) {
        const panel = playerIndex === 0 ? this.p1Panel : this.p2Panel;
        if (panel) panel.setHP(current, max);
    }

    updateKnockback(playerIndex: number, percent: number) {
        const panel = playerIndex === 0 ? this.p1Panel : this.p2Panel;
        if (panel) panel.setKnockback(percent);
    }

    showResult(winnerIndex: number) {
        this.showScreen('Result');
        if (!this.resultScreen) return;
        const label = this.resultScreen.getComponentInChildren(cc.Label);
        if (label) label.string = `P${winnerIndex + 1} WINS!`;
    }

    goToMainMenu() {
        this.showScreen('MainMenu');
    }
}
