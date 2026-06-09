import ParticleEffectManager from './ParticleEffectManager';

const { ccclass, property } = cc._decorator;

@ccclass
export default class StageAmbientFX extends cc.Component {

    @property
    enableRain: boolean = true;

    @property
    enableFog: boolean = true;

    @property
    forceEffect: string = '';

    private _psNode: cc.Node = null;

    // 用 start() 確保 Canvas 已完全載入
    start() {
        const pool: string[] = [];
        if (this.enableRain) pool.push('rain');
        if (this.enableFog)  pool.push('fog');
        if (pool.length === 0) {
            console.warn('[AmbientFX] 沒有啟用任何特效');
            return;
        }

        let chosen: string;
        if (this.forceEffect && pool.includes(this.forceEffect)) {
            chosen = this.forceEffect;
        } else {
            chosen = pool[Math.floor(Math.random() * pool.length)];
        }

        console.log(`[AmbientFX] start, chosen=${chosen}`);
        this._spawnAmbient(chosen);
    }

    private _spawnAmbient(effectName: string) {
        const resource = `particles/${effectName}`;

        cc.loader.loadRes(resource, cc.ParticleAsset, (err: Error, asset: cc.ParticleAsset) => {
            if (err || !asset) {
                console.warn(`[AmbientFX] loadRes 失敗: ${resource}`, err);
                return;
            }

            const canvas = cc.find('Canvas');
            if (!canvas) {
                console.warn('[AmbientFX] Canvas 找不到!');
                return;
            }

            console.log(`[AmbientFX] 建立粒子 ${effectName}`);

            const node = new cc.Node(`AmbientFX_${effectName}`);
            const ps   = node.addComponent(cc.ParticleSystem);
            ps.file            = asset;
            ps.playOnLoad      = true;
            ps.autoRemoveOnFinish = false;

            node.parent = canvas;

            if (!ps.spriteFrame) {
                ps.spriteFrame = ParticleEffectManager.getWhiteSF();
            }

            if (effectName === 'rain') {
                node.setPosition(0, 580);
            } else {
                node.setPosition(0, 0);
            }

            node.zIndex = 5;
            ps.resetSystem();

            this._psNode = node;
            console.log(`[AmbientFX] 完成 node=${node.name} pos=(${node.x},${node.y}) active=${node.active} psActive=${ps.enabled}`);
        });
    }

    onDestroy() {
        if (this._psNode && cc.isValid(this._psNode)) {
            this._psNode.destroy();
        }
    }
}
