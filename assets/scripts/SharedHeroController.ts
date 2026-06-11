import AudioManager from './AudioManager';
import NetworkManager from './NetworkManager';
import PlayerController from './PlayerController';
import ParticleEffectManager from './ParticleEffectManager';

const { ccclass, property } = cc._decorator;
type ClipLike = cc.AnimationClip | string | null | undefined;
const WATER_PRIESTESS_SKILL3_CONTROL_PREFIX = "waterPriestessSkill3Control:";

// enum CharacterPreset {
//     Custom = 0,
//     Monk = 1,
//     Priestess = 2,
//     Hashashin = 3,
// }

@ccclass
export default class SharedHeroController extends PlayerController {
    @property
    speed: number = 250;

    @property
    jumpSpeed: number = 300;

    @property
    fallGravityScale: number = 7.0;

    @property
    jumpGravityScale: number = 4.0;

    @property
    fastFallGravityScale: number = 20.0;

    @property
    dashSpeed: number = 1000; // 銵?漲

    @property
    groundNodeName: string = 'Platform';

    @property({ type: cc.AnimationClip, displayName: 'Idle Clip' })
    idleClip: cc.AnimationClip = null;

    @property({ type: cc.AnimationClip, displayName: 'Run Clip' })
    runClip: cc.AnimationClip = null;

    @property({ type: cc.AnimationClip, displayName: 'Jump Up Clip' })
    jumpClip: cc.AnimationClip = null;

    @property({ type: cc.AnimationClip, displayName: 'Jump Down Clip' })
    jumpDownClip: cc.AnimationClip = null;

    @property({ type: cc.AnimationClip, visible: false })
    dashClip: cc.AnimationClip = null;

    @property({ type: cc.AnimationClip, displayName: 'Melee Attack Clip' })
    attackClip: cc.AnimationClip = null;

    @property({ type: cc.AnimationClip, displayName: 'Ranged Attack Clip' })
    attack2Clip: cc.AnimationClip = null;

    @property({ type: cc.AnimationClip, visible: false })
    attack3Clip: cc.AnimationClip = null;

    @property({ type: cc.AnimationClip, visible: false })
    jumpAttackClip: cc.AnimationClip = null;

    @property({ type: cc.AnimationClip, visible: false })
    specialAttackClip: cc.AnimationClip = null;

    @property({ type: cc.AnimationClip, displayName: 'Skill3 Clip' })
    skill3Clip: cc.AnimationClip = null;

    @property({ type: cc.AnimationClip, displayName: 'Super Clip' })
    superClip: cc.AnimationClip = null;

    @property({ type: cc.AnimationClip, displayName: 'Defend Clip' })
    defendClip: cc.AnimationClip = null;

    @property({ type: cc.AnimationClip, displayName: 'Take Hit Clip' })
    takeHitClip: cc.AnimationClip = null;

    @property({ type: cc.AnimationClip, displayName: 'Death Clip' })
    deathClip: cc.AnimationClip = null;

    // @property({ type: cc.Enum(CharacterPreset) })
    // characterPreset: CharacterPreset = CharacterPreset.Custom;

    @property({ visible: false })
    switchPresetByNumberKey: boolean = true;

    @property({ visible: false })
    animIdle: string = 'idle';

    @property({ visible: false })
    animRun: string = 'run';

    @property({ visible: false })
    animJump: string = 'j_up';

    @property({ visible: false })
    animJumpDown: string = 'j_down';

    @property({ visible: false })
    animDash: string = 'roll';

    @property({ visible: false })
    animAttack: string = '1_atk';

    @property({ visible: false })
    animAttack2: string = '2_atk';

    @property({ visible: false })
    animAttack3: string = '3_atk';

    @property({ visible: false })
    animJumpAttack: string = 'air_atk';

    @property({ visible: false })
    animSpecialAttack: string = 'sp_atk';

    @property({ visible: false })
    animSkill3: string = '';

    @property({ visible: false })
    animSuper: string = '';

    @property({ visible: false })
    animDefend: string = 'defend';

    @property({ tooltip: '?脩戌???啁??瑕拿瘥?嚗?=摰??嚗?.3=?芸? 30% ?瑕拿' })
    defendDamageMultiplier: number = 0;

    @property({ visible: false })
    animTakeHit: string = 'take_hit';

    @property({ visible: false })
    animDeath: string = 'death';

    @property
    maxHp: number = 100;

    @property
    debugHitDamage: number = 20;

    @property
    hitRecoverTime: number = 0.25;

    @property
    autoRespawn: boolean = true;

    @property
    respawnDelay: number = 1.5;

    @property(cc.Node)
    respawnPoint: cc.Node = null;

    @property
    attack1SfxResource: string = 'attack1';

    @property
    attack2SfxResource: string = 'attack2';

    @property
    dashSfxResource: string = 'dash';

    @property
    priestessSpecialSfxResource: string = 'water_priestess技能';

    @property
    monkSpecialSfxResource: string = 'attack2';

    @property
    attackSfxVolume: number = 0.7;

    @property
    specialAttackSfxVolume: number = 3;

    @property
    attackSfxCooldown: number = 0.12;

    @property
    dashSfxCooldown: number = 0.1;

    @property
    skill2Cooldown: number = 1;

    @property
    skill3Cooldown: number = 2;

    @property
    defendCooldown: number = 1.2;

    @property
    superCooldown: number = 5;

    @property
    skill2Damage: number = 5;

    @property
    skill2Knockback: number = 200;

    @property
    skill3Damage: number = 8;

    @property
    skill3Knockback: number = 240;

    @property
    superDamage: number = 16;

    @property
    superKnockback: number = 320;

    @property
    visualScale: number = 2.5;

    @property
    visualOffsetY: number = 140;

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
    airborneAnimationVelocityThreshold: number = 20;

    // @property(cc.Node)
    // defendHitBox: cc.Node = null;

    // @property(cc.Node)
    // normalAttackHitBox: cc.Node = null;

    // @property(cc.Node)
    // specialAttackHitBox: cc.Node = null;

    // @property(cc.Node)
    // airAttackHitBox: cc.Node = null;



    private moveDir: number = 0;
    private onGround: boolean = false;
    private _prevOnGround: boolean = false;
    private groundContactCount: number = 0;
    private isDashing: boolean = false;
    private facingDir: number = 1; // 閫?Ｘ????1 for right, -1 for left
    private currentAnim: string = '';
    private baseScaleX: number = 1;
    private leftPressed: boolean = false;
    private rightPressed: boolean = false;
    private isAttacking: boolean = false;
    private isAirAttacking: boolean = false;
    private comboStep: number = 0;
    private comboQueued: boolean = false;
    private isHit: boolean = false;
    private isDead: boolean = false;
    private isDefending: boolean = false;
    private attackToken: number = 0;
    private attackPlaybackToken: number = 0;
    private skill2CooldownRemaining: number = 0;
    private skill3CooldownRemaining: number = 0;
    private defendCooldownRemaining: number = 0;
    private superCooldownRemaining: number = 0;
    private visualNode: cc.Node | null = null;
    private visualSprite: cc.Sprite | null = null;
    private sourceSprite: cc.Sprite | null = null;
    // ?孵??萇???
    private upPressed: boolean = false;
    private downPressed: boolean = false;
    // 頝唾???嚗oyote time嚗?啣??祝??嚗? jump buffer嚗???頝喟?閮??嚗?
    private coyoteTimer: number = 0;
    private jumpBufferTimer: number = 0;
    private readonly COYOTE_TIME: number = 0.12;
    private readonly JUMP_BUFFER_TIME: number = 0.12;
    private readonly JUMP_CORNER_CORRECTION_TIME: number = 0.12;
    private airJumpUsed: boolean = false;
    private jumpCornerCorrectionTimer: number = 0;
    private gpLeft: boolean = false;
    private gpRight: boolean = false;
    private gpUp: boolean = false;
    private gpDown: boolean = false;
    private gpJumpPrev: boolean = false;
    private gpAttackPrev: boolean = false;
    private gpSpecialPrev: boolean = false;
    private gpDashPrev: boolean = false;
    private gpDefendPrev: boolean = false;
    private gpSuperPrev: boolean = false;
    private lastAttackSfxTime: number = -999;
    private lastDashSfxTime: number = -999;

