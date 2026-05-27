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
};

@ccclass
export default class Windhero extends cc.Component {
    @property([cc.SpriteFrame])
    meleeAttackFrames: cc.SpriteFrame[] = [];

    @property
    meleeAttackFrameInterval: number = 0.08;

    @property([cc.SpriteFrame])
    rangedAttackFrames: cc.SpriteFrame[] = [];

    @property
    rangedAttackFrameInterval: number = 0.08;

    @property([cc.SpriteFrame])
    defendFrames: cc.SpriteFrame[] = [];

    @property
    defendFrameInterval: number = 0.1;

    @property
    defendFinalHoldDuration: number = 0.2;

    @property
    defendHoldFrameIndex: number = 3;

    @property
    defendResumeFrameIndex: number = 4;

    @property([cc.SpriteFrame])
    superAttackFrames: cc.SpriteFrame[] = [];

    @property({ type: cc.SpriteFrame })
    superAttackStartupFrame1: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    superAttackStartupFrame2: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    superAttackStartupFrame3: cc.SpriteFrame = null;

    @property
    superAttackStartupFrameInterval: number = 0.1;

    @property
    superAttackTeleportDelay: number = 2;

    @property
    superAttackForwardDistance: number = 600;

    @property
    superAttackFrameInterval: number = 0.1;

    @property
    superAttackFinalHoldDuration: number = 0;

    private controller: PlayerController = null;
    private rb: cc.RigidBody = null;
    private sprite: cc.Sprite = null;
    private currentAction: ActionState = null;
    private currentFrameIndex: number = 0;
    private currentFrameTimer: number = 0;
    private currentHoldTimer: number = 0;
    private resolvedMeleeAttackFrames: cc.SpriteFrame[] = [];
    private resolvedRangedAttackFrames: cc.SpriteFrame[] = [];
    private resolvedDefendFrames: cc.SpriteFrame[] = [];
    private resolvedSuperAttackFrames: cc.SpriteFrame[] = [];
    private resolvedSuperAttackStartupFrames: cc.SpriteFrame[] = [];
    private pendingSuperTeleport: boolean = false;
    private pendingSuperReturn: boolean = false;
    private superTeleportTimer: number = 0;
    private recordedSuperOrigin: cc.Vec3 = null;
    private recordedSuperFacing: number = 1;

    onLoad() {
        this.controller = this.getComponent(PlayerController);
        this.rb = this.getComponent(cc.RigidBody);
        this.sprite = this.getComponent(cc.Sprite);
        this.resolvedMeleeAttackFrames = this.meleeAttackFrames.filter((frame): frame is cc.SpriteFrame => !!frame);
        this.resolvedRangedAttackFrames = this.rangedAttackFrames.filter((frame): frame is cc.SpriteFrame => !!frame);
        this.resolvedDefendFrames = this.defendFrames.filter((frame): frame is cc.SpriteFrame => !!frame);
        this.resolvedSuperAttackStartupFrames = [
            this.superAttackStartupFrame1,
            this.superAttackStartupFrame2,
            this.superAttackStartupFrame3,
        ].filter((frame): frame is cc.SpriteFrame => !!frame);
        this.resolvedSuperAttackFrames = this.superAttackFrames.filter((frame): frame is cc.SpriteFrame => !!frame);

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    update(dt: number) {
        this.updatePendingSuperTeleport(dt);
        this.updatePendingSuperReturn(dt);

        if (!this.currentAction || !this.sprite) {
            return;
        }

        const isHoldingBeforeResume =
            this.currentAction.holdingBeforeResume &&
            this.currentFrameIndex === this.currentAction.holdFrameIndex;
        const isFinalFrame = this.currentFrameIndex >= this.currentAction.frames.length - 1;
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
        if (this.currentAction || this.pendingSuperTeleport || this.pendingSuperReturn) {
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
                true,
                true,
                this.defendHoldFrameIndex,
                this.defendResumeFrameIndex
            );
            return;
        }

        if (event.keyCode === cc.macro.KEY.q) {
            this.startSuperAttack();
        }
    }

    private startSuperAttack() {
        if (this.controller && !this.controller.isGrounded()) {
            return;
        }

        if (!this.tryUseCooldown("super")) {
            return;
        }

        this.recordSuperOrigin();

        if (this.resolvedSuperAttackStartupFrames.length > 0) {
            this.startAction(
                "super-startup",
                this.resolvedSuperAttackStartupFrames,
                this.superAttackStartupFrameInterval,
                0,
                true
            );
            return;
        }

        this.beginSuperTeleport();
    }

