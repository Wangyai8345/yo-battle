import PlayerController from "./PlayerController";

const { ccclass, property } = cc._decorator;

type ActionState = {
    name: string;
    frames: cc.SpriteFrame[];
    frameInterval: number;
    finalHoldDuration: number;
    lockFacing: boolean;
    holdFrameIndex: number;
    resumeFrameIndex: number;
    holdingBeforeResume: boolean;
    finishOnLastFrame: boolean;
    loopStartIndex: number;
    loopEndIndex: number;
    loopDuration: number;
    loopElapsedTime: number;
    loopingBeforeResume: boolean;
    pauseFrameIndex: number;
    pauseDuration: number;
    pauseElapsedTime: number;
    pauseTriggered: boolean;
    shakeTriggered: boolean;
};

type ProjectileState = {
    node: cc.Node;
    direction: number;
    speed: number;
    lifetime: number;
    lifeTimer: number;
};

@ccclass
export default class Arrowhero extends cc.Component {
    @property([cc.SpriteFrame])
    meleeAttackFrames: cc.SpriteFrame[] = [];

    @property
    meleeAttackFrameInterval: number = 0.08;

    @property([cc.SpriteFrame])
    rangedAttackFrames: cc.SpriteFrame[] = [];

    @property
    rangedAttackFrameInterval: number = 0.08;

    @property({ type: cc.SpriteFrame })
    rangedAttackProjectileFrame: cc.SpriteFrame = null;

    @property
    rangedAttackProjectileSpeed: number = 700;

    @property
    rangedAttackProjectileLifetime: number = 1.5;

    @property([cc.SpriteFrame])
    defendFrames: cc.SpriteFrame[] = [];

    @property
    defendFrameInterval: number = 0.1;

    @property
    defendFinalHoldDuration: number = 0.2;

    @property
    defendHoldFrameIndex: number = 12;

    @property
    defendResumeFrameIndex: number = 14;

    @property([cc.SpriteFrame])
    superAttackFrames: cc.SpriteFrame[] = [];

    @property
    superAttackFrameInterval: number = 0.1;

    @property
    superAttackLoopStartIndex: number = 4;

    @property
    superAttackLoopEndIndex: number = 5;

    @property
    superAttackLoopDuration: number = 0.3;

    @property
    superAttackPauseFrameIndex: number = 9;

    @property
    superAttackPauseDuration: number = 0;

    @property({ type: cc.Node })
    shakeTarget: cc.Node = null;

    @property
    superAttackShakeDuration: number = 0.2;

    @property
    superAttackShakeStrength: number = 12;

    @property({ type: cc.SpriteFrame })
    superAttackEffectFrame1: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    superAttackEffectFrame2: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    superAttackEffectFrame3: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    superAttackEffectFrame4: cc.SpriteFrame = null;

    private controller: PlayerController = null;
    private sprite: cc.Sprite = null;
    private superAttackEffectNode: cc.Node = null;
    private superAttackEffectSprite: cc.Sprite = null;
    private currentAction: ActionState = null;
    private currentFrameIndex: number = 0;
    private currentFrameTimer: number = 0;
    private currentHoldTimer: number = 0;
    private resolvedMeleeAttackFrames: cc.SpriteFrame[] = [];
    private resolvedRangedAttackFrames: cc.SpriteFrame[] = [];
    private resolvedDefendFrames: cc.SpriteFrame[] = [];
    private resolvedSuperAttackFrames: cc.SpriteFrame[] = [];
    private resolvedSuperAttackEffectFrames: cc.SpriteFrame[] = [];
    private shakingNode: cc.Node = null;
    private shakeOrigin: cc.Vec3 = null;
    private shakeTimer: number = 0;
    private shakeDuration: number = 0;
    private shakeStrength: number = 0;
    private activeProjectiles: ProjectileState[] = [];

    onLoad() {
        this.controller = this.getComponent(PlayerController);
        this.sprite = this.getComponent(cc.Sprite);
        this.resolveShakeTarget();
        this.resolvedMeleeAttackFrames = this.meleeAttackFrames.filter((frame): frame is cc.SpriteFrame => !!frame);
        this.resolvedRangedAttackFrames = this.rangedAttackFrames.filter((frame): frame is cc.SpriteFrame => !!frame);
        this.resolvedDefendFrames = this.defendFrames.filter((frame): frame is cc.SpriteFrame => !!frame);
        this.resolvedSuperAttackFrames = this.superAttackFrames.filter((frame): frame is cc.SpriteFrame => !!frame);
        this.resolvedSuperAttackEffectFrames = [
            this.superAttackEffectFrame1,
            this.superAttackEffectFrame2,
            this.superAttackEffectFrame3,
            this.superAttackEffectFrame4,
        ].filter((frame): frame is cc.SpriteFrame => !!frame);

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.clearSuperAttackEffect();
        this.clearProjectiles();
    }

