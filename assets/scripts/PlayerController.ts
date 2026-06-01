import AudioManager from './AudioManager';

const { ccclass, property } = cc._decorator;

enum CharacterPreset {
    Custom = 0,
    Monk = 1,
    Priestess = 2,
    Hashashin = 3,
}

@ccclass
export default class PlayerController extends cc.Component {
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
    dashSpeed: number = 1000; // 衝刺速度

    @property
    groundNodeName: string = 'Platform';

    @property({ type: cc.Enum(CharacterPreset) })
    characterPreset: CharacterPreset = CharacterPreset.Custom;

    @property
    switchPresetByNumberKey: boolean = true;

    @property
    animIdle: string = 'idle';

    @property
    animRun: string = 'run';

    @property
    animJump: string = 'j_up';

    @property
    animJumpDown: string = 'j_down';

    @property
    animDash: string = 'roll';

    @property
    animAttack: string = '1_atk';

    @property
    animAttack2: string = '2_atk';

    @property
    animAttack3: string = '3_atk';

    @property
    animJumpAttack: string = 'air_atk';

    @property
    animSpecialAttack: string = 'sp_atk';

    @property
    animDefend: string = 'defend';

    @property({ tooltip: '防禦時受到的傷害比例，0=完全擋下，0.3=只吃 30% 傷害' })
    defendDamageMultiplier: number = 0;

    @property
    animTakeHit: string = 'take_hit';

    @property
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
    monkSpecialSfxResource: string = 'ground_monk——special——attack';

    @property
    attackSfxVolume: number = 0.7;

    @property
    specialAttackSfxVolume: number = 3;

    @property
    attackSfxCooldown: number = 0.12;

    @property
    dashSfxCooldown: number = 0.1;

    private rb: cc.RigidBody = null;
    private moveDir: number = 0;
    private onGround: boolean = false;
    private groundContactCount: number = 0;
    private isDashing: boolean = false;
    private facingDir: number = 1; // 角色面朝的方向，1 for right, -1 for left
    private anim: cc.Animation = null;
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
    private hp: number = 0;
    private attackToken: number = 0;
    private attackPlaybackToken: number = 0;
    // 方向鍵狀態
    private upPressed: boolean = false;
    private downPressed: boolean = false;
    // 跳躍手感：coyote time（離地後的寬限期）與 jump buffer（提前按跳的記憶時間）
    private coyoteTimer: number = 0;
    private jumpBufferTimer: number = 0;
    private readonly COYOTE_TIME: number = 0.12;
    private readonly JUMP_BUFFER_TIME: number = 0.12;
    private lastAttackSfxTime: number = -999;
    private lastDashSfxTime: number = -999;

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;

        this.rb = this.getComponent(cc.RigidBody);
        this.anim = this.getComponent(cc.Animation);

        if (!this.rb) {
            cc.error('[PlayerController] Missing RigidBody on player node');
            return;
        }

        if (!this.anim) {
            cc.error('[PlayerController] Missing Animation on player node');
            return;
        }

        this.rb.enabledContactListener = true;
        this.baseScaleX = Math.abs(this.node.scaleX);
        this.hp = this.maxHp;

        this.applyPreset();
        this.preloadSfx();

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.unschedule(this.respawn);
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

        AudioManager.playEffect(resource, {
            volume: volume,
        });
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

    isPriestessCharacter(): boolean {
        return this.characterPreset === CharacterPreset.Priestess
            || this.animRun === 'walk'
            || this.animDash === 'surf';
    }

    playSpecialAttackSfx() {
        if (this.isPriestessCharacter() && this.priestessSpecialSfxResource) {
            this.playEffectClip(this.priestessSpecialSfxResource, this.specialAttackSfxVolume, this.attackSfxCooldown, 'attack');
            return;
        }

        if (this.monkSpecialSfxResource) {
            this.playEffectClip(this.monkSpecialSfxResource, this.specialAttackSfxVolume, this.attackSfxCooldown, 'attack');
        }
    }

