const { ccclass, property } = cc._decorator;

/**
 * UIFixedLayer
 * 讓 UI_Layer 不受 Main Camera 的移動和縮放影響
 * 掛在 UI_Layer 節點上
 */
@ccclass
export default class UIFixedLayer extends cc.Component {

    @property(cc.Node)
    mainCamera: cc.Node = null;

    private _cam: cc.Camera = null;

    onLoad() {
        if (this.mainCamera) {
            this._cam = this.mainCamera.getComponent(cc.Camera);
        }
    }

    lateUpdate() {
        if (!this._cam || !this.mainCamera) return;

        const zoom = this._cam.zoomRatio || 1;
        const camX = this.mainCamera.x;
        const camY = this.mainCamera.y;

        // 反轉 camera 的位移和縮放
        this.node.setPosition(camX, camY);
        this.node.scale = 1 / zoom;
    }
}