    update(dt: number) {
        this.updateShake(dt);
        this.updateProjectiles(dt);

        if (!this.currentAction || !this.sprite) {
            this.hideSuperAttackEffect();
            return;
        }

        this.syncSuperAttackEffect();
        this.tryStartSuperAttackShake();

        const isFinalFrame = this.currentFrameIndex >= this.currentAction.frames.length - 1;
        const isHoldingBeforeResume =
            this.currentAction.holdingBeforeResume &&
            this.currentFrameIndex === this.currentAction.holdFrameIndex;
        const isLoopingBeforeResume =
            this.currentAction.loopingBeforeResume &&
            this.currentFrameIndex >= this.currentAction.loopStartIndex &&
            this.currentFrameIndex <= this.currentAction.loopEndIndex;
        const isPausedAtFrame =
            !this.currentAction.pauseTriggered &&
            this.currentAction.pauseDuration > 0 &&
            this.currentAction.pauseFrameIndex >= 0 &&
            this.currentFrameIndex === this.currentAction.pauseFrameIndex;

        if (isHoldingBeforeResume) {
            this.sprite.spriteFrame = this.currentAction.frames[this.currentAction.holdFrameIndex];
            this.currentHoldTimer += dt;
            if (this.currentHoldTimer >= this.currentAction.finalHoldDuration) {
                this.currentAction.holdingBeforeResume = false;
                this.currentAction.finalHoldDuration = 0;
                this.currentFrameIndex = Math.min(
                    this.currentAction.resumeFrameIndex,
                    this.currentAction.frames.length - 1
                );
                this.currentFrameTimer = 0;
                this.currentHoldTimer = 0;
                this.sprite.spriteFrame = this.currentAction.frames[this.currentFrameIndex];
            }
            return;
        }

        if (isLoopingBeforeResume) {
            this.currentAction.loopElapsedTime += dt;

            if (this.currentAction.loopElapsedTime >= this.currentAction.loopDuration) {
                this.currentAction.loopingBeforeResume = false;
                this.currentFrameIndex = Math.min(
                    this.currentAction.loopEndIndex + 1,
                    this.currentAction.frames.length - 1
                );
                this.currentFrameTimer = 0;
                this.sprite.spriteFrame = this.currentAction.frames[this.currentFrameIndex];
                return;
            }

            this.currentFrameTimer += dt;
            if (this.currentFrameTimer < this.currentAction.frameInterval) {
                return;
            }

            this.currentFrameTimer = 0;
            if (this.currentFrameIndex >= this.currentAction.loopEndIndex) {
                this.currentFrameIndex = this.currentAction.loopStartIndex;
            } else {
                this.currentFrameIndex++;
            }
            this.sprite.spriteFrame = this.currentAction.frames[this.currentFrameIndex];
            return;
        }

        if (isPausedAtFrame) {
            this.sprite.spriteFrame = this.currentAction.frames[this.currentAction.pauseFrameIndex];
            this.currentAction.pauseElapsedTime += dt;
            if (this.currentAction.pauseElapsedTime >= this.currentAction.pauseDuration) {
                this.currentAction.pauseTriggered = true;
                this.currentAction.pauseElapsedTime = 0;
                this.currentFrameTimer = 0;
            }
            return;
        }

        if (isFinalFrame && this.currentAction.finishOnLastFrame) {
            this.finishAction();
            return;
        }

        if (isFinalFrame && this.currentAction.finalHoldDuration > 0) {
            this.sprite.spriteFrame = this.currentAction.frames[this.currentAction.frames.length - 1];
            this.currentHoldTimer += dt;
            if (this.currentHoldTimer >= this.currentAction.finalHoldDuration) {
                this.finishAction();
            }
            return;
        }

        this.currentFrameTimer += dt;
        if (this.currentFrameTimer < this.currentAction.frameInterval) {
            return;
        }

        this.currentFrameTimer = 0;
        this.currentFrameIndex++;

        if (this.currentFrameIndex >= this.currentAction.frames.length) {
            this.finishAction();
            return;
        }

        this.sprite.spriteFrame = this.currentAction.frames[this.currentFrameIndex];
    }

