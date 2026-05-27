import Fireball from "./Fireball";
import PlayerController from "./PlayerController";

const { ccclass, property } = cc._decorator;

type FireballState = {
    node: cc.Node;
    sprite: cc.Sprite;
    direction: number;
    frameTimer: number;
    frameIndex: number;
    lifeTimer: number;
    frames: cc.SpriteFrame[];
    frameInterval: number;
    speed: number;
    lifetime: number;
    loopStartIndex: number;
    loopEndIndex: number;
    finalFrameIndex: number;
    finalFrameHoldDuration: number;
    enlargedFrameStartIndex: number;
    scaleMultiplier: number;
    frameScaleFactors: number[];
    baseFrameScale: number;
    currentSpeed: number;
    startupSpeed: number;
    accelerationDuration: number;
    accelerationElapsed: number;
};

@ccclass
export default class Firehero extends cc.Component {
    @property({ type: cc.SpriteFrame })
    attackFrame1: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    attackFrame2: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    attackFrame3: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    attackFrame4: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    attackFrame5: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    attackFrame6: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    attackFrame7: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    attackFrame8: cc.SpriteFrame = null;

    @property
    attackFrameInterval: number = 0.08;

    @property({ type: cc.SpriteFrame })
    defendFrame1: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    defendFrame2: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    defendFrame3: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    defendFrame4: cc.SpriteFrame = null;

    @property
    defendFrameInterval: number = 0.1;

    @property
    defendFinalHoldDuration: number = 1;

    @property({ type: cc.SpriteFrame })
    defendHoldEffectFrame: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    skill2Frame1: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    skill2Frame2: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    skill2Frame3: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    skill2Frame4: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    skill2Frame5: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    skill2Frame6: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    skill2Frame7: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    skill2Frame8: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    skill2Frame9: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    skill2Frame10: cc.SpriteFrame = null;

    @property
    skill2FrameInterval: number = 0.08;

    @property
    skill3ThrowFrameInterval: number = 0.12;

    @property({ type: cc.Prefab })
    fireballPrefab: cc.Prefab = null;

    @property({ type: cc.SpriteFrame })
    dragonfireFrame1: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    dragonfireFrame2: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    dragonfireFrame3: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    dragonfireFrame4: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    dragonfireFrame5: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    dragonfireFrame6: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    dragonfireFrame7: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    dragonfireFrame8: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    dragonfireFrame9: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    dragonfireFrame10: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    dragonfireFrame11: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    dragonfireFrame12: cc.SpriteFrame = null;

    @property
    dragonfireFrameInterval: number = 0.07;

    @property
    dragonfireSpeed: number = 420;

    @property
    dragonfireLifetime: number = 2;

    @property
    dragonfireScaleMultiplier: number = 100;

    @property
    dragonfireTargetHeight: number = 360;

    @property
    dragonfireLoopTargetHeight: number = 420;

    @property({ type: cc.SpriteFrame })
    skill3ChargeFrame: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    skill3ChargeSwirlFrame: cc.SpriteFrame = null;

    @property([cc.SpriteFrame])
    skill3ChargeEffectFrames: cc.SpriteFrame[] = [];

    @property
    skill3ChargeEffectFrameInterval: number = 0.08;

    @property
    skill3ChargeDelay: number = 0.18;

    @property
    dragonfireStartupSpeed: number = 0;

    @property
    dragonfireAccelerationDuration: number = 0.4;

    @property
    dragonfireFinalFrameHoldDuration: number = 0.1;

    @property
    skill3RecoveryDelay: number = 0.2;

    @property({ type: cc.SpriteFrame })
    skill3FlashFrame: cc.SpriteFrame = null;

    @property
    skill3FlashDuration: number = 0.5;

    @property({ type: cc.Node })
    shakeTarget: cc.Node = null;

    @property
    dragonfireShakeDuration: number = 0.2;

    @property
    dragonfireShakeStrength: number = 12;

