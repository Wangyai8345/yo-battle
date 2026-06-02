import PlayerController from "./PlayerController";
import { resolvePlayerController } from "./PlayerControllerResolver";

const { ccclass, property } = cc._decorator;

type CooldownSlot = "attack" | "skill2" | "defend" | "super";

@ccclass
export default class CooldownPie extends cc.Component {
    @property({ type: cc.Node })
    targetPlayer: cc.Node = null;

    @property({
        type: cc.Enum({
            Attack: 0,
            Skill2: 1,
            Defend: 2,
            Super: 3,
        }),
    })
    skillSlot: number = 0;

    @property({ type: cc.Sprite })
    iconSprite: cc.Sprite = null;

    @property({ type: cc.Sprite })
    cooldownOverlaySprite: cc.Sprite = null;

    @property({ type: cc.Label })
    countdownLabel: cc.Label = null;

    @property
    cooldownOpacity: number = 180;

    @property
    radialFillStart: number = 0.25;

    @property
    grayscaleValue: number = 120;

    private controller: PlayerController = null;

    onLoad() {
        this.resolveController();
        this.configureOverlay();
        this.refresh();
    }

    update() {
        if (!this.controller || !cc.isValid(this.controller.node)) {
            this.resolveController();
        }

        this.refresh();
    }

    private resolveController() {
        this.controller = resolvePlayerController(this.targetPlayer);
    }

    private configureOverlay() {
        if (!this.cooldownOverlaySprite) {
            return;
        }

        if (!this.cooldownOverlaySprite.spriteFrame && this.iconSprite) {
            this.cooldownOverlaySprite.spriteFrame = this.iconSprite.spriteFrame;
        }

        this.cooldownOverlaySprite.type = cc.Sprite.Type.FILLED;
        this.cooldownOverlaySprite.fillType = cc.Sprite.FillType.RADIAL;
        this.cooldownOverlaySprite.fillCenter = cc.v2(0.5, 0.5);
        this.cooldownOverlaySprite.fillStart = this.radialFillStart;
        this.cooldownOverlaySprite.color = new cc.Color(
            this.grayscaleValue,
            this.grayscaleValue,
            this.grayscaleValue,
            255
        );
        this.cooldownOverlaySprite.node.opacity = this.cooldownOpacity;
    }

    private refresh() {
        const remaining = this.controller ? this.controller.getSkillCooldownRemaining(this.getSlotName()) : 0;
        const duration = this.controller ? this.controller.getSkillCooldownDuration(this.getSlotName()) : 0;
        const onCooldown = duration > 0 && remaining > 0;

        if (this.cooldownOverlaySprite) {
            this.cooldownOverlaySprite.node.active = onCooldown;
            if (onCooldown) {
                this.cooldownOverlaySprite.fillStart = this.radialFillStart;
                this.cooldownOverlaySprite.fillRange = Math.max(0, Math.min(1, remaining / duration));
            }
        }

        if (this.countdownLabel) {
            this.countdownLabel.string = onCooldown ? remaining.toFixed(1) : "";
        }

        if (this.iconSprite) {
            this.iconSprite.node.opacity = 255;
        }
    }

    private getSlotName(): CooldownSlot {
        switch (this.skillSlot) {
            case 0:
                return "attack";
            case 1:
                return "skill2";
            case 2:
                return "defend";
            case 3:
                return "super";
            default:
                return "attack";
        }
    }
}