    onKeyDown(event: cc.Event.EventKeyboard) {
        if (this.currentAction) {
            return;
        }

        if (event.keyCode === cc.macro.KEY.e) {
            if (!this.tryUseCooldown("attack")) {
                return;
            }
            this.startAction(
                "melee",
                this.resolvedMeleeAttackFrames,
                this.meleeAttackFrameInterval,
                0,
                false,
                -1,
                -1,
                -1,
                -1,
                0,
                -1,
                0,
                false,
                false
            );
            return;
        }

        if (event.keyCode === cc.macro.KEY.r) {
            if (!this.tryUseCooldown("skill2")) {
                return;
            }
            this.startAction(
                "ranged",
                this.resolvedRangedAttackFrames,
                this.rangedAttackFrameInterval,
                0,
                false,
                -1,
                -1,
                -1,
                -1,
                0,
                -1,
                0,
                false,
                false
            );
            return;
        }

        if (event.keyCode === cc.macro.KEY.f) {
            if (!this.tryUseCooldown("defend")) {
                return;
            }
            this.startAction(
                "defend",
                this.resolvedDefendFrames,
                this.defendFrameInterval,
                this.defendFinalHoldDuration,
                true,
                this.defendHoldFrameIndex,
                this.defendResumeFrameIndex
            );
            return;
        }

        if (event.keyCode === cc.macro.KEY.q) {
            if (!this.tryUseCooldown("super")) {
                return;
            }
            this.startAction(
                "super",
                this.resolvedSuperAttackFrames,
                this.superAttackFrameInterval,
                0,
                true,
                -1,
                -1,
                this.superAttackLoopStartIndex,
                this.superAttackLoopEndIndex,
                this.superAttackLoopDuration,
                this.superAttackPauseFrameIndex,
                this.superAttackPauseDuration
            );
        }
    }

    private startAction(
        actionName: string,
        frames: cc.SpriteFrame[],
        frameInterval: number,
        finalHoldDuration: number = 0,
        lockFacing: boolean = false,
        holdFrameIndex: number = -1,
        resumeFrameIndex: number = -1,
        loopStartIndex: number = -1,
        loopEndIndex: number = -1,
        loopDuration: number = 0,
        pauseFrameIndex: number = -1,
        pauseDuration: number = 0,
        lockMovement: boolean = true,
        clearMovement: boolean = true
    ) {
        if (frames.length === 0 || !this.sprite) {
            return;
        }

        const clampedHoldFrameIndex = holdFrameIndex >= 0
            ? cc.misc.clampf(holdFrameIndex, 0, frames.length - 1)
            : -1;
        const clampedResumeFrameIndex = resumeFrameIndex >= 0
            ? cc.misc.clampf(resumeFrameIndex, 0, frames.length - 1)
            : -1;
        const shouldHoldBeforeResume =
            clampedHoldFrameIndex >= 0 &&
            clampedResumeFrameIndex > clampedHoldFrameIndex &&
            clampedResumeFrameIndex < frames.length;
        const clampedLoopStartIndex = loopStartIndex >= 0
            ? cc.misc.clampf(loopStartIndex, 0, frames.length - 1)
            : -1;
        const clampedLoopEndIndex = loopEndIndex >= 0
            ? cc.misc.clampf(loopEndIndex, 0, frames.length - 1)
            : -1;
        const shouldLoopBeforeResume =
            clampedLoopStartIndex >= 0 &&
            clampedLoopEndIndex > clampedLoopStartIndex &&
            clampedLoopEndIndex < frames.length &&
            loopDuration > 0;
        const clampedPauseFrameIndex = pauseFrameIndex >= 0
            ? cc.misc.clampf(pauseFrameIndex, 0, frames.length - 1)
            : -1;

        this.currentAction = {
            name: actionName,
            frames,
            frameInterval: Math.max(0.001, frameInterval),
            finalHoldDuration: Math.max(0, finalHoldDuration),
            lockFacing,
            holdFrameIndex: clampedHoldFrameIndex,
            resumeFrameIndex: clampedResumeFrameIndex,
            holdingBeforeResume: shouldHoldBeforeResume,
            finishOnLastFrame: shouldHoldBeforeResume,
            loopStartIndex: clampedLoopStartIndex,
            loopEndIndex: clampedLoopEndIndex,
            loopDuration: Math.max(0, loopDuration),
            loopElapsedTime: 0,
            loopingBeforeResume: shouldLoopBeforeResume,
            pauseFrameIndex: clampedPauseFrameIndex,
            pauseDuration: Math.max(0, pauseDuration),
            pauseElapsedTime: 0,
            pauseTriggered: false,
            shakeTriggered: false,
        };
        this.currentFrameIndex = 0;
        this.currentFrameTimer = 0;
        this.currentHoldTimer = 0;
        this.lockController(lockMovement, clearMovement, lockFacing);
        this.sprite.spriteFrame = frames[0];
    }