    private controller: PlayerController = null;
    private sprite: cc.Sprite = null;
    private attackFrames: cc.SpriteFrame[] = [];
    private defendFrames: cc.SpriteFrame[] = [];
    private skill2Frames: cc.SpriteFrame[] = [];
    private dragonfireFrames: cc.SpriteFrame[] = [];
    private attackFrameTimer: number = 0;
    private attackFrameIndex: number = 0;
    private defendFrameTimer: number = 0;
    private defendFrameIndex: number = 0;
    private defendFinalHoldTimer: number = 0;
    private defendHoldEffectNode: cc.Node = null;
    private defendHoldEffectSprite: cc.Sprite = null;
    private skill2FrameTimer: number = 0;
    private skill2FrameIndex: number = 0;
    private skill3ChargeTimer: number = 0;
    private skill3ChargeSwirlNode: cc.Node = null;
    private skill3ChargeSwirlSprite: cc.Sprite = null;
    private skill3ChargeSwirlAngle: number = 0;
    private skill3ChargeEffectNode: cc.Node = null;
    private skill3ChargeEffectSprite: cc.Sprite = null;
    private skill3ChargeEffectTimer: number = 0;
    private skill3ChargeEffectIndex: number = 0;
    private skill3ChargeEffectFinished: boolean = false;
    private skill3ChargeEffectEndTimer: number = 0;
    private skill3Charging: boolean = false;
    private skill3Flashing: boolean = false;
    private skill3FlashTimer: number = 0;
    private skill3Recovering: boolean = false;
    private skill3RecoveryTimer: number = 0;
    private isAttacking: boolean = false;
    private isDefending: boolean = false;
    private isCastingSkill2: boolean = false;
    private isCastingSkill3: boolean = false;
    private activeFireballs: FireballState[] = [];
    private shakingNode: cc.Node = null;
    private shakeOrigin: cc.Vec3 = null;
    private shakeTimer: number = 0;
    private shakeDuration: number = 0;
    private shakeStrength: number = 0;

    onLoad() {
        this.controller = this.getComponent(PlayerController);
        this.sprite = this.getComponent(cc.Sprite);
        this.resolveShakeTarget();
        this.attackFrames = [
            this.attackFrame1,
            this.attackFrame2,
            this.attackFrame3,
            this.attackFrame4,
            this.attackFrame5,
            this.attackFrame6,
            this.attackFrame7,
            this.attackFrame8,
        ].filter((frame): frame is cc.SpriteFrame => !!frame);
        this.defendFrames = [
            this.defendFrame1,
            this.defendFrame2,
            this.defendFrame3,
            this.defendFrame4,
        ].filter((frame): frame is cc.SpriteFrame => !!frame);
        this.skill2Frames = [
            this.skill2Frame1,
            this.skill2Frame2,
            this.skill2Frame3,
            this.skill2Frame4,
            this.skill2Frame5,
            this.skill2Frame6,
            this.skill2Frame7,
            this.skill2Frame8,
            this.skill2Frame9,
            this.skill2Frame10,
        ].filter((frame): frame is cc.SpriteFrame => !!frame);
        this.dragonfireFrames = [
            this.dragonfireFrame1,
            this.dragonfireFrame2,
            this.dragonfireFrame3,
            this.dragonfireFrame4,
            this.dragonfireFrame5,
            this.dragonfireFrame6,
            this.dragonfireFrame7,
            this.dragonfireFrame8,
            this.dragonfireFrame9,
            this.dragonfireFrame10,
            this.dragonfireFrame11,
            this.dragonfireFrame12,
        ].filter((frame): frame is cc.SpriteFrame => !!frame);

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.clearDefendHoldEffect();
        this.clearSkill3ChargeSwirl();
        this.clearSkill3ChargeEffect();
    }

    update(dt: number) {
        this.updateShake(dt);
        this.updateSkill3Recovery(dt);
        this.updateAnimation(dt);
        this.updateFireballs(dt);
    }

    onKeyDown(event: cc.Event.EventKeyboard) {
        if (this.skill3Charging || this.skill3Flashing || this.skill3Recovering || this.isCastingSkill2 || this.isCastingSkill3) {
            return;
        }

        if (event.keyCode === cc.macro.KEY.q) {
            this.startSkill3();
            return;
        }

        if (event.keyCode === cc.macro.KEY.r) {
            this.startSkill2();
            return;
        }

        if (event.keyCode === cc.macro.KEY.e) {
            this.startAttack();
            return;
        }

        if (event.keyCode === cc.macro.KEY.f) {
            this.startDefend();
        }
    }