    update(dt: number) {
        // 更新跳躍計時器
        if (this.coyoteTimer > 0) this.coyoteTimer -= dt;
        if (this.jumpBufferTimer > 0) this.jumpBufferTimer -= dt;

        // 若 buffer 內有按跳，且現在能跳（onGround 或還在 coyote time 內），就執行跳
        if (this.jumpBufferTimer > 0 && !this.isDashing && !this.isDead && !this.isHit) {
            if (this.onGround || this.coyoteTimer > 0) {
                this.doJump();
            }
        }

        if (this.isDashing) {
            return;
        }

        let v = this.rb.linearVelocity;

        if (this.isDead || this.isHit) {
            v.x = 0;
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

            if (this.moveDir !== 0) {
                this.facingDir = this.moveDir;
                this.updateFacing();
            }

            this.updateAnimation();
            return;
        }

        this.updateGravityScale();

        v.x = this.moveDir * this.speed;
        this.rb.linearVelocity = v;

        if (this.moveDir !== 0) {
            this.facingDir = this.moveDir;
            this.updateFacing();
        }

        this.updateAnimation();
    }

    updateAnimation() {
        const activeAirAttackClip = this.getExistingAnimClip(this.animJumpAttack, 'air_atk', this.animAttack);
        const activeJumpUpClip = this.getExistingAnimClip(this.animJump, 'j_up', 'jump');
        const activeJumpDownClip = this.getExistingAnimClip(this.animJumpDown, 'j_down', activeJumpUpClip, 'jump');

        if (this.isDead) {
            this.playAnim(this.getExistingAnimClip(this.animDeath, 'death'));
            return;
        }

        if (this.isHit) {
            this.playAnim(this.getExistingAnimClip(this.animTakeHit, 'take_hit'));
            return;
        }

        if (this.isDefending) {
            this.playAnim(this.getExistingAnimClip(this.animDefend, 'defend'));
            return;
        }

        if (this.isAttacking || this.isAirAttacking) {
            return;
        }

        if (this.isDashing) {
            this.playAnim(this.getExistingAnimClip(this.animDash, 'roll', 'dash'));
        } else if (!this.onGround || (this.rb && this.rb.linearVelocity.y < -50)) {
            // 第二個條件：Box2D EndContact 有時會慢 1~2 幀，靠垂直速度判定「正在下落」當作空中
            if (!activeAirAttackClip || this.currentAnim !== activeAirAttackClip) {
                // 角色若沒有 j_up（例如 Priestess），整段空中都用 j_down，避免沒動畫
                const goingUp = this.rb && this.rb.linearVelocity.y > 1;
                let airborneClip: string;
                if (goingUp && activeJumpUpClip) {
                    airborneClip = activeJumpUpClip;
                } else {
                    airborneClip = activeJumpDownClip || activeJumpUpClip;
                }
                this.playAnim(airborneClip);
            }
        } else if (this.moveDir !== 0) {
            this.playAnim(this.getExistingAnimClip(this.animRun, 'run'));
        } else {
            this.playAnim(this.getExistingAnimClip(this.animIdle, 'idle'));
        }
    }

    canReceiveInput(): boolean {
        return !!this.node && this.node.activeInHierarchy;
    }

