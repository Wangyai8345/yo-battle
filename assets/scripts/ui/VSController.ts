import NetworkManager from "../NetworkManager";
import AudioManager from "../AudioManager";

const { ccclass, property } = cc._decorator;

type RoomPlayer = {
    id: number;
    character: string;
};

@ccclass
export default class VSController extends cc.Component {
    @property(cc.Sprite)
    leftAvatarSprite: cc.Sprite = null;

    @property(cc.Sprite)
    rightAvatarSprite: cc.Sprite = null;

    @property(cc.Sprite)
    leftPortraitSprite: cc.Sprite = null;

    @property(cc.Sprite)
    rightPortraitSprite: cc.Sprite = null;

    @property(cc.Label)
    leftPlayerLabel: cc.Label = null;

    @property(cc.Label)
    rightPlayerLabel: cc.Label = null;

    @property
    nextSceneName: string = "game";

    @property
    vsBgmResource: string = "vs_bgm";

    @property
    waitForPlayersTimeout: number = 3;

    @property
    slideInDuration: number = 0.5;

    @property
    prePlayDelay: number = 1;

    @property
    holdDuration: number = 1;

    @property
    slideOutDuration: number = 0.8;

    @property
    postExitDelay: number = 0.1;

    @property({
        tooltip: "Playback speed multiplier for portrait animations in the VS scene only.",
    })
    portraitPlaybackSpeed: number = 0.75;

    @property
    portraitScale: number = 8;

    @property
    portraitYOffset: number = -15;

    @property
    leftPortraitCenterX: number = -700;

    @property
    rightPortraitCenterX: number = 700;

    @property
    portraitEntryOffsetX: number = 300;

    @property({ type: cc.AnimationClip, displayName: "Ground Monk Clip" })
    groundMonkClip: cc.AnimationClip = null;

    @property({ type: cc.AnimationClip, displayName: "Water Priestess Clip" })
    waterPriestessClip: cc.AnimationClip = null;

    @property({ type: cc.AnimationClip, displayName: "Wind Hashashin Clip" })
    windHashashinClip: cc.AnimationClip = null;

    @property({ type: cc.AnimationClip, displayName: "Leaf Ranger Clip" })
    leafRangerClip: cc.AnimationClip = null;

    @property({ type: cc.AnimationClip, displayName: "Fire Knight Clip" })
    fireKnightClip: cc.AnimationClip = null;

    @property({ type: cc.AnimationClip, displayName: "Metal Bladekeeper Clip" })
    metalBladekeeperClip: cc.AnimationClip = null;