    private updateAnimation(dt: number) {
        if (!this.sprite) {
            return;
        }

        if (this.isCastingSkill3) {
            this.updateSkill3Animation(dt);
            return;
        }

        if (this.isCastingSkill2) {
            this.updateSkill2Animation(dt);
            return;
        }

        if (this.isDefending) {
            this.updateDefendAnimation(dt);
            return;
        }

        if (this.isAttacking) {
            this.updateAttackAnimation(dt);
        }
    }

    private startAttack() {
        if (this.isBusy() || this.attackFrames.length === 0) {
            return;
        }

        if (!this.tryUseCooldown("attack")) {
            return;
        }

        this.isAttacking = true;
        this.attackFrameTimer = 0;
        this.attackFrameIndex = 0;
        this.lockController(false, false, false);
        this.sprite.spriteFrame = this.attackFrames[0];
    }

    private updateAttackAnimation(dt: number) {
        if (this.attackFrames.length === 0) {
            this.finishAttack();
            return;
        }

        this.attackFrameTimer += dt;
        if (this.attackFrameTimer < this.attackFrameInterval) {
            return;
        }

        this.attackFrameTimer = 0;
        this.attackFrameIndex++;

        if (this.attackFrameIndex >= this.attackFrames.length) {
            this.finishAttack();
            return;
        }

        this.sprite.spriteFrame = this.attackFrames[this.attackFrameIndex];
    }

    private finishAttack() {
        this.isAttacking = false;
        this.attackFrameIndex = 0;
        this.unlockController();
    }

    private startDefend() {
        if (this.isBusy() || this.defendFrames.length === 0) {
            return;
        }

        if (!this.tryUseCooldown("defend")) {
            return;
        }

        this.isDefending = true;
        this.defendFrameTimer = 0;
        this.defendFrameIndex = 0;
        this.defendFinalHoldTimer = 0;
        this.clearDefendHoldEffect();
        this.lockController(true, true, true);
        this.sprite.spriteFrame = this.defendFrames[0];
    }

    private updateDefendAnimation(dt: number) {
        if (this.defendFrames.length === 0) {
            this.finishDefend();
            return;
        }

        if (this.defendFrameIndex >= this.defendFrames.length - 1) {
            this.sprite.spriteFrame = this.defendFrames[this.defendFrames.length - 1];
            this.ensureDefendHoldEffect();
            this.syncDefendHoldEffect();
            this.defendFinalHoldTimer += dt;

            if (this.defendFinalHoldTimer < this.defendFinalHoldDuration) {
                return;
            }

            this.finishDefend();
            return;
        }

        this.defendFrameTimer += dt;
        if (this.defendFrameTimer < this.defendFrameInterval) {
            return;
        }

        this.defendFrameTimer = 0;
        this.defendFrameIndex++;
        this.sprite.spriteFrame = this.defendFrames[this.defendFrameIndex];
    }

    private finishDefend() {
        this.isDefending = false;
        this.defendFrameIndex = 0;
        this.defendFinalHoldTimer = 0;
        this.clearDefendHoldEffect();
        this.unlockController();
    }

    private ensureDefendHoldEffect() {
        if (!this.defendHoldEffectFrame || this.defendHoldEffectNode || !this.node.parent) {
            return;
        }

        this.defendHoldEffectNode = new cc.Node("DefendHoldEffect");
        this.defendHoldEffectNode.parent = this.node.parent;
        this.defendHoldEffectNode.zIndex = 1000;
        this.defendHoldEffectSprite = this.defendHoldEffectNode.addComponent(cc.Sprite);
        this.defendHoldEffectSprite.sizeMode = cc.Sprite.SizeMode.RAW;
        this.defendHoldEffectSprite.spriteFrame = this.defendHoldEffectFrame;
        this.defendHoldEffectNode.opacity = 220;
        this.syncDefendHoldEffect();
    }

    private syncDefendHoldEffect() {
        if (!this.defendHoldEffectNode) {
            return;
        }

        const facingRight = this.getFacingRight();
        const facing = facingRight ? 1 : -1;
        this.defendHoldEffectNode.setPosition(this.node.x + (facing * 46), this.node.y + 4);
        this.defendHoldEffectNode.scaleX = 1.05;
        this.defendHoldEffectNode.scaleY = 1.05;
        this.defendHoldEffectNode.angle = facingRight ? -45 : 135;
    }

