import NetworkManager from "./NetworkManager";
import PlayerController from "./PlayerController";

const { ccclass, property } = cc._decorator;

type SkillSlot = "attack" | "skill2" | "defend" | "super";
type WindClipActionName =
    | "melee"
    | "ranged"
    | "defend"
    | "super-startup"
    | "super-attack"
    | "super-recovery";
type TimedPhaseName = "teleport-out";

type ControllerLockConfig = {
    lockMovement: boolean;
    clearMovement: boolean;
    lockFacing: boolean;
};

type WindClipActionConfig = {
    name: WindClipActionName;
    clip: cc.AnimationClip | null;
    lock: ControllerLockConfig;
};

type TimedPhaseState = {
    name: TimedPhaseName;
    delay: number;
    elapsed: number;
};

type TimedPhaseStepResult = {
    nextPhase: TimedPhaseState | null;
    completedPhaseName: TimedPhaseName | null;
};

type WindSuperModel = {
    originX: number;
    originY: number;
    originZ: number;
    facing: number;
    forwardDistance: number;
};

type WindTeleportTarget = {
    x: number;
    y: number;
    z: number;
};

function clampPositiveDuration(value: number): number {
    return Math.max(0, value);
}

function canStartWindAction(
    currentClipAction: WindClipActionName | null,
    pendingPhase: TimedPhaseState | null,
    isDead: boolean,
    isHit: boolean
): boolean {
    return !currentClipAction && !pendingPhase && !isDead && !isHit;
}

function createControllerLockConfig(
    lockMovement: boolean,
    clearMovement: boolean,
    lockFacing: boolean
): ControllerLockConfig {
    return {
        lockMovement,
        clearMovement,
        lockFacing,
    };
}

function createWindClipActionConfig(
    name: WindClipActionName,
    clip: cc.AnimationClip | null,
    lock: ControllerLockConfig
): WindClipActionConfig {
    return {
        name,
        clip,
        lock,
    };
}

function createTimedPhaseState(name: TimedPhaseName, delay: number): TimedPhaseState {
    return {
        name,
        delay: clampPositiveDuration(delay),
        elapsed: 0,
    };
}

function advanceTimedPhase(state: TimedPhaseState, dt: number): TimedPhaseStepResult {
    const next = {
        ...state,
        elapsed: state.elapsed + dt,
    };

    if (next.elapsed < next.delay) {
        return {
            nextPhase: next,
            completedPhaseName: null,
        };
    }

    return {
        nextPhase: null,
        completedPhaseName: next.name,
    };
}

function createWindSuperModel(
    position: cc.Vec3,
    facing: number,
    forwardDistance: number
): WindSuperModel {
    return {
        originX: position.x,
        originY: position.y,
        originZ: position.z,
        facing,
        forwardDistance,
    };
}

function createWindSuperForwardTarget(model: WindSuperModel): WindTeleportTarget {
    return {
        x: model.originX + (model.facing * model.forwardDistance),
        y: model.originY,
        z: model.originZ,
    };
}

function createWindSuperOriginTarget(model: WindSuperModel): WindTeleportTarget {
    return {
        x: model.originX,
        y: model.originY,
        z: model.originZ,
    };
}

function createWindMeleeConfig(clip: cc.AnimationClip | null): WindClipActionConfig {
    return createWindClipActionConfig(
        "melee",
        clip,
        createControllerLockConfig(false, false, false)
    );
}

function createWindRangedConfig(clip: cc.AnimationClip | null): WindClipActionConfig {
    return createWindClipActionConfig(
        "ranged",
        clip,
        createControllerLockConfig(false, false, false)
    );
}

function createWindDefendConfig(clip: cc.AnimationClip | null): WindClipActionConfig {
    return createWindClipActionConfig(
        "defend",
        clip,
        createControllerLockConfig(true, true, true)
    );
}

function createWindSuperStartupConfig(clip: cc.AnimationClip | null): WindClipActionConfig {
    return createWindClipActionConfig(
        "super-startup",
        clip,
        createControllerLockConfig(true, true, true)
    );
}

