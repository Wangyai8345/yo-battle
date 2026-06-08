import GameManager from '../GameManager';
import NetworkManager from '../NetworkManager';
import AudioManager from '../AudioManager';

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
    private _shouldSyncSprite: boolean = false;

    start() {
        this.node.active = false;
        this._shouldSyncSprite = false;
    }

    update() {
        if (!this._shouldSyncSprite || !this._charNode || !cc.isValid(this._charNode)) return;
        const src = this._charNode.getComponent(cc.Sprite);
        const vis = this._charNode.getChildByName('Visual');
        if (!src || !vis) return;
        const vsp = vis.getComponent(cc.Sprite);
        if (vsp) vsp.spriteFrame = src.spriteFrame;
    }

    /** GameManager.gameEnd() 呼叫 */
    public show(winnerName: string, winnerPrefab?: cc.Prefab) {
        this.node.active = true;
        this.node.setSiblingIndex(this.node.parent.childrenCount - 1);

        // 完全隱藏場上角色（active=false 才能連粒子特效都隱藏，opacity 不夠）
        const canvas = cc.find('Canvas');
        if (canvas) {
            canvas.children.forEach(child => {
                if (child.name === 'P1' || child.name === 'P2') {
                    child.active = false;
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

            // 隱藏 Label 與非 Visual 的子節點（清除可能殘留的特效節點）
            this._charNode.children.forEach(child => {
                if (child.name !== 'Visual') {
                    child.active = false;
                }
            });

            this.characterContainer.addChild(this._charNode);

            // 先 disable 所有 Controller，讓 lateUpdate 不會在下一幀覆蓋動畫
            const scripts = this._charNode.getComponents(cc.Component);
            scripts.forEach(s => {
                if (s instanceof cc.Animation || s instanceof cc.Sprite) return;
                if (s.constructor.name !== 'cc.Node') s.enabled = false;
            });

            // 下一幀再 play idle，確保 Controller 的 lateUpdate 已清除
            const charNode = this._charNode;
            this.scheduleOnce(() => {
                if (!charNode || !cc.isValid(charNode)) return;
                const anim = charNode.getComponent(cc.Animation);
                if (!anim) return;
                const clips = anim.getClips().filter(c => c != null);
                const idleClip = clips.find(c => {
                    const n = c.name.toLowerCase();
                    return n.includes('idle') || n.includes('ldle');
                });
                if (idleClip) {
                    anim.play(idleClip.name);
                } else if (clips.length > 0) {
                    anim.play(clips[0].name);
                }
            }, 0);

            this._shouldSyncSprite = true;
        }
    }

    private _leaveAndLoad(sceneName: string) {
        this._shouldSyncSprite = false;
        if (this._charNode) this._charNode.destroy();
        this.node.active = false;
        // 若遊戲中曾暫停（SettingPanel），確保 director 恢復，否則新場景的 scheduleOnce 不會執行
        cc.director.resume();
        cc.director.getPhysicsManager().debugDrawFlags = 0;
        AudioManager.stopMusic();
        if (NetworkManager.instance) {
            NetworkManager.instance.quitServer()
                .catch(() => {})
                .then(() => { cc.director.loadScene(sceneName); });
        } else {
            cc.director.loadScene(sceneName);
        }
    }

    onButtonHover() {
        AudioManager.playEffect('touch', 0.6);
    }

    onAgainClick() {
        AudioManager.playEffect('click', 0.7);
        this._leaveAndLoad('join_room_scene');
    }

    onQuitClick() {
        AudioManager.playEffect('click', 0.7);
        this._leaveAndLoad('Mainmenu');
    }
}