    private clearDefendHoldEffect() {
        if (this.defendHoldEffectNode && cc.isValid(this.defendHoldEffectNode)) {
            this.defendHoldEffectNode.destroy();
        }

        this.defendHoldEffectNode = null;
        this.defendHoldEffectSprite = null;
    }

    private startSkill2() {
        if (this.isBusy() || this.skill2Frames.length === 0) {
            return;
        }

        if (!this.tryUseCooldown("skill2")) {
            return;
        }

        this.isCastingSkill2 = true;
        this.skill2FrameTimer = 0;
        this.skill2FrameIndex = 0;
        this.lockController(false, false, false);
        this.sprite.spriteFrame = this.skill2Frames[0];
    }

    private updateSkill2Animation(dt: number) {
        if (this.skill2Frames.length === 0) {
            this.finishSkill2();
            return;
        }

        this.skill2FrameTimer += dt;
        if (this.skill2FrameTimer < this.skill2FrameInterval) {
            return;
        }

        this.skill2FrameTimer = 0;
        this.skill2FrameIndex++;

        if (this.skill2FrameIndex >= this.skill2Frames.length) {
            this.spawnFireball();
            this.finishSkill2();
            return;
        }

        this.sprite.spriteFrame = this.skill2Frames[this.skill2FrameIndex];
    }

    private finishSkill2() {
        this.isCastingSkill2 = false;
        this.skill2FrameIndex = 0;
        this.unlockController();
    }

    private startSkill3() {
        if (this.isBusy() || this.skill2Frames.length === 0) {
            return;
        }

        if (!this.tryUseCooldown("super")) {
            return;
        }

        this.isCastingSkill3 = true;
        this.skill3Charging = true;
        this.skill2FrameTimer = 0;
        this.skill2FrameIndex = 0;
        this.skill3ChargeTimer = 0;
        this.skill3ChargeEffectTimer = 0;
        this.skill3ChargeEffectIndex = 0;
        this.skill3ChargeEffectFinished = false;
        this.skill3ChargeEffectEndTimer = 0;
        this.skill3ChargeSwirlAngle = 0;
        this.lockController(true, true, true);
        this.ensureSkill3ChargeSwirl();
        this.ensureSkill3ChargeEffect();
        this.sprite.spriteFrame = this.skill3ChargeFrame || this.skill2Frames[0];
    }

    private updateSkill3Animation(dt: number) {
        if (this.skill2Frames.length === 0) {
            this.cancelSkill3();
            return;
        }

        if (this.skill3Charging) {
            this.updateSkill3Charge(dt);
            return;
        }

        if (this.skill3Flashing) {
            this.updateSkill3Flash(dt);
            return;
        }

        this.skill2FrameTimer += dt;
        if (this.skill2FrameTimer < this.skill3ThrowFrameInterval) {
            return;
        }

        this.skill2FrameTimer = 0;
        this.skill2FrameIndex++;

        if (this.skill2FrameIndex >= this.skill2Frames.length) {
            this.isCastingSkill3 = false;
            this.skill2FrameIndex = 0;
            this.spawnDragonfire();
            this.skill3Recovering = true;
            this.skill3RecoveryTimer = 0;
            return;
        }

        this.sprite.spriteFrame = this.skill2Frames[this.skill2FrameIndex];
    }

    private cancelSkill3() {
        this.isCastingSkill3 = false;
        this.skill3Charging = false;
        this.skill3Flashing = false;
        this.clearSkill3ChargeSwirl();
        this.clearSkill3ChargeEffect();
        this.unlockController();
    }

    private updateSkill3Charge(dt: number) {
        this.skill3ChargeTimer += dt;
        this.updateSkill3ChargeSwirl(dt);
        this.updateSkill3ChargeEffect(dt);
        this.sprite.spriteFrame = this.skill3ChargeFrame || this.skill2Frames[0];

        if (this.skill3ChargeTimer < this.skill3ChargeDelay) {
            return;
        }

        this.clearSkill3ChargeSwirl();
        this.clearSkill3ChargeEffect();
        this.skill3Charging = false;
        this.skill2FrameIndex = 0;
        this.skill2FrameTimer = 0;
        this.skill3ChargeTimer = 0;
        this.skill3Flashing = true;
        this.skill3FlashTimer = 0;
        this.showSkill3Flash();
    }

