import NetworkManager from "./NetworkManager";
import VSController from "./ui/VSController";

const { ccclass, property } = cc._decorator;


@ccclass
export default class JoinRoomScene extends cc.Component {
    private static readonly DEFAULT_CHARACTER = "ground_monk";
    private static readonly SELECTED_CHARACTER_STORAGE_KEY = "selectedCharacter";

    @property(cc.EditBox)
    roomNameInput: cc.EditBox = null;

    @property(cc.Button)
    joinButton: cc.Button = null;
    
    @property(cc.Button)
    quitButton: cc.Button = null;

    @property(cc.Button)
    backButton: cc.Button = null;

    @property(cc.Label)
    statusLabel: cc.Label = null;

    @property
    gameSceneName: string = "game";

    @property
    vsSceneName: string = "vs";


    private pending: boolean = false;
    private matchReady: boolean = false;



    onLoad() {
        this.roomNameInput.string = "";
        this.statusLabel.string = "Enter room name";

        // Disable EditBox here; re-enable in start() after Canvas layout is stable.
        // The game scene's camera (zoomRatio != 1) can leave stale state that causes
        // the EditBox HTML element to render at the wrong position if enabled during onLoad.
        this.roomNameInput.enabled = false;

        this.joinButton.node.on('click', this.onJoinButtonClicked, this);
        this.quitButton.node.on('click', this.onQuitButtonClicked, this);
        if (this.backButton) this.backButton.node.on('click', this.onBackButtonClicked, this);
    }

    private _docKeyHandler: ((e: KeyboardEvent) => void) | null = null;

    protected start(): void {
        if (this.roomNameInput) this.roomNameInput.enabled = true;

        // document-level keydown：在真正的 user gesture 裡 focus，Chrome 不會擋
        this._docKeyHandler = (e: KeyboardEvent) => {
            const key = typeof e.key === 'string' ? e.key : '';
            // CC2.4.x EditBox 的 DOM 元素可能延遲建立，直接用 querySelector 找
            const elem = (document.querySelector('input[type="text"]') ||
                          document.querySelector('input:not([type="submit"]):not([type="button"])') ||
                          document.querySelector('textarea')) as HTMLInputElement | null;
            if (!elem) return;

            // Enter → 直接 join
            if (key === 'Enter' || e.keyCode === 13) {
                if (!this.pending && this.joinButton && this.joinButton.interactable) {
                    e.preventDefault();
                    this.onJoinButtonClicked();
                }
                return;
            }

            // Backspace / Delete：CC 引擎可能在 bubble 階段吃掉這些鍵，手動處理
            if (key === 'Backspace' || key === 'Delete') {
                if (document.activeElement !== elem) elem.focus();
                if (key === 'Backspace') {
                    elem.value = elem.value.slice(0, -1);
                } else {
                    // Delete 鍵：刪游標後一個字（這裡簡化為清空，通常不常用）
                    elem.value = elem.value.slice(0, -1);
                }
                this.roomNameInput.string = elem.value;
                e.preventDefault();
                return;
            }

            // 使用者打任何可見字元時，若 input 還沒 focus 就先 focus 並補入第一個字
            if (key.length === 1 && !e.ctrlKey && !e.metaKey) {
                if (document.activeElement !== elem) {
                    elem.focus();
                    // keydown 在 focus 前就觸發，字元不會自動進 input，手動補入
                    elem.value = elem.value + key;
                    this.roomNameInput.string = elem.value;
                    e.preventDefault();
                }
            }
        };

        // capture:true 確保在 CC 引擎攔截之前先收到事件
        window.addEventListener('keydown', this._docKeyHandler, true);
    }

    onDestroy() {
        if (this._docKeyHandler) {
            window.removeEventListener('keydown', this._docKeyHandler, true);
            this._docKeyHandler = null;
        }
    }

    private _onKeyDown(event: cc.Event.EventKeyboard) {
        if (event.keyCode === cc.macro.KEY.enter && !this.pending && this.joinButton.interactable) {
            this.onJoinButtonClicked();
        }
    }



