const { ccclass, property } = cc._decorator;

/**
 * NameTag
 * 掛在角色節點上，顯示角色名稱
 * Label 子節點自動跟著角色移動
 * 可由外部呼叫 setName() 動態更新（方便網路組接入）
 */
@ccclass
export default class NameTag extends cc.Component {

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property
    playerName: string = '';

    @property
    offsetY: number = 120;   // 顯示在角色頭上多高

    onStart() {
        if (this.nameLabel) {
            this.nameLabel.node.y = this.offsetY;
            if (this.playerName) {
                this.nameLabel.string = this.playerName;
            }
        }
    }

    /** 外部（網路/GameManager）呼叫來設定名字 */
    public setName(name: string) {
        this.playerName = name;
        if (this.nameLabel) {
            this.nameLabel.string = name;
        }
    }

    /** 讓名字牌永遠朝上（角色翻轉時不跟著翻） */
    update() {
        if (this.nameLabel) {
            this.nameLabel.node.scaleX = this.node.scaleX > 0 ? 1 : -1;
        }
    }
}
