export default class ParticleEffectManager {

    private static _cache: { [key: string]: cc.ParticleAsset } = {};
    private static _whiteSF: cc.SpriteFrame = null;

    /** 取得 1×1 白色 SpriteFrame，供無 texture 的 plist 使用 */
    private static _getWhiteSF(): cc.SpriteFrame {
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

    /** 受攻擊火花 */
    static playHit(worldPos: cc.Vec2, parent?: cc.Node) {
        ParticleEffectManager._play('particles/hit_spark', worldPos, parent);
    }

    /** 死亡爆炸 */
    static playDeath(worldPos: cc.Vec2, parent?: cc.Node) {
        ParticleEffectManager._play('particles/death_explosion', worldPos, parent);
    }

    /** 落地粉塵 */
    static playLanding(worldPos: cc.Vec2, parent?: cc.Node) {
        ParticleEffectManager._play('particles/landing_dust', worldPos, parent);
    }

    private static _play(resource: string, worldPos: cc.Vec2, parent?: cc.Node) {
        const spawnOn = parent || cc.director.getScene();
        if (!spawnOn || !cc.isValid(spawnOn)) {
            console.warn(`[ParticleFX] parent invalid for ${resource}`);
            return;
        }

        const doSpawn = (asset: cc.ParticleAsset) => {
            if (!spawnOn || !cc.isValid(spawnOn)) return;

            // 必須在加入場景前設好 file，讓 onLoad() 帶著正確資料執行
            const node = new cc.Node('FX_' + resource);
            const ps = node.addComponent(cc.ParticleSystem);
            ps.file = asset;
            ps.playOnLoad = true;
            ps.autoRemoveOnFinish = true;

            // 加入場景（觸發 onLoad，可能重置 spriteFrame）
            node.parent = spawnOn;

            // onLoad 後再補白色像素，確保有 texture 才能渲染
            if (!ps.spriteFrame) {
                ps.spriteFrame = ParticleEffectManager._getWhiteSF();
            }

            const localPos = spawnOn.convertToNodeSpaceAR(worldPos);
            node.setPosition(localPos.x, localPos.y);
            node.zIndex = 999;
            ps.resetSystem();

            console.log(`[ParticleFX] spawned ${resource} at local=(${localPos.x.toFixed(0)},${localPos.y.toFixed(0)}) hasSF=${!!ps.spriteFrame}`);
        };

        const cached = ParticleEffectManager._cache[resource];
        if (cached) {
            doSpawn(cached);
            return;
        }

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
