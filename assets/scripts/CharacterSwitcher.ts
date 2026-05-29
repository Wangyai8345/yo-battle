import AudioManager from './AudioManager';

const { ccclass, property } = cc._decorator;

/**
 * CharacterSwitcher
 * 掛在場景任意空節點上，統一管理多個角色節點的切換。
 * 按數字鍵 1 / 2 / 3 顯示對應角色，同時隱藏其他角色。
 * 切換時會把當前角色的位置複製給新角色，無縫接替。
 *
 * 使用方式：
 * 1. 場景新增空節點，掛上此腳本。
 * 2. 把各角色節點拖進 Characters 陣列（順序對應鍵盤 1 / 2 / 3）。
 * 3. 各角色的 PlayerController 的 switchPresetByNumberKey 請設為 false，
 *    避免和此腳本的按鍵衝突。
 */
@ccclass
export default class CharacterSwitcher extends cc.Component {

    @property([cc.Node])
    characters: cc.Node[] = [];

    @property
    bgmResource: string = 'BGM';

    @property
    bgmVolume: number = 0.215;

    private activeIndex: number = 0;
    private initialPos: cc.Vec2[] = [];

    onLoad() {
        this.playBackgroundMusic();
        for (let i = 0; i < this.characters.length; i++) {
            const c = this.characters[i];
            if (c) {
                // 記住每個角色一開始的位置，切換時直接回到出生點
                this.initialPos[i] = cc.v2(c.x, c.y);
                c.active = (i === 0);
            }
        }
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    private playBackgroundMusic() {
        if (!this.bgmResource) return;
        AudioManager.playMusic(this.bgmResource, this.bgmVolume, true);
    }

    onKeyDown(event: cc.Event.EventKeyboard) {
        const k = event.keyCode;
        // Cocos 2.x: cc.macro.KEY.num1/2/3 可能是 undefined，直接用 keyCode 數字
        // 主數字鍵列: 1=49, 2=50, 3=51；數字鍵盤: 1=97, 2=98, 3=99
        if (k === 49 || k === 97)       { this.switchTo(0); }
        else if (k === 50 || k === 98)  { this.switchTo(1); }
        else if (k === 51 || k === 99)  { this.switchTo(2); }
    }

    switchTo(index: number) {
        if (index < 0 || index >= this.characters.length) return;
        if (index === this.activeIndex) return;

        const current = this.characters[this.activeIndex];
        const next    = this.characters[index];
        if (!current || !next) return;

        // 1) 切換 = 回到該角色的出生點（X+Y 都用 onLoad 記的初始位置）
        //    直接回到場景一開始就能穩定站住的平台座標
        const spawn = this.initialPos[index];
        const x = spawn ? spawn.x : next.x;
        const y = spawn ? spawn.y : next.y;

        // 2) 隱藏舊角色，並把舊角色也歸位歸零（避免下次切回來時 Box2D 還留著倒在地上的姿勢/位置）
        const curRb = current.getComponent(cc.RigidBody);
        if (curRb) {
            curRb.linearVelocity = cc.v2(0, 0);
            curRb.angularVelocity = 0;
        }
        const curSpawn = this.initialPos[this.activeIndex];
        if (curSpawn) {
            current.setPosition(curSpawn.x, curSpawn.y);
        }
        current.angle = 0;
        if (curRb && typeof (curRb as any).syncPosition === 'function') {
            (curRb as any).syncPosition(true);
            (curRb as any).syncRotation(true);
        }
        current.active = false;

        // 3) 先設位置 + 角度歸零，再啟用新角色，這樣 Box2D body 啟用時就生在正確位置
        next.setPosition(x, y);
        next.angle = 0;
        next.active = true;

        // 4) 重設新角色的物理狀態：清空殘留速度 + 鎖死旋轉 + 把 node 位置同步到 Box2D body
        const rb = next.getComponent(cc.RigidBody);
        if (rb) {
            const originalGravityScale = rb.gravityScale || 1;
            rb.linearVelocity = cc.v2(0, 0);
            rb.angularVelocity = 0;
            // 鎖死旋轉，避免被碰撞推倒「躺下來」
            rb.fixedRotation = true;
            // 切換後先短暫凍住重力，等平台接觸穩定建立再恢復
            rb.gravityScale = 0;
            // syncPosition(true) 會把 node 的當前位置寫進 Box2D body
            if (typeof (rb as any).syncPosition === 'function') {
                (rb as any).syncPosition(true);
            }
            if (typeof (rb as any).syncRotation === 'function') {
                (rb as any).syncRotation(true);
            }
            // 再 setPosition 一次 + sync 一次，保險避免重複切換時 Box2D 內部 transform 殘留
            next.setPosition(x, y);
            if (typeof (rb as any).syncPosition === 'function') {
                (rb as any).syncPosition(true);
            }
            rb.awake = true;

            this.scheduleOnce(() => {
                if (!cc.isValid(next) || !next.active) return;
                const activeRb = next.getComponent(cc.RigidBody);
                if (!activeRb) return;
                activeRb.linearVelocity = cc.v2(0, 0);
                activeRb.angularVelocity = 0;
                activeRb.gravityScale = originalGravityScale;
                if (typeof (activeRb as any).syncPosition === 'function') {
                    (activeRb as any).syncPosition(true);
                }
                activeRb.awake = true;
            }, 0.12);
        }

        // 5) 清掉 PlayerController 內的舊狀態（onGround / 攻擊鎖等），避免空中卡 idle
        const pc = next.getComponent('PlayerController') as any;
        if (pc) {
            // 樂觀假設「站在地上」：因為我們把人放在 onLoad 記錄的原始 Y 上，那本來就是平台位置。
            // 萬一他剛好不在地上，下一次 onEndContact 會自然修正回 false。
            pc.onGround = true;
            pc.groundContactCount = 0;
            pc.isAttacking = false;
            pc.isAirAttacking = false;
            pc.isHit = false;
            pc.isDashing = false;
            pc.isDefending = false;
            pc.comboStep = 0;
            pc.comboQueued = false;
            pc.currentAnim = '';
            pc.coyoteTimer = 0;
            pc.jumpBufferTimer = 0;
        }

        this.activeIndex = index;
    }
}