    // ── Gamepad ──────────────────────────────────────────────────────────────
    // 標準 Gamepad 按鍵對應（Xbox / PS 布局）：
    //   軸 0 = 左搖桿 X，軸 1 = 左搖桿 Y
    //   button 0 = A/Cross      → 跳躍
    //   button 1 = B/Circle     → 防禦（按住）
    //   button 2 = X/Square     → 普攻
    //   button 3 = Y/Triangle   → 特殊攻擊
    //   button 4 = LB/L1        → 衝刺
    //   D-Pad: button 12=上 13=下 14=左 15=右
    pollGamepad() {
        if (this.gamepadIndex < 0) return;

        const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
        const gp = gamepads[this.gamepadIndex];
        if (!gp) return;

        const DEAD_ZONE = 0.25;
        const axisX = gp.axes[0] ?? 0;
        const axisY = gp.axes[1] ?? 0;

        // ── 方向（搖桿 + D-Pad）────────────────────────────────────────────
        const dpadLeft = gp.buttons[14]?.pressed ?? false;
        const dpadRight = gp.buttons[15]?.pressed ?? false;
        const dpadUp = gp.buttons[12]?.pressed ?? false;
        const dpadDown = gp.buttons[13]?.pressed ?? false;

        const newLeft = axisX < -DEAD_ZONE || dpadLeft;
        const newRight = axisX > DEAD_ZONE || dpadRight;
        const newUp = axisY < -DEAD_ZONE || dpadUp;
        const newDown = axisY > DEAD_ZONE || dpadDown;

        if (newLeft !== this.gpLeft) {
            this.gpLeft = newLeft;
            this.leftPressed = newLeft;
            this.refreshMoveDir();
        }
        if (newRight !== this.gpRight) {
            this.gpRight = newRight;
            this.rightPressed = newRight;
            this.refreshMoveDir();
        }
        if (newUp !== this.gpUp) {
            this.gpUp = newUp;
            this.upPressed = newUp;
        }
        if (newDown !== this.gpDown) {
            this.gpDown = newDown;
            this.downPressed = newDown;
        }

        // ── 跳躍（A/Cross，邊緣觸發）───────────────────────────────────────
        const gpJump = gp.buttons[0]?.pressed ?? false;
        if (gpJump && !this.gpJumpPrev) {
            if (!this.onGround && !this.airJumpUsed && this.rb) {
                this.airJumpUsed = true;
                const v = this.rb.linearVelocity;
                v.y = this.jumpSpeed;
                this.rb.linearVelocity = v;
                this.startJumpCornerCorrection();
                this.updateAnimation();
            } else if (
                this.onGround &&
                !this.isDead &&
                !this.isHit &&
                !this.isDashing &&
                !this.isDefending &&
                !this.isAttacking &&
                !this.isAirAttacking &&
                this.rb
            ) {
                const v = this.rb.linearVelocity;
                v.y = this.jumpSpeed;
                this.rb.linearVelocity = v;
                this.startJumpCornerCorrection();
                this.onGround = false;
                this.groundContactCount = 0;
                this.updateAnimation();
            }
        }
        this.gpJumpPrev = gpJump;

        // ── 普攻（X/Square，邊緣觸發）──────────────────────────────────────
        const gpAttack = gp.buttons[2]?.pressed ?? false;
        if (gpAttack && !this.gpAttackPrev) {
            this.useMelee();
        }
        this.gpAttackPrev = gpAttack;

        // ── 特殊攻擊（Y/Triangle，邊緣觸發）───────────────────────────────
        const gpSpecial = gp.buttons[3]?.pressed ?? false;
        if (gpSpecial && !this.gpSpecialPrev) {
            this.requestSpecialAttack();
        }
        this.gpSpecialPrev = gpSpecial;

        // ── 衝刺（LB/L1，邊緣觸發）────────────────────────────────────────
        const gpDash = gp.buttons[4]?.pressed ?? false;
        if (gpDash && !this.gpDashPrev) {
            this.dash();
        }
        this.gpDashPrev = gpDash;

        // ── 防禦（B/Circle，持續狀態）──────────────────────────────────────
        const gpDefend = gp.buttons[1]?.pressed ?? false;
        if (gpDefend && !this.gpDefendPrev) {
            this.startDefend();
        }
        this.gpDefendPrev = gpDefend;

        // ── 大招（RB/R1，邊緣觸發）─────────────────────────────────────────
        const gpSuper = gp.buttons[5]?.pressed ?? false;
        if (gpSuper && !this.gpSuperPrev) {
            this.useSuper();
        }
        this.gpSuperPrev = gpSuper;
    }
    // ─────────────────────────────────────────────────────────────────────────


    onLoad() {
        super.onLoad();
        this.ensureAnimationClipsRegistered();
        this.baseScaleX = Math.abs(this.node.scaleX);
        this.ensureVisualPresentationNodes();
        this.applyVisualPresentation();

        // this.applyPreset();
        this.preloadSfx();
    }

