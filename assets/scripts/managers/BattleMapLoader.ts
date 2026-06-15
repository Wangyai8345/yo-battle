import MapSelect from '../ui/MapSelect';

const { ccclass, property } = cc._decorator;

/**
 * BattleMapLoader
 * 掛在 battle.fire 場景的根節點上
 * 根據 MapSelect.selectedMap 顯示對應地圖群組
 */
@ccclass
export default class BattleMapLoader extends cc.Component {

    @property(cc.Node)
    map1: cc.Node = null;   // 節點名 "MAP 1"

    @property(cc.Node)
    map2: cc.Node = null;   // 節點名 "MAP 2"

    @property(cc.Node)
    map3: cc.Node = null;   // 節點名 "MAP 3"

    onLoad() {
        const idx = MapSelect.selectedMap;
        if (this.map1) this.map1.active = (idx === 0);
        if (this.map2) this.map2.active = (idx === 1);
        if (this.map3) this.map3.active = (idx === 2);

        // fallback：如果沒有選擇，預設顯示 Map1
        if (idx < 0 || idx > 2) {
            if (this.map1) this.map1.active = true;
            if (this.map2) this.map2.active = false;
            if (this.map3) this.map3.active = false;
        }

        cc.log('[BattleMapLoader] 載入地圖 index:', idx);
    }
}
