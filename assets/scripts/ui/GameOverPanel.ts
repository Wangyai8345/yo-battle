import GameManager from '../GameManager';

const { ccclass, property } = cc._decorator;

/**
 * GameOverPanel
 * 遊戲結束時顯示 Winner 角色動畫 + Again / Quit 按鈕
 */
@ccclass
export default class GameOverPanel extends cc.Component {

    @property(cc.Label)
    winnerLabel: cc.Label = null;

    @property(cc.Node)
    characterContainer: cc.Node = null;

    private _charNode: cc.Node = null;

    start() {
        this.node.active = false;
    }

    /** GameManager.gameEnd() 呼叫 */
    public show(winnerName: string, winnerPrefab?: cc.Prefab) {
        this.node.active = true;
        this.node.setSiblingIndex(this.node.parent.childrenCount - 1);

        // 隱藏場上的玩家角色
        const canvas = cc.find('Canvas');
        if (canvas) {
            canvas.children.forEach(child => {
                if (child.name === 'P1' || child.name === 'P2') {
                    child.opacity = 0;
                }
            });
        }
        if (this.winnerLabel) {
            this.winnerLabel.string = `${winnerName} WINS!`;
        }

        // 顯示贏家角色動畫
        if (winnerPrefab && this.characterContainer) {
            if (this._charNode) this._charNode.destroy();
            this._charNode = cc.instantiate(winnerPrefab);
            this._charNode.setPosition(0, -30);
            this._charNode.scale = 1.5;

            // 完全移除物理
            const rb = this._charNode.getComponent(cc.RigidBody);
            if (rb) {
                rb.enabledContactListener = false;
                rb.linearVelocity = cc.v2(0, 0);
                rb.angularVelocity = 0;
                rb.gravityScale = 0;
                rb.type = cc.RigidBodyType.Static;
            }
            const colliders = this._charNode.getComponents(cc.Collider);
            colliders.forEach(c => c.enabled = false);
            const physColliders = this._charNode.getComponents(cc.PhysicsCollider);
            physColliders.forEach(c => c.enabled = false);

            // 隱藏角色上方的文字 Label
            this._charNode.children.forEach(child => {
                if (child.name === 'Player Label' || child.name === 'HP Label') {
                    child.active = false;
                }
            });

            this.characterContainer.addChild(this._charNode);

            // 播放 idle 動畫
            const anim = this._charNode.getComponent(cc.Animation);
            if (anim) {
                const clips = anim.getClips();
                // 先找名稱含 idle 或 ldle（arrow拼錯）的 clip
                const idleClip = clips.find(c => {
                    const name = c.name.toLowerCase();
                    return name.includes('idle') || name.includes('ldle');
                });
                if (idleClip) {
                    anim.play(idleClip.name);
                } else if (clips.length > 0) {
                    anim.play(clips[0].name);
                }
            }

            // 移除 PlayerController 避免角色亂動
            const scripts = this._charNode.getComponents(cc.Component);
            scripts.forEach(s => {
                if (s instanceof cc.Animation || s instanceof cc.Sprite) return;
                if (s.constructor.name !== 'cc.Node') s.enabled = false;
            });
        }
    }

    onAgainClick() {
        if (this._charNode) this._charNode.destroy();
        this.node.active = false;
        cc.director.loadScene('join_room_scene');
    }

    onQuitClick() {
        if (this._charNode) this._charNode.destroy();
        this.node.active = false;
        cc.director.loadScene('Mainmenu');
    }
}
