const { ccclass, property } = cc._decorator;

@ccclass
export default class DragonProjectile extends cc.Component {
    @property({ tooltip: "Initial horizontal speed in units per second." })
    initialSpeed: number = 200;

    @property({ tooltip: "Final horizontal speed in units per second." })
    finalSpeed: number = 600;

    @property({ tooltip: "Seconds needed to accelerate from initialSpeed to finalSpeed." })
    accelerationTime: number = 0.6;

    @property({ tooltip: "Play the default animation clip automatically on start." })
    playAnimationOnStart: boolean = true;

    @property({ tooltip: "Destroy this node after the animation finishes." })
    destroyOnAnimationFinished: boolean = true;

    @property({ tooltip: "Flip sprite visually when flying left." })
    flipVisualWithDirection: boolean = true;

    private anim: cc.Animation | null = null;
    private sprite: cc.Sprite | null = null;
    private rb: cc.RigidBody | null = null;
    private directionX: number = 1;
    private elapsed: number = 0;
    private isLaunched: boolean = false;
    private baseScaleX: number = 1;
    private lastSpriteFrame: cc.SpriteFrame | null = null;
    private animationFinishedHandler: ((type: string, state: cc.AnimationState) => void) | null = null;

    onLoad() {
        this.anim = this.getComponent(cc.Animation);
        this.sprite = this.getComponent(cc.Sprite);
        this.rb = this.getComponent(cc.RigidBody);
        this.baseScaleX = Math.abs(this.node.scaleX) || 1;

        if (this.rb) {
            this.rb.gravityScale = 0;
            this.rb.enabledContactListener = true;
            this.rb.linearVelocity = cc.v2(0, 0);
            this.rb.angularVelocity = 0;
        }

        this.syncSpritePresentation(true);
    }

    start() {
        if (!this.isLaunched) {
            this.launch(this.directionX);
            return;
        }

        if (this.playAnimationOnStart) {
            this.playDefaultAnimation();
        }
    }

    // onDestroy() {
    //     this.detachAnimationFinishedListener();
    // }

    public onDespawn() {
        this.detachAnimationFinishedListener();
    }

    update(dt: number) {
        this.syncSpritePresentation();

        if (!this.isLaunched) {
            return;
        }

        this.elapsed += dt;
        const speed = this.getCurrentSpeed();

        if (this.rb) {
            this.rb.linearVelocity = cc.v2(this.directionX * speed, 0);
            this.rb.syncPosition(true);
            this.rb.awake = true;
            return;
        }

        this.node.x += this.directionX * speed * dt;
    }

    public launch(directionX: number = 1) {
        this.directionX = directionX >= 0 ? 1 : -1;
        this.elapsed = 0;
        this.isLaunched = true;
        this.baseScaleX = Math.abs(this.node.scaleX) || Math.abs(this.node.scaleY) || this.baseScaleX || 1;
        this.applyFacing();

        if (this.playAnimationOnStart) {
            this.playDefaultAnimation();
        }
    }

    public setDirection(directionX: number) {
        this.directionX = directionX >= 0 ? 1 : -1;
        this.baseScaleX = Math.abs(this.node.scaleX) || Math.abs(this.node.scaleY) || this.baseScaleX || 1;
        this.applyFacing();
    }

    public restartFlight(directionX: number = this.directionX) {
        this.launch(directionX);
    }

    private getCurrentSpeed(): number {
        if (this.accelerationTime <= 0) {
            return this.finalSpeed;
        }

        const t = cc.misc.clampf(this.elapsed / this.accelerationTime, 0, 1);
        return this.initialSpeed + (this.finalSpeed - this.initialSpeed) * t;
    }

    private applyFacing() {
        if (!this.flipVisualWithDirection) {
            return;
        }

        this.node.scaleX = this.baseScaleX * this.directionX;
    }

    private playDefaultAnimation() {
        if (!this.anim || this.anim.getClips().length === 0) {
            return;
        }

        this.syncSpritePresentation(true);
        this.detachAnimationFinishedListener();

        if (this.destroyOnAnimationFinished) {
            this.animationFinishedHandler = this.handleAnimationFinished.bind(this);
            this.anim.on("finished", this.animationFinishedHandler, this);
        }

        const clip = this.anim.defaultClip || this.anim.getClips()[0];
        if (!clip) {
            return;
        }

        this.anim.play(clip.name);
    }

    private syncSpritePresentation(force: boolean = false) {
        if (!this.sprite || !this.sprite.spriteFrame) {
            return;
        }

        const spriteFrame = this.sprite.spriteFrame;
        const shouldRefresh = force
            || this.lastSpriteFrame !== spriteFrame
            || this.sprite.sizeMode !== cc.Sprite.SizeMode.RAW
            || this.sprite.trim !== false;
        if (!shouldRefresh) {
            return;
        }

        this.lastSpriteFrame = spriteFrame;
        this.sprite.sizeMode = cc.Sprite.SizeMode.RAW;
        this.sprite.trim = false;

        const originalSize = spriteFrame.getOriginalSize();
        if (originalSize.width > 0 && originalSize.height > 0) {
            this.node.setContentSize(originalSize);
        }
    }

    private handleAnimationFinished(type: string, state: cc.AnimationState) {
        if (!this.destroyOnAnimationFinished) {
            return;
        }

        const currentClip = this.anim ? (this.anim.defaultClip || this.anim.getClips()[0]) : null;
        if (currentClip && state && state.clip !== currentClip) {
            return;
        }

        this.node.destroy();
    }

    private detachAnimationFinishedListener() {
        if (!this.animationFinishedHandler) {
            return;
        }

        if (this.anim && cc.isValid(this.anim, true)) {
            this.anim.off("finished", this.animationFinishedHandler, this);
        }

        this.animationFinishedHandler = null;
    }
}