function createWindSuperAttackConfig(clip: cc.AnimationClip | null): WindClipActionConfig {
    return createWindClipActionConfig(
        "super-attack",
        clip,
        createControllerLockConfig(true, true, true)
    );
}

function createWindSuperRecoveryConfig(clip: cc.AnimationClip | null): WindClipActionConfig {
    return createWindClipActionConfig(
        "super-recovery",
        clip,
        createControllerLockConfig(true, true, true)
    );
}

@ccclass
export default class Metalhero extends PlayerController {
    private readonly handleWindowBlur = () => {
        this.resetTransientInputState();
    };

    private readonly handleVisibilityChange = () => {
        if (typeof document !== "undefined" && document.hidden) {
            this.resetTransientInputState();
        }
    };

    @property
    attackCooldown: number = 0.35;

    @property
    skill2Cooldown: number = 1.4;

    @property
    defendCooldown: number = 1.2;

    @property
    superCooldown: number = 6;

    @property
    speed: number = 250;

    @property
    jumpSpeed: number = 500;

    @property
    groundAcceleration: number = 2200;

    @property
    groundDeceleration: number = 2600;

    @property
    airAcceleration: number = 1400;

    @property
    airDeceleration: number = 500;

    @property
    groundNodeName: string = "Platform";

    @property({ type: cc.AnimationClip })
    idleClip: cc.AnimationClip = null;

    @property({ type: cc.AnimationClip })
    runClip: cc.AnimationClip = null;

    @property({ type: cc.AnimationClip })
    jumpUpClip: cc.AnimationClip = null;

    @property({ type: cc.AnimationClip })
    jumpDownClip: cc.AnimationClip = null;

    @property({ type: cc.AnimationClip })
    takeHitClip: cc.AnimationClip = null;

    @property({ type: cc.AnimationClip })
    deathClip: cc.AnimationClip = null;

    @property({ type: cc.AnimationClip })
    meleeAttackClip: cc.AnimationClip = null;

    @property({ type: cc.AnimationClip })
    rangedAttackClip: cc.AnimationClip = null;

    @property({ type: cc.AnimationClip })
    defendClip: cc.AnimationClip = null;

    @property({ type: cc.AnimationClip })
    superAttackStartupClip: cc.AnimationClip = null;

    @property({ type: cc.AnimationClip })
    superAttackClip: cc.AnimationClip = null;

    @property
    superAttackTeleportDelay: number = 1;

    @property
    superAttackForwardDistance: number = 600;

    @property
    attackSoundResource: string = "attack1";

    @property
    rangedSoundResource: string = "attack2";

    @property
    defendSoundResource: string = "dash";

    @property
    superSoundResource: string = "attack2";

    @property
    attackSfxVolume: number = 0.7;

    @property
    superSfxVolume: number = 1;

    @property
    defendDamageMultiplier: number = 0.2;

    @property
    hitRecoverTime: number = 0.25;

    @property
    airborneAnimationVelocityThreshold: number = 20;

    private moveInput: number = 0;
    private onGround: boolean = true;
    private groundContactCount: number = 0;
    private currentAnim: string = "";
    private leftHeld: boolean = false;
    private rightHeld: boolean = false;
    private facingDir: number = 1;
    private lockedFacingDir: number = 1;
    private facingLocked: boolean = false;
    private directionInputLocked: boolean = false;
    private movementLocked: boolean = false;
    private animationLocked: boolean = false;
    private attackCooldownRemaining: number = 0;
    private skill2CooldownRemaining: number = 0;
    private defendCooldownRemaining: number = 0;
    private superCooldownRemaining: number = 0;
    private isDead: boolean = false;
    private isHit: boolean = false;
    private isDefending: boolean = false;
    private currentClipAction: WindClipActionName | null = null;
    private pendingPhase: TimedPhaseState | null = null;
    private superModel: WindSuperModel | null = null;
    private readonly hideAfterDeath = () => {
        if (this.isDead) {
            this.node.opacity = 0;
        }
    };

    protected onLoad(): void {
        super.onLoad();
        this.configureClipWrapModes();
        if (typeof window !== "undefined") {
            window.addEventListener("blur", this.handleWindowBlur);
        }
        if (typeof document !== "undefined") {
            document.addEventListener("visibilitychange", this.handleVisibilityChange);
        }
    }