    @property({ type: cc.SpriteFrame, displayName: "Ground Monk Avatar" })
    groundMonkAvatar: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame, displayName: "Water Priestess Avatar" })
    waterPriestessAvatar: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame, displayName: "Wind Hashashin Avatar" })
    windHashashinAvatar: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame, displayName: "Leaf Ranger Avatar" })
    leafRangerAvatar: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame, displayName: "Fire Knight Avatar" })
    fireKnightAvatar: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame, displayName: "Metal Bladekeeper Avatar" })
    metalBladekeeperAvatar: cc.SpriteFrame = null;

    private leftAnimation: cc.Animation = null;
    private rightAnimation: cc.Animation = null;
    private leftClip: cc.AnimationClip = null;
    private rightClip: cc.AnimationClip = null;
    private sequenceStarted = false;
    private elapsedWaiting = 0;

    protected onLoad(): void {
        this.resolveReferences();
        this.disableMasks();
        this.leftAnimation = this.ensureAnimation(this.leftPortraitSprite);
        this.rightAnimation = this.ensureAnimation(this.rightPortraitSprite);
        this.configurePortraitNode(this.leftPortraitSprite, false);
        this.configurePortraitNode(this.rightPortraitSprite, true);

        if (this.leftPlayerLabel) this.leftPlayerLabel.string = "P1";
        if (this.rightPlayerLabel) this.rightPlayerLabel.string = "P2";

        if (this.nextSceneName) {
            cc.director.preloadScene(this.nextSceneName);
        }
    }

    protected start(): void {
        this.schedule(this.tryStartSequence, 0.1);
    }

    protected onDestroy(): void {
        this.unschedule(this.tryStartSequence);
    }

    private resolveReferences(): void {
        if (!this.leftAvatarSprite) {
            this.leftAvatarSprite = cc.find("Left avater", this.node)?.getComponent(cc.Sprite) || null;
        }
        if (!this.rightAvatarSprite) {
            this.rightAvatarSprite = cc.find("Right avater", this.node)?.getComponent(cc.Sprite) || null;
        }
        if (!this.leftPortraitSprite) {
            this.leftPortraitSprite = cc.find("LeftMask/LeftPortrait", this.node)?.getComponent(cc.Sprite) || null;
        }
        if (!this.rightPortraitSprite) {
            this.rightPortraitSprite = cc.find("RightMask/RightPortrait", this.node)?.getComponent(cc.Sprite) || null;
        }
    }

    private disableMasks(): void {
        this.setParentMaskEnabled(this.leftPortraitSprite, false);
        this.setParentMaskEnabled(this.rightPortraitSprite, false);
    }

    private setParentMaskEnabled(sprite: cc.Sprite | null, enabled: boolean): void {
        const parent = sprite?.node?.parent;
        const mask = parent ? parent.getComponent(cc.Mask) : null;
        if (mask) {
            mask.enabled = enabled;
        }
    }

    private ensureAnimation(sprite: cc.Sprite | null): cc.Animation | null {
        if (!sprite) {
            return null;
        }

        let animation = sprite.getComponent(cc.Animation);
        if (!animation) {
            animation = sprite.addComponent(cc.Animation);
        }
        return animation;
    }

    private configurePortraitNode(sprite: cc.Sprite | null, flipX: boolean): void {
        if (!sprite) {
            return;
        }

        sprite.sizeMode = cc.Sprite.SizeMode.RAW;
        sprite.trim = false;
        sprite.node.y = this.portraitYOffset;
        sprite.node.scaleX = flipX ? -this.portraitScale : this.portraitScale;
        sprite.node.scaleY = this.portraitScale;
    }

    private tryStartSequence(dt: number): void {
        if (this.sequenceStarted) {
            return;
        }

        this.elapsedWaiting += dt;
        const players = this.getOrderedPlayers();
        if (players.length < 2 && this.elapsedWaiting < this.waitForPlayersTimeout) {
            return;
        }

        this.sequenceStarted = true;
        this.unschedule(this.tryStartSequence);
        this.applyPlayerData(players);
        if (this.vsBgmResource) {
            AudioManager.playMusic(this.vsBgmResource, true, 2.0);
        }
        this.playSequence();
    }

    private getOrderedPlayers(): RoomPlayer[] {
        const state = NetworkManager.instance?.getRoomState?.();
        if (!state || !state.players) {
            return [];
        }

        const players: RoomPlayer[] = [];
        state.players.forEach((player: any) => {
            players.push({
                id: player.id,
                character: player.character,
            });
        });

        players.sort((a, b) => a.id - b.id);
        return players;
    }

    private applyPlayerData(players: RoomPlayer[]): void {
        const p1 = players.find((player) => player.id === 1) || players[0] || null;
        const p2 = players.find((player) => player.id === 2) || players[1] || null;

        this.leftClip = this.assignClip(this.leftAnimation, p1?.character || "", false);
        this.rightClip = this.assignClip(this.rightAnimation, p2?.character || "", true);
        this.assignAvatar(this.leftAvatarSprite, p1?.character || "", false);
        this.assignAvatar(this.rightAvatarSprite, p2?.character || "", true);
    }

    private assignClip(animation: cc.Animation | null, characterKey: string, flipX: boolean): cc.AnimationClip | null {
        if (!animation) {
            return null;
        }

        const clip = this.getClipForCharacter(characterKey);
        if (!clip) {
            cc.warn(`[VSController] Missing AnimationClip for character "${characterKey}"`);
            return null;
        }

        this.registerClip(animation, clip);
        clip.wrapMode = cc.WrapMode.Normal;
        animation.defaultClip = clip;

        const node = animation.node;
        const sprite = animation.getComponent(cc.Sprite);
        if (sprite) {
            sprite.sizeMode = cc.Sprite.SizeMode.RAW;
            sprite.trim = false;
            this.applyFirstFrameSprite(sprite, clip);
        }
        node.scaleX = flipX ? -this.portraitScale : this.portraitScale;
        node.scaleY = this.portraitScale;
        node.y = this.portraitYOffset;
        return clip;
    }

    private registerClip(animation: cc.Animation, clip: cc.AnimationClip): void {
        const exists = animation.getClips().some((existingClip) => existingClip === clip || existingClip.name === clip.name);
        if (!exists) {
            animation.addClip(clip, clip.name);
        }
    }

    private getClipForCharacter(characterKey: string): cc.AnimationClip | null {
        switch (characterKey) {
            case "ground_monk":
                return this.groundMonkClip;
            case "water_priestess":
                return this.waterPriestessClip;
            case "wind":
            case "wind_hero":
            case "wind_hashashin":
                return this.windHashashinClip;
            case "arrow":
            case "arrow_hero":
            case "leaf_ranger":
                return this.leafRangerClip;
            case "fire_knight":
            case "fire_hero":
                return this.fireKnightClip;
            case "metal":
            case "metal_hero":
            case "metalhero":
            case "metal_bladekeeper":
                return this.metalBladekeeperClip;
            default:
                return null;
        }
    }

    private assignAvatar(sprite: cc.Sprite | null, characterKey: string, flipX: boolean): void {
        if (!sprite) {
            return;
        }

        const avatar = this.getAvatarForCharacter(characterKey);
        sprite.spriteFrame = avatar;

        const scaleX = Math.abs(sprite.node.scaleX) || 1;
        sprite.node.scaleX = flipX ? -scaleX : scaleX;
    }

    private getAvatarForCharacter(characterKey: string): cc.SpriteFrame | null {
        switch (characterKey) {
            case "ground_monk":
                return this.groundMonkAvatar;
            case "water_priestess":
                return this.waterPriestessAvatar;
            case "wind":
            case "wind_hero":
            case "wind_hashashin":
                return this.windHashashinAvatar;
            case "arrow":
            case "arrow_hero":
            case "leaf_ranger":
                return this.leafRangerAvatar;
            case "fire_knight":
            case "fire_hero":
                return this.fireKnightAvatar;
            case "metal":
            case "metal_hero":
            case "metalhero":
            case "metal_bladekeeper":
                return this.metalBladekeeperAvatar;
            default:
                return null;
        }
    }

    private playSequence(): void {
        this.playPortraitTween(this.leftPortraitSprite, this.leftPortraitCenterX, -this.portraitEntryOffsetX);
        this.playPortraitTween(this.rightPortraitSprite, this.rightPortraitCenterX, this.portraitEntryOffsetX);

        const clipStartDelay = this.slideInDuration + this.prePlayDelay;
        this.scheduleOnce(() => {
            this.playClipOnce(this.leftAnimation, this.leftClip);
            this.playClipOnce(this.rightAnimation, this.rightClip);
        }, clipStartDelay);

        const totalDuration =
            this.slideInDuration +
            this.prePlayDelay +
            this.holdDuration +
            this.slideOutDuration +
            this.postExitDelay;

        this.scheduleOnce(() => {
            if (this.nextSceneName) {
                cc.director.loadScene(this.nextSceneName);
            }
        }, totalDuration);
    }

    private playClipOnce(animation: cc.Animation | null, clip: cc.AnimationClip | null): void {
        if (!animation || !clip) {
            return;
        }

        clip.wrapMode = cc.WrapMode.Normal;
        const state = animation.play(clip.name);
        if (state) {
            state.speed = this.portraitPlaybackSpeed > 0 ? this.portraitPlaybackSpeed : 1;
        }
    }

    private applyFirstFrameSprite(sprite: cc.Sprite, clip: cc.AnimationClip): void {
        const curveData = (clip as any)?.curveData;
        const comps = curveData?.comps;
        const spriteComp = comps?.["cc.Sprite"];
        const frames = spriteComp?.spriteFrame;
        const firstFrame = frames && frames.length > 0 ? frames[0]?.value : null;

        if (firstFrame) {
            sprite.spriteFrame = firstFrame;
        }
    }

    private playPortraitTween(sprite: cc.Sprite | null, centerX: number, hiddenOffsetX: number): void {
        if (!sprite) {
            return;
        }

        const hiddenX = centerX + hiddenOffsetX;
        sprite.node.stopAllActions();
        sprite.node.setPosition(hiddenX, this.portraitYOffset);

        cc.tween(sprite.node)
            .to(this.slideInDuration, { x: centerX }, { easing: "quartOut" })
            .delay(this.prePlayDelay + this.holdDuration)
            .to(this.slideOutDuration, { x: hiddenX }, { easing: "quartIn" })
            .start();
    }
}
