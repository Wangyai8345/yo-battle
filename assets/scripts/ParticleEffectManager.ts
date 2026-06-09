export default class ParticleEffectManager {

    private static _cache: { [key: string]: cc.ParticleAsset } = {};
    private static _whiteSF: cc.SpriteFrame = null;
    private static _softCircleSF: cc.SpriteFrame = null;

    /** 取得 1×1 白色 SpriteFrame（受擊火花用：像素風硬邊） */
    static getWhiteSF(): cc.SpriteFrame {
        if (ParticleEffectManager._whiteSF) return ParticleEffectManager._whiteSF;
        const tex = new cc.Texture2D();
        tex.initWithData(
            new Uint8Array([255, 255, 255, 255]),
            cc.Texture2D.PixelFormat.RGBA8888,
            1, 1
        );
        ParticleEffectManager._whiteSF = new cc.SpriteFrame(tex, cc.rect(0, 0, 1, 1));
        return ParticleEffectManager._whiteSF;
    }

    /**
     * 取得柔邊圓形 SpriteFrame（煙塵 / 爆炸用）
     * 中心不透明白色，往外二次方衰減 → 粒子看起來像霧氣而非方塊
     */
    static getSoftCircleSF(): cc.SpriteFrame {
        if (ParticleEffectManager._softCircleSF) return ParticleEffectManager._softCircleSF;
        const size = 64;
        const data = new Uint8Array(size * size * 4);
        const center = size / 2;
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                const dist = Math.sqrt((x - center) ** 2 + (y - center) ** 2) / center;
                const alpha = Math.max(0, 1 - dist * dist); // 二次方衰減，中心實邊緣透明
                const idx = (y * size + x) * 4;
                data[idx]     = 255;
                data[idx + 1] = 255;
                data[idx + 2] = 255;
                data[idx + 3] = Math.round(alpha * 255);
            }
        }
        const tex = new cc.Texture2D();
        tex.initWithData(data, cc.Texture2D.PixelFormat.RGBA8888, size, size);
        ParticleEffectManager._softCircleSF = new cc.SpriteFrame(tex, cc.rect(0, 0, size, size));
        return ParticleEffectManager._softCircleSF;
    }

    /** 受攻擊火花（硬邊白色像素，保持像素風） */
    static playHit(worldPos: cc.Vec2, parent?: cc.Node) {
        ParticleEffectManager._play('particles/hit_spark', worldPos, parent, false);
    }

    /** 死亡爆炸（柔邊圓形） */
    static playDeath(worldPos: cc.Vec2, parent?: cc.Node) {
        ParticleEffectManager._play('particles/death_explosion', worldPos, parent, true);
    }

    /** 落地粉塵（柔邊圓形） */
    static playLanding(worldPos: cc.Vec2, parent?: cc.Node) {
        ParticleEffectManager._play('particles/landing_dust', worldPos, parent, true);
    }

    private static _play(resource: string, worldPos: cc.Vec2, parent?: cc.Node, softCircle: boolean = false) {
        const spawnOn = parent || cc.director.getScene();
        if (!spawnOn || !cc.isValid(spawnOn)) return;

        const doSpawn = (asset: cc.ParticleAsset) => {
            if (!spawnOn || !cc.isValid(spawnOn)) return;

            const node = new cc.Node('FX_' + resource);
            const ps = node.addComponent(cc.ParticleSystem);
            ps.file = asset;
            ps.playOnLoad = true;
            ps.autoRemoveOnFinish = true;

            node.parent = spawnOn;

            // 根據效果類型選擇對應 texture
            if (!ps.spriteFrame) {
                ps.spriteFrame = softCircle
                    ? ParticleEffectManager.getSoftCircleSF()
                    : ParticleEffectManager.getWhiteSF();
            }

            const localPos = spawnOn.convertToNodeSpaceAR(worldPos);
            node.setPosition(localPos.x, localPos.y);
            node.zIndex = 999;
            ps.resetSystem();
        };

        const cached = ParticleEffectManager._cache[resource];
        if (cached) { doSpawn(cached); return; }

        cc.loader.loadRes(resource, cc.ParticleAsset, (err: Error, asset: cc.ParticleAsset) => {
            if (err || !asset) {
                console.warn(`[ParticleFX] Failed to load: ${resource}`, err);
                return;
            }
            ParticleEffectManager._cache[resource] = asset;
            doSpawn(asset);
        });
    }
}
