import NetworkManager, { type MatchStatsData, type RoundStatData } from '../NetworkManager';
import AudioManager from '../AudioManager';

const { ccclass, property } = cc._decorator;

type ClipSet = {
    skill3: cc.AnimationClip | null;
    idle: cc.AnimationClip | null;
};

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

    @property
    displayScale: number = 10;

    @property
    displayOffsetY: number = -30;

    @property({ type: cc.AnimationClip, displayName: "Ground Monk Skill3" })
    groundMonkSkill3Clip: cc.AnimationClip = null;

    @property({ type: cc.AnimationClip, displayName: "Ground Monk Idle" })
    groundMonkIdleClip: cc.AnimationClip = null;

    @property({ type: cc.AnimationClip, displayName: "Water Priestess Skill3" })
    waterPriestessSkill3Clip: cc.AnimationClip = null;

    @property({ type: cc.AnimationClip, displayName: "Water Priestess Idle" })
    waterPriestessIdleClip: cc.AnimationClip = null;

    @property({ type: cc.AnimationClip, displayName: "Wind Hashashin Skill3" })
    windHashashinSkill3Clip: cc.AnimationClip = null;

    @property({ type: cc.AnimationClip, displayName: "Wind Hashashin Idle" })
    windHashashinIdleClip: cc.AnimationClip = null;

    @property({ type: cc.AnimationClip, displayName: "Leaf Ranger Skill3" })
    leafRangerSkill3Clip: cc.AnimationClip = null;

    @property({ type: cc.AnimationClip, displayName: "Leaf Ranger Idle" })
    leafRangerIdleClip: cc.AnimationClip = null;

    @property({ type: cc.AnimationClip, displayName: "Fire Knight Skill3" })
    fireKnightSkill3Clip: cc.AnimationClip = null;

    @property({ type: cc.AnimationClip, displayName: "Fire Knight Idle" })
    fireKnightIdleClip: cc.AnimationClip = null;

    @property({ type: cc.AnimationClip, displayName: "Metal Bladekeeper Skill3" })
    metalBladekeeperSkill3Clip: cc.AnimationClip = null;

    @property({ type: cc.AnimationClip, displayName: "Metal Bladekeeper Idle" })
    metalBladekeeperIdleClip: cc.AnimationClip = null;

    private _displayNode: cc.Node = null;
    private _displaySprite: cc.Sprite = null;
    private _displayAnimation: cc.Animation = null;
    private _hasShown: boolean = false;

    start() {
        this.node.active = this._hasShown || !this.hideOnStart;

        if (!this.hideOnStart && !this._hasShown) {
            this.populateFromStoredResult();
        }
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

    public show(winnerName: string, winnerCharacter: string | null = null, matchStats: MatchStatsData | null = null) {
        this._hasShown = true;
        this.node.active = true;
        this.node.setSiblingIndex(this.node.parent.childrenCount - 1);

        const canvas = cc.find('Canvas');
        if (canvas) {
            canvas.children.forEach((child) => {
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
        this.playWinnerAnimation(winnerCharacter);
    }

    private playWinnerAnimation(winnerCharacter: string | null) {
        const display = this.ensureDisplayNode();
        if (!display) {
            return;
        }

        display.animation.stop();
        display.animation.off("finished");
        display.node.active = false;
        display.sprite.spriteFrame = null;

        if (!winnerCharacter) {
            cc.warn("[GameOverPanel] Missing winnerCharacter");
            return;
        }

        const clipSet = this.getConfiguredClipSetForCharacter(winnerCharacter);
        if (!clipSet) {
            cc.warn(`[GameOverPanel] No configured clip set for "${winnerCharacter}"`);
            return;
        }

        display.node.active = true;
        this.configureDisplayNode(display.node);

        if (clipSet.idle) {
            this.registerClip(display.animation, clipSet.idle);
            clipSet.idle.wrapMode = cc.WrapMode.Loop;
        }

        if (clipSet.skill3) {
            this.registerClip(display.animation, clipSet.skill3);
            clipSet.skill3.wrapMode = cc.WrapMode.Normal;
            this.applyFirstFrameSprite(display.sprite, clipSet.skill3);
            display.animation.once("finished", () => {
                if (!cc.isValid(display.node) || !clipSet.idle) return;
                this.applyFirstFrameSprite(display.sprite, clipSet.idle);
                display.animation.play(clipSet.idle.name);
            });
            display.animation.play(clipSet.skill3.name);
            return;
        }

        if (clipSet.idle) {
            this.applyFirstFrameSprite(display.sprite, clipSet.idle);
            display.animation.play(clipSet.idle.name);
        }
    }

    private ensureDisplayNode(): { node: cc.Node; sprite: cc.Sprite; animation: cc.Animation } | null {
        if (!this.characterContainer || !cc.isValid(this.characterContainer)) {
            cc.warn("[GameOverPanel] CharacterContainer is missing");
            return null;
        }

        if (!this._displayNode || !cc.isValid(this._displayNode)) {
            this._displayNode = this.characterContainer.getChildByName("AnimatedCharacter") || new cc.Node("AnimatedCharacter");
            if (!this._displayNode.parent) {
                this.characterContainer.addChild(this._displayNode);
            }
        }

        this.configureDisplayNode(this._displayNode);

        let sprite = this._displayNode.getComponent(cc.Sprite);
        if (!sprite) {
            sprite = this._displayNode.addComponent(cc.Sprite);
        }

        sprite.sizeMode = cc.Sprite.SizeMode.RAW;
        sprite.trim = false;

        let animation = this._displayNode.getComponent(cc.Animation);
        if (!animation) {
            animation = this._displayNode.addComponent(cc.Animation);
        }

        this._displaySprite = sprite;
        this._displayAnimation = animation;

        return {
            node: this._displayNode,
            sprite,
            animation,
        };
    }

    private configureDisplayNode(node: cc.Node) {
        node.setPosition(0, this.displayOffsetY);
        node.scaleX = this.displayScale;
        node.scaleY = this.displayScale;
    }

    private registerClip(animation: cc.Animation, clip: cc.AnimationClip): void {
        const exists = animation.getClips().some((existingClip) => {
            return existingClip === clip || existingClip.name === clip.name;
        });

        if (!exists) {
            animation.addClip(clip, clip.name);
        }
    }

    private applyFirstFrameSprite(sprite: cc.Sprite, clip: cc.AnimationClip): void {
        const curveData = (clip as any)?.curveData;
        const comps = curveData?.comps;
        const spriteComp = comps?.["cc.Sprite"];
        const frames = spriteComp?.spriteFrame;
        const firstFrame = frames && frames.length > 0 ? frames[0]?.value : null;

        if (firstFrame) {
            sprite.spriteFrame = firstFrame;
        }
    }

    private getConfiguredClipSetForCharacter(characterKey: string): ClipSet | null {
        switch (characterKey) {
            case "ground_monk":
                return { skill3: this.groundMonkSkill3Clip, idle: this.groundMonkIdleClip };
            case "water_priestess":
                return { skill3: this.waterPriestessSkill3Clip, idle: this.waterPriestessIdleClip };
            case "wind":
            case "wind_hero":
            case "wind_hashashin":
                return { skill3: this.windHashashinSkill3Clip, idle: this.windHashashinIdleClip };
            case "arrow":
            case "arrow_hero":
            case "leaf_ranger":
                return { skill3: this.leafRangerSkill3Clip, idle: this.leafRangerIdleClip };
            case "fire_hero":
            case "fire_knight":
                return { skill3: this.fireKnightSkill3Clip, idle: this.fireKnightIdleClip };
            case "metal":
            case "metal_hero":
            case "metalhero":
            case "metal_bladekeeper":
                return { skill3: this.metalBladekeeperSkill3Clip, idle: this.metalBladekeeperIdleClip };
            default:
                return null;
        }
    }

    private populateFromStoredResult() {
        const data = NetworkManager.instance?.getGameOverData?.();
        if (!data) return;

        this.show(data.winnerName, data.winnerCharacter || null, data.matchStats || null);
    }

    private _leaveAndLoad(sceneName: string) {
        if (this._displayAnimation) {
            this._displayAnimation.stop();
            this._displayAnimation.off("finished");
        }
        if (this._displayNode && cc.isValid(this._displayNode)) {
            this._displayNode.active = false;
        }
        this.node.active = false;
        cc.director.resume();
        cc.director.getPhysicsManager().debugDrawFlags = 0;
        AudioManager.stopMusic();
        if (NetworkManager.instance) {
            NetworkManager.instance.quitServer()
                .catch(() => { })
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