    onKeyDown(event: cc.Event.EventKeyboard) {
        if (!this.canReceiveInput()) {
            return;
        }

        // 方向鍵狀態
        if (event.keyCode === cc.macro.KEY.w || event.keyCode === cc.macro.KEY.up) {
            this.upPressed = true;
        }
        if (event.keyCode === cc.macro.KEY.s || event.keyCode === cc.macro.KEY.down) {
            this.downPressed = true;
        }
        if (this.switchPresetByNumberKey) {
            const k = event.keyCode;
            // Cocos 2.x: 1=49, 2=50, 3=51；數字鍵盤: 1=97, 2=98, 3=99
            if (k === 49 || k === 97) {
                this.switchPreset(CharacterPreset.Monk);
            }
            if (k === 50 || k === 98) {
                this.switchPreset(CharacterPreset.Priestess);
            }
            if (k === 51 || k === 99) {
                this.switchPreset(CharacterPreset.Hashashin);
            }
        }

        if (event.keyCode === cc.macro.KEY.l) {
            this.takeDamage(this.debugHitDamage);
            return;
        }

        if (this.isDead || this.isHit || this.isDashing) return;

        if(event.keyCode === cc.macro.KEY.a) {
            this.leftPressed = true;
            this.refreshMoveDir();
        }
        if(event.keyCode === cc.macro.KEY.d) {
            this.rightPressed = true;
            this.refreshMoveDir();
        }
        if(event.keyCode === cc.macro.KEY.space) {
            // 不直接跳，先丟進 buffer；update 會根據 onGround / coyote 判斷實際是否起跳
            this.jumpBufferTimer = this.JUMP_BUFFER_TIME;
        }
        if(event.keyCode === cc.macro.KEY.shift) {
            this.dash();
        }
        if(event.keyCode === cc.macro.KEY.j) {
            this.requestDirectionalAttack();
        }
        if(event.keyCode === cc.macro.KEY.k) {
            this.requestSpecialAttack();
        }
        if(event.keyCode === cc.macro.KEY.e) {
            this.startDefend();
        }
    }

    onKeyUp(event: cc.Event.EventKeyboard) {
        if (!this.canReceiveInput()) {
            return;
        }

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
        if (event.keyCode === cc.macro.KEY.e) {
            this.stopDefend();
        }
    }

