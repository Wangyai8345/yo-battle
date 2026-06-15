import NetworkManager, { type MatchStatsData } from "../NetworkManager";

export type PlayerStats = {
    matchesPlayed: number;
    matchesWon: number;
    matchesLost: number;
    matchesDrawn: number;
    roundsPlayed: number;
    roundsWon: number;
    roundsLost: number;
    roundsDrawn: number;
    totalDamageDealt: number;
    totalDamageTaken: number;
    updatedAt: number;
};

export type LeaderboardRecord = PlayerStats & {
    uid: string;
    username: string;
};

type LocalPlayerInfo = {
    id: number;
    name: string;
    sessionId: string;
};

const EMPTY_STATS: PlayerStats = {
    matchesPlayed: 0,
    matchesWon: 0,
    matchesLost: 0,
    matchesDrawn: 0,
    roundsPlayed: 0,
    roundsWon: 0,
    roundsLost: 0,
    roundsDrawn: 0,
    totalDamageDealt: 0,
    totalDamageTaken: 0,
    updatedAt: 0,
};

export default class FirebaseStats {
    static createDefaultStats(): PlayerStats {
        return { ...EMPTY_STATS };
    }

    static buildInitialUserRecord(email: string, username: string) {
        return {
            username,
            email,
            createdAt: Date.now(),
            stats: FirebaseStats.createDefaultStats(),
        };
    }

    static async updateCurrentUserName(username: string): Promise<void> {
        const fb = FirebaseStats.getFirebase();
        const user = fb?.auth?.().currentUser;
        const db = fb?.database?.();
        if (!user || !db) return;

        await db.ref().update({
            [`users/${user.uid}/username`]: username,
            [`leaderboard/${user.uid}/username`]: username,
        });
    }

    static async recordCurrentMatch(matchStats: MatchStatsData | null, roomState: any): Promise<boolean> {
        const fb = FirebaseStats.getFirebase();
        const user = fb?.auth?.().currentUser;
        const db = fb?.database?.();

        if (!user || !db || !matchStats || !roomState?.players) {
            return false;
        }

        const localPlayer = FirebaseStats.getLocalPlayer(roomState);
        if (!localPlayer) {
            return false;
        }

        const isP1 = localPlayer.id === 1 || localPlayer.name === matchStats.p1Name;
        const roundsPlayed = Array.isArray(matchStats.rounds) ? matchStats.rounds.length : 0;
        const roundsWon = isP1 ? matchStats.p1RoundWins : matchStats.p2RoundWins;
        const roundsLost = isP1 ? matchStats.p2RoundWins : matchStats.p1RoundWins;
        const roundsDrawn = Math.max(0, roundsPlayed - roundsWon - roundsLost);
        const totalDamageDealt = isP1 ? matchStats.totalP1Dealt : matchStats.totalP2Dealt;
        const totalDamageTaken = isP1 ? matchStats.totalP2Dealt : matchStats.totalP1Dealt;

        let matchesWon = 0;
        let matchesLost = 0;
        let matchesDrawn = 0;
        const winnerName = typeof roomState.winner === "string" ? roomState.winner : "";

        if (!winnerName || winnerName === "DRAW") {
            matchesDrawn = 1;
        } else if (winnerName === localPlayer.name) {
            matchesWon = 1;
        } else {
            matchesLost = 1;
        }

        const userRef = db.ref(`users/${user.uid}`);
        const snapshot = await userRef.once("value");
        const userRecord = snapshot.val() || {};
        const username = FirebaseStats.resolveUsername(userRecord, user);
        const currentStats = FirebaseStats.normalizeStats(userRecord.stats);
        const nextStats: PlayerStats = {
            matchesPlayed: currentStats.matchesPlayed + 1,
            matchesWon: currentStats.matchesWon + matchesWon,
            matchesLost: currentStats.matchesLost + matchesLost,
            matchesDrawn: currentStats.matchesDrawn + matchesDrawn,
            roundsPlayed: currentStats.roundsPlayed + roundsPlayed,
            roundsWon: currentStats.roundsWon + roundsWon,
            roundsLost: currentStats.roundsLost + roundsLost,
            roundsDrawn: currentStats.roundsDrawn + roundsDrawn,
            totalDamageDealt: currentStats.totalDamageDealt + totalDamageDealt,
            totalDamageTaken: currentStats.totalDamageTaken + totalDamageTaken,
            updatedAt: Date.now(),
        };

        const updates = {
            [`users/${user.uid}/username`]: username,
            [`users/${user.uid}/email`]: userRecord.email || user.email || "",
            [`users/${user.uid}/createdAt`]: userRecord.createdAt || Date.now(),
            [`users/${user.uid}/stats`]: nextStats,
            [`leaderboard/${user.uid}`]: FirebaseStats.buildLeaderboardRecord(user.uid, username, nextStats),
        };

        await db.ref().update(updates);
        return true;
    }

