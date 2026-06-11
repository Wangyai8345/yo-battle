import AudioManager from '../AudioManager';
import FirebaseStats, { type LeaderboardRecord, type PlayerStats } from '../firebase/FirebaseStats';

const { ccclass, property } = cc._decorator;

type RankedEntry = {
    uid: string;
    username: string;
    stats: PlayerStats;
    matchWinRate: number;
    roundWinRate: number;
    avgDamageDealt: number;
    avgDamageTaken: number;
};

type TableColumn = {
    title: string;
    width: number;
    align?: number;
};

const TABLE_FONT_SIZE = 20;
const TABLE_COLUMNS: TableColumn[] = [
    { title: '#', width: 70 },
    { title: 'Name', width: 180 },
    { title: 'Matches', width: 120 },
    { title: 'Match Win Rate', width: 180 },
    { title: 'Round Win Rate', width: 180 },
    { title: 'Total Damage', width: 160 },
    { title: 'Damage Taken', width: 160 },
    { title: 'Avg Damage', width: 150 },
    { title: 'Avg Taken', width: 150 },
];

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

    private runtimeListRoot: cc.Node = null;

    start() {
        this.runtimeListRoot = this.ensureListRoot();
        this.loadLeaderboard();
    }

    private ensureListRoot(): cc.Node {
        if (this.listContent && cc.isValid(this.listContent)) {
            return this.listContent;
        }

        const root = new cc.Node('LeaderboardTextList');
        root.parent = this.node;
        root.setPosition(0, 210);
        this.listContent = root;
        return root;
    }

    private async loadLeaderboard() {
        this.setStatus('Loading leaderboard...');
        this.clearList();

        const fb = (window as any).firebase;
        const db = fb?.database?.();
        if (!db) {
            this.setStatus('Firebase is unavailable.');
            return;
        }

        try {
            const snapshot = await db.ref('leaderboard').once('value');
            const raw = snapshot.val() as Record<string, LeaderboardRecord> | null;

            if (!raw) {
                this.setStatus('No recorded players yet.');
                return;
            }

            const entries = Object.entries(raw)
                .map(([uid, value]) => this.toRankedEntry(uid, value))
                .filter((entry): entry is RankedEntry => entry !== null)
                .sort((a, b) => this.sortEntries(a, b))
                .slice(0, 10);

            if (entries.length === 0) {
                this.setStatus('No recorded players yet.');
                return;
            }

            this.setStatus('');
            this.renderList(entries);
        } catch (error) {
            cc.error('[LeaderboardScene] Failed to load leaderboard', error);
            this.setStatus('Failed to load leaderboard.');
        }
    }

    private toRankedEntry(uid: string, value: LeaderboardRecord | null): RankedEntry | null {
        if (!value || typeof value !== 'object') {
            return null;
        }

        const stats = FirebaseStats.normalizeStats(value);
        const username = typeof value.username === 'string' && value.username.trim() !== ''
            ? value.username.trim()
            : 'Player';

        return {
            uid,
            username,
            stats,
            matchWinRate: FirebaseStats.getMatchWinRate(stats),
            roundWinRate: FirebaseStats.getRoundWinRate(stats),
            avgDamageDealt: FirebaseStats.getAverageDamageDealt(stats),
            avgDamageTaken: FirebaseStats.getAverageDamageTaken(stats),
        };
    }

    private sortEntries(a: RankedEntry, b: RankedEntry): number {
        if (b.matchWinRate !== a.matchWinRate) return b.matchWinRate - a.matchWinRate;
        if (b.stats.matchesWon !== a.stats.matchesWon) return b.stats.matchesWon - a.stats.matchesWon;
        if (b.roundWinRate !== a.roundWinRate) return b.roundWinRate - a.roundWinRate;
        if (b.stats.totalDamageDealt !== a.stats.totalDamageDealt) return b.stats.totalDamageDealt - a.stats.totalDamageDealt;
        return a.username.localeCompare(b.username);
    }

    private renderList(entries: RankedEntry[]) {
        const headerY = 0;
        const rowGap = 42;

        this.createTableRow(
            TABLE_COLUMNS.map((column) => column.title),
            headerY
        );

        entries.forEach((entry, index) => {
            this.createTableRow(
                [
                    String(index + 1),
                    entry.username,
                    String(entry.stats.matchesPlayed),
                    `${entry.matchWinRate.toFixed(1)}%`,
                    `${entry.roundWinRate.toFixed(1)}%`,
                    String(entry.stats.totalDamageDealt),
                    String(entry.stats.totalDamageTaken),
                    entry.avgDamageDealt.toFixed(1),
                    entry.avgDamageTaken.toFixed(1),
                ],
                headerY - rowGap * (index + 1)
            );
        });
    }

    private createTableRow(values: string[], y: number) {
        const rowNode = new cc.Node('LeaderboardRow');
        rowNode.parent = this.runtimeListRoot;
        rowNode.setPosition(0, y);

        const totalWidth = TABLE_COLUMNS.reduce((sum, column) => sum + column.width, 0);
        let cursorX = -totalWidth / 2;

        TABLE_COLUMNS.forEach((column, index) => {
            const cellNode = this.createCellLabel(values[index] || '', column.width);
            cellNode.parent = rowNode;
            cellNode.setPosition(cursorX + column.width / 2, 0);
            cursorX += column.width;
        });
    }

    private createCellLabel(text: string, width: number): cc.Node {
        const labelNode = new cc.Node('Label');
        labelNode.width = width;
        labelNode.height = TABLE_FONT_SIZE + 8;

        const label = labelNode.addComponent(cc.Label);
        label.string = text;
        label.fontSize = TABLE_FONT_SIZE;
        label.lineHeight = TABLE_FONT_SIZE + 6;
        label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        label.verticalAlign = cc.Label.VerticalAlign.CENTER;
        label.overflow = cc.Label.Overflow.SHRINK;

        labelNode.color = cc.Color.WHITE;
        return labelNode;
    }

    private clearList() {
        if (this.runtimeListRoot && cc.isValid(this.runtimeListRoot)) {
            this.runtimeListRoot.removeAllChildren();
        }
    }

    private setStatus(message: string) {
        if (this.statusLabel) {
            this.statusLabel.string = message;
        }
    }

    onBackClick() {
        AudioManager.playEffect('click', 0.7);
        cc.director.loadScene('Mainmenu');
    }

    onRefreshClick() {
        AudioManager.playEffect('click', 0.7);
        this.loadLeaderboard();
    }
}