    protected update(dt: number): void {
        if(!this.pending){
            const roomName = this.roomNameInput.string.trim();

            if (roomName === ""){
                this.joinButton.interactable = false;
                this.quitButton.interactable = false;
            }
            else{
                this.joinButton.interactable = true;
                this.quitButton.interactable = false;
            }
        }
    }


    async onJoinButtonClicked() {
        try {
            this.pending = true;
            this.joinButton.interactable = false;
            this.quitButton.interactable = false;
            this.statusLabel.string = `Waiting other players...`;

            await NetworkManager.instance.connectToServer(
                this.roomNameInput.string.trim(),
                this.getSelectedCharacter(),
                () => {
                    this.matchReady = true;
                    this.quitButton.interactable = false;
                    this.statusLabel.string = `Entering game!`;

                    this.scheduleOnce(() => {
                        this.enterBattleFlow();
                    }, 1);
                }
            );

            this.scheduleOnce(() => {
                if(this.quitButton && !this.matchReady){
                    this.quitButton.interactable = true;
                }
            }, 1);
        }
        catch(error){
            this.pending = false;
            this.statusLabel.string = `Connection failed`;

            cc.error("Join room error:", error);
        }
    }

    private enterBattleFlow() {
        const entrySceneName = this.getEntrySceneName();

        cc.director.loadScene(entrySceneName, () => {
            const vsRoot = cc.find("Canvas/VS");
            if (!vsRoot) {
                if (entrySceneName !== this.gameSceneName) {
                    cc.warn(`[JoinRoomScene] VS root not found in scene "${entrySceneName}", fallback to ${this.gameSceneName}`);
                    cc.director.loadScene(this.gameSceneName);
                }
                return;
            }

            let controller = vsRoot.getComponent(VSController);
            if (!controller) {
                controller = vsRoot.addComponent(VSController);
            }

            if (controller && this.gameSceneName) {
                controller.nextSceneName = this.gameSceneName;
            }
        });
    }

    private getEntrySceneName(): string {
        const trimmedVsScene = this.vsSceneName ? this.vsSceneName.trim() : "";
        if (trimmedVsScene) {
            return trimmedVsScene;
        }

        const trimmedGameScene = this.gameSceneName ? this.gameSceneName.trim() : "";
        return trimmedGameScene || "game";
    }

    
    async onQuitButtonClicked() {
        try {
            this.pending = false;
            this.statusLabel.string = "Enter room name";

            await NetworkManager.instance.quitServer();
        }
        catch(error){
            this.statusLabel.string = `An error occured`;

            cc.error("Quit room error:", error);
        }
    }


    async onBackButtonClicked() {
        if (this.backButton) this.backButton.interactable = false;
        if (this.pending) {
            try {
                this.pending = false;
                await NetworkManager.instance.quitServer();
            }
            catch(error){
                cc.error("Back button quit error:", error);
            }
        }
        cc.director.loadScene('Mainmenu');
    }


    getSelectedCharacter() {
        const selectedCharacter = this.readSelectedCharacter();

        if (selectedCharacter && selectedCharacter.trim() !== "") {
            return selectedCharacter;
        }

        cc.warn(
            `[JoinRoomScene] No selected character found, fallback to ${JoinRoomScene.DEFAULT_CHARACTER}`
        );
        return JoinRoomScene.DEFAULT_CHARACTER;
    }

    private readSelectedCharacter(): string | null {
        try {
            if (typeof window !== "undefined" && window.sessionStorage) {
                const sessionValue = window.sessionStorage.getItem(
                    JoinRoomScene.SELECTED_CHARACTER_STORAGE_KEY
                );

                if (sessionValue && sessionValue.trim() !== "") {
                    return sessionValue;
                }
            }
        } catch (error) {
            cc.warn("[JoinRoomScene] Failed to read selectedCharacter from sessionStorage", error);
        }

        try {
            if (typeof window !== "undefined" && window.localStorage) {
                return window.localStorage.getItem(
                    JoinRoomScene.SELECTED_CHARACTER_STORAGE_KEY
                );
            }
        } catch (error) {
            cc.warn("[JoinRoomScene] Failed to read selectedCharacter from localStorage", error);
        }

        return null;
    }
}   