    private ensureSkill3ChargeSwirl() {
        if (!this.skill3ChargeSwirlFrame || this.skill3ChargeSwirlNode || !this.node.parent) {
            return;
        }

        this.skill3ChargeSwirlNode = new cc.Node("Skill3ChargeSwirl");
        this.skill3ChargeSwirlNode.parent = this.node.parent;
        this.skill3ChargeSwirlNode.zIndex = 997;
        this.skill3ChargeSwirlSprite = this.skill3ChargeSwirlNode.addComponent(cc.Sprite);
        this.skill3ChargeSwirlSprite.sizeMode = cc.Sprite.SizeMode.RAW;
        this.skill3ChargeSwirlSprite.spriteFrame = this.skill3ChargeSwirlFrame;
        this.skill3ChargeSwirlNode.opacity = 170;
        this.syncSkill3ChargeSwirlTransform();
    }

    private updateSkill3ChargeSwirl(dt: number) {
        if (!this.skill3ChargeSwirlNode) {
            return;
        }

        this.skill3ChargeSwirlAngle += dt * 180;
        this.syncSkill3ChargeSwirlTransform();
    }

    private syncSkill3ChargeSwirlTransform() {
        if (!this.skill3ChargeSwirlNode) {
            return;
        }

        const facing = this.getFacingDirection();
        this.skill3ChargeSwirlNode.setPosition(this.node.x + (facing * -28), this.node.y - 16);
        this.skill3ChargeSwirlNode.scaleX = facing * 0.75;
        this.skill3ChargeSwirlNode.scaleY = 0.75;
        this.skill3ChargeSwirlNode.angle = -this.skill3ChargeSwirlAngle;
    }

    private clearSkill3ChargeSwirl() {
        if (this.skill3ChargeSwirlNode && cc.isValid(this.skill3ChargeSwirlNode)) {
            this.skill3ChargeSwirlNode.destroy();
        }

        this.skill3ChargeSwirlNode = null;
        this.skill3ChargeSwirlSprite = null;
        this.skill3ChargeSwirlAngle = 0;
    }

    private updateSkill3Flash(dt: number) {
        this.skill3FlashTimer += dt;
        this.sprite.spriteFrame = this.skill3ChargeFrame || this.skill2Frames[0];

        if (this.skill3FlashTimer < this.skill3FlashDuration) {
            return;
        }

        this.skill3Flashing = false;
        this.skill3FlashTimer = 0;
        this.skill2FrameIndex = 0;
        this.skill2FrameTimer = 0;
        this.sprite.spriteFrame = this.skill2Frames[0];
    }

    private ensureSkill3ChargeEffect() {
        if (this.skill3ChargeEffectFrames.length === 0 || this.skill3ChargeEffectNode || !this.node.parent) {
            return;
        }

        this.skill3ChargeEffectNode = new cc.Node("Skill3ChargeEffect");
        this.skill3ChargeEffectNode.parent = this.node.parent;
        this.skill3ChargeEffectNode.zIndex = 998;
        this.skill3ChargeEffectSprite = this.skill3ChargeEffectNode.addComponent(cc.Sprite);
        this.skill3ChargeEffectSprite.sizeMode = cc.Sprite.SizeMode.RAW;
        this.skill3ChargeEffectSprite.spriteFrame = this.skill3ChargeEffectFrames[0];
        this.skill3ChargeEffectNode.opacity = 180;
        this.syncSkill3ChargeEffectTransform();
    }

