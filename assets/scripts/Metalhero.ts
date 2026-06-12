import NetworkManager from "./NetworkManager";
import ParticleEffectManager from "./ParticleEffectManager";
import PlayerController from "./PlayerController";

const { ccclass, property } = cc._decorator;
const WATER_PRIESTESS_SKILL3_CONTROL_PREFIX = "waterPriestessSkill3Control:";

type SkillSlot = "attack" | "skill2" | "skill3" | "defend" | "super";
type WindClipActionName =
    | "melee"
    | "ranged"
    | "skill3"
    | "defend"
    | "super-attack";

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

function canStartWindAction(
    currentClipAction: WindClipActionName | null,
    isDead: boolean,
    isHit: boolean
): boolean {
    return !currentClipAction && !isDead && !isHit;
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

function createWindSkill3Config(clip: cc.AnimationClip | null): WindClipActionConfig {
    return createWindClipActionConfig(
        "skill3",
        clip,
        createControllerLockConfig(false, false, false)
    );
}

function createWindSuperAttackConfig(clip: cc.AnimationClip | null): WindClipActionConfig {
    return createWindClipActionConfig(
        "super-attack",
        clip,
        createControllerLockConfig(true, true, true)
    );
}

@ccclass
export default class Metalhero extends PlayerController {
    private visualNode: cc.Node | null = null;
    private visualSprite: cc.Sprite | null = null;
    private sourceSprite: cc.Sprite | null = null;

    private readonly handleWindowBlur = () => {
        this.resetTransientInputState();
    };

    private readonly handleVisibilityChange = () => {
        if (typeof document !== "undefined" && document.hidden) {
            this.resetTransientInputState();
        }
    };

    @property
    attackCooldown: number = 0.3;

    @property
    skill2Cooldown: number = 1;

    @property
    skill3Cooldown: number = 2;

    @property
    skill3RepeatInterval: number = 0.5;

    @property
    defendCooldown: number = 1.2;

    @property
    superCooldown: number = 5;

    @property
    speed: number = 250;

    @property
    jumpSpeed: number = 500;

    @property
    gamepadIndex: number = -1;

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
    skill3Clip: cc.AnimationClip = null;

    @property({ type: cc.AnimationClip })
    defendClip: cc.AnimationClip = null;

    @property({ type: cc.AnimationClip })
    superAttackClip: cc.AnimationClip = null;

    @property
    attackSoundResource: string = "attack1";

    @property
    rangedSoundResource: string = "attack2";

    @property
    defendSoundResource: string = "dash";

    @property
    skill3SoundResource: string = "attack2";

    @property
    superSoundResource: string = "metal_hero_sp";

    @property
    attackSfxVolume: number = 0.7;

    @property
    superSfxVolume: number = 1;

    @property
    dashSpeed: number = 1000;

    @property
    fastFallGravityScale: number = 20.0;

    @property
    dashDuration: number = 0.15;

    @property
    dashCooldown: number = 0.8;

    @property
    dashSoundResource: string = "dash";

    @property
    defendDamageMultiplier: number = 0.2;

    @property
    hitRecoverTime: number = 0.25;

    @property
    airborneAnimationVelocityThreshold: number = 20;

    @property
    visualScale: number = 2.5;

    @property
    visualOffsetY: number = 100;

    private moveInput: number = 0;
    private onGround: boolean = true;
    private _prevOnGround: boolean = true;
    private groundContactCount: number = 0;
    private currentAnim: string = "";
    private leftHeld: boolean = false;
    private rightHeld: boolean = false;
    // ── Gamepad state ───────────────────────────────────────────────────────
    private gpLeft: boolean = false;
    private gpRight: boolean = false;
    private gpJumpPrev: boolean = false;
    private gpMeleePrev: boolean = false;
    private gpRangedPrev: boolean = false;
    private gpDefendPrev: boolean = false;
    private gpSkill3Prev: boolean = false;
    private gpSuperPrev: boolean = false;
    private gpDashPrev: boolean = false;
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
    private isDashing: boolean = false;
    private dashCooldownRemaining: number = 0;
    private airJumpUsed: boolean = false;
    private downPressed: boolean = false;
    private _initialGravityScale: number = -1;
    private currentClipAction: WindClipActionName | null = null;
    private skill3CooldownRemaining: number = 0;
    private readonly triggerSuperAttackDamage = () => {
        if (this.isDead || this.currentClipAction !== "super-attack") {
            return;
        }

        this.spawnAttackHitBox(
            "metalSuperAttack",
            cc.v2(108, 10),
            cc.v2(220, 84),
            0.18,
            18,
            180
        );
    };
    private readonly triggerSuperAttackFinisher = () => {
        if (this.isDead || this.currentClipAction !== "super-attack") {
            return;
        }

        this.spawnAttackHitBox(
            "metalSuperAttackFinisher",
            cc.v2(48, -64),
            cc.v2(340, 180),
            0.2,
            0,
            1500
        );
    };
    private readonly triggerSkill3Damage = () => {
        if (this.isDead || this.currentClipAction !== "skill3") {
            return;
        }

        this.spawnAttackHitBox(
            "metalSkill3Attack",
            cc.v2(180, 10),
            cc.v2(220, 36),
            0.15,
            10,
            120
        );
    };
    private readonly hideAfterDeath = () => {
        if (this.isDead) {
            this.node.opacity = 0;
        }
    };

    protected onLoad(): void {
        super.onLoad();
        this.ensureVisualPresentationNodes();
        this.applyVisualPresentation();
        this.configureClipWrapModes();
        if (typeof window !== "undefined") {
            window.addEventListener("blur", this.handleWindowBlur);
        }
        if (typeof document !== "undefined") {
            document.addEventListener("visibilitychange", this.handleVisibilityChange);
        }
    }

    onDestroy() {
        this.clearAnimationFinishedListener(this.onClipFinished);
        if (typeof window !== "undefined") {
            window.removeEventListener("blur", this.handleWindowBlur);
        }
        if (typeof document !== "undefined") {
            document.removeEventListener("visibilitychange", this.handleVisibilityChange);
        }
        super.onDestroy();
    }

    protected lateUpdate(): void {
        this.syncVisualSpriteFrame();
        if (this.onGround && !this._prevOnGround) {
            const worldPos = this.node.convertToWorldSpaceAR(cc.v2(0, -this.node.height * 0.5));
            ParticleEffectManager.playLanding(worldPos, cc.find('Canvas'));
        }
        this._prevOnGround = this.onGround;
    }

    private pollGamepad(): void {
        if (this.gamepadIndex < 0) return;
        const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
        const gp = gamepads[this.gamepadIndex];
        if (!gp) return;

        const DEAD_ZONE = 0.25;
        const axisX = gp.axes[0] ?? 0;
        const axisY = gp.axes[1] ?? 0;
        const dpadLeft = gp.buttons[14]?.pressed ?? false;
        const dpadRight = gp.buttons[15]?.pressed ?? false;
        const dpadDown = gp.buttons[13]?.pressed ?? false;
        const newLeft = axisX < -DEAD_ZONE || dpadLeft;
        const newRight = axisX > DEAD_ZONE || dpadRight;
        const newDown = axisY > DEAD_ZONE || dpadDown;
        this.downPressed = newDown;

        if (newLeft !== this.gpLeft) {
            this.gpLeft = newLeft;
            this.leftHeld = newLeft;
            this.refreshMoveInput();
        }
        if (newRight !== this.gpRight) {
            this.gpRight = newRight;
            this.rightHeld = newRight;
            this.refreshMoveInput();
        }

        // ── 跳躍 (A/Cross) ──
        const gpJump = gp.buttons[0]?.pressed ?? false;
        if (gpJump && !this.gpJumpPrev) {
            if (!this.onGround && !this.airJumpUsed && this.rb) {
                this.airJumpUsed = true;
                const v = this.rb.linearVelocity;
                v.y = this.scaleGameplaySpeed(this.jumpSpeed);
                this.rb.linearVelocity = v;
                this.updateAnimation();
            } else if (this.onGround && !this.isDead && !this.isHit && !this.movementLocked && this.rb) {
                const v = this.rb.linearVelocity;
                v.y = this.scaleGameplaySpeed(this.jumpSpeed);
                this.rb.linearVelocity = v;
                this.onGround = false;
                this.groundContactCount = 0;
                this.updateAnimation();
            }
        }
        this.gpJumpPrev = gpJump;

        // ── 普攻 (X/Square) ──
        const gpMelee = gp.buttons[2]?.pressed ?? false;
        if (gpMelee && !this.gpMeleePrev) this.useMelee();
        this.gpMeleePrev = gpMelee;

        // ── 遠程 (Y/Triangle) ──
        const gpRanged = gp.buttons[3]?.pressed ?? false;
        if (gpRanged && !this.gpRangedPrev) this.useRanged();
        this.gpRangedPrev = gpRanged;

        // ── 衝刺 (LB/L1) ──
        const gpDash = gp.buttons[4]?.pressed ?? false;
        if (gpDash && !this.gpDashPrev) this.useDash();
        this.gpDashPrev = gpDash;

        // ── 技能3 (RB/R1) ──
        const gpSkill3 = gp.buttons[5]?.pressed ?? false;
        if (gpSkill3 && !this.gpSkill3Prev) this.useSkill3();
        this.gpSkill3Prev = gpSkill3;

        // ── 大招 (LT/L2) ──
        const gpSuper = gp.buttons[6]?.pressed ?? false;
        if (gpSuper && !this.gpSuperPrev) this.useSuper();
        this.gpSuperPrev = gpSuper;

        // ── 防禦 (B/Circle) ──
        const gpDefend = gp.buttons[1]?.pressed ?? false;
        if (gpDefend && !this.gpDefendPrev) this.useDefend();
        this.gpDefendPrev = gpDefend;
    }

    protected localUpdate(dt: number): void {
        this.pollGamepad();
        this.updateCooldowns(dt);
        this.updateCrowdControl(dt);

        if (!this.rb) {
            return;
        }

        if (this.isDead || this.isHit) {
            const velocity = this.rb.linearVelocity;
            if (!this.isCrowdControlled()) {
                velocity.x = 0;
            }
            this.rb.linearVelocity = velocity;
            if (!this.animationLocked) {
                this.updateAnimation();
            }
            return;
        }

        const velocity = this.rb.linearVelocity;
        if (!this.isDashing) {
            velocity.x = this.updateHorizontalVelocity(velocity.x, dt);
        }
        this.rb.linearVelocity = velocity;

        this.updateGravityScale();
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

        if (event.keyCode === cc.macro.KEY.s || event.keyCode === cc.macro.KEY.down) {
            this.downPressed = true;
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
            velocity.y = this.scaleGameplaySpeed(this.jumpSpeed);
            this.rb.linearVelocity = velocity;
            this.onGround = false;
            this.groundContactCount = 0;
            this.updateAnimation();
        } else if (
            !this.movementLocked &&
            !this.isDead &&
            !this.isHit &&
            (event.keyCode === cc.macro.KEY.w || event.keyCode === cc.macro.KEY.space) &&
            !this.onGround &&
            !this.airJumpUsed &&
            this.rb
        ) {
            // 二段跳
            this.airJumpUsed = true;
            const v = this.rb.linearVelocity;
            v.y = this.scaleGameplaySpeed(this.jumpSpeed);
            this.rb.linearVelocity = v;
            this.updateAnimation();
        }

        if (event.keyCode === cc.macro.KEY.shift) {
            this.useDash();
            return;
        }

        if (!canStartWindAction(this.currentClipAction, this.isDead, this.isHit)) {
            return;
        }

        if (event.keyCode === cc.macro.KEY.j) {
            this.useMelee();
            return;
        }

        if (event.keyCode === cc.macro.KEY.k) {
            this.useRanged();
            return;
        }

        if (event.keyCode === cc.macro.KEY.l) {
            this.useSkill3();
            return;
        }

        if (event.keyCode === cc.macro.KEY.i) {
            this.useDefend();
            return;
        }

        if (event.keyCode === cc.macro.KEY.u) {
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

        if (event.keyCode === cc.macro.KEY.s || event.keyCode === cc.macro.KEY.down) {
            this.downPressed = false;
        }

    }

    public beAttacked(attackType: string, damage: number, knockback: cc.Vec2): void {
        if (this.isDead) {
            return;
        }

        const crowdControlDuration = this.parseTaggedDuration(
            attackType,
            WATER_PRIESTESS_SKILL3_CONTROL_PREFIX
        );
        const shouldReactToMetalFinisher = attackType === "metalSuperAttackFinisher";
        let finalDamage = damage;
        if (this.isDefending) {
            finalDamage = Math.floor(finalDamage * this.defendDamageMultiplier);
            if (finalDamage < 0) {
                finalDamage = 0;
            }
            if (finalDamage <= 0 && crowdControlDuration <= 0 && !shouldReactToMetalFinisher) {
                return;
            }
        }

        if (finalDamage > 0) {
            this.deductHp(finalDamage);
        }

        if (this.hp > 0 && (finalDamage > 0 || crowdControlDuration > 0 || shouldReactToMetalFinisher)) {
            if (crowdControlDuration > 0) {
                this.applyCrowdControl(crowdControlDuration);
            }
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

        this.consumeCrowdControl();
        this.unschedule(this.hideAfterDeath);
        this.clearAnimationFinishedListener(this.onClipFinished);
        this.isDead = true;
        this.isHit = false;
        this.isDefending = false;
        this.currentClipAction = null;
        this.stopSkill3Loop();
        this.stopSuperAttackLoop();
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
        this.consumeCrowdControl();
        this.isDead = false;
        this.isHit = false;
        this.isDefending = false;
        this.currentClipAction = null;
        this.stopSkill3Loop();
        this.stopSuperAttackLoop();
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
        this.skill3CooldownRemaining = 0;
        this.defendCooldownRemaining = 0;
        this.superCooldownRemaining = 0;
        this.isDashing = false;
        this.dashCooldownRemaining = 0;
        this.airJumpUsed = false;
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
        if (this.isGroundNode(otherCollider.node)) {
            this.groundContactCount++;
            this.onGround = true;
            this.airJumpUsed = false;
            this.updateAnimation();
        } else if (otherCollider.node.name === "Out Of Bound Trigger" && this.isLocal) {
            this.deductHp(999);
        }
    }

    onEndContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider) {
        if (!this.isGroundNode(otherCollider.node)) {
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

    public useSkill3(): boolean {
        if (!this.tryUseCooldown("skill3")) {
            return false;
        }

        if (!this.startClipAction(createWindSkill3Config(this.skill3Clip), this.skill3SoundResource, this.attackSfxVolume)) {
            return false;
        }

        this.startSkill3Loop();
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

        if (!this.startClipAction(
            createWindSuperAttackConfig(this.superAttackClip),
            this.superSoundResource,
            this.superSfxVolume
        )) {
            return false;
        }

        this.startSuperAttackLoop();
        return true;
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

        if (!this.listenForAnimationFinishedOnce(this.onClipFinished)) {
            return false;
        }

        this.playAnimationClip(config.clip, true);
        return true;
    }

    private onClipFinished() {
        const actionName = this.currentClipAction;
        this.currentClipAction = null;

        if (!actionName) {
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

    private finishSuperAttack() {
        this.stopSuperAttackLoop();
        this.unlockController();
    }

    private startSkill3Loop() {
        this.stopSkill3Loop();
        this.triggerSkill3Damage();
        this.schedule(this.triggerSkill3Damage, Math.max(0.05, this.skill3RepeatInterval));
    }

    private stopSkill3Loop() {
        this.unschedule(this.triggerSkill3Damage);
    }

    private startSuperAttackLoop() {
        this.stopSuperAttackLoop();
        this.triggerSuperAttackDamage();
        this.triggerSuperAttackFinisher();
    }

    private stopSuperAttackLoop() {
        this.unschedule(this.triggerSuperAttackDamage);
        this.unschedule(this.triggerSuperAttackFinisher);
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
        this.clearAnimationFinishedListener(this.onClipFinished);
        this.currentClipAction = null;
        this.isDefending = false;
        this.stopSkill3Loop();
        this.stopSuperAttackLoop();
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

        if (this.isCrowdControlled()) {
            this.unschedule(this.exitHitState);
            this.scheduleOnce(this.exitHitState, Math.max(0.05, this.getCrowdControlRemaining()));
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
        this.setClipWrapMode(this.skill3Clip, cc.WrapMode.Normal);
        this.setClipWrapMode(this.defendClip, cc.WrapMode.Normal);
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

    private ensureVisualPresentationNodes() {
        this.sourceSprite = this.node.getComponent(cc.Sprite);
        if (!this.sourceSprite) {
            return;
        }

        let visualNode = this.node.getChildByName("Visual");
        if (!visualNode) {
            visualNode = new cc.Node("Visual");
            visualNode.parent = this.node;
            visualNode.setSiblingIndex(0);
        }

        let visualSprite = visualNode.getComponent(cc.Sprite);
        if (!visualSprite) {
            visualSprite = visualNode.addComponent(cc.Sprite);
        }

        this.visualNode = visualNode;
        this.visualSprite = visualSprite;
        this.visualSprite.spriteFrame = this.sourceSprite.spriteFrame;
        this.visualSprite.type = this.sourceSprite.type;
        this.visualSprite.sizeMode = cc.Sprite.SizeMode.RAW;
        this.visualSprite.trim = false;

        this.sourceSprite.enabled = false;
    }

    private getVisualNode(): cc.Node | null {
        return this.visualNode;
    }

    private applyVisualPresentation() {
        const visualNode = this.getVisualNode();
        if (!visualNode) {
            return;
        }

        visualNode.y = this.visualOffsetY;
        visualNode.scaleX = this.visualScale;
        visualNode.scaleY = this.visualScale;

        const sprite = visualNode.getComponent(cc.Sprite);
        if (!sprite) {
            return;
        }

        sprite.sizeMode = cc.Sprite.SizeMode.RAW;
        sprite.trim = false;
    }

    private syncVisualSpriteFrame() {
        if (!this.sourceSprite || !this.visualSprite) {
            return;
        }

        if (this.visualSprite.spriteFrame !== this.sourceSprite.spriteFrame) {
            this.visualSprite.spriteFrame = this.sourceSprite.spriteFrame;
        }
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

        const targetX = this.moveInput * this.scaleGameplaySpeed(this.speed);
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
        this.downPressed = false;
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

    private updateGravityScale() {
        if (!this.rb) return;
        if (this._initialGravityScale < 0) {
            this._initialGravityScale = this.rb.gravityScale;
        }
        if (!this.onGround && !this.isDashing && this.downPressed) {
            this.rb.gravityScale = this.scaleGameplayGravityScale(this.fastFallGravityScale);
        } else {
            this.rb.gravityScale = this.scaleGameplayGravityScale(this._initialGravityScale);
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
        this.clearAnimationFinishedListener(this.onClipFinished);
        this.currentClipAction = null;
        this.stopSkill3Loop();
        this.stopSuperAttackLoop();
        this.node.opacity = 255;
        this.isDefending = false;
        this.movementLocked = false;
        this.animationLocked = false;
        this.directionInputLocked = false;
        this.facingLocked = false;
        this.currentAnim = "";
        this.updateAnimation();
    }

    private useDash(): void {
        if (this.isDead || this.isHit || this.isDashing || this.dashCooldownRemaining > 0) return;
        if (!this.rb) return;

        this.isDashing = true;
        this.dashCooldownRemaining = this.dashCooldown;

        if (this.dashSoundResource) {
            NetworkManager.instance.playSoundEffect(this.dashSoundResource, 0.7);
        }

        const dir = this.facingDir;
        const velocity = this.rb.linearVelocity;
        velocity.x = dir * this.scaleGameplaySpeed(this.dashSpeed);
        this.rb.linearVelocity = velocity;

        this.scheduleOnce(() => {
            this.isDashing = false;
        }, Math.max(0.05, this.dashDuration));
    }

    private updateCooldowns(dt: number) {
        this.attackCooldownRemaining = Math.max(0, this.attackCooldownRemaining - dt);
        this.skill2CooldownRemaining = Math.max(0, this.skill2CooldownRemaining - dt);
        this.skill3CooldownRemaining = Math.max(0, this.skill3CooldownRemaining - dt);
        this.defendCooldownRemaining = Math.max(0, this.defendCooldownRemaining - dt);
        this.superCooldownRemaining = Math.max(0, this.superCooldownRemaining - dt);
        this.dashCooldownRemaining = Math.max(0, this.dashCooldownRemaining - dt);
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
            case "skill3":
                return Math.max(0, this.skill3Cooldown);
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
            case "skill3":
                return this.skill3CooldownRemaining;
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
            case "skill3":
                this.skill3CooldownRemaining = value;
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
