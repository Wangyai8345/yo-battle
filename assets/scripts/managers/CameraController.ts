const { ccclass, property } = cc._decorator;

@ccclass
export default class CameraController extends cc.Component {

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

    onLoad() {
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

        // ── 1. 計算目標 zoom ──────────────────────────────
        const dist = cc.Vec2.distance(cc.v2(p1Pos.x, p1Pos.y), cc.v2(p2Pos.x, p2Pos.y));
        const t = cc.misc.clampf(
            (dist - this.zoomStartDist) / (this.zoomFullDist - this.zoomStartDist),
            0, 1
        );
        const rawTargetZoom = cc.misc.lerp(this.maxZoom, this.minZoom, t);

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

        const clampedX = cc.misc.clampf(midX, minX, maxX);
        const clampedY = cc.misc.clampf(midY, minY, maxY);

        // ── 6. 平滑移動 Camera ────────────────────────────
        this.node.x = cc.misc.lerp(this.node.x, clampedX, this.followSpeed * dt);
        this.node.y = cc.misc.lerp(this.node.y, clampedY, this.followSpeed * dt);
    }
}
