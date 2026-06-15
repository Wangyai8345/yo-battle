import AudioManager from '../AudioManager';

const { ccclass } = cc._decorator;

@ccclass
export default class GameOver extends cc.Component {

    onButtonHover() {
        AudioManager.playEffect('touch', 0.6);
    }

    onReturnClick() {
        AudioManager.playEffect('click', 0.7);
        cc.director.loadScene('Mainmenu');
    }
}
