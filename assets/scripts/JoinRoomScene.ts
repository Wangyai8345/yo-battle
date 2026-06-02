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

    @property(cc.Label)
    statusLabel: cc.Label = null;

    @property
    gameSceneName: string = "game";


    private pending: boolean = false;



    onLoad() {
        this.roomNameInput.string = "";
        this.statusLabel.string = "Enter room name";

        this.joinButton.node.on('click', this.onJoinButtonClicked, this);
        this.quitButton.node.on('click', this.onQuitButtonClicked, this);
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
            this.quitButton.interactable = true;
            this.statusLabel.string = `Waiting other players...`;

            await NetworkManager.instance.connectToServer(
                this.roomNameInput.string.trim(),
                this.getSelectedCharacter(),
                () => {
                    this.quitButton.interactable = false;
                    this.statusLabel.string = `Entering game!`;

                    this.scheduleOnce(() => {
                        cc.director.loadScene(this.gameSceneName);
                    }, 1)
                }
            );
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

            NetworkManager.instance.quitServer();
        }
        catch(error){
            this.statusLabel.string = `An error occured`;

            cc.error("Quit room error:", error);
        }
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