    private finishAction() {
        const finishedActionName = this.currentAction ? this.currentAction.name : "";
        this.hideSuperAttackEffect();
        this.currentAction = null;
        this.currentFrameIndex = 0;
        this.currentFrameTimer = 0;
        this.currentHoldTimer = 0;
        if (finishedActionName === "ranged") {
            this.spawnRangedProjectile();
        }
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

    private syncSuperAttackEffect() {
        if (!this.currentAction || this.currentAction.name !== "super") {
            this.hideSuperAttackEffect();
            return;
        }

        if (
            this.currentFrameIndex < this.superAttackPauseFrameIndex ||
            this.currentFrameIndex > 13 ||
            this.resolvedSuperAttackEffectFrames.length === 0
        ) {
            this.hideSuperAttackEffect();
            return;
        }

        this.ensureSuperAttackEffect();
        if (!this.superAttackEffectNode || !this.superAttackEffectSprite) {
            return;
        }

        const localIndex = Math.min(
            this.resolvedSuperAttackEffectFrames.length - 1,
            Math.max(0, this.currentFrameIndex - this.superAttackPauseFrameIndex)
        );

        const effectFrame = this.resolvedSuperAttackEffectFrames[localIndex];
        this.superAttackEffectSprite.spriteFrame = effectFrame;
        this.syncSuperAttackEffectSize(effectFrame);
        this.superAttackEffectNode.active = true;
        this.superAttackEffectNode.setPosition(600, 40);
    }

    private ensureSuperAttackEffect() {
        if (this.superAttackEffectNode && cc.isValid(this.superAttackEffectNode)) {
            return;
        }

        this.superAttackEffectNode = new cc.Node("SuperAttackEffect");
        this.superAttackEffectNode.parent = this.node;
        this.superAttackEffectNode.zIndex = 10;
        this.superAttackEffectNode.setAnchorPoint(0.5, 0.5);
        this.superAttackEffectNode.setScale(5, 5);
        this.superAttackEffectSprite = this.superAttackEffectNode.addComponent(cc.Sprite);
        this.superAttackEffectSprite.sizeMode = cc.Sprite.SizeMode.TRIMMED;
    }

    private syncSuperAttackEffectSize(frame: cc.SpriteFrame) {
        if (!this.superAttackEffectNode || !frame) {
            return;
        }

        const rect = frame.getRect();
        this.superAttackEffectNode.setContentSize(rect.width, rect.height);
    }

    private tryStartSuperAttackShake() {
        if (
            !this.currentAction ||
            this.currentAction.name !== "super" ||
            this.currentAction.shakeTriggered ||
            this.currentAction.pauseFrameIndex < 0 ||
            this.currentFrameIndex < this.currentAction.pauseFrameIndex
        ) {
            return;
        }

        this.currentAction.shakeTriggered = true;
        this.startShake(this.superAttackShakeDuration, this.superAttackShakeStrength);
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

    private spawnRangedProjectile() {
        if (!this.rangedAttackProjectileFrame || !this.node.parent) {
            return;
        }

        const direction = this.controller ? this.controller.getFacingDirection() : 1;
        const projectileNode = new cc.Node("RangedAttackProjectile");
        projectileNode.parent = this.node.parent;
        projectileNode.setPosition(this.node.x + (direction * 56), this.node.y + 10);
        const projectileSprite = projectileNode.addComponent(cc.Sprite);
        projectileSprite.spriteFrame = this.rangedAttackProjectileFrame;
        projectileSprite.sizeMode = cc.Sprite.SizeMode.TRIMMED;
        projectileNode.scaleX = direction >= 0 ? 3 : -3;
        projectileNode.scaleY = 6;

        this.activeProjectiles.push({
            node: projectileNode,
            direction,
            speed: this.rangedAttackProjectileSpeed,
            lifetime: this.rangedAttackProjectileLifetime,
            lifeTimer: 0,
        });
    }

    private updateProjectiles(dt: number) {
        for (let i = this.activeProjectiles.length - 1; i >= 0; i--) {
            const projectile = this.activeProjectiles[i];

            if (!cc.isValid(projectile.node)) {
                this.activeProjectiles.splice(i, 1);
                continue;
            }

            projectile.lifeTimer += dt;
            projectile.node.x += projectile.direction * projectile.speed * dt;

            if (projectile.lifeTimer >= projectile.lifetime) {
                projectile.node.destroy();
                this.activeProjectiles.splice(i, 1);
            }
        }
    }

    private clearProjectiles() {
        for (const projectile of this.activeProjectiles) {
            if (projectile.node && cc.isValid(projectile.node)) {
                projectile.node.destroy();
            }
        }

        this.activeProjectiles = [];
    }

    private hideSuperAttackEffect() {
        if (this.superAttackEffectNode && cc.isValid(this.superAttackEffectNode)) {
            this.superAttackEffectNode.active = false;
        }
    }

    private clearSuperAttackEffect() {
        if (this.superAttackEffectNode && cc.isValid(this.superAttackEffectNode)) {
            this.superAttackEffectNode.destroy();
        }

        this.superAttackEffectNode = null;
        this.superAttackEffectSprite = null;
    }

    private tryUseCooldown(slot: "attack" | "skill2" | "defend" | "super") {
        return this.controller ? this.controller.tryUseSkillCooldown(slot) : true;
    }
}
