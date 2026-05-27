const { ccclass, property } = cc._decorator;

@ccclass
export default class Fireball extends cc.Component {
    @property({ type: cc.SpriteFrame })
    fireballFrame1: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    fireballFrame2: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    fireballFrame3: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    fireballFrame4: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    fireballFrame5: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    fireballFrame6: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    fireballFrame7: cc.SpriteFrame = null;

    @property
    fireballFrameInterval: number = 0.15;

    @property
    fireballSpeed: number = 800;

    @property
    fireballLifetime: number = 2;

    @property
    fireballScaleMultiplier: number = 0.75;

    private sprite: cc.Sprite = null;
    private frames: cc.SpriteFrame[] = [];
    private frameScaleFactors: number[] = [];
    private baseFrameScale: number = 1;
    private direction: number = 1;
    private frameTimer: number = 0;
    private frameIndex: number = 0;
    private lifeTimer: number = 0;
    private launched: boolean = false;

    onLoad() {
        this.sprite = this.getComponent(cc.Sprite) || this.addComponent(cc.Sprite);
        this.sprite.sizeMode = cc.Sprite.SizeMode.RAW;
        this.refreshFrames();
        this.applyFrame(0);
    }

    public launch(direction: number) {
        this.refreshFrames();
        if (this.frames.length === 0) {
            cc.warn("[Fireball] No sprite frames assigned on prefab.");
            return;
        }

        this.direction = direction >= 0 ? 1 : -1;
        this.frameTimer = 0;
        this.frameIndex = 0;
        this.lifeTimer = 0;
        this.launched = true;
        this.applyFrame(0);
    }

    update(dt: number) {
        if (!this.launched) {
            return;
        }

        this.lifeTimer += dt;
        this.frameTimer += dt;
        this.node.x += this.direction * this.fireballSpeed * dt;

        if (this.frames.length > 0 && this.frameTimer >= this.fireballFrameInterval) {
            this.frameTimer = 0;
            this.advanceFrame();
            this.applyFrame(this.frameIndex);
        }

        if (this.lifeTimer >= this.fireballLifetime) {
            this.node.destroy();
        }
    }

    private refreshFrames() {
        this.frames = [
            this.fireballFrame1,
            this.fireballFrame2,
            this.fireballFrame3,
            this.fireballFrame4,
            this.fireballFrame5,
            this.fireballFrame6,
            this.fireballFrame7,
        ].filter((frame): frame is cc.SpriteFrame => !!frame);

        this.frameScaleFactors = this.buildFrameScaleFactors(this.frames);
        this.baseFrameScale = this.buildBaseFrameScale(this.frames, 96);
    }

    private advanceFrame() {
        if (this.frames.length <= 1) {
            return;
        }

        const loopStartIndex = Math.min(3, this.frames.length - 1);
        const loopEndIndex = this.frames.length - 1;

        if (this.frameIndex < loopStartIndex) {
            this.frameIndex++;
            return;
        }

        if (this.frameIndex < loopEndIndex) {
            this.frameIndex++;
            return;
        }

        this.frameIndex = loopStartIndex;
    }

    private applyFrame(frameIndex: number) {
        if (!this.sprite || this.frames.length === 0) {
            return;
        }

        this.frameIndex = cc.misc.clampf(frameIndex, 0, this.frames.length - 1);
        this.sprite.spriteFrame = this.frames[this.frameIndex];

        const frameScaleFactor = this.frameScaleFactors[this.frameIndex] || 1;
        const scale = frameScaleFactor * this.baseFrameScale * this.fireballScaleMultiplier;
        this.node.scaleX = this.direction * scale;
        this.node.scaleY = scale;
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

    private buildBaseFrameScale(frames: cc.SpriteFrame[], referenceSize: number) {
        if (frames.length === 0) {
            return 1;
        }

        const originalSizes = frames.map((frame) => frame.getOriginalSize());
        const maxDimension = Math.max(
            ...originalSizes.map((size) => Math.max(size.width, size.height))
        );

        return referenceSize / Math.max(1, maxDimension);
    }
}
