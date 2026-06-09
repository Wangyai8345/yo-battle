import AudioManager from '../AudioManager';

const { ccclass, property } = cc._decorator;

/** 一筆排行榜資料 */
interface LeaderboardEntry {
    rank:     number;
    username: string;
    wins:     number;
    kills:    number;
}

/**
 * LeaderboardScene
 *
 * 掛在 Leaderboard Scene 的 Canvas 根節點上。
 *
 * 節點結構建議：
 *  Canvas
 *  ├── TitleLabel
 *  ├── BackBtn
 *  ├── StatusLabel          (載入中 / 錯誤訊息)
 *  └── ScrollView
 *      └── content          ← 把這個節點拉進 listContent
 *
 * 每一列用 entryPrefab（內含 RankLabel / UsernameLabel / WinsLabel / KillsLabel）
 * Greybox 階段可先用 cc.Node + cc.Label 手動組。
 */
@ccclass
export default class LeaderboardScene extends cc.Component {

    @property(cc.Label)
    statusLabel: cc.Label = null;

    @property(cc.Node)
    listContent: cc.Node = null;

    @property(cc.Prefab)
    entryPrefab: cc.Prefab = null;

    @property(cc.Button)
    backBtn: cc.Button = null;

    // ─────────────────────────────────────────────────────
    start() {
        this._loadLeaderboard();
    }

    // ── 資料載入 ──────────────────────────────────────────

    private _loadLeaderboard() {
        this._setStatus('Loading…');
        this._clearList();

        // ── TODO：接 Firebase Firestore ───────────────────
        // firebase.firestore()
        //   .collection('leaderboard')
        //   .orderBy('wins', 'desc')
        //   .limit(20)
        //   .get()
        //   .then(snapshot => {
        //       const entries = snapshot.docs.map((doc, i) => ({
        //           rank:     i + 1,
        //           username: doc.data().username,
        //           wins:     doc.data().wins,
        //           kills:    doc.data().kills,
        //       }));
        //       this._renderList(entries);
        //   })
        //   .catch(err => { this._setStatus('載入失敗：' + err.message); });
        //
        // 目前 UI 測試用：假資料
        this.scheduleOnce(() => {
            this._renderList(LeaderboardScene.MOCK_DATA);
        }, 0.5);
    }

    // ── 渲染列表 ──────────────────────────────────────────

    private _renderList(entries: LeaderboardEntry[]) {
        this._setStatus('');
        this._clearList();

        if (!this.listContent) return;

        entries.forEach(entry => {
            const row = this.entryPrefab
                ? cc.instantiate(this.entryPrefab)
                : this._buildRowNode(entry);

            // 如果用 Prefab，透過 name 找 Label 更新文字
            if (this.entryPrefab) {
                this._setLabel(row, 'RankLabel',     `#${entry.rank}`);
                this._setLabel(row, 'UsernameLabel', entry.username);
                this._setLabel(row, 'WinsLabel',     `${entry.wins}W`);
                this._setLabel(row, 'KillsLabel',    `${entry.kills}K`);
            }

            this.listContent.addChild(row);
        });
    }

    /** Greybox 無 Prefab 時，用程式建立簡易橫列 */
    private _buildRowNode(entry: LeaderboardEntry): cc.Node {
        const row = new cc.Node('Row_' + entry.rank);
        row.addComponent(cc.Layout);
        const layout = row.getComponent(cc.Layout);
        layout.type = cc.Layout.Type.HORIZONTAL;
        layout.spacingX = 20;
        layout.padding = 4;

        const cols = [
            { name: 'RankLabel',     text: `#${entry.rank}`,    width: 60  },
            { name: 'UsernameLabel', text: entry.username,       width: 200 },
            { name: 'WinsLabel',     text: `${entry.wins} W`,   width: 80  },
            { name: 'KillsLabel',    text: `${entry.kills} K`,  width: 80  },
        ];

        cols.forEach(col => {
            const cell = new cc.Node(col.name);
            cell.width = col.width;
            cell.height = 40;
            const lbl = cell.addComponent(cc.Label);
            lbl.string = col.text;
            lbl.fontSize = 22;
            lbl.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
            row.addChild(cell);
        });

        return row;
    }

    private _setLabel(root: cc.Node, childName: string, text: string) {
        const child = root.getChildByName(childName);
        if (child) {
            const lbl = child.getComponent(cc.Label);
            if (lbl) lbl.string = text;
        }
    }

    private _clearList() {
        if (this.listContent) this.listContent.removeAllChildren();
    }

    private _setStatus(msg: string) {
        if (this.statusLabel) this.statusLabel.string = msg;
    }

    // ── 按鈕回呼 ──────────────────────────────────────────

    onBackClick() {
        AudioManager.playEffect('click', 0.7);
        cc.director.loadScene('Mainmenu');
    }

    onRefreshClick() {
        AudioManager.playEffect('click', 0.7);
        this._loadLeaderboard();
    }

    // ── 假資料（接 Firebase 後移除）─────────────────────
    private static readonly MOCK_DATA: LeaderboardEntry[] = [
        { rank: 1, username: 'DragonSlayer',  wins: 42, kills: 187 },
        { rank: 2, username: 'WindRider',     wins: 38, kills: 164 },
        { rank: 3, username: 'IronFist',      wins: 35, kills: 152 },
        { rank: 4, username: 'ShadowBlade',   wins: 31, kills: 139 },
        { rank: 5, username: 'StormBreaker',  wins: 29, kills: 121 },
        { rank: 6, username: 'FirePhoenix',   wins: 25, kills: 108 },
        { rank: 7, username: 'FrostArrow',    wins: 22, kills: 97  },
        { rank: 8, username: 'EarthMonk',     wins: 19, kills: 84  },
        { rank: 9, username: 'WaterPriess',   wins: 17, kills: 76  },
        { rank: 10, username: 'MetalHero',    wins: 14, kills: 63  },
    ];
}
