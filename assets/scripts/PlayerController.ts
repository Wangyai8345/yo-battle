const { ccclass, property } = cc._decorator;

type CooldownHudSlot = {
    container: cc.Node;
    icon: cc.Sprite;
    overlay: cc.Sprite;
    label: cc.Label;
};

@ccclass
export default class PlayerController extends cc.Component {
    @property
    attackCooldown: number = 0;

    @property
    skill2Cooldown: number = 0;

    @property
    defendCooldown: number = 0;

    @property
    superCooldown: number = 0;

    @property({ type: cc.Node })
    cooldownHudRoot: cc.Node = null;

    @property({ type: cc.SpriteFrame })
    attackCooldownIcon: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    skill2CooldownIcon: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    defendCooldownIcon: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    superCooldownIcon: cc.SpriteFrame = null;

    @property
    cooldownHudSpacing: number = 120;

    @property
    cooldownHudScale: number = 1;

    @property
    cooldownLabelOffsetY: number = -52;

    @property
    cooldownOverlayOpacity: number = 180;

    @property
    cooldownOverlayGray: number = 120;

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

    @property([cc.SpriteFrame])
    idleFrames: cc.SpriteFrame[] = [];

    @property
    idleFrameInterval: number = 0.12;

    @property([cc.SpriteFrame])
    runFrames: cc.SpriteFrame[] = [];

    @property
    runFrameInterval: number = 0.12;

    @property([cc.SpriteFrame])
    jumpFrames: cc.SpriteFrame[] = [];

    @property
    jumpFrameInterval: number = 0.06;

    private rb: cc.RigidBody = null;
    private sprite: cc.Sprite = null;
    private moveInput: number = 0;
    private onGround: boolean = false;
    private groundContactCount: number = 0;
    private resolvedIdleFrames: cc.SpriteFrame[] = [];
    private resolvedRunFrames: cc.SpriteFrame[] = [];
    private resolvedJumpFrames: cc.SpriteFrame[] = [];
    private idleFrameTimer: number = 0;
    private idleFrameIndex: number = 0;
    private runFrameTimer: number = 0;
    private runFrameIndex: number = 0;
    private jumpElapsedTime: number = 0;
    private jumpEstimatedDuration: number = 0;
    private jumpFrameIndex: number = 0;
    private facingRight: boolean = true;
    private facingLocked: boolean = false;
    private lockedFacingRight: boolean = true;
    private leftHeld: boolean = false;
    private rightHeld: boolean = false;
    private directionInputLocked: boolean = false;
    private movementLocked: boolean = false;
    private animationLocked: boolean = false;
    private attackCooldownRemaining: number = 0;
    private skill2CooldownRemaining: number = 0;
    private defendCooldownRemaining: number = 0;
    private superCooldownRemaining: number = 0;
    private generatedCooldownHud: Partial<Record<"attack" | "skill2" | "defend" | "super", CooldownHudSlot>> = {};

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;

        this.rb = this.getComponent(cc.RigidBody);
        this.sprite = this.getComponent(cc.Sprite);
        this.resolvedIdleFrames = this.idleFrames.filter((frame): frame is cc.SpriteFrame => !!frame);
        this.resolvedRunFrames = this.runFrames.filter((frame): frame is cc.SpriteFrame => !!frame);
        this.resolvedJumpFrames = this.jumpFrames.filter((frame): frame is cc.SpriteFrame => !!frame);

