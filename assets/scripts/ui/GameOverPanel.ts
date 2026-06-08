import GameManager from '../GameManager';
import NetworkManager, { type MatchStatsData, type RoundStatData } from '../NetworkManager';
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

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Node)
    characterContainer: cc.Node = null;

    @property
    hideOnStart: boolean = true;

    private _charNode: cc.Node = null;
    private _shouldSyncSprite: boolean = false;
    private _hasShown: boolean = false;

    start() {
        this.node.active = this._hasShown || !this.hideOnStart;
        this._shouldSyncSprite = false;

        if (!this.hideOnStart && !this._hasShown) {
            this.populateFromStoredResult();
        }
    }

    update() {
        if (!this._shouldSyncSprite || !this._charNode || !cc.isValid(this._charNode)) return;
        const src = this._charNode.getComponent(cc.Sprite);
        const vis = this._charNode.getChildByName('Visual');
        if (!src || !vis) return;
        const vsp = vis.getComponent(cc.Sprite);
        if (vsp) vsp.spriteFrame = src.spriteFrame;
    }

    private getLabelAt(path: string): cc.Label | null {
        const node = cc.find(path, this.node);
        return node ? node.getComponent(cc.Label) : null;
    }

    private formatRoundResult(result: string, matchStats: MatchStatsData): string {
        if (result === "DRAW") return "DRAW";
        if (result === matchStats.p1Name) return "P1 WIN";
        if (result === matchStats.p2Name) return "P2 WIN";
        return result;
    }

    private applyRoundRow(rowNode: cc.Node, round: RoundStatData, matchStats: MatchStatsData) {
        const roundLabel = cc.find("RoundLabel", rowNode)?.getComponent(cc.Label);
        const p1Value = cc.find("P1Value", rowNode)?.getComponent(cc.Label);
        const p2Value = cc.find("P2Value", rowNode)?.getComponent(cc.Label);
        const resultValue = cc.find("ResultValue", rowNode)?.getComponent(cc.Label);

        if (roundLabel) roundLabel.string = `R${round.round}`;
        if (p1Value) p1Value.string = `${round.p1DealtPercent}%`;
        if (p2Value) p2Value.string = `${round.p2DealtPercent}%`;
        if (resultValue) resultValue.string = this.formatRoundResult(round.result, matchStats);
    }

    private renderMatchStats(matchStats: MatchStatsData | null, winnerName: string) {
        const totalDamageLabel = this.getLabelAt("Panel/Body/LeftPlayerCard/SummaryBox/TotalDamageLabel");
        const roundWinsLabel = this.getLabelAt("Panel/Body/LeftPlayerCard/SummaryBox/RoundWinsLabel");
        const statsList = cc.find("Panel/Body/RightStats/StatsList", this.node);
        const rowTemplate = statsList ? cc.find("RowTemplate", statsList) : null;

        if (!matchStats) {
            if (totalDamageLabel) totalDamageLabel.string = "TOTAL DAMAGE: 0%";
            if (roundWinsLabel) roundWinsLabel.string = "ROUND WINS: 0";
            if (rowTemplate) {
                rowTemplate.active = false;
            }
            return;
        }

        const isP1Winner = winnerName === matchStats.p1Name;
        const winnerTotalDamage = isP1Winner ? matchStats.totalP1Dealt : matchStats.totalP2Dealt;
        const winnerRoundWins = isP1Winner ? matchStats.p1RoundWins : matchStats.p2RoundWins;

        if (totalDamageLabel) totalDamageLabel.string = `TOTAL DAMAGE: ${winnerTotalDamage}%`;
        if (roundWinsLabel) roundWinsLabel.string = `ROUND WINS: ${winnerRoundWins}`;

        if (!statsList || !rowTemplate) {
            return;
        }

        statsList.children.slice().forEach((child) => {
            if (child !== rowTemplate) {
                child.destroy();
            }
        });

        const rounds = matchStats.rounds.length > 0
            ? matchStats.rounds
            : [{ round: 1, p1DealtPercent: 0, p2DealtPercent: 0, result: "DRAW" }];

        const baseX = rowTemplate.x;
        const baseY = rowTemplate.y;
        const rowSpacing = 58;

        rounds.forEach((round, index) => {
            const rowNode = index === 0 ? rowTemplate : cc.instantiate(rowTemplate);
            if (index > 0) {
                rowNode.name = `Row_${index + 1}`;
                statsList.addChild(rowNode);
            }

            rowNode.active = true;
            rowNode.setPosition(baseX, baseY - rowSpacing * index);
            this.applyRoundRow(rowNode, round, matchStats);
        });
    }

    /** GameManager.gameEnd() 呼叫 */
    public show(winnerName: string, winnerPrefab?: cc.Prefab, matchStats: MatchStatsData | null = null) {
        this._hasShown = true;
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
            this.winnerLabel.string = "";
        }
        const resolvedNameLabel = this.nameLabel || this.getLabelAt("Panel/Body/LeftPlayerCard/NameLabel");
        if (resolvedNameLabel) {
            resolvedNameLabel.string = `WINNER ${winnerName}`;
        }
        this.renderMatchStats(matchStats, winnerName);

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

    private populateFromStoredResult() {
        const data = NetworkManager.instance?.getGameOverData?.();
        if (!data) return;

        this.show(data.winnerName, data.winnerPrefab || undefined, data.matchStats || null);
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
