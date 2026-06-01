import NetworkManager from "./NetworkManager";

const { ccclass, property } = cc._decorator;


@ccclass
export default class JoinRoomScene extends cc.Component {

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


    getSelectedCharacter(){
        return "arrow_hero";
    }
}