        this.showIdle();
        this.ensureCooldownHud();
        this.refreshCooldownLabels();

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.clearGeneratedCooldownHud();
    }

    update(dt: number) {
        this.updateCooldowns(dt);

        if (this.rb) {
            const velocity = this.rb.linearVelocity;
            velocity.x = this.updateHorizontalVelocity(velocity.x, dt);
            this.rb.linearVelocity = velocity;
            this.updateFacingFromVelocity(velocity.x);
        }

        this.updateFacingDirection();

        if (!this.animationLocked) {
            this.updateAnimation(dt);
        }
    }

    onKeyDown(event: cc.Event.EventKeyboard) {
        if (event.keyCode === cc.macro.KEY.a) {
            if (this.movementLocked || this.directionInputLocked) {
                return;
            }
            this.leftHeld = true;
            this.refreshMoveInput();
        }

        if (event.keyCode === cc.macro.KEY.d) {
            if (this.movementLocked || this.directionInputLocked) {
                return;
            }
            this.rightHeld = true;
            this.refreshMoveInput();
        }

        if (
            !this.movementLocked &&
            (event.keyCode === cc.macro.KEY.w || event.keyCode === cc.macro.KEY.space) &&
            this.onGround &&
            this.rb
        ) {
            const velocity = this.rb.linearVelocity;
            velocity.y = this.jumpSpeed;
            this.rb.linearVelocity = velocity;
            this.onGround = false;
            this.groundContactCount = 0;
            this.beginJumpAnimation();
        }
    }

    onKeyUp(event: cc.Event.EventKeyboard) {
        if (event.keyCode === cc.macro.KEY.a) {
            if (this.movementLocked || this.directionInputLocked) {
                return;
            }
            this.leftHeld = false;
            this.refreshMoveInput();
        }

        if (event.keyCode === cc.macro.KEY.d) {
            if (this.movementLocked || this.directionInputLocked) {
                return;
            }
            this.rightHeld = false;
            this.refreshMoveInput();
        }
    }

    onBeginContact(contact, selfCollider, otherCollider) {
        if (otherCollider.node.name === "Platform") {
            this.groundContactCount++;
            this.onGround = true;
            this.resetJumpAnimation();
        }
    }

    onEndContact(contact, selfCollider, otherCollider) {
        if (otherCollider.node.name === "Platform") {
            this.groundContactCount = Math.max(0, this.groundContactCount - 1);
            this.onGround = this.groundContactCount > 0;
        }
    }

    public setControlLocked(locked: boolean) {
        this.movementLocked = locked;
        this.animationLocked = locked;
    }

    public setMovementLocked(locked: boolean) {
        this.movementLocked = locked;
    }

    public setAnimationLocked(locked: boolean) {
        this.animationLocked = locked;
    }

    public lockFacing() {
        this.facingLocked = true;
        this.lockedFacingRight = this.facingRight;
    }

    public unlockFacing() {
        this.facingLocked = false;
    }

    public setDirectionInputLocked(locked: boolean) {
        this.directionInputLocked = locked;
        if (locked) {
            this.leftHeld = false;
            this.rightHeld = false;
            this.moveInput = 0;
        }
    }

    public clearMovementInput() {
        this.leftHeld = false;
        this.rightHeld = false;
        this.moveInput = 0;

        if (this.rb && this.onGround) {
            const velocity = this.rb.linearVelocity;
            velocity.x = 0;
            this.rb.linearVelocity = velocity;
        }
    }

    public refreshVisual() {
        if (this.animationLocked || !this.sprite) {
            return;
        }

        if (!this.onGround) {
            this.updateJumpAnimation(0);
            return;
        }

        if (this.moveInput === 0 || this.resolvedRunFrames.length === 0) {
            this.runFrameTimer = 0;
            this.runFrameIndex = 0;
            this.updateIdleAnimation(0);
            return;
        }

        this.sprite.spriteFrame = this.resolvedRunFrames[this.runFrameIndex];
    }

    public getFacingDirection() {
        const facingRight = this.facingLocked ? this.lockedFacingRight : this.facingRight;
        return facingRight ? 1 : -1;
    }

    public isFacingRight() {
        return this.facingLocked ? this.lockedFacingRight : this.facingRight;
    }

    public isGrounded() {
        return this.onGround;
    }

    public getMoveInput() {
        return this.moveInput;
    }

    public tryUseSkillCooldown(slot: "attack" | "skill2" | "defend" | "super") {
        const remaining = this.getSkillCooldownRemaining(slot);
        if (remaining > 0) {
            return false;
        }

        this.setSkillCooldownRemaining(slot, this.getSkillCooldownDuration(slot));
        this.refreshCooldownLabels();
        return true;
    }

    public getSkillCooldownRemaining(slot: "attack" | "skill2" | "defend" | "super") {
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

    public getSkillCooldownDuration(slot: "attack" | "skill2" | "defend" | "super") {
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

    private updateAnimation(dt: number) {
        if (!this.sprite) {
            return;
        }

        if (!this.onGround) {
            this.resetIdleAnimation();
            this.updateJumpAnimation(dt);
            return;
        }

        if (this.moveInput === 0 || this.resolvedRunFrames.length === 0) {
            this.runFrameTimer = 0;
            this.runFrameIndex = 0;
            this.updateIdleAnimation(dt);
            return;
        }

        this.resetIdleAnimation();
        this.runFrameTimer += dt;
        if (this.runFrameTimer >= this.runFrameInterval) {
            this.runFrameTimer = 0;
            this.runFrameIndex = (this.runFrameIndex + 1) % this.resolvedRunFrames.length;
        }

        this.sprite.spriteFrame = this.resolvedRunFrames[this.runFrameIndex];
    }

    private updateJumpAnimation(dt: number = 0) {
        if (!this.sprite) {
            return;
        }

        if (this.resolvedJumpFrames.length === 0) {
            this.showIdle();
            return;
        }

        const velocityY = this.rb ? this.rb.linearVelocity.y : 0;
        if (this.resolvedJumpFrames.length === 1) {
            this.sprite.spriteFrame = this.resolvedJumpFrames[0];
            return;
        }

        if (this.resolvedJumpFrames.length === 2) {
            this.sprite.spriteFrame = velocityY >= 0 ? this.resolvedJumpFrames[0] : this.resolvedJumpFrames[1];
            return;
        }

        this.jumpElapsedTime += dt;

        if (this.jumpEstimatedDuration <= 0) {
            this.jumpEstimatedDuration = this.estimateJumpDuration();
        }

        if (this.jumpEstimatedDuration > 0) {
            const normalizedProgress = cc.misc.clampf(
                this.jumpElapsedTime / this.jumpEstimatedDuration,
                0,
                1
            );
            this.jumpFrameIndex = Math.min(
                this.resolvedJumpFrames.length - 1,
                Math.floor(normalizedProgress * this.resolvedJumpFrames.length)
            );
        } else if (this.jumpFrameInterval > 0) {
            const fallbackIndex = Math.floor(this.jumpElapsedTime / this.jumpFrameInterval);
            this.jumpFrameIndex = Math.min(this.resolvedJumpFrames.length - 1, fallbackIndex);
        }

        this.sprite.spriteFrame = this.resolvedJumpFrames[this.jumpFrameIndex];
    }

    private showIdle() {
        if (this.sprite && this.resolvedIdleFrames.length > 0) {
            this.sprite.spriteFrame = this.resolvedIdleFrames[this.idleFrameIndex];
        }
    }

    private updateIdleAnimation(dt: number) {
        if (!this.sprite || this.resolvedIdleFrames.length === 0) {
            return;
        }

        if (this.resolvedIdleFrames.length === 1) {
            this.sprite.spriteFrame = this.resolvedIdleFrames[0];
            return;
        }

        this.idleFrameTimer += dt;
        if (this.idleFrameTimer >= this.idleFrameInterval) {
            this.idleFrameTimer = 0;
            this.idleFrameIndex = (this.idleFrameIndex + 1) % this.resolvedIdleFrames.length;
        }

        this.sprite.spriteFrame = this.resolvedIdleFrames[this.idleFrameIndex];
    }

    private resetIdleAnimation() {
        this.idleFrameTimer = 0;
        this.idleFrameIndex = 0;
    }

    private beginJumpAnimation() {
        this.jumpElapsedTime = 0;
        this.jumpEstimatedDuration = this.estimateJumpDuration();
        this.jumpFrameIndex = 0;
    }

    private resetJumpAnimation() {
        this.jumpElapsedTime = 0;
        this.jumpEstimatedDuration = 0;
        this.jumpFrameIndex = 0;
    }

    private estimateJumpDuration() {
        if (!this.rb) {
            return 0;
        }

        const physicsManager = cc.director.getPhysicsManager();
        const gravityY = physicsManager && (physicsManager as any).gravity
            ? Math.abs((physicsManager as any).gravity.y)
            : 0;
        const effectiveGravity = gravityY * Math.max(0.01, this.rb.gravityScale);

        if (effectiveGravity <= 0) {
            return 0;
        }

        return (this.jumpSpeed * 2) / effectiveGravity;
    }

    private updateHorizontalVelocity(currentX: number, dt: number) {
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

    private moveTowards(current: number, target: number, maxDelta: number) {
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
    }

    private updateFacingFromVelocity(velocityX: number) {
        if (this.movementLocked || this.facingLocked) {
            return;
        }

        if (Math.abs(velocityX) > 1) {
            this.facingRight = velocityX > 0;
        } else if (this.moveInput !== 0) {
            this.facingRight = this.moveInput > 0;
        }
    }

    private updateFacingDirection() {
        const facingRight = this.facingLocked ? this.lockedFacingRight : this.facingRight;

        if (facingRight) {
            this.node.scaleX = Math.abs(this.node.scaleX);
        } else {
            this.node.scaleX = -Math.abs(this.node.scaleX);
        }
    }

    private updateCooldowns(dt: number) {
        this.attackCooldownRemaining = Math.max(0, this.attackCooldownRemaining - dt);
        this.skill2CooldownRemaining = Math.max(0, this.skill2CooldownRemaining - dt);
        this.defendCooldownRemaining = Math.max(0, this.defendCooldownRemaining - dt);
        this.superCooldownRemaining = Math.max(0, this.superCooldownRemaining - dt);
        this.refreshCooldownLabels();
    }

    private getSkillCooldownDuration(slot: "attack" | "skill2" | "defend" | "super") {
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

    private setSkillCooldownRemaining(slot: "attack" | "skill2" | "defend" | "super", value: number) {
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

    private refreshCooldownLabels() {
        this.refreshGeneratedCooldownHud();
    }

    private ensureCooldownHud() {
        if (!this.cooldownHudRoot) {
            return;
        }

        this.generatedCooldownHud.attack = this.ensureCooldownHudSlot(
            "AttackCooldownHud",
            0,
            this.attackCooldownIcon
        );
        this.generatedCooldownHud.skill2 = this.ensureCooldownHudSlot(
            "Skill2CooldownHud",
            1,
            this.skill2CooldownIcon
        );
        this.generatedCooldownHud.defend = this.ensureCooldownHudSlot(
            "DefendCooldownHud",
            2,
            this.defendCooldownIcon
        );
        this.generatedCooldownHud.super = this.ensureCooldownHudSlot(
            "SuperCooldownHud",
            3,
            this.superCooldownIcon
        );
    }

    private ensureCooldownHudSlot(name: string, index: number, spriteFrame: cc.SpriteFrame) {
        let slot = Object.values(this.generatedCooldownHud).find(
            (existingSlot) => existingSlot && existingSlot.container && existingSlot.container.name === name
        );

        if (!slot) {
            const container = new cc.Node(name);
            container.parent = this.cooldownHudRoot;
            container.setPosition(index * this.cooldownHudSpacing, 0);
            container.setScale(this.cooldownHudScale, this.cooldownHudScale);

            const iconNode = new cc.Node("Icon");
            iconNode.parent = container;
            const icon = iconNode.addComponent(cc.Sprite);
            icon.sizeMode = cc.Sprite.SizeMode.TRIMMED;

            const overlayNode = new cc.Node("Overlay");
            overlayNode.parent = container;
            const overlay = overlayNode.addComponent(cc.Sprite);
            overlay.sizeMode = cc.Sprite.SizeMode.TRIMMED;
            overlay.type = cc.Sprite.Type.FILLED;
            overlay.fillType = cc.Sprite.FillType.RADIAL;
            overlay.fillCenter = cc.v2(0.5, 0.5);
            overlay.fillStart = 0.25;
            overlay.node.opacity = this.cooldownOverlayOpacity;
            overlay.color = new cc.Color(
                this.cooldownOverlayGray,
                this.cooldownOverlayGray,
                this.cooldownOverlayGray,
                255
            );

            const labelNode = new cc.Node("CountdownLabel");
            labelNode.parent = container;
            labelNode.setPosition(0, this.cooldownLabelOffsetY);
            const label = labelNode.addComponent(cc.Label);
            label.fontSize = 20;
            label.lineHeight = 22;
            label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
            label.verticalAlign = cc.Label.VerticalAlign.CENTER;

            slot = { container, icon, overlay, label };
        } else {
            slot.container.setPosition(index * this.cooldownHudSpacing, 0);
            slot.container.setScale(this.cooldownHudScale, this.cooldownHudScale);
            slot.label.node.setPosition(0, this.cooldownLabelOffsetY);
            slot.overlay.node.opacity = this.cooldownOverlayOpacity;
            slot.overlay.color = new cc.Color(
                this.cooldownOverlayGray,
                this.cooldownOverlayGray,
                this.cooldownOverlayGray,
                255
            );
        }

        slot.icon.spriteFrame = spriteFrame;
        slot.overlay.spriteFrame = spriteFrame;
        return slot;
    }

    private refreshGeneratedCooldownHud() {
        if (!this.cooldownHudRoot) {
            return;
        }

        this.ensureCooldownHud();
        this.updateGeneratedCooldownHudSlot("attack", this.attackCooldownRemaining, this.attackCooldown);
        this.updateGeneratedCooldownHudSlot("skill2", this.skill2CooldownRemaining, this.skill2Cooldown);
        this.updateGeneratedCooldownHudSlot("defend", this.defendCooldownRemaining, this.defendCooldown);
        this.updateGeneratedCooldownHudSlot("super", this.superCooldownRemaining, this.superCooldown);
    }

    private updateGeneratedCooldownHudSlot(
        slotName: "attack" | "skill2" | "defend" | "super",
        remaining: number,
        duration: number
    ) {
        const slot = this.generatedCooldownHud[slotName];
        if (!slot) {
            return;
        }

        const onCooldown = duration > 0 && remaining > 0;
        slot.overlay.node.active = onCooldown && !!slot.overlay.spriteFrame;
        if (slot.overlay.node.active) {
            slot.overlay.fillRange = Math.max(0, Math.min(1, remaining / duration));
        }

        slot.label.string = onCooldown ? remaining.toFixed(1) : "READY";
    }

    private clearGeneratedCooldownHud() {
        const slots = Object.values(this.generatedCooldownHud);
        for (const slot of slots) {
            if (slot && slot.container && cc.isValid(slot.container)) {
                slot.container.destroy();
            }
        }

        this.generatedCooldownHud = {};
    }
}
