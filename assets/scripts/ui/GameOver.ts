const { ccclass } = cc._decorator;

@ccclass
export default class GameOver extends cc.Component {

    onReturnClick() {
        cc.director.loadScene('Mainmenu');
    }
}