    private updateSkill3ChargeEffect(dt: number) {
        if (!this.skill3ChargeEffectNode || !this.skill3ChargeEffectSprite || this.skill3ChargeEffectFrames.length === 0) {
            return;
        }

        this.syncSkill3ChargeEffectTransform();

        if (!this.skill3ChargeEffectFinished) {
            this.skill3ChargeEffectTimer += dt;

            if (this.skill3ChargeEffectTimer >= this.skill3ChargeEffectFrameInterval) {
                this.skill3ChargeEffectTimer = 0;

                if (this.skill3ChargeEffectIndex < this.skill3ChargeEffectFrames.length - 1) {
                    this.skill3ChargeEffectIndex++;
                    this.skill3ChargeEffectSprite.spriteFrame = this.skill3ChargeEffectFrames[this.skill3ChargeEffectIndex];
                } else {
                    this.skill3ChargeEffectFinished = true;
                    this.skill3ChargeEffectEndTimer = 0;
                }
            }
            return;
        }

        this.skill3ChargeEffectEndTimer += dt;
        if (this.skill3ChargeEffectEndTimer >= this.skill3ChargeEffectFrameInterval) {
            this.clearSkill3ChargeEffect();
        }
    }

    private syncSkill3ChargeEffectTransform() {
        if (!this.skill3ChargeEffectNode) {
            return;
        }

        const facing = this.getFacingDirection();
        const offsetX = facing * -28;
        const offsetY = -16;
        const baseScale = this.skill3ChargeEffectIndex === 1 ? 0.42 : 0.6;
        const interval = Math.max(0.001, this.skill3ChargeEffectFrameInterval);
        const normalizedTime = this.skill3ChargeEffectTimer / interval;
        const flashPhase = (Math.sin(normalizedTime * Math.PI * 4) + 1) * 0.5;
        const opacity = 80 + Math.floor(flashPhase * 140);

        this.skill3ChargeEffectNode.setPosition(this.node.x + offsetX, this.node.y + offsetY);
        this.skill3ChargeEffectNode.scaleX = facing * baseScale;
        this.skill3ChargeEffectNode.scaleY = baseScale;
        this.skill3ChargeEffectNode.opacity = Math.max(40, opacity);
    }

    private clearSkill3ChargeEffect() {
        if (this.skill3ChargeEffectNode && cc.isValid(this.skill3ChargeEffectNode)) {
            this.skill3ChargeEffectNode.destroy();
        }

        this.skill3ChargeEffectNode = null;
        this.skill3ChargeEffectSprite = null;
        this.skill3ChargeEffectTimer = 0;
        this.skill3ChargeEffectIndex = 0;
        this.skill3ChargeEffectFinished = false;
        this.skill3ChargeEffectEndTimer = 0;
    }

    private showSkill3Flash() {
        if (!this.skill3FlashFrame || !this.node.parent) {
            return;
        }

        const facingRight = this.getFacingRight();
        const flashNode = new cc.Node("Skill3Flash");
        flashNode.parent = this.node.parent;
        flashNode.setPosition(this.node.x + (facingRight ? -28 : 28), this.node.y - 16);
        flashNode.zIndex = 999;

        const flashSprite = flashNode.addComponent(cc.Sprite);
        flashSprite.spriteFrame = this.skill3FlashFrame;
        flashSprite.sizeMode = cc.Sprite.SizeMode.RAW;

        flashNode.scaleX = facingRight ? 2.7 : -2.7;
        flashNode.scaleY = 2.7;
        flashNode.opacity = 220;

        cc.tween(flashNode)
            .to(this.skill3FlashDuration, { opacity: 0 })
            .call(() => {
                if (cc.isValid(flashNode)) {
                    flashNode.destroy();
                }
            })
            .start();
    }

    private spawnFireball() {
        if (!this.fireballPrefab || !this.node.parent) {
            return;
        }

        const facing = this.getFacingDirection();
        const fireballNode = cc.instantiate(this.fireballPrefab);
        fireballNode.parent = this.node.parent;
        fireballNode.setPosition(this.node.x + (facing * 70), this.node.y + 10);

        const fireball = fireballNode.getComponent(Fireball);
        if (!fireball) {
            cc.warn("[Firehero] fireballPrefab is missing the Fireball component.");
            fireballNode.destroy();
            return;
        }

        fireball.launch(facing);
    }