    static normalizeStats(raw: any): PlayerStats {
        const legacyWins = FirebaseStats.toSafeNumber(raw?.wins);
        const legacyLosses = FirebaseStats.toSafeNumber(raw?.losses);

        return {
            matchesPlayed: FirebaseStats.toSafeNumber(raw?.matchesPlayed, legacyWins + legacyLosses),
            matchesWon: FirebaseStats.toSafeNumber(raw?.matchesWon, legacyWins),
            matchesLost: FirebaseStats.toSafeNumber(raw?.matchesLost, legacyLosses),
            matchesDrawn: FirebaseStats.toSafeNumber(raw?.matchesDrawn),
            roundsPlayed: FirebaseStats.toSafeNumber(raw?.roundsPlayed),
            roundsWon: FirebaseStats.toSafeNumber(raw?.roundsWon),
            roundsLost: FirebaseStats.toSafeNumber(raw?.roundsLost),
            roundsDrawn: FirebaseStats.toSafeNumber(raw?.roundsDrawn),
            totalDamageDealt: FirebaseStats.toSafeNumber(raw?.totalDamageDealt),
            totalDamageTaken: FirebaseStats.toSafeNumber(raw?.totalDamageTaken),
            updatedAt: FirebaseStats.toSafeNumber(raw?.updatedAt),
        };
    }

    static getMatchWinRate(stats: PlayerStats): number {
        return stats.matchesPlayed > 0 ? (stats.matchesWon / stats.matchesPlayed) * 100 : 0;
    }

    static getRoundWinRate(stats: PlayerStats): number {
        return stats.roundsPlayed > 0 ? (stats.roundsWon / stats.roundsPlayed) * 100 : 0;
    }

    static getAverageDamageDealt(stats: PlayerStats): number {
        return stats.matchesPlayed > 0 ? stats.totalDamageDealt / stats.matchesPlayed : 0;
    }

    static getAverageDamageTaken(stats: PlayerStats): number {
        return stats.matchesPlayed > 0 ? stats.totalDamageTaken / stats.matchesPlayed : 0;
    }

    private static getFirebase(): any {
        return (window as any).firebase || null;
    }

    private static getLocalPlayer(roomState: any): LocalPlayerInfo | null {
        let localPlayer: LocalPlayerInfo | null = null;

        roomState.players.forEach?.((player: any, sessionId: string) => {
            if (NetworkManager.instance?.isLocal?.(sessionId)) {
                localPlayer = {
                    id: FirebaseStats.toSafeNumber(player?.id),
                    name: typeof player?.name === "string" ? player.name : "",
                    sessionId,
                };
            }
        });

        return localPlayer;
    }

    private static resolveUsername(userRecord: any, authUser: any): string {
        if (typeof userRecord?.username === "string" && userRecord.username.trim() !== "") {
            return userRecord.username.trim();
        }

        if (typeof authUser?.displayName === "string" && authUser.displayName.trim() !== "") {
            return authUser.displayName.trim();
        }

        if (typeof authUser?.email === "string" && authUser.email.includes("@")) {
            return authUser.email.split("@")[0];
        }

        return "Player";
    }

    private static buildLeaderboardRecord(uid: string, username: string, stats: PlayerStats): LeaderboardRecord {
        return {
            uid,
            username,
            ...stats,
        };
    }

    private static toSafeNumber(value: any, fallback: number = 0): number {
        return Number.isFinite(value) ? value : fallback;
    }
}