    onDestroy() {
        if (this.anim) {
            this.anim.off("finished", this.onClipFinished, this);
        }
        if (typeof window !== "undefined") {
            window.removeEventListener("blur", this.handleWindowBlur);
        }
        if (typeof document !== "undefined") {
            document.removeEventListener("visibilitychange", this.handleVisibilityChange);
        }
        super.onDestroy();
    }

    protected localUpdate(dt: number): void {
        this.updateCooldowns(dt);
        this.updatePendingPhase(dt);

        if (!this.rb) {
            return;
        }

        if (this.isDead || this.isHit) {
            const velocity = this.rb.linearVelocity;
            velocity.x = 0;
            this.rb.linearVelocity = velocity;
            if (!this.animationLocked) {
                this.updateAnimation();
            }
            return;
        }

        const velocity = this.rb.linearVelocity;
        velocity.x = this.updateHorizontalVelocity(velocity.x, dt);
        this.rb.linearVelocity = velocity;

        this.updateFacingFromVelocity(velocity.x);
        this.applyFacingDirection();

        if (!this.animationLocked) {
            this.updateAnimation();
        }
    }

    protected localOnKeyDown(event: cc.Event.EventKeyboard): void {
        if (event.keyCode === cc.macro.KEY.a && !this.directionInputLocked) {
            this.leftHeld = true;
            this.refreshMoveInput();
        }

        if (event.keyCode === cc.macro.KEY.d && !this.directionInputLocked) {
            this.rightHeld = true;
            this.refreshMoveInput();
        }

        if (
            !this.movementLocked &&
            !this.isDead &&
            !this.isHit &&
            (event.keyCode === cc.macro.KEY.w || event.keyCode === cc.macro.KEY.space) &&
            this.onGround &&
            this.rb
        ) {
            const velocity = this.rb.linearVelocity;
            velocity.y = this.jumpSpeed;
            this.rb.linearVelocity = velocity;
            this.onGround = false;
            this.groundContactCount = 0;
            this.updateAnimation();
        }

        if (!canStartWindAction(this.currentClipAction, this.pendingPhase, this.isDead, this.isHit)) {
            return;
        }

        if (event.keyCode === cc.macro.KEY.e) {
            this.useMelee();
            return;
        }

        if (event.keyCode === cc.macro.KEY.r) {
            this.useRanged();
            return;
        }

        if (event.keyCode === cc.macro.KEY.f) {
            this.useDefend();
            return;
        }

        if (event.keyCode === cc.macro.KEY.q) {
            this.useSuper();
        }
    }

    protected localOnKeyUp(event: cc.Event.EventKeyboard): void {
        if (event.keyCode === cc.macro.KEY.a && !this.directionInputLocked) {
            this.leftHeld = false;
            this.refreshMoveInput();
        }

        if (event.keyCode === cc.macro.KEY.d && !this.directionInputLocked) {
            this.rightHeld = false;
            this.refreshMoveInput();
        }
    }

    public beAttacked(attackType: string, damage: number, knockback: cc.Vec2): void {
        if (this.isDead) {
            return;
        }

        let finalDamage = damage;
        if (this.isDefending) {
            finalDamage = Math.floor(finalDamage * this.defendDamageMultiplier);
            if (finalDamage <= 0) {
                return;
            }
        }

        this.deductHp(finalDamage);

        if (this.hp > 0) {
            this.enterHitState(knockback);
        }

        switch (attackType) {
            case "windSuperAttack":
                break;
            default:
                break;
        }
    }

    protected onDeath(): void {
        if (this.isDead) {
            return;
        }

        this.unschedule(this.hideAfterDeath);
        this.anim.off("finished", this.onClipFinished, this);
        this.isDead = true;
        this.isHit = false;
        this.isDefending = false;
        this.currentClipAction = null;
        this.pendingPhase = null;
        this.superModel = null;
        this.movementLocked = true;
        this.animationLocked = false;
        this.directionInputLocked = true;
        this.moveInput = 0;
        this.leftHeld = false;
        this.rightHeld = false;
        this.node.opacity = 255;

        if (this.rb) {
            const velocity = this.rb.linearVelocity;
            velocity.x = 0;
            this.rb.linearVelocity = velocity;
        }

        this.currentAnim = "";
        this.playAnimationClip(this.getDeathClip(), true);
        this.scheduleDeathHide();
    }

