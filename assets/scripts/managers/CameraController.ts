const { ccclass, property } = cc._decorator;

@ccclass
export default class CameraController extends cc.Component {

    /** 全域單例，供其他腳本呼叫 shake() */
    static instance: CameraController = null;

    @property(cc.Node)
    p1: cc.Node = null;

    @property(cc.Node)
    p2: cc.Node = null;

    /** 動態尋找 P1/P2 節點（server 動態生成的角色） */
    private _findPlayers() {
        if (this.p1 && this.p2) return;
        const canvas = cc.find('Canvas');
        if (!canvas) return;
        if (!this.p1) this.p1 = canvas.getChildByName('P1');
        if (!this.p2) this.p2 = canvas.getChildByName('P2');
    }

    @property
    maxZoom: number = 1.8;

    @property
    minZoom: number = 0.65;

    @property
    zoomStartDist: number = 150;

    @property
    zoomFullDist: number = 1200;

    @property
    followSpeed: number = 4;

    @property
    zoomSpeed: number = 3;

    @property
    offsetY: number = 50;

    // 背景圖的實際半寬/半高（單位：px，等於背景 Sprite 的 width/2, height/2）
    // 例如背景是 2560×1080，就填 bgHalfWidth=1280, bgHalfHeight=540
    @property
    bgHalfWidth: number = 960;

    @property
    bgHalfHeight: number = 540;

    // Canvas 半寬/半高（目標解析度 1920×1080）
    private readonly _cvHalfW: number = 960;
    private readonly _cvHalfH: number = 540;

    private _cam: cc.Camera = null;

    // ── Camera Shake ──────────────────────────────────────
    private _shakeTimer: number = 0;
    private _shakeDuration: number = 0;
    private _shakeIntensity: number = 0;
    /** 追蹤用的基礎位置（不含 shake 偏移，給 lerp 用） */
    private _baseX: number = 0;
    private _baseY: number = 0;

    // ── Death Focus（致命一擊特寫運鏡）────────────────────
    private _deathFocusTimer: number = 0;
    private readonly _deathFocusDuration: number = 1.2;
    private _deathFocusX: number = 0;
    private _deathFocusY: number = 0;

    /**
     * 觸發 Camera Shake
     * @param duration   持續時間（秒），建議：普通攻擊 0.18、死亡 0.4
     * @param intensity  最大偏移量（world units），建議：普通攻擊 7、死亡 18
     */
    shake(duration: number, intensity: number) {
        if (intensity >= this._shakeIntensity || this._shakeTimer <= 0) {
            this._shakeDuration  = duration;
            this._shakeTimer     = duration;
            this._shakeIntensity = intensity;
        }
    }

    /**
     * 觸發死亡特寫運鏡：鎖定到死亡位置並 zoom in，持續 1.2 秒後自動恢復
     * @param worldX  死亡玩家的世界座標 X
     * @param worldY  死亡玩家的世界座標 Y
     */
    deathFocus(worldX: number, worldY: number) {
        this._deathFocusX = worldX;
        this._deathFocusY = worldY;
        this._deathFocusTimer = this._deathFocusDuration;
    }
    // ──────────────────────────────────────────────────────

    onLoad() {
        CameraController.instance = this;
        this._cam = this.getComponent(cc.Camera);
        if (!this._cam) cc.warn('[Camera] 找不到 Camera 元件！');
    }

    update(dt: number) {
        this._findPlayers();
        if (!this.p1 || !this._cam) return;
        if (!cc.isValid(this.p1)) { this.p1 = null; return; }

        const p1Pos = this.p1.getPosition();
        const p2Pos = (this.p2 && cc.isValid(this.p2)) ? this.p2.getPosition() : p1Pos;

        const midX = (p1Pos.x + p2Pos.x) / 2;
        const midY = (p1Pos.y + p2Pos.y) / 2 + this.offsetY;

        // ── Death Focus：覆蓋目標位置與 zoom ─────────────
        const isDeathFocus = this._deathFocusTimer > 0;
        let focusX = midX;
        let focusY = midY;
        if (isDeathFocus) {
            this._deathFocusTimer -= dt;
            // 前半段（0.6s）鎖定死亡位置，後半段慢慢回歸 midpoint
            const progress = this._deathFocusTimer / this._deathFocusDuration; // 1→0
            focusX = cc.misc.lerp(midX, this._deathFocusX, progress);
            focusY = cc.misc.lerp(midY, this._deathFocusY, progress);
        }

        // ── 1. 計算目標 zoom ──────────────────────────────
        const dist = cc.Vec2.distance(cc.v2(p1Pos.x, p1Pos.y), cc.v2(p2Pos.x, p2Pos.y));
        const t = cc.misc.clampf(
            (dist - this.zoomStartDist) / (this.zoomFullDist - this.zoomStartDist),
            0, 1
        );
        const baseZoom = cc.misc.lerp(this.maxZoom, this.minZoom, t);
        // Death Focus 時疊加 zoom in（最多放大到 maxZoom * 1.35）
        const deathZoomBoost = isDeathFocus
            ? (this._deathFocusTimer / this._deathFocusDuration) * (this.maxZoom * 0.35)
            : 0;
        const rawTargetZoom = Math.min(baseZoom + deathZoomBoost, this.maxZoom * 1.35);

        // ── 2. 動態最小 zoom：確保 viewport 不超出背景邊界 ──
        //   viewport 半寬 = cvHalfW / zoomRatio，不能超過 bgHalfWidth
        //   → zoomRatio >= cvHalfW / bgHalfWidth
        const dynamicMinZoom = Math.max(
            this.minZoom,
            this._cvHalfW / this.bgHalfWidth,
            this._cvHalfH / this.bgHalfHeight
        );
        const targetZoom = cc.misc.clampf(rawTargetZoom, dynamicMinZoom, this.maxZoom);

        // ── 3. 平滑套用 zoom ──────────────────────────────
        this._cam.zoomRatio = cc.misc.lerp(this._cam.zoomRatio, targetZoom, this.zoomSpeed * dt);
        const curZoom = this._cam.zoomRatio;

        // ── 4. 計算目前 viewport 半寬/半高 ────────────────
        const viewHalfW = this._cvHalfW / curZoom;
        const viewHalfH = this._cvHalfH / curZoom;

        // ── 5. 鉗制 Camera 位置，viewport 不超出背景 ───────
        const minX = -(this.bgHalfWidth  - viewHalfW);
        const maxX =  (this.bgHalfWidth  - viewHalfW);
        const minY = -(this.bgHalfHeight - viewHalfH);
        const maxY =  (this.bgHalfHeight - viewHalfH);

        const clampedX = cc.misc.clampf(focusX, minX, maxX);
        const clampedY = cc.misc.clampf(focusY, minY, maxY);

        // ── 6. 平滑移動 Camera（base 位置，不含 shake）─────
        this._baseX = cc.misc.lerp(this._baseX, clampedX, this.followSpeed * dt);
        this._baseY = cc.misc.lerp(this._baseY, clampedY, this.followSpeed * dt);

        // ── 7. Camera Shake offset ────────────────────────
        let shakeX = 0;
        let shakeY = 0;
        if (this._shakeTimer > 0) {
            this._shakeTimer -= dt;
            // 強度隨時間線性衰減（結尾趨近 0）
            const progress = Math.max(this._shakeTimer / this._shakeDuration, 0);
            const cur = this._shakeIntensity * progress;
            shakeX = (Math.random() * 2 - 1) * cur;
            shakeY = (Math.random() * 2 - 1) * cur;
        }

        this.node.x = this._baseX + shakeX;
        this.node.y = this._baseY + shakeY;
    }
}