    private startMainSuperAttack() {
        this.startAction(
            "super",
            this.resolvedSuperAttackFrames,
            this.superAttackFrameInterval,
            this.superAttackFinalHoldDuration,
            true
        );
    }

    private startAction(
        actionName: string,
        frames: cc.SpriteFrame[],
        frameInterval: number,
        finalHoldDuration: number = 0,
        lockFacing: boolean = false,
        lockMovement: boolean = true,
        clearMovement: boolean = true,
        holdFrameIndex: number = -1,
        resumeFrameIndex: number = -1
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
        };
        this.currentFrameIndex = 0;
        this.currentFrameTimer = 0;
        this.currentHoldTimer = 0;
        this.lockController(lockMovement, clearMovement, lockFacing);
        this.sprite.spriteFrame = frames[0];
    }

    private finishAction() {
        const finishedActionName = this.currentAction ? this.currentAction.name : "";
        this.currentAction = null;
        this.currentFrameIndex = 0;
        this.currentFrameTimer = 0;
        this.currentHoldTimer = 0;

        if (finishedActionName === "super-startup") {
            this.beginSuperTeleport();
            return;
        }

        if (finishedActionName === "super") {
            this.restoreSuperOrigin();
            return;
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

    private recordSuperOrigin() {
        this.recordedSuperOrigin = this.node.position.clone();
        this.recordedSuperFacing = this.controller ? this.controller.getFacingDirection() : 1;
    }

    private beginSuperTeleport() {
        if (!this.recordedSuperOrigin) {
            this.recordSuperOrigin();
        }

        this.pendingSuperTeleport = true;
        this.superTeleportTimer = 0;
        this.node.opacity = 0;
    }

    private updatePendingSuperTeleport(dt: number) {
        if (!this.pendingSuperTeleport) {
            return;
        }

        this.superTeleportTimer += dt;
        if (this.superTeleportTimer < this.superAttackTeleportDelay) {
            return;
        }

        this.pendingSuperTeleport = false;
        this.superTeleportTimer = 0;
        this.node.opacity = 255;

        if (this.recordedSuperOrigin) {
            this.teleportTo(
                this.recordedSuperOrigin.x + (this.recordedSuperFacing * this.superAttackForwardDistance),
                this.recordedSuperOrigin.y,
                this.recordedSuperOrigin.z
            );
        }

        this.startMainSuperAttack();
    }

    private startSuperRecovery() {
        if (this.resolvedSuperAttackStartupFrames.length === 0) {
            this.unlockController();
            return;
        }

        this.startAction(
            "super-recovery",
            this.resolvedSuperAttackStartupFrames,
            this.superAttackStartupFrameInterval,
            0,
            true
        );
    }

    private updatePendingSuperReturn(dt: number) {
        if (!this.pendingSuperReturn) {
            return;
        }

        this.superTeleportTimer += dt;
        if (this.superTeleportTimer < this.superAttackTeleportDelay) {
            return;
        }

        this.pendingSuperReturn = false;
        this.superTeleportTimer = 0;
        this.node.opacity = 255;

        if (this.recordedSuperOrigin) {
            this.teleportTo(
                this.recordedSuperOrigin.x,
                this.recordedSuperOrigin.y,
                this.recordedSuperOrigin.z
            );
        }

        this.clearSuperOrigin();
        this.startSuperRecovery();
    }

    private restoreSuperOrigin() {
        this.pendingSuperReturn = true;
        this.superTeleportTimer = 0;
        this.node.opacity = 0;
    }

    private clearSuperOrigin() {
        this.pendingSuperTeleport = false;
        this.pendingSuperReturn = false;
        this.superTeleportTimer = 0;
        this.recordedSuperOrigin = null;
        this.recordedSuperFacing = 1;
        this.node.opacity = 255;
    }

    private teleportTo(x: number, y: number, z?: number) {
        this.node.setPosition(x, y, z === undefined ? this.node.z : z);

        if (!this.rb) {
            return;
        }

        this.rb.linearVelocity = cc.v2(0, 0);
        this.rb.angularVelocity = 0;
        this.rb.syncPosition(true);
        this.rb.awake = true;
    }

    private tryUseCooldown(slot: "attack" | "skill2" | "defend" | "super") {
        return this.controller ? this.controller.tryUseSkillCooldown(slot) : true;
    }
}