    private spawnDragonfire() {
        if (this.dragonfireFrames.length === 0 || !this.node.parent) {
            return;
        }

        const facing = this.getFacingDirection();
        const dragonfireNode = new cc.Node("Dragonfire");
        dragonfireNode.parent = this.node.parent;
        dragonfireNode.setPosition(this.node.x + (facing * 90), this.node.y + 10);

        const dragonfireSprite = dragonfireNode.addComponent(cc.Sprite);
        dragonfireSprite.spriteFrame = this.dragonfireFrames[0];
        dragonfireSprite.sizeMode = cc.Sprite.SizeMode.RAW;

        const dragonfireState: FireballState = {
            node: dragonfireNode,
            sprite: dragonfireSprite,
            direction: facing,
            frameTimer: 0,
            frameIndex: 0,
            lifeTimer: 0,
            frames: this.dragonfireFrames,
            frameInterval: this.dragonfireFrameInterval,
            speed: this.dragonfireSpeed,
            lifetime: this.dragonfireLifetime,
            loopStartIndex: 8,
            loopEndIndex: 10,
            finalFrameIndex: 11,
            finalFrameHoldDuration: this.dragonfireFinalFrameHoldDuration,
            enlargedFrameStartIndex: 8,
            scaleMultiplier: this.dragonfireScaleMultiplier,
            frameScaleFactors: this.buildFrameScaleFactors(this.dragonfireFrames),
            baseFrameScale: 1,
            currentSpeed: this.dragonfireStartupSpeed,
            startupSpeed: this.dragonfireStartupSpeed,
            accelerationDuration: this.dragonfireAccelerationDuration,
            accelerationElapsed: 0,
        };

        this.activeFireballs.push(dragonfireState);
        this.applyFireballFrameTransform(dragonfireState);
        this.startShake(this.dragonfireShakeDuration, this.dragonfireShakeStrength);
    }

    private updateFireballs(dt: number) {
        for (let i = this.activeFireballs.length - 1; i >= 0; i--) {
            const fireball = this.activeFireballs[i];

            if (!cc.isValid(fireball.node)) {
                this.activeFireballs.splice(i, 1);
                continue;
            }

            fireball.lifeTimer += dt;
            fireball.frameTimer += dt;

            if (fireball.accelerationDuration <= 0) {
                fireball.currentSpeed = fireball.speed;
            } else {
                fireball.accelerationElapsed = Math.min(
                    fireball.accelerationElapsed + dt,
                    fireball.accelerationDuration
                );
                const t = fireball.accelerationElapsed / fireball.accelerationDuration;
                fireball.currentSpeed = fireball.startupSpeed + ((fireball.speed - fireball.startupSpeed) * t);
            }

            fireball.node.x += fireball.direction * fireball.currentSpeed * dt;

            const shouldShowFinalFrame =
                fireball.finalFrameIndex >= 0 &&
                (fireball.lifetime - fireball.lifeTimer) <= fireball.finalFrameHoldDuration;

            if (shouldShowFinalFrame) {
                if (fireball.frameIndex !== fireball.finalFrameIndex) {
                    fireball.frameIndex = fireball.finalFrameIndex;
                    fireball.sprite.spriteFrame = fireball.frames[fireball.frameIndex];
                    this.applyFireballFrameTransform(fireball);
                }
            } else if (fireball.frames.length > 0 && fireball.frameTimer >= fireball.frameInterval) {
                fireball.frameTimer = 0;

                if (fireball.frameIndex < fireball.loopStartIndex) {
                    fireball.frameIndex++;
                } else if (fireball.frameIndex < fireball.loopEndIndex) {
                    fireball.frameIndex++;
                } else if (fireball.frames.length > 1) {
                    fireball.frameIndex = fireball.loopStartIndex;
                }

                fireball.sprite.spriteFrame = fireball.frames[fireball.frameIndex];
                this.applyFireballFrameTransform(fireball);
            }

            if (fireball.lifeTimer >= fireball.lifetime) {
                fireball.node.destroy();
                this.activeFireballs.splice(i, 1);
            }
        }
    }

    private applyFireballFrameTransform(fireball: FireballState) {
        const frameScaleFactor = fireball.frameScaleFactors[fireball.frameIndex] || 1;
        const sourceHeight = 104 / frameScaleFactor;
        let targetHeight = this.dragonfireLoopTargetHeight;

        if (fireball.frameIndex < fireball.enlargedFrameStartIndex) {
            const growthT = fireball.enlargedFrameStartIndex <= 0
                ? 1
                : fireball.frameIndex / fireball.enlargedFrameStartIndex;
            targetHeight = this.dragonfireTargetHeight + ((this.dragonfireLoopTargetHeight - this.dragonfireTargetHeight) * growthT);
        }

        const scale = targetHeight / sourceHeight;
        fireball.node.scaleX = fireball.direction * scale;
        fireball.node.scaleY = scale;
    }