    public onRestart(): void {
        this.unschedule(this.hideAfterDeath);
        this.isDead = false;
        this.isHit = false;
        this.isDefending = false;
        this.currentClipAction = null;
        this.pendingPhase = null;
        this.superModel = null;
        this.movementLocked = false;
        this.animationLocked = false;
        this.directionInputLocked = false;
        this.facingLocked = false;
        this.leftHeld = false;
        this.rightHeld = false;
        this.moveInput = 0;
        this.onGround = true;
        this.groundContactCount = 0;
        this.node.opacity = 255;
        this.attackCooldownRemaining = 0;
        this.skill2CooldownRemaining = 0;
        this.defendCooldownRemaining = 0;
        this.superCooldownRemaining = 0;
        this.currentAnim = "";

        if (this.rb) {
            this.rb.linearVelocity = cc.v2(0, 0);
            if (!this.rb.awake) {
                this.rb.awake = true;
            }
        }

        this.updateAnimation();
    }

    onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider) {
        if (otherCollider.node.name === this.groundNodeName) {
            this.groundContactCount++;
            this.onGround = true;
            this.updateAnimation();
        } else if (otherCollider.node.name === "Out Of Bound Trigger" && this.isLocal) {
            this.deductHp(999);
        }
    }

    onEndContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider) {
        if (otherCollider.node.name !== this.groundNodeName) {
            return;
        }

        this.groundContactCount = Math.max(0, this.groundContactCount - 1);
        this.onGround = this.groundContactCount > 0;
    }

    public useMelee(): boolean {
        if (!this.tryUseCooldown("attack")) {
            return false;
        }

        if (!this.startClipAction(createWindMeleeConfig(this.meleeAttackClip), this.attackSoundResource, this.attackSfxVolume)) {
            return false;
        }

        this.scheduleAttackHitBox("windMeleeAttack", 72, 6, 88, 40, 0.12, 12, 150, 0.08);
        return true;
    }

    public useRanged(): boolean {
        if (!this.tryUseCooldown("skill2")) {
            return false;
        }

        if (!this.startClipAction(createWindRangedConfig(this.rangedAttackClip), this.rangedSoundResource, this.attackSfxVolume)) {
            return false;
        }

        this.scheduleAttackHitBox("windRangedAttack", 180, 10, 220, 36, 0.15, 10, 120, 0.1);
        return true;
    }

    public useDefend(): boolean {
        if (!this.tryUseCooldown("defend")) {
            return false;
        }

        this.isDefending = true;
        return this.startClipAction(createWindDefendConfig(this.defendClip), this.defendSoundResource, this.attackSfxVolume);
    }

    public useSuper(): boolean {
        if (!this.onGround || !this.tryUseCooldown("super")) {
            return false;
        }

        this.superModel = createWindSuperModel(this.node.position.clone(), this.getFacingDirection(), this.superAttackForwardDistance);

        return this.startClipAction(
            createWindSuperStartupConfig(this.superAttackStartupClip),
            this.superSoundResource,
            this.superSfxVolume
        );
    }

    private startClipAction(
        config: WindClipActionConfig,
        soundResource?: string,
        soundVolume: number = 1
    ): boolean {
        if (!config.clip || !this.anim) {
            return false;
        }

        this.currentClipAction = config.name;
        this.applyControlLock(config.lock);

        if (soundResource) {
            NetworkManager.instance.playSoundEffect(soundResource, soundVolume);
        }

        this.anim.off("finished", this.onClipFinished, this);
        this.anim.once("finished", this.onClipFinished, this);
        this.playAnimationClip(config.clip, true);
        return true;
    }

    private onClipFinished() {
        const actionName = this.currentClipAction;
        this.currentClipAction = null;

        if (!actionName) {
            return;
        }

        if (actionName === "super-startup") {
            this.beginTeleportOutPhase();
            return;
        }

        if (actionName === "super-attack") {
            this.finishSuperAttack();
            return;
        }

        if (actionName === "defend") {
            this.isDefending = false;
        }

        this.unlockController();
    }

    private beginTeleportOutPhase() {
        if (!this.superModel) {
            this.superModel = createWindSuperModel(this.node.position.clone(), this.getFacingDirection(), this.superAttackForwardDistance);
        }

        this.pendingPhase = createTimedPhaseState("teleport-out", this.superAttackTeleportDelay);
        this.node.opacity = 0;
    }

    private updatePendingPhase(dt: number) {
        if (!this.pendingPhase) {
            return;
        }

        const step = advanceTimedPhase(this.pendingPhase, dt);
        this.pendingPhase = step.nextPhase;

        if (!step.completedPhaseName) {
            return;
        }

        this.completeTimedPhase(step.completedPhaseName);
    }

    private completeTimedPhase(phaseName: TimedPhaseName) {
        this.node.opacity = 255;

        if (phaseName !== "teleport-out") {
            return;
        }

        this.teleportForward();

        if (!this.startClipAction(createWindSuperAttackConfig(this.superAttackClip), undefined, this.superSfxVolume)) {
            this.teleportBackToOrigin();
            this.clearSuperState();
            this.unlockController();
            return;
        }

        this.scheduleAttackHitBox("windSuperAttack", 100, 10, 180, 72, 0.18, 22, 240, 0.05);
    }

    private finishSuperAttack() {
        this.teleportBackToOrigin();

        if (this.superAttackStartupClip && this.startClipAction(createWindSuperRecoveryConfig(this.superAttackStartupClip))) {
            this.clearSuperState(false);
            return;
        }

        this.clearSuperState();
        this.unlockController();
    }

    private teleportForward() {
        if (!this.superModel) {
            return;
        }

        this.teleportTo(createWindSuperForwardTarget(this.superModel));
    }

    private teleportBackToOrigin() {
        if (!this.superModel) {
            return;
        }

        this.teleportTo(createWindSuperOriginTarget(this.superModel));
    }

    private teleportTo(target: WindTeleportTarget) {
        this.node.setPosition(target.x, target.y, target.z);

        if (!this.rb) {
            return;
        }

        this.rb.linearVelocity = cc.v2(0, 0);
        this.rb.angularVelocity = 0;
        this.rb.syncPosition(true);
        this.rb.awake = true;
    }

    private clearSuperState(resetPhase: boolean = true) {
        if (resetPhase) {
            this.pendingPhase = null;
        }
        this.superModel = null;
        this.node.opacity = 255;
    }

    private scheduleAttackHitBox(
        attackType: string,
        centerX: number,
        centerY: number,
        width: number,
        height: number,
        duration: number,
        damage: number,
        kbScale: number,
        delay: number
    ) {
        this.scheduleOnce(() => {
            if (this.isDead) {
                return;
            }

            this.spawnAttackHitBox(
                attackType,
                cc.v2(centerX, centerY),
                cc.v2(width, height),
                duration,
                damage,
                kbScale
            );
        }, Math.max(0, delay));
    }

    private enterHitState(knockback: cc.Vec2) {
        this.anim.off("finished", this.onClipFinished, this);
        this.currentClipAction = null;
        this.pendingPhase = null;
        this.isDefending = false;
        this.animationLocked = true;
        this.movementLocked = true;
        this.directionInputLocked = true;
        this.isHit = true;

        this.applyKnockback(knockback);
        this.currentAnim = "";
        this.playAnimationClip(this.getTakeHitClip(), true);

        this.unschedule(this.exitHitState);
        this.scheduleOnce(this.exitHitState, this.hitRecoverTime);
    }

    private exitHitState() {
        if (this.isDead) {
            return;
        }

        this.isHit = false;
        this.movementLocked = false;
        this.animationLocked = false;
        this.directionInputLocked = false;
        this.currentAnim = "";
        this.updateAnimation();
    }

    private applyKnockback(knockback: cc.Vec2) {
        if (!this.rb) {
            return;
        }

        const velocity = this.rb.linearVelocity;
        velocity.x = knockback.x;
        velocity.y = Math.max(velocity.y, knockback.y);
        this.rb.linearVelocity = velocity;
        this.rb.awake = true;
    }

    private updateAnimation() {
        if (this.currentClipAction) {
            return;
        }

        if (this.isDead) {
            this.playAnimationClip(this.getDeathClip());
            return;
        }

        if (this.isHit) {
            this.playAnimationClip(this.getTakeHitClip());
            return;
        }

        if (!this.onGround) {
            const verticalVelocity = this.rb ? this.rb.linearVelocity.y : 0;
            if (Math.abs(verticalVelocity) < this.airborneAnimationVelocityThreshold) {
                this.playAnimationClip(this.moveInput === 0 ? this.idleClip : this.runClip);
                return;
            }
            this.playAnimationClip(verticalVelocity >= 0 ? this.jumpUpClip : this.jumpDownClip);
            return;
        }

        this.playAnimationClip(this.moveInput === 0 ? this.idleClip : this.runClip);
    }

    private configureClipWrapModes() {
        this.setClipWrapMode(this.idleClip, cc.WrapMode.Loop);
        this.setClipWrapMode(this.runClip, cc.WrapMode.Loop);
        this.setClipWrapMode(this.jumpUpClip, cc.WrapMode.Loop);
        this.setClipWrapMode(this.jumpDownClip, cc.WrapMode.Loop);
        this.setClipWrapMode(this.meleeAttackClip, cc.WrapMode.Normal);
        this.setClipWrapMode(this.rangedAttackClip, cc.WrapMode.Normal);
        this.setClipWrapMode(this.defendClip, cc.WrapMode.Normal);
        this.setClipWrapMode(this.superAttackStartupClip, cc.WrapMode.Normal);
        this.setClipWrapMode(this.superAttackClip, cc.WrapMode.Normal);
        this.setClipWrapMode(this.getTakeHitClip(), cc.WrapMode.Normal);
        this.setClipWrapMode(this.getDeathClip(), cc.WrapMode.Normal);
    }

    private setClipWrapMode(clip: cc.AnimationClip | null, wrapMode: cc.WrapMode) {
        if (!clip) {
            return;
        }

        clip.wrapMode = wrapMode;
    }

    private getTakeHitClip(): cc.AnimationClip | null {
        return this.takeHitClip || this.defendClip || this.idleClip;
    }

    private getDeathClip(): cc.AnimationClip | null {
        return this.deathClip || this.idleClip;
    }

    private scheduleDeathHide() {
        const deathClip = this.getDeathClip();
        if (!deathClip) {
            this.hideAfterDeath();
            return;
        }

        this.scheduleOnce(this.hideAfterDeath, this.getClipPlaybackDuration(deathClip));
    }

    private getClipPlaybackDuration(clip: cc.AnimationClip): number {
        const speed = Math.abs(clip.speed || 1);
        return Math.max(0.05, clip.duration / speed);
    }

    private playAnimationClip(clip: cc.AnimationClip | null, forceReplay: boolean = false): boolean {
        if (!clip) {
            return false;
        }

        if (this.currentAnim === clip.name && !forceReplay) {
            return true;
        }

        if (forceReplay) {
            if (this.isLocal) {
                NetworkManager.instance.stopAnimation(clip.name);
            } else if (this.anim) {
                this.anim.stop(clip.name);
            }
        }

        this.currentAnim = clip.name;
        if (this.isLocal) {
            NetworkManager.instance.playAnimation(clip.name);
        } else if (this.anim) {
            this.anim.play(clip.name);
        }
        return true;
    }

    private updateHorizontalVelocity(currentX: number, dt: number): number {
        if (this.movementLocked) {
            return this.onGround ? 0 : currentX;
        }

        const targetX = this.moveInput * this.speed;
        const hasInput = this.moveInput !== 0;
        const acceleration = this.onGround
            ? (hasInput ? this.groundAcceleration : this.groundDeceleration)
            : (hasInput ? this.airAcceleration : this.airDeceleration);

        return this.moveTowards(currentX, targetX, acceleration * dt);
    }

    private moveTowards(current: number, target: number, maxDelta: number): number {
        if (current < target) {
            return Math.min(current + maxDelta, target);
        }

        if (current > target) {
            return Math.max(current - maxDelta, target);
        }

        return target;
    }

    private refreshMoveInput() {
        if (this.leftHeld === this.rightHeld) {
            this.moveInput = 0;
        } else if (this.leftHeld) {
            this.moveInput = -1;
        } else {
            this.moveInput = 1;
        }

        if (!this.facingLocked && this.moveInput !== 0) {
            this.facingDir = this.moveInput > 0 ? 1 : -1;
            this.applyFacingDirection();
        }
    }

    private updateFacingFromVelocity(velocityX: number) {
        if (this.movementLocked || this.facingLocked) {
            return;
        }

        if (Math.abs(velocityX) > 1) {
            this.facingDir = velocityX > 0 ? 1 : -1;
        } else if (this.moveInput !== 0) {
            this.facingDir = this.moveInput > 0 ? 1 : -1;
        }
    }

    private applyFacingDirection() {
        const direction = this.getFacingDirection();
        this.node.scaleX = Math.abs(this.node.scaleX) * direction;
    }

    private getFacingDirection(): number {
        return this.facingLocked ? this.lockedFacingDir : this.facingDir;
    }

    private clearMovementInput() {
        this.leftHeld = false;
        this.rightHeld = false;
        this.moveInput = 0;
    }

    private resetTransientInputState() {
        if (!this.isLocal) {
            return;
        }

        this.clearMovementInput();

        if (this.rb && !this.movementLocked) {
            const velocity = this.rb.linearVelocity;
            velocity.x = 0;
            this.rb.linearVelocity = velocity;
        }
    }

    private applyControlLock(lock: ControllerLockConfig) {
        if (lock.clearMovement) {
            this.clearMovementInput();
        }

        this.movementLocked = lock.lockMovement;
        this.animationLocked = true;
        this.directionInputLocked = lock.lockFacing;
        if (lock.lockFacing) {
            this.facingLocked = true;
            this.lockedFacingDir = this.facingDir;
        }
    }

    private unlockController() {
        this.anim.off("finished", this.onClipFinished, this);
        this.currentClipAction = null;
        this.pendingPhase = null;
        this.node.opacity = 255;
        this.isDefending = false;
        this.movementLocked = false;
        this.animationLocked = false;
        this.directionInputLocked = false;
        this.facingLocked = false;
        this.currentAnim = "";
        this.updateAnimation();
    }

    private updateCooldowns(dt: number) {
        this.attackCooldownRemaining = Math.max(0, this.attackCooldownRemaining - dt);
        this.skill2CooldownRemaining = Math.max(0, this.skill2CooldownRemaining - dt);
        this.defendCooldownRemaining = Math.max(0, this.defendCooldownRemaining - dt);
        this.superCooldownRemaining = Math.max(0, this.superCooldownRemaining - dt);
    }

    private tryUseCooldown(slot: SkillSlot): boolean {
        const remaining = this.getCooldownRemaining(slot);
        if (remaining > 0) {
            return false;
        }

        this.setCooldownRemaining(slot, this.getCooldownDuration(slot));
        return true;
    }

    private getCooldownDuration(slot: SkillSlot): number {
        switch (slot) {
            case "attack":
                return Math.max(0, this.attackCooldown);
            case "skill2":
                return Math.max(0, this.skill2Cooldown);
            case "defend":
                return Math.max(0, this.defendCooldown);
            case "super":
                return Math.max(0, this.superCooldown);
        }
    }

    private getCooldownRemaining(slot: SkillSlot): number {
        switch (slot) {
            case "attack":
                return this.attackCooldownRemaining;
            case "skill2":
                return this.skill2CooldownRemaining;
            case "defend":
                return this.defendCooldownRemaining;
            case "super":
                return this.superCooldownRemaining;
        }
    }

    private setCooldownRemaining(slot: SkillSlot, value: number) {
        switch (slot) {
            case "attack":
                this.attackCooldownRemaining = value;
                return;
            case "skill2":
                this.skill2CooldownRemaining = value;
                return;
            case "defend":
                this.defendCooldownRemaining = value;
                return;
            case "super":
                this.superCooldownRemaining = value;
                return;
        }
    }
}
