import NetworkManager from "./NetworkManager";

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

    protected start(): void {
        // Canvas layout is fully recalculated by this point; safe to enable EditBox
        if (this.roomNameInput) this.roomNameInput.enabled = true;

        // Auto-focus the EditBox so the player can type immediately
        this.scheduleOnce(() => {
            const impl = (this.roomNameInput as any)?._editBoxImpl;
            if (impl?._elem?.focus) impl._elem.focus();
        }, 0.1);

        // Enter key triggers join
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this._onKeyDown, this);
    }

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this._onKeyDown, this);
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
                        cc.director.loadScene(this.gameSceneName);
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