    protected lateUpdate(): void {
        this.syncVisualSpriteFrame();

        // 落地粉塵：偵測從空中切換到地面的那一幀
        if (this.onGround && !this._prevOnGround) {
            const worldPos = this.node.convertToWorldSpaceAR(cc.v2(0, -this.node.height * 0.5));
            console.log('[FX] landing dust at', worldPos.x.toFixed(0), worldPos.y.toFixed(0));
            ParticleEffectManager.playLanding(worldPos, cc.find('Canvas'));
        }
        this._prevOnGround = this.onGround;
    }

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        // this.unschedule(this.respawn);
        this.unschedule(this.onAttackStepTimeout);
    }

    preloadSfx() {
        AudioManager.preload(this.attack1SfxResource);
        AudioManager.preload(this.attack2SfxResource);
        AudioManager.preload(this.dashSfxResource);
        AudioManager.preload(this.priestessSpecialSfxResource);
        AudioManager.preload(this.monkSpecialSfxResource);
    }

    playEffectClip(resource: string, volume: number, cooldown: number = 0, lastPlayTime?: 'attack' | 'dash') {
        if (!resource) {
            return;
        }

        const now = Date.now() / 1000;
        if (lastPlayTime === 'attack' && now - this.lastAttackSfxTime < cooldown) {
            return;
        }
        if (lastPlayTime === 'dash' && now - this.lastDashSfxTime < cooldown) {
            return;
        }

        if (lastPlayTime === 'attack') {
            this.lastAttackSfxTime = now;
        }
        if (lastPlayTime === 'dash') {
            this.lastDashSfxTime = now;
        }

        // FIXED: server logic
        // AudioManager.playEffect(resource, volume);
        NetworkManager.instance.playSoundEffect(resource, volume);
    }

    playAttackSfx(level: number) {
        if (level <= 1) {
            this.playEffectClip(this.attack1SfxResource, this.attackSfxVolume, this.attackSfxCooldown, 'attack');
            return;
        }
        this.playEffectClip(this.attack2SfxResource, this.attackSfxVolume, this.attackSfxCooldown, 'attack');
    }

    playDashSfx() {
        this.playEffectClip(this.dashSfxResource, this.attackSfxVolume, this.dashSfxCooldown, 'dash');
    }

    // isPriestessCharacter(): boolean {
    //     return this.characterPreset === CharacterPreset.Priestess
    //         || this.animRun === 'walk'
    //         || this.animDash === 'surf';
    // }

    playSpecialAttackSfx() {
        if ((this.node.name === 'water_priestess' || this.animRun === 'walk') && this.priestessSpecialSfxResource) {
            this.playEffectClip(this.priestessSpecialSfxResource, this.specialAttackSfxVolume, this.attackSfxCooldown, 'attack');
            return;
        }

        if (this.monkSpecialSfxResource) {
            this.playEffectClip(this.monkSpecialSfxResource, this.specialAttackSfxVolume, this.attackSfxCooldown, 'attack');
        }
    }

    // FIXED: implement PlayerController
    localUpdate(dt: number) {
        this.pollGamepad();
        this.updateAbilityCooldowns(dt);
        this.updateCrowdControl(dt);
        if (this.jumpCornerCorrectionTimer > 0) {
            this.jumpCornerCorrectionTimer = Math.max(0, this.jumpCornerCorrectionTimer - dt);
        }
        if (this.isDashing) {
            return;
        }

        let v = this.rb.linearVelocity;

        if (this.isDead || this.isHit) {
            if (!this.isCrowdControlled()) {
                v.x = 0;
            }
            this.rb.linearVelocity = v;
            this.updateAnimation();
            return;
        }

        if (this.isDefending) {
            v.x = 0;
            this.rb.linearVelocity = v;
            this.updateAnimation();
            return;
        }

        if (this.isAttacking) {
            v.x = this.moveDir * this.speed * 0.45;
            this.rb.linearVelocity = v;

            if (this.moveDir !== 0 && this.facingDir !== this.moveDir) {
                this.facingDir = this.moveDir;
                this.updateFacing();
            }

            this.updateAnimation();
            return;
        }

        this.updateGravityScale();

        v.x = this.updateHorizontalVelocity(v.x, dt);
        this.rb.linearVelocity = v;

        if (this.moveDir !== 0 && this.facingDir !== this.moveDir) {
            this.facingDir = this.moveDir;
            this.updateFacing();
        }

        this.updateAnimation();
        // console.log("facing:",this.facingDir);
    }

    updateAnimation() {
        const activeAirAttackClip = this.getExistingAnimClip(this.jumpAttackClip, this.animJumpAttack, 'air_atk', this.attackClip, this.animAttack);
        const activeJumpUpClip = this.getExistingAnimClip(this.jumpClip, this.animJump, 'j_up', 'jump');
        const activeJumpDownClip = this.getExistingAnimClip(this.jumpDownClip, this.animJumpDown, 'j_down', activeJumpUpClip, 'jump');

        if (this.isDead) {
            this.playAnim(this.getExistingAnimClip(this.deathClip, this.animDeath, 'death'));
            return;
        }

        if (this.isHit) {
            this.playAnim(this.getExistingAnimClip(this.takeHitClip, this.animTakeHit, 'take_hit'));
            return;
        }

        if (this.isDefending) {
            this.playAnim(this.getExistingAnimClip(this.defendClip, this.animDefend, 'defend'));
            return;
        }

        if (this.isAttacking || this.isAirAttacking) {
            return;
        }

        if (this.isDashing) {
            this.playAnim(this.getExistingAnimClip(this.dashClip, this.animDash, 'roll', 'dash'));
        } else if (!this.onGround || (this.rb && this.rb.linearVelocity.y < -50)) {
            // 蝚砌???隞塚?Box2D EndContact ??? 1~2 撟嚗???漲?文??迤?其??賬雿征銝?
            if (!activeAirAttackClip || this.currentAnim !== activeAirAttackClip) {
                // 閫?交???j_up嚗?憒?Priestess嚗??湔挾蝛箔葉?賜 j_down嚗???
                const verticalVelocity = this.rb ? this.rb.linearVelocity.y : 0;
                if (Math.abs(verticalVelocity) < this.airborneAnimationVelocityThreshold) {
                    this.playAnim(this.moveDir !== 0
                        ? this.getExistingAnimClip(this.runClip, this.animRun, 'run')
                        : this.getExistingAnimClip(this.idleClip, this.animIdle, 'idle'));
                } else {
                    this.playAnim(verticalVelocity >= 0
                        ? activeJumpUpClip
                        : (activeJumpDownClip || activeJumpUpClip));
                }
            }
        } else if (this.moveDir !== 0) {
            this.playAnim(this.getExistingAnimClip(this.runClip, this.animRun, 'run'));
        } else {
            this.playAnim(this.getExistingAnimClip(this.idleClip, this.animIdle, 'idle'));
        }


    }

    // FIXED: implement PlayerController
    localOnKeyDown(event: cc.Event.EventKeyboard) {

        // ?孵??萇???
        if (event.keyCode === cc.macro.KEY.w || event.keyCode === cc.macro.KEY.up) {
            this.upPressed = true;
        }
        if (event.keyCode === cc.macro.KEY.s || event.keyCode === cc.macro.KEY.down) {
            this.downPressed = true;
        }
        // if (this.switchPresetByNumberKey) {
        //     const k = event.keyCode;
        //     // Cocos 2.x: 1=49, 2=50, 3=51嚗摮?? 1=97, 2=98, 3=99
        //     if (k === 49 || k === 97) {
        //         this.switchPreset(CharacterPreset.Monk);
        //     }
        //     if (k === 50 || k === 98) {
        //         this.switchPreset(CharacterPreset.Priestess);
        //     }
        //     if (k === 51 || k === 99) {
        //         this.switchPreset(CharacterPreset.Hashashin);
        //     }
        // }

        // TODO: delete this
        if (event.keyCode === cc.macro.KEY.l) {
            this.takeDamage(this.debugHitDamage);
            return;
        }

        // TODO: delete this
        if (event.keyCode === cc.macro.KEY.p) {
            NetworkManager.instance.spawnPrefab("exampleProjectilePrefab", {
                x: this.node.x,
                y: this.node.y,
            });
            return;
        }

        if (
            !this.isDead &&
            !this.isHit &&
            !this.isDashing &&
            !this.isDefending &&
            !this.isAttacking &&
            !this.isAirAttacking &&
            (event.keyCode === cc.macro.KEY.w || event.keyCode === cc.macro.KEY.up || event.keyCode === cc.macro.KEY.space) &&
            this.onGround &&
            this.rb
        ) {
            const velocity = this.rb.linearVelocity;
            velocity.y = this.jumpSpeed;
            this.rb.linearVelocity = velocity;
            this.startJumpCornerCorrection();
            this.onGround = false;
            this.groundContactCount = 0;
            this.updateAnimation();
        } else if (
            !this.isDead &&
            !this.isHit &&
            !this.isDashing &&
            (event.keyCode === cc.macro.KEY.w || event.keyCode === cc.macro.KEY.up || event.keyCode === cc.macro.KEY.space) &&
            !this.onGround &&
            !this.airJumpUsed &&
            this.rb
        ) {
            // 二段跳
            this.airJumpUsed = true;
            const v = this.rb.linearVelocity;
            v.y = this.jumpSpeed;
            this.rb.linearVelocity = v;
            this.startJumpCornerCorrection();
            this.updateAnimation();
        }

        if (this.isDead || this.isHit || this.isDashing) return;

        if (event.keyCode === cc.macro.KEY.a) {
            this.leftPressed = true;
            this.refreshMoveDir();
        }
        if (event.keyCode === cc.macro.KEY.d) {
            this.rightPressed = true;
            this.refreshMoveDir();
        }
        if (event.keyCode === cc.macro.KEY.shift || event.keyCode === cc.macro.KEY.g) {
            this.dash();
        }
        if (event.keyCode === cc.macro.KEY.j) {
            this.useMelee();
        }
        if (event.keyCode === cc.macro.KEY.k) {
            this.useSkill2();
        }
        if (event.keyCode === cc.macro.KEY.l) {
            this.useSkill3();
        }
        if (event.keyCode === cc.macro.KEY.i) {
            this.startDefend();
        }
        if (event.keyCode === cc.macro.KEY.u) {
            this.useSuper();
        }
    }

    // FIXED: implement PlayerController
    localOnKeyUp(event: cc.Event.EventKeyboard) {
        if (event.keyCode === cc.macro.KEY.w || event.keyCode === cc.macro.KEY.up) {
            this.upPressed = false;
        }
        if (event.keyCode === cc.macro.KEY.s || event.keyCode === cc.macro.KEY.down) {
            this.downPressed = false;
        }
        if (event.keyCode === cc.macro.KEY.a) {
            this.leftPressed = false;
            this.refreshMoveDir();
        }
        if (event.keyCode === cc.macro.KEY.d) {
            this.rightPressed = false;
            this.refreshMoveDir();
        }
    }


    requestDirectionalAttack() {
        if (this.isDead || this.isHit || this.isDashing || this.isDefending) {
            return;
        }

        if (!this.onGround) {
            const airAttackClip = this.getExistingAnimClip(this.jumpAttackClip, this.animJumpAttack, 'air_atk', this.attackClip, this.animAttack);
            if (!airAttackClip) {
                this.updateAnimation();
                return;
            }

            //??蝛箔葉?格蝣唳?蝞?top)---------------------------------------------------
            // const Collider = this.airAttackHitBox.getComponent(cc.PhysicsBoxCollider);
            // if (!Collider) return;
            // Collider.enabled = true;
            // this.scheduleOnce(() => {
            //     Collider.enabled = false;
            //     Collider.apply();
            // }, 0.2);

            // this.airAttackHitBox.setPosition(cc.v2(8, 6));
            // this.airAttackHitBox.active = true;
            // const col = this.airAttackHitBox.getComponent(cc.PhysicsBoxCollider);
            // col.enabled = true;
            // col.apply();
            // const rb = this.airAttackHitBox.getComponent(cc.RigidBody);
            // rb.syncPosition(true);

            // this.scheduleOnce(() => {
            //     col.enabled = false;
            //     col.apply();

            //     this.airAttackHitBox.active = false;
            // }, 0.1);

            // FIXED: new hit box logic
            this.spawnAttackHitBox(
                "groundMonkAirAttack",  // attackType: ??銝脣??策 beAttacked??
                cc.v2(0, 0),            // center: 蝣唳?蝞曹葉敹漣璅??詨??潛摰?
                cc.v2(70, 30),          // size: 蝣唳?蝞勗祝摨艾?摨?
                0.1,                    // duration: 蝣唳?蝞勗??典嗾蝘??芸?瘨仃
                3,                      // damage: 鋡恍１?唳????撠?
                100                     // kbScale: knockback憭批?
            );


            //??蝛箔葉?格蝣唳?蝞?bottom)---------------------------------------------------

            this.isAirAttacking = true;
            this.attackToken++;
            this.playAttackSfx(2);
            this.playAnim(airAttackClip, true);

            this.anim.once('finished', () => {
                this.isAirAttacking = false;
                this.currentAnim = '';
                this.updateAnimation();
            });
            return;
        }

        console.log("use normal attack");
        //???圈?格蝣唳?蝞?top)---------------------------------------------------
        // const attackCollider = this.normalAttackHitBox.getComponent(cc.PhysicsBoxCollider);
        // if (!attackCollider) return;
        // const attackDir = this.facingDir;
        // if (this.comboStep > 2) {
        //     this.scheduleOnce(() => {
        //         attackCollider.size = cc.size(10, 20);
        //         attackCollider.offset = attackDir === 1 ? cc.v2(17, 6) : cc.v2(-17, 6);
        //         attackCollider.enabled = false;
        //         attackCollider.apply();
        //     }, 0.1);

        //     this.scheduleOnce(() => {
        //         attackCollider.size = cc.size(35, 35);
        //         attackCollider.offset = attackDir === 1 ? cc.v2(20, 0) : cc.v2(-20, 0);
        //         attackCollider.enabled = true;
        //         attackCollider.apply();

        //         this.scheduleOnce(() => {
        //             attackCollider.enabled = false;
        //             attackCollider.size = cc.size(10, 20);
        //             attackCollider.offset = attackDir === 1 ? cc.v2(17, 6) : cc.v2(-17, 6);
        //             attackCollider.apply();
        //         }, 0.1);
        //     }, 0.6);

        // }
        // else{
        //     //attackCollider.offset = attackDir === 1 ? cc.v2(17, 6) : cc.v2(-17, 6);
        //     attackCollider.offset = cc.v2(17, 6);
        //     attackCollider.enabled = true;
        //     attackCollider.apply();

        //     this.scheduleOnce(() => {
        //         attackCollider.enabled = false;
        //         attackCollider.apply();
        //     }, 0.1);
        // }
        // console.log("attack enabled =", attackCollider.enabled);


        // Old hit box logic
        // this.normalAttackHitBox.setPosition(cc.v2(9, 6));
        // this.normalAttackHitBox.active = true;
        // const col = this.normalAttackHitBox.getComponent(cc.PhysicsBoxCollider);
        // col.enabled = true;
        // col.apply();
        // const rb = this.normalAttackHitBox.getComponent(cc.RigidBody);
        // rb.syncPosition(true);

        // this.scheduleOnce(() => {
        //     col.enabled = false;
        //     col.apply();

        //     this.normalAttackHitBox.active = false;
        // }, 0.1);


        // FIXED: new hit box logic
        this.spawnAttackHitBox(
            "groundMonkNormalAttack",
            cc.v2(10, 6),
            cc.v2(10, 20),
            0.1,
            2,
            100
        );

        //???圈?格蝣唳?蝞?bottom)---------------------------------------------------
        if (this.upPressed) {
            if (this.playAnim('up_atk', true)) {
                this.anim.once('finished', () => {
                    this.updateAnimation();
                });
                return;
            }

            this.startComboStep(1);
            return;
        }

        if (this.downPressed) {
            if (this.playAnim('down_atk', true)) {
                this.anim.once('finished', () => {
                    this.updateAnimation();
                });
                return;
            }

            this.startComboStep(1);
            return;
        }

        if (!this.isAttacking) {
            this.startComboStep(1);
            return;
        }

        if (this.comboStep < 3) {
            this.startComboStep(this.comboStep + 1);
        }
    }

    refreshMoveDir() {
        if (this.leftPressed === this.rightPressed) {
            this.moveDir = 0;
            return;
        }
        this.moveDir = this.leftPressed ? -1 : 1;
    }

    private updateHorizontalVelocity(currentX: number, dt: number): number {
        const targetX = this.moveDir * this.speed;
        if (!this.onGround) {
            return targetX;
        }

        const hasInput = this.moveDir !== 0;
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

    startDefend() {
        if (this.isDead || this.isHit || this.isDashing || this.isAttacking || this.isAirAttacking) {
            return;
        }
        if (this.defendCooldownRemaining > 0) {
            return;
        }
        if (!this.onGround) {
            return;
        }
        if (this.isDefending) {
            return;
        }

        const clip = this.getExistingAnimClip(this.defendClip, this.animDefend, 'defend');
        if (!clip) {
            return;
        }

        //???脩戌蝣唳?蝞?top)---------------------------------------------------------------------------------------
        // const Collider = this.defendHitBox.getComponent(cc.PhysicsBoxCollider);
        // const defendDir = this.facingDir;
        // Collider.offset = (defendDir === 1) ? cc.v2(17, 0) : cc.v2(-17, 0);
        // if (!Collider) return;
        // Collider.enabled = true;
        // this.scheduleOnce(()=>{
        //     Collider.enabled = false;
        // }, 0.8);

        // this.defendHitBox.setPosition(cc.v2(10, 0));
        //     this.defendHitBox.active = true;
        //     const col = this.defendHitBox.getComponent(cc.PhysicsBoxCollider);
        //     col.enabled = true;
        //     col.apply();
        //     const rb = this.defendHitBox.getComponent(cc.RigidBody);
        //     rb.syncPosition(true);

        //     this.scheduleOnce(() => {
        //         col.enabled = false;
        //         col.apply();

        //         this.defendHitBox.active = false;
        //     }, 0.1);


        //???脩戌蝣唳?蝞?bottom)---------------------------------------------------------------------------------------

        this.isDefending = true;
        this.defendCooldownRemaining = Math.max(0, this.defendCooldown);
        if (this.rb) {
            const v = this.rb.linearVelocity;
            v.x = 0;
            this.rb.linearVelocity = v;
        }
        this.playAnim(clip, true);

        const defendState = this.anim ? this.anim.getAnimationState(clip) : null;
        const defendDuration = defendState ? defendState.duration / Math.max(defendState.speed || 1, 0.01) : 0.3;
        this.unschedule(this.stopDefend);
        this.scheduleOnce(this.stopDefend, Math.max(defendDuration, 0.05) + 0.02);
    }

    stopDefend() {
        if (!this.isDefending) {
            return;
        }

        //???脩戌蝣唳?蝞?top)---------------------------------------------------------------------------------------
        // const Collider = this.defendHitBox.getComponent(cc.PhysicsBoxCollider);
        // if (!Collider) return;
        // Collider.enabled = false;

        //???脩戌蝣唳?蝞?bottom)---------------------------------------------------------------------------------------

        this.isDefending = false;
        this.currentAnim = '';
        this.updateAnimation();
    }

    requestSpecialAttack() {
        this.useSkill2();
    }

    useMelee() {
        if (this.isWaterPriestessCharacter()) {
            this.useWaterPriestessMelee();
            return;
        }
        this.requestDirectionalAttack();
    }

    useSkill2() {
        if (this.isWaterPriestessCharacter()) {
            this.useWaterPriestessSkill2();
            return;
        }

        if (this.skill2CooldownRemaining > 0) {
            return;
        }

        if (this.startConfiguredAttack(
            this.getExistingAnimClip(this.attack2Clip, this.animAttack2, '2_atk', this.specialAttackClip, this.animSpecialAttack, 'sp_atk'),
            "groundMonkSpecialAttack",
            cc.v2(10, 0),
            cc.v2(40, 34),
            0.8,
            this.skill2Damage,
            this.skill2Knockback
        )) {
            this.skill2CooldownRemaining = Math.max(0, this.skill2Cooldown);
        }
    }

    useSkill3() {
        if (this.isWaterPriestessCharacter()) {
            this.useWaterPriestessSkill3();
            return;
        }

        if (this.skill3CooldownRemaining > 0) {
            return;
        }

        const clip = this.getExistingAnimClip(this.skill3Clip, this.animSkill3, this.attack3Clip, this.animAttack3, '3_atk', this.specialAttackClip, this.animSpecialAttack, 'sp_atk');
        if (this.startConfiguredAttack(
            clip,
            "groundMonkSkill3Attack",
            cc.v2(12, 2),
            cc.v2(56, 40),
            0.45,
            this.skill3Damage,
            this.skill3Knockback
        )) {
            this.skill3CooldownRemaining = Math.max(0, this.skill3Cooldown);
        }
    }

    useSuper() {
        if (this.isWaterPriestessCharacter()) {
            this.useWaterPriestessSuper();
            return;
        }

        if (this.superCooldownRemaining > 0) {
            return;
        }

        const clip = this.getExistingAnimClip(this.superClip, this.animSuper, this.specialAttackClip, this.animSpecialAttack, 'sp_atk', this.skill3Clip, this.animSkill3);
        if (this.startConfiguredAttack(
            clip,
            "groundMonkSuperAttack",
            cc.v2(18, 2),
            cc.v2(90, 52),
            0.55,
            this.superDamage,
            this.superKnockback
        )) {
            this.superCooldownRemaining = Math.max(0, this.superCooldown);
        }
    }

    private startConfiguredAttack(
        clip: string,
        attackType: string,
        center: cc.Vec2,
        size: cc.Vec2,
        duration: number,
        damage: number,
        knockback: number
    ): boolean {
        const playback = this.startSpecialAttackPlayback(clip);
        if (!playback) {
            return false;
        }

        this.spawnAttackHitBox(attackType, center, size, duration, damage, knockback);
        return true;
    }

    private startSpecialAttackPlayback(
        clip: string,
        minimumDuration: number = 0,
        playSpecialSfx: boolean = true
    ): { playbackToken: number; playbackDuration: number } | null {
        if (this.isDead || this.isHit || this.isDashing || this.isAttacking || this.isAirAttacking) {
            return null;
        }

        if (!clip) {
            return null;
        }

        this.isAttacking = true;
        this.comboStep = 0;
        this.comboQueued = false;
        this.attackToken++;
        this.attackPlaybackToken++;

        if (this.rb) {
            const v = this.rb.linearVelocity;
            v.x = 0;
            this.rb.linearVelocity = v;
        }

        if (playSpecialSfx) {
            this.playSpecialAttackSfx();
        }
        this.playAnim(clip, true);

        const playbackToken = this.attackPlaybackToken;
        const state = this.anim ? this.anim.getAnimationState(clip) : null;
        const playbackDuration = state ? state.duration / Math.max(state.speed || 1, 0.01) : 0.5;
        const effectiveDuration = Math.max(playbackDuration, minimumDuration, 0.05);

        this.unschedule(this.onAttackStepTimeout);
        this.anim.off('finished', this.onAttackAnimFinished, this);
        this.anim.once('finished', this.onAttackAnimFinished, this);
        this.scheduleOnce(() => {
            if (this.attackPlaybackToken !== playbackToken || !this.isAttacking) {
                return;
            }
            this.onAttackStepTimeout();
        }, effectiveDuration + 0.05);

        return {
            playbackToken,
            playbackDuration: effectiveDuration,
        };
    }

    private schedulePlaybackHitBox(
        attackType: string,
        center: cc.Vec2,
        size: cc.Vec2,
        duration: number,
        damage: number,
        knockback: number,
        delay: number,
        playbackToken: number,
        requireAttacking: boolean = true
    ) {
        this.scheduleOnce(() => {
            if (
                this.isDead
                || !cc.isValid(this.node)
                || this.attackPlaybackToken !== playbackToken
                || (requireAttacking && !this.isAttacking)
            ) {
                return;
            }

            this.spawnAttackHitBox(
                attackType,
                center,
                size,
                duration,
                damage,
                knockback
            );
        }, Math.max(0, delay));
    }

    private isWaterPriestessCharacter(): boolean {
        return this.node.name === 'water_priestess' || this.animRun === 'walk';
    }

    private useWaterPriestessMelee() {
        const clip = this.getExistingAnimClip(this.attackClip, this.animAttack, 'atk', '1_atk');
        const playback = this.startSpecialAttackPlayback(clip, 0, false);
        if (!playback) {
            return;
        }

        this.playAttackSfx(1);

        this.schedulePlaybackHitBox(
            "waterPriestessMeleeAttack",
            cc.v2(80, 8),
            cc.v2(96, 42),
            0.12,
            10,
            100,
            0.08,
            playback.playbackToken
        );
    }

    private useWaterPriestessSkill2() {
        if (this.skill2CooldownRemaining > 0) {
            return;
        }

        const clip = this.getExistingAnimClip(
            this.attack2Clip,
            this.animAttack2,
            '2_atk',
            this.specialAttackClip,
            this.animSpecialAttack,
            'sp_atk'
        );
        const playback = this.startSpecialAttackPlayback(clip, 1.05);
        if (!playback) {
            return;
        }

        this.skill2CooldownRemaining = Math.max(0, this.skill2Cooldown);

        this.schedulePlaybackHitBox(
            "waterPriestessSkill2Short",
            cc.v2(80, 8),
            cc.v2(96, 42),
            0.12,
            this.skill2Damage,
            this.skill2Knockback,
            0.08,
            playback.playbackToken
        );

        this.schedulePlaybackHitBox(
            "waterPriestessSkill2Long",
            cc.v2(180, 10),
            cc.v2(220, 36),
            0.15,
            this.skill2Damage,
            this.skill2Knockback,
            1,
            playback.playbackToken,
            false
        );
    }

    private useWaterPriestessSkill3() {
        if (this.skill3CooldownRemaining > 0) {
            return;
        }

        const clip = this.getExistingAnimClip(
            this.skill3Clip,
            this.animSkill3,
            this.attack3Clip,
            this.animAttack3,
            '3_atk',
            this.specialAttackClip,
            this.animSpecialAttack,
            'sp_atk'
        );
        const playback = this.startSpecialAttackPlayback(clip);
        if (!playback) {
            return;
        }

        this.skill3CooldownRemaining = Math.max(0, this.skill3Cooldown);

        for (let delay = 0; delay < playback.playbackDuration; delay += 0.5) {
            const remainingControlDuration = Math.max(0.05, playback.playbackDuration - delay);
            const controlAttackType = `${WATER_PRIESTESS_SKILL3_CONTROL_PREFIX}${remainingControlDuration.toFixed(2)}`;

            this.schedulePlaybackHitBox(
                controlAttackType,
                cc.v2(118, 14),
                cc.v2(320, 180),
                0.12,
                0,
                220,
                delay,
                playback.playbackToken
            );

            this.schedulePlaybackHitBox(
                "waterPriestessSkill3Damage",
                cc.v2(80, 8),
                cc.v2(96, 42),
                0.12,
                this.skill3Damage,
                0,
                delay,
                playback.playbackToken
            );
        }
    }

    private useWaterPriestessSuper() {
        if (this.superCooldownRemaining > 0) {
            return;
        }

        const clip = this.getExistingAnimClip(
            this.superClip,
            this.animSuper,
            this.specialAttackClip,
            this.animSpecialAttack,
            'sp_atk',
            this.skill3Clip,
            this.animSkill3
        );
        const playback = this.startSpecialAttackPlayback(clip);
        if (!playback) {
            return;
        }

        this.superCooldownRemaining = Math.max(0, this.superCooldown);
        this.schedulePlaybackHitBox(
            "waterPriestessSuperAttack",
            cc.v2(118, 14),
            cc.v2(320, 180),
            0.12,
            this.superDamage,
            this.superKnockback,
            Math.max(0, playback.playbackDuration - 0.5),
            playback.playbackToken
        );
    }

    doJump() {
        // ?迤?瑁?頝唾?嚗???buffer/coyote嚗??單???湧漲
        this.jumpBufferTimer = 0;
        this.coyoteTimer = 0;
        this.rb.gravityScale = this.jumpGravityScale;
        const v = this.rb.linearVelocity;
        v.y = this.jumpSpeed;
        this.rb.linearVelocity = v;
        this.startJumpCornerCorrection();
        this.onGround = false;
        this.groundContactCount = 0;
        this.updateAnimation();
    }

    dash() {
        if (this.isDashing || this.isDead || this.isHit || this.isAttacking) return;

        this.isDashing = true;
        const originalGravity = this.rb.gravityScale;
        this.rb.gravityScale = 0;

        this.playDashSfx();
        this.playAnim(this.getExistingAnimClip(this.dashClip, this.animDash, 'roll', 'dash'), true);

        let v = this.rb.linearVelocity;
        v.x = this.facingDir * this.dashSpeed;
        v.y = 0;
        this.rb.linearVelocity = v;

        this.scheduleOnce(() => {
            this.isDashing = false;
            this.rb.gravityScale = originalGravity;
            let v = this.rb.linearVelocity;
            v.x = 0;
            this.rb.linearVelocity = v;
            this.updateAnimation();
        }, 0.2);
    }

    private isGroundContactForPlayer(contact: cc.PhysicsContact): boolean {
        const worldManifold = contact.getWorldManifold();
        const normal = worldManifold && worldManifold.normal;
        if (!normal) {
            return false;
        }

        return normal.y < -0.5 && Math.abs(normal.y) >= Math.abs(normal.x);
    }

    private startJumpCornerCorrection(): void {
        this.jumpCornerCorrectionTimer = this.JUMP_CORNER_CORRECTION_TIME;
    }

    onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.Collider, otherCollider: cc.Collider) {
        //console.log("contacted");
        if (this.isGroundNode(otherCollider.node) && this.isGroundContactForPlayer(contact)) {
            (contact as any)._isGroundForPlayer = true;
            this.groundContactCount++;
            this.onGround = true;
            this.airJumpUsed = false;
            this.coyoteTimer = this.COYOTE_TIME;
            this.updateAnimation();
            return;

            const normal = contact.getWorldManifold().normal;
            // Box2D normal ??selfCollider ?? otherCollider嚗?
            // ?拙振頦拙撟喳銝? normal ?晞摰???撟喳?? ??嚗?隞?normal.y < 0
            const isMostlyVerticalContact = Math.abs(normal.y) > Math.abs(normal.x);
            const playerIsAboveGround = selfCollider.node.y >= otherCollider.node.y;
            if (isMostlyVerticalContact && playerIsAboveGround) {
                (contact as any)._isGroundForPlayer = true;
                this.groundContactCount++;
                this.onGround = this.groundContactCount > 0;
                this.coyoteTimer = this.COYOTE_TIME;
            }
        }

        // FIXED: triggered when falling out of map
        if (otherCollider.node.name == "Out Of Bound Trigger") {
            this.deductHp(999);
        }

        // else if(otherCollider.node.name === "enemy"){
        //     //if(!selfCollider.enabled) return;
        //     console.log("contacted by tag:", selfCollider.tag, "other:", otherCollider.node.name);
        //     switch(selfCollider.tag){
        //         case 0:                     //鋡急???
        //             this.takeDamage(1);
        //         break;

        //         case 1:                     //?格?鈭?
        //             if(!this.isAttacking) return;
        //             if(this.facingDir === 1) this.knockback(otherCollider.node,200,0)
        //             else this.knockback(otherCollider.node,-200,0)

        //         break;

        //         case 2:                     //?脩戌?唬犖
        //             if(!this.isDefending) return;
        //             if(this.facingDir === 1) this.knockback(otherCollider.node,50,0)
        //                 else this.knockback(otherCollider.node,-50,0)
        //         break;

        //         case 3:                     //???唬犖
        //             if(!this.isAttacking) return;
        //             if(this.facingDir === 1) this.knockback(otherCollider.node,50,200)
        //                 else this.knockback(otherCollider.node,-50,200)
        //         break;

        //         case 4:                     //蝛箔葉憌腺?唬犖
        //             if(!this.isAirAttacking) return;
        //             if(this.facingDir === 1) this.knockback(otherCollider.node,0,-200)
        //                 else this.knockback(otherCollider.node,0,-200)
        //         break;
        //     }

        // }
    }

    onPreSolve(contact: cc.PhysicsContact, selfCollider: cc.Collider, otherCollider: cc.Collider) {
        if (!this.rb || this.jumpCornerCorrectionTimer <= 0 || this.rb.linearVelocity.y <= 0) {
            return;
        }

        if (otherCollider.node.name === "Out Of Bound Trigger") {
            return;
        }

        if (this.isGroundNode(otherCollider.node) && this.isGroundContactForPlayer(contact)) {
            return;
        }

        const worldManifold = contact.getWorldManifold();
        const normal = worldManifold && worldManifold.normal;
        if (!normal) {
            return;
        }

        const isSideContact = Math.abs(normal.x) > Math.abs(normal.y);
        const isCeilingContact = normal.y > 0.2;
        const hasHorizontalIntent = this.moveDir !== 0 || Math.abs(this.rb.linearVelocity.x) > 1;
        if (isSideContact || (isCeilingContact && hasHorizontalIntent)) {
            contact.disabledOnce = true;
        }
    }

    onEndContact(contact: cc.PhysicsContact, selfCollider: cc.Collider, otherCollider: cc.Collider) {
        if (!this.isGroundNode(otherCollider.node)) {
            return;
        }

        // 撠迂??嚗??begin ?◤璅???ground ?閫賂?end ????count
        if ((contact as any)._isGroundForPlayer) {
            (contact as any)._isGroundForPlayer = false;
            this.groundContactCount = Math.max(0, this.groundContactCount - 1);
            this.onGround = this.groundContactCount > 0;
            // ???Ｖ??? coyote 閮?嚗策?拙振撖祇??隞亥歲
            if (!this.onGround) {
                this.coyoteTimer = this.COYOTE_TIME;
            }
        }
    }

    updateFacing() {
        this.node.scaleX = this.baseScaleX * this.facingDir;

    }

    updateGravityScale() {
        if (!this.rb) {
            return;
        }

        if (this.onGround || this.isDashing) {
            this.rb.gravityScale = 1;
            return;
        }

        // 蝛箔葉??嚗翰??憓?
        if (this.downPressed) {
            this.rb.gravityScale = this.fastFallGravityScale;
            return;
        }

        this.rb.gravityScale = this.rb.linearVelocity.y > 0 ? this.jumpGravityScale : this.fallGravityScale;
    }

    hasAnimClip(animName: string): boolean {
        return !!animName && !!this.anim && this.anim.getClips().some((clip) => clip && clip.name === animName);
    }

    private getClipName(clipLike: ClipLike): string {
        if (!clipLike) {
            return '';
        }

        if (typeof clipLike === 'string') {
            return clipLike;
        }

        return clipLike.name || '';
    }

    getExistingAnimClip(...names: ClipLike[]): string {
        for (const entry of names) {
            const name = this.getClipName(entry);
            if (this.hasAnimClip(name)) {
                return name;
            }
        }
        return '';
    }


    playAnim(animName: string, forceReplay: boolean = false): boolean {
        if (!animName) {
            return false;
        }

        if (this.currentAnim === animName && !forceReplay) {
            return true;
        }

        if (!this.hasAnimClip(animName)) {
            cc.warn(`[PlayerController] Animation clip not found: ${animName}`);
            return false;
        }

        if (forceReplay) {
            if (this.isLocal) {
                NetworkManager.instance.stopAnimation(animName);
            } else {
                this.anim.stop(animName);
            }
        }

        this.currentAnim = animName;

        if (this.isLocal) {
            NetworkManager.instance.playAnimation(animName);
        } else {
            this.anim.play(animName);
        }
        return true;
    }

    requestAttack() {
        if (this.isDead || this.isHit || this.isDashing) {
            return;
        }

        if (!this.onGround) {
            const airAttackClip = this.getExistingAnimClip(this.jumpAttackClip, this.animJumpAttack, 'air_atk', this.attackClip, this.animAttack);
            if (!airAttackClip) {
                this.updateAnimation();
                return;
            }

            this.isAirAttacking = true;
            this.attackToken++;
            this.playAttackSfx(2);
            this.playAnim(airAttackClip, true);
            this.anim.once('finished', () => {
                this.isAirAttacking = false;
                this.currentAnim = '';
                this.updateAnimation();
            });
            return;
        }

        if (!this.isAttacking) {
            this.startComboStep(1);
            return;
        }

        if (this.comboStep < 3) {
            this.startComboStep(this.comboStep + 1);
        }
    }

    startComboStep(step: number) {
        this.isAttacking = true;
        this.comboStep = step;
        this.comboQueued = false;
        this.attackToken++;
        this.attackPlaybackToken++;

        const clipName = this.getComboClip(step);
        this.playAttackSfx(step);
        this.playAnim(clipName, true);

        const playbackToken = this.attackPlaybackToken;
        const attackState = this.anim ? this.anim.getAnimationState(clipName) : null;
        const duration = attackState ? attackState.duration / Math.max(attackState.speed || 1, 0.01) : 0.3;

        this.unschedule(this.onAttackStepTimeout);
        this.anim.off('finished', this.onAttackAnimFinished, this);
        this.anim.once('finished', this.onAttackAnimFinished, this);
        this.scheduleOnce(() => {
            if (this.attackPlaybackToken !== playbackToken || !this.isAttacking || this.comboStep !== step) {
                return;
            }
            this.onAttackStepTimeout();
        }, Math.max(duration, 0.05) + 0.05);
    }

    onAttackStepTimeout() {
        this.anim.off('finished', this.onAttackAnimFinished, this);
        this.onAttackAnimFinished();
    }

    onAttackAnimFinished() {
        if (!this.isAttacking) {
            return;
        }

        if (this.comboQueued && this.comboStep < 3) {
            this.startComboStep(this.comboStep + 1);
            return;
        }

        this.isAttacking = false;
        this.comboStep = 0;
        this.comboQueued = false;
        this.updateAnimation();
    }

    getComboClip(step: number): string {
        if (step === 1) {
            return this.getExistingAnimClip(this.attackClip, this.animAttack, '1_atk', 'atk', 'attack', this.attack2Clip, this.animAttack2, this.attack3Clip, this.animAttack3);
        }
        if (step === 2) {
            return this.getExistingAnimClip(this.attack2Clip, this.animAttack2, '2_atk', this.attackClip, this.animAttack, '1_atk', this.attack3Clip, this.animAttack3);
        }
        return this.getExistingAnimClip(this.attack3Clip, this.animAttack3, '3_atk', this.attack2Clip, this.animAttack2, '2_atk', this.attackClip, this.animAttack, '1_atk');
    }

    takeDamage(amount: number) {
        if (this.isDead || amount <= 0) {
            return;
        }

        // ?脩戌銝哨?靘?皜嚗摰?????其??脣蝖祉
        if (this.isDefending) {
            const reduced = Math.floor(amount * this.defendDamageMultiplier);
            if (reduced <= 0) {
                return;
            }
            amount = reduced;
        }

        // FIXED: calling PlayerController function
        this.deductHp(amount);

        if (this.hp > 0) this.enterHitState();
    }

    enterHitState() {
        this.isAttacking = false;
        this.isAirAttacking = false;
        this.isDefending = false;
        this.comboStep = 0;
        this.comboQueued = false;
        this.isHit = true;

        this.anim.off('finished', this.onAttackAnimFinished, this);
        this.playAnim(this.getExistingAnimClip(this.takeHitClip, this.animTakeHit, 'take_hit'), true);

        this.unschedule(this.exitHitState);
        this.scheduleOnce(this.exitHitState, this.hitRecoverTime);
    }

    exitHitState() {
        if (this.isDead) {
            return;
        }
        if (this.isCrowdControlled()) {
            this.unschedule(this.exitHitState);
            this.scheduleOnce(this.exitHitState, Math.max(0.05, this.getCrowdControlRemaining()));
            return;
        }
        this.isHit = false;
        this.updateAnimation();
    }

    // FIXED: implement PlayerController
    onDeath() {
        if (this.isDead) {
            return;
        }

        this.consumeCrowdControl();
        this.isDead = true;
        const deathWorldPos = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
        console.log('[FX] death explosion at', deathWorldPos.x.toFixed(0), deathWorldPos.y.toFixed(0));
        ParticleEffectManager.playDeath(deathWorldPos, cc.find('Canvas'));
        this.isHit = false;
        this.isAttacking = false;
        this.isAirAttacking = false;
        this.isDefending = false;
        this.comboQueued = false;
        this.comboStep = 0;
        this.moveDir = 0;

        if (this.rb) {
            const v = this.rb.linearVelocity;
            v.x = 0;
            this.rb.linearVelocity = v;
        }

        this.playAnim(this.getExistingAnimClip(this.deathClip, this.animDeath, 'death'));

        // if (this.autoRespawn) {
        //     this.unschedule(this.respawn);
        //     this.scheduleOnce(this.respawn, this.respawnDelay);
        // }
    }

    // applyPreset() {
    //     if (this.characterPreset === CharacterPreset.Custom) {
    //         console.log("CUSTOM");
    //         return;
    //     }

    //     if (this.characterPreset === CharacterPreset.Monk) {
    //         this.animIdle = 'idle';
    //         this.animRun = 'run';
    //         this.animJump = 'j_up';
    //         this.animJumpDown = 'j_down';
    //         this.animDash = 'roll';
    //         this.animAttack = '1_atk';
    //         this.animAttack2 = '2_atk';
    //         this.animAttack3 = '3_atk';
    //         this.animJumpAttack = 'air_atk';
    //         this.animTakeHit = 'take_hit';
    //         this.animDeath = 'death';
    //         return;
    //     }

    //     if (this.characterPreset === CharacterPreset.Priestess) {
    //         this.animIdle = 'idle';
    //         this.animRun = 'walk';      // 韏啗楝??run
    //         this.animJump = 'j_up';     // 瘝?clip ???fallback
    //         this.animJumpDown = 'j_down';
    //         this.animDash = 'surf';     // 銵??surf
    //         this.animAttack = 'atk';    // priestess 蝚砌?畾萄 atk嚗???1_atk嚗?
    //         this.animAttack2 = '2_atk';
    //         this.animAttack3 = '3_atk';
    //         this.animJumpAttack = 'air_atk';
    //         this.animSpecialAttack = 'sp_atk';
    //         this.animDefend = 'defend';
    //         this.animTakeHit = 'take_hit';
    //         this.animDeath = 'death';
    //         return;
    //     }

    //     if (this.characterPreset === CharacterPreset.Hashashin) {
    //         this.animIdle = 'idle';
    //         this.animRun = 'run';
    //         this.animJump = 'j_up';
    //         this.animJumpDown = 'j_down';
    //         this.animDash = 'roll';
    //         this.animAttack = '1_atk';
    //         this.animAttack2 = '2_atk';
    //         this.animAttack3 = '3_atk';
    //         this.animJumpAttack = 'air_atk';
    //         this.animTakeHit = 'take_hit';
    //         this.animDeath = 'death';
    //     }
    // }

    // switchPreset(preset: CharacterPreset) {
    //     this.characterPreset = preset;
    //     this.applyPreset();

    //     this.isAttacking = false;
    //     this.isAirAttacking = false;
    //     this.comboQueued = false;
    //     this.comboStep = 0;
    //     this.isHit = false;
    //     this.isDead = false;
    //     this.hp = this.maxHp;
    //     this.currentAnim = '';

    //     this.updateAnimation();
    // }


    // FIXED: implement PlayerController
    onRestart() {
        this.isDead = false;
        this.isHit = false;
        this.isAttacking = false;
        this.isAirAttacking = false;
        this.isDefending = false;
        this.comboQueued = false;
        this.comboStep = 0;
        this.moveDir = 0;
        this.onGround = true;
        this.groundContactCount = 0;
        this.coyoteTimer = 0;
        this.jumpBufferTimer = 0;
        this.jumpCornerCorrectionTimer = 0;
        this.consumeCrowdControl();
        this.skill2CooldownRemaining = 0;
        this.skill3CooldownRemaining = 0;
        this.defendCooldownRemaining = 0;
        this.superCooldownRemaining = 0;
        this.currentAnim = '';

        // if (this.respawnPoint) {
        //     this.node.setPosition(this.respawnPoint.position);
        // }

        if (this.rb) {
            this.rb.linearVelocity = cc.v2(0, 0);

            if (!this.rb.awake) {
                this.rb.awake = true;
            }
        }


        this.updateAnimation();
    }


    // FIXED: implement PlayerController
    beAttacked(attackType: string, damage: number, knockback: cc.Vec2) {
        if (this.isDead) {
            return;
        }

        const crowdControlDuration = this.parseTaggedDuration(
            attackType,
            WATER_PRIESTESS_SKILL3_CONTROL_PREFIX
        );

        const shouldReactToMetalFinisher = attackType === "metalSuperAttackFinisher";
        if (this.isDefending) {
            damage = Math.floor(damage * this.defendDamageMultiplier);
            if (damage < 0) {
                damage = 0;
            }
            if (damage <= 0 && crowdControlDuration <= 0 && !shouldReactToMetalFinisher) {
                return;
            }
        }

        if (damage > 0) {
            this.deductHp(damage);
        }

        if (this.hp > 0 && (damage > 0 || crowdControlDuration > 0 || shouldReactToMetalFinisher)) {
            if (crowdControlDuration > 0) {
                this.applyCrowdControl(crowdControlDuration);
            }
            this.applyKnockback(knockback);
            this.enterHitState();
            const hitWorldPos = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
            console.log('[FX] beAttacked hit spark at', hitWorldPos.x, hitWorldPos.y);
            ParticleEffectManager.playHit(hitWorldPos, cc.find('Canvas'));
        }

        // TODO: if there're some special attackType, handle it here
        switch (attackType) {
            case "groundMonkAirAttack":
                break
            default:
                break
        }
    }

    private updateAbilityCooldowns(dt: number) {
        this.skill2CooldownRemaining = Math.max(0, this.skill2CooldownRemaining - dt);
        this.skill3CooldownRemaining = Math.max(0, this.skill3CooldownRemaining - dt);
        this.defendCooldownRemaining = Math.max(0, this.defendCooldownRemaining - dt);
        this.superCooldownRemaining = Math.max(0, this.superCooldownRemaining - dt);
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

    private applyVisualPresentation() {
        const visualNode = this.getVisualNode();
        if (!visualNode) {
            return;
        }

        const sprite = this.visualSprite || visualNode.getComponent(cc.Sprite);
        if (!sprite) {
            return;
        }

        visualNode.y = this.visualOffsetY;
        visualNode.scaleX = this.visualScale;
        visualNode.scaleY = this.visualScale;

        sprite.sizeMode = cc.Sprite.SizeMode.RAW;
        sprite.trim = false;
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

    private syncVisualSpriteFrame() {
        if (!this.sourceSprite || !this.visualSprite) {
            return;
        }

        if (this.visualSprite.spriteFrame !== this.sourceSprite.spriteFrame) {
            this.visualSprite.spriteFrame = this.sourceSprite.spriteFrame;
        }
    }

    private ensureAnimationClipsRegistered() {
        if (!this.anim) {
            return;
        }

        const configuredClips = [
            this.idleClip,
            this.runClip,
            this.jumpClip,
            this.jumpDownClip,
            this.dashClip,
            this.attackClip,
            this.attack2Clip,
            this.attack3Clip,
            this.jumpAttackClip,
            this.specialAttackClip,
            this.skill3Clip,
            this.superClip,
            this.defendClip,
            this.takeHitClip,
            this.deathClip,
        ];

        configuredClips.forEach((clip) => {
            if (!clip) {
                return;
            }

            const alreadyRegistered = this.anim.getClips().some((existingClip) => existingClip && existingClip.name === clip.name);
            if (!alreadyRegistered) {
                this.anim.addClip(clip, clip.name);
            }
        });
    }



    // knockback(enemyNode: cc.Node, knockbackX: number, knockbackY: number) {
    //     const rb = enemyNode.getComponent(cc.RigidBody);

    //     if (!rb) return;

    //     rb.linearVelocity = cc.v2(
    //         (knockbackX === 0)? rb.linearVelocity.x : knockbackX,
    //         (knockbackY === 0)? rb.linearVelocity.y : knockbackY,
    //     );
    // }

    // closeInactiveHitboxes() {
    //     const colliders = this.node.getComponentsInChildren(cc.PhysicsBoxCollider);

    //     for (let c of colliders) {
    //         if (c.tag === 1 && !this.isAttacking) {
    //             c.enabled = false;
    //             c.apply();
    //         }

    //         if (c.tag === 2 && !this.isDefending) {
    //             c.enabled = false;
    //             c.apply();
    //         }

    //         if (c.tag === 3 && !this.isAttacking) {
    //             c.enabled = false;
    //             c.apply();
    //         }

    //         if (c.tag === 4 && !this.isAirAttacking) {
    //             c.enabled = false;
    //             c.apply();
    //         }
    //     }
    // }

    // switchPresetByIndex(index: number) {
    //     this.switchPreset(index as CharacterPreset);
    // }

    getHp(): number {
        return this.hp;
    }

    getMaxHp(): number {
        return this.maxHp;
    }

    getHpRatio(): number {
        if (this.maxHp <= 0) {
            return 0;
        }
        return this.hp / this.maxHp;
    }

    getIsDead(): boolean {
        return this.isDead;
    }

    getIsAttacking(): boolean {
        return this.isAttacking;
    }

    getAttackToken(): number {
        return this.attackToken;
    }

    getFacingDir(): number {
        return this.facingDir;
    }
    getComboStep(): number {
        return this.comboStep;
    }
}


