const { ccclass, property } = cc._decorator;

@ccclass
export default class HUDPanel extends cc.Component {

    @property(cc.Sprite)
    hpBarFG: cc.Sprite = null;

    @property(cc.Label)
    knockbackLabel: cc.Label = null;

    @property(cc.Sprite)
    avatarSprite: cc.Sprite = null;

    setHP(current: number, max: number) {
        if (!this.hpBarFG) return;
        const ratio = cc.misc.clampf(current / max, 0, 1);
        this.hpBarFG.fillRange = ratio;
        if (this.knockbackLabel) {
            this.knockbackLabel.string = `${Math.round(ratio * 100)}%`;
        }
    }

    setKnockback(percent: number) {
        if (!this.knockbackLabel) return;
        this.knockbackLabel.string = `${Math.floor(percent)}%`;
    }

    /** 動態載入角色頭像 */
    setAvatar(characterKey: string) {
        if (!this.avatarSprite) return;
        // 對應 charKey 到圖片檔名
        const nameMap: { [key: string]: string } = {
            'ground_monk': 'ground_monk',
            'water_priestess': 'water_priestess',
            'wind_hashashin': 'wind_hashashin',
            'leaf_ranger': 'leaf_ranger',
            'fire_knight': 'fire_knight',
            'metal_bladekeeper': 'metal_bladekeeper',
        };
        const imgName = nameMap[characterKey] || 'ground_monk';
        cc.loader.loadRes(`avatars/${imgName}`, cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                cc.warn(`[HUDPanel] Avatar not found: avatars/${imgName}`, err);
                return;
            }
            this.avatarSprite.spriteFrame = spriteFrame;
        });
    }
}