    requestDirectionalAttack() {
        if (this.isDead || this.isHit || this.isDashing || this.isDefending) {
            return;
        }

        if (!this.onGround) {
            const airAttackClip = this.getExistingAnimClip(this.animJumpAttack, 'air_atk', this.animAttack);
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

    startDefend() {
        if (this.isDead || this.isHit || this.isDashing || this.isAttacking || this.isAirAttacking) {
            return;
        }
        if (!this.onGround) {
            return;
        }
        if (this.isDefending) {
            return;
        }

        const clip = this.getExistingAnimClip(this.animDefend, 'defend');
        if (!clip) {
            return;
        }

        this.isDefending = true;
        if (this.rb) {
            const v = this.rb.linearVelocity;
            v.x = 0;
            this.rb.linearVelocity = v;
        }
        this.playAnim(clip, true);
    }

    stopDefend() {
        if (!this.isDefending) {
            return;
        }
        this.isDefending = false;
        this.currentAnim = '';
        this.updateAnimation();
    }

    requestSpecialAttack() {
        if (this.isDead || this.isHit || this.isDashing || this.isAttacking || this.isAirAttacking) {
            return;
        }

        const clip = this.getExistingAnimClip(this.animSpecialAttack, 'sp_atk');
        if (!clip) {
            return;
        }

        // 把特殊攻擊視為一個普通攻擊段，但鎖死不能接 combo（特殊招獨立、不可中斷自己）
        this.isAttacking = true;
        this.comboStep = 0;
        this.comboQueued = false;
        this.attackToken++;
        this.attackPlaybackToken++;

        // 特殊攻擊時站住不動
        if (this.rb) {
            const v = this.rb.linearVelocity;
            v.x = 0;
            this.rb.linearVelocity = v;
        }

        this.playSpecialAttackSfx();
        this.playAnim(clip, true);

        const playbackToken = this.attackPlaybackToken;
        const state = this.anim ? this.anim.getAnimationState(clip) : null;
        const duration = state ? state.duration / Math.max(state.speed || 1, 0.01) : 0.5;

        this.unschedule(this.onAttackStepTimeout);
        this.anim.off('finished', this.onAttackAnimFinished, this);
        this.anim.once('finished', this.onAttackAnimFinished, this);
        this.scheduleOnce(() => {
            if (this.attackPlaybackToken !== playbackToken || !this.isAttacking) {
                return;
            }
            this.onAttackStepTimeout();
        }, Math.max(duration, 0.05) + 0.05);
    }

    doJump() {
        // 真正執行跳躍：清掉 buffer/coyote，立即施加垂直速度
        this.jumpBufferTimer = 0;
        this.coyoteTimer = 0;
        this.rb.gravityScale = this.jumpGravityScale;
        const v = this.rb.linearVelocity;
        v.y = this.jumpSpeed;
        this.rb.linearVelocity = v;
        this.onGround = false;
    }

    dash() {
        if (this.isDashing || this.isDead || this.isHit || this.isAttacking) return;

        this.isDashing = true;
        const originalGravity = this.rb.gravityScale;
        this.rb.gravityScale = 0;

        this.playDashSfx();
        this.playAnim(this.getExistingAnimClip(this.animDash, 'roll', 'dash'), true);

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

    onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.Collider, otherCollider: cc.Collider) {
        if (otherCollider.node.name !== this.groundNodeName) {
            return;
        }

        const normal = contact.getWorldManifold().normal;
        // Box2D normal 由 selfCollider 指向 otherCollider；
        // 玩家踩在平台上時 normal 由「玩家 → 平台」= 朝下，所以 normal.y < 0
        if (normal.y < -0.5) {
            (contact as any)._isGroundForPlayer = true;
            this.groundContactCount++;
            this.onGround = this.groundContactCount > 0;
            this.coyoteTimer = this.COYOTE_TIME;
        }
    }

    onEndContact(contact: cc.PhysicsContact, selfCollider: cc.Collider, otherCollider: cc.Collider) {
        if (otherCollider.node.name !== this.groundNodeName) {
            return;
        }

        // 對稱處理：只有 begin 時被標記為 ground 的接觸，end 時才扣 count
        if ((contact as any)._isGroundForPlayer) {
            (contact as any)._isGroundForPlayer = false;
            this.groundContactCount = Math.max(0, this.groundContactCount - 1);
            this.onGround = this.groundContactCount > 0;
            // 剛離開地面也啟動 coyote 計時，給玩家寬限期可以跳
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

        // 空中按下：快速下墜
        if (this.downPressed) {
            this.rb.gravityScale = this.fastFallGravityScale;
            return;
        }

        this.rb.gravityScale = this.rb.linearVelocity.y > 0 ? this.jumpGravityScale : this.fallGravityScale;
    }

    hasAnimClip(animName: string): boolean {
        return !!animName && !!this.anim && this.anim.getClips().some((clip) => clip && clip.name === animName);
    }

    getExistingAnimClip(...names: string[]): string {
        for (const name of names) {
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
            this.anim.stop(animName);
        }

        this.currentAnim = animName;
        this.anim.play(animName);
        return true;
    }

    requestAttack() {
        if (this.isDead || this.isHit || this.isDashing) {
            return;
        }

        if (!this.onGround) {
            const airAttackClip = this.getExistingAnimClip(this.animJumpAttack, 'air_atk', this.animAttack);
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
            return this.getExistingAnimClip(this.animAttack, '1_atk', 'atk', 'attack', this.animAttack2, this.animAttack3);
        }
        if (step === 2) {
            return this.getExistingAnimClip(this.animAttack2, '2_atk', this.animAttack, '1_atk', this.animAttack3);
        }
        return this.getExistingAnimClip(this.animAttack3, '3_atk', this.animAttack2, '2_atk', this.animAttack, '1_atk');
    }

    takeDamage(amount: number) {
        if (this.isDead || amount <= 0) {
            return;
        }

        // 防禦中：依倍率減傷；若完全擋下則完全不進入硬直
        if (this.isDefending) {
            const reduced = Math.floor(amount * this.defendDamageMultiplier);
            if (reduced <= 0) {
                return;
            }
            amount = reduced;
        }

        this.hp -= amount;
        if (this.hp <= 0) {
            this.hp = 0;
            this.die();
            return;
        }

        this.enterHitState();
    }

    enterHitState() {
        this.isAttacking = false;
        this.isAirAttacking = false;
        this.isDefending = false;
        this.comboStep = 0;
        this.comboQueued = false;
        this.isHit = true;

        this.anim.off('finished', this.onAttackAnimFinished, this);
        this.playAnim(this.animTakeHit);

        this.unschedule(this.exitHitState);
        this.scheduleOnce(this.exitHitState, this.hitRecoverTime);
    }

    exitHitState() {
        if (this.isDead) {
            return;
        }
        this.isHit = false;
        this.updateAnimation();
    }

    die() {
        if (this.isDead) {
            return;
        }

        this.isDead = true;
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

        this.playAnim(this.animDeath);

        if (this.autoRespawn) {
            this.unschedule(this.respawn);
            this.scheduleOnce(this.respawn, this.respawnDelay);
        }
    }

    applyPreset() {
        if (this.characterPreset === CharacterPreset.Custom) {
            return;
        }

        if (this.characterPreset === CharacterPreset.Monk) {
            this.animIdle = 'idle';
            this.animRun = 'run';
            this.animJump = 'j_up';
            this.animJumpDown = 'j_down';
            this.animDash = 'roll';
            this.animAttack = '1_atk';
            this.animAttack2 = '2_atk';
            this.animAttack3 = '3_atk';
            this.animJumpAttack = 'air_atk';
            this.animTakeHit = 'take_hit';
            this.animDeath = 'death';
            return;
        }

        if (this.characterPreset === CharacterPreset.Priestess) {
            this.animIdle = 'idle';
            this.animRun = 'walk';      // 走路當 run
            this.animJump = 'j_up';     // 沒這個 clip 時自動 fallback
            this.animJumpDown = 'j_down';
            this.animDash = 'surf';     // 衝刺用 surf
            this.animAttack = 'atk';    // priestess 第一段叫 atk（不是 1_atk）
            this.animAttack2 = '2_atk';
            this.animAttack3 = '3_atk';
            this.animJumpAttack = 'air_atk';
            this.animSpecialAttack = 'sp_atk';
            this.animDefend = 'defend';
            this.animTakeHit = 'take_hit';
            this.animDeath = 'death';
            return;
        }

        if (this.characterPreset === CharacterPreset.Hashashin) {
            this.animIdle = 'idle';
            this.animRun = 'run';
            this.animJump = 'j_up';
            this.animJumpDown = 'j_down';
            this.animDash = 'roll';
            this.animAttack = '1_atk';
            this.animAttack2 = '2_atk';
            this.animAttack3 = '3_atk';
            this.animJumpAttack = 'air_atk';
            this.animTakeHit = 'take_hit';
            this.animDeath = 'death';
        }
    }

    switchPreset(preset: CharacterPreset) {
        this.characterPreset = preset;
        this.applyPreset();

        this.isAttacking = false;
        this.isAirAttacking = false;
        this.comboQueued = false;
        this.comboStep = 0;
        this.isHit = false;
        this.isDead = false;
        this.hp = this.maxHp;
        this.currentAnim = '';

        this.updateAnimation();
    }

    respawn() {
        this.isDead = false;
        this.isHit = false;
        this.isAttacking = false;
        this.isAirAttacking = false;
        this.isDefending = false;
        this.comboQueued = false;
        this.comboStep = 0;
        this.moveDir = 0;
        this.hp = this.maxHp;
        this.currentAnim = '';

        if (this.respawnPoint) {
            this.node.setPosition(this.respawnPoint.position);
        }

        if (this.rb) {
            this.rb.linearVelocity = cc.v2(0, 0);
        }

        this.updateAnimation();
    }

    switchPresetByIndex(index: number) {
        this.switchPreset(index as CharacterPreset);
    }

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
}