    private buildFrameScaleFactors(frames: cc.SpriteFrame[]) {
        if (frames.length === 0) {
            return [];
        }

        const originalSizes = frames.map((frame) => frame.getOriginalSize());
        const maxWidth = Math.max(...originalSizes.map((size) => size.width));
        const maxHeight = Math.max(...originalSizes.map((size) => size.height));

        return originalSizes.map((size) => {
            const width = Math.max(1, size.width);
            const height = Math.max(1, size.height);
            return Math.max(maxWidth / width, maxHeight / height);
        });
    }

    private resolveShakeTarget() {
        if (this.shakeTarget && cc.isValid(this.shakeTarget)) {
            this.shakingNode = this.shakeTarget;
        } else {
            const mainCameraNode = cc.find("Canvas/Main Camera") || cc.find("Main Camera");
            if (mainCameraNode) {
                this.shakingNode = mainCameraNode;
            } else {
                const camera = cc.director.getScene().getComponentInChildren(cc.Camera);
                this.shakingNode = camera ? camera.node : null;
            }
        }

        if (this.shakingNode) {
            this.shakeOrigin = this.shakingNode.position.clone();
        }
    }

    private startShake(duration: number, strength: number) {
        if (!this.shakingNode) {
            this.resolveShakeTarget();
        }

        if (!this.shakingNode) {
            return;
        }

        this.shakeOrigin = this.shakingNode.position.clone();
        this.shakeDuration = duration;
        this.shakeStrength = strength;
        this.shakeTimer = duration;
    }

    private updateShake(dt: number) {
        if (!this.shakingNode) {
            return;
        }

        let strength = 0;

        if (this.shakeTimer > 0) {
            this.shakeTimer = Math.max(0, this.shakeTimer - dt);
            const progress = this.shakeDuration > 0 ? this.shakeTimer / this.shakeDuration : 0;
            strength = Math.max(strength, this.shakeStrength * progress);
        }

        if (strength <= 0) {
            this.shakingNode.setPosition(this.shakeOrigin.x, this.shakeOrigin.y);
            return;
        }

        const offsetX = (Math.random() * 2 - 1) * strength;
        const offsetY = (Math.random() * 2 - 1) * strength;
        this.shakingNode.setPosition(this.shakeOrigin.x + offsetX, this.shakeOrigin.y + offsetY);
    }

    private updateSkill3Recovery(dt: number) {
        if (!this.skill3Recovering) {
            return;
        }

        this.skill3RecoveryTimer += dt;
        if (this.skill3RecoveryTimer < this.skill3RecoveryDelay) {
            return;
        }

        this.skill3Recovering = false;
        this.skill3RecoveryTimer = 0;
        this.unlockController();
    }

    private lockController(lockMovement: boolean, clearMovement: boolean, lockFacing: boolean) {
        if (!this.controller) {
            return;
        }

        if (clearMovement) {
            this.controller.clearMovementInput();
        }

        this.controller.setMovementLocked(lockMovement);
        this.controller.setAnimationLocked(true);
        this.controller.setDirectionInputLocked(lockFacing);
        if (lockFacing) {
            this.controller.lockFacing();
        }
    }

    private unlockController() {
        if (!this.controller) {
            return;
        }

        this.controller.setMovementLocked(false);
        this.controller.setAnimationLocked(false);
        this.controller.setDirectionInputLocked(false);
        this.controller.unlockFacing();
        this.controller.refreshVisual();
    }

    private isBusy() {
        return this.isAttacking || this.isDefending || this.isCastingSkill2 || this.isCastingSkill3 || this.skill3Recovering;
    }

    private getFacingDirection() {
        return this.controller ? this.controller.getFacingDirection() : 1;
    }

    private getFacingRight() {
        return this.controller ? this.controller.isFacingRight() : true;
    }

    private tryUseCooldown(slot: "attack" | "skill2" | "defend" | "super") {
        return this.controller ? this.controller.tryUseSkillCooldown(slot) : true;
    }
}
