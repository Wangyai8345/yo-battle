// import BulletController from "./BulletController";
import AudioManager from "./AudioManager";
import NetworkManager, { GAMESTATE, type MatchStatsData, type RoundStatData } from "./NetworkManager";
import PlayerController from "./PlayerController";
import { resolvePlayerController } from "./PlayerControllerResolver";
import DragonProjectile from "./DragonProjectile";
import ProjectileController from "./ProjectileController";
import UIManager from "./managers/UIManager";
import GameOverPanel from "./ui/GameOverPanel";
import FirebaseStats from "./firebase/FirebaseStats";
import { configurePhysicsTiming } from "./PhysicsConfig";


const { ccclass, property } = cc._decorator;



@ccclass
export default class GameManager extends cc.Component {

    @property(cc.Prefab)
    groundMonkPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    waterPriestessPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    fireKnightPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    windHeroPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    arrowHeroPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    metalHeroPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    attackHitBoxPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    exampleProjectilePrefab: cc.Prefab = null;

    @property(cc.Prefab)
    arrowProjectilePrefab: cc.Prefab = null;

    @property(cc.Prefab)
    arrowBeamPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    dragonProjectilePrefab: cc.Prefab = null;

    @property(cc.Prefab)
    map0Prefab: cc.Prefab = null;

    @property(cc.Prefab)
    map1Prefab: cc.Prefab = null;

    @property(cc.Prefab)
    map2Prefab: cc.Prefab = null;

    @property(cc.Label)
    timerLabel: cc.Label = null;

    @property(cc.Label)
    winnerLabel: cc.Label = null;

    @property(cc.Label)
    heartLabel: cc.Label = null;

    @property(cc.Label)
    waitingLabel: cc.Label = null;

    @property(GameOverPanel)
    gameOverPanel: GameOverPanel = null;



    public static instance: GameManager = null;
    private playerNodes: cc.Node[] = [];
    private nodePools: Map<string, cc.NodePool> = new Map();
    private prefabNodes: Map<string, cc.Node> = new Map();

    private isReady: boolean = false;
    private localRoundStats: RoundStatData[] = [];
    private hasRecordedCurrentRound: boolean = false;
    private localRoundP1DealtPercent: number = 0;
    private localRoundP2DealtPercent: number = 0;



    onLoad() {
        configurePhysicsTiming();

        if (GameManager.instance === null) {
            GameManager.instance = this;
        }
        else {
            this.node.destroy();
            return;
        }
    }


    protected onDestroy(): void {
        if (GameManager.instance === this) {
            GameManager.instance = null;
        }
    }


    protected start(): void {
        this.localRoundStats = [];
        this.hasRecordedCurrentRound = false;
        this.resetLocalRoundDamageTracking();
        NetworkManager.instance.initGameScene();
        AudioManager.playMusic('BGM', true, 0.3);
        this.setAutoQuitSchedule();
    }


    setAutoQuitSchedule() {
        // If after WAIT_TIME seconds not ready
        // (maybe the other player quit or taking too long)
        // then terminate the game

        const DISPLAY_WAITING_LABEL_TIME = 2;
        const WAIT_TIME = 15;

        this.scheduleOnce(() => {
            if (!this.isReady) {
                this.waitingLabel.node.active = true;
                this.waitingLabel.string =
                    `WAITING THE OTHER PLAYER...\n\nAuto quit after ${WAIT_TIME} seconds`;
            }
        }, DISPLAY_WAITING_LABEL_TIME);

        this.scheduleOnce(() => {
            if (!this.isReady) {
                cc.warn(`Auto quit triggered`);
                NetworkManager.instance.terminateAndReturnToLobby();
            }
        }, WAIT_TIME);
    }


    getPlayerPrefab(character: string) {
        switch (character) {
            case "ground_monk":
                return this.groundMonkPrefab;
            case "water_priestess":
                return this.waterPriestessPrefab || this.groundMonkPrefab;
            case "fire_knight":
            case "fire_hero":
                return this.fireKnightPrefab || this.groundMonkPrefab;
            case "wind":
            case "wind_hero":
            case "wind_hashashin":
                return this.windHeroPrefab || this.groundMonkPrefab;
            case "arrow":
            case "arrow_hero":
            case "leaf_ranger":
                return this.arrowHeroPrefab || this.groundMonkPrefab;
            case "metal":
            case "metal_hero":
            case "metalhero":
            case "metal_bladekeeper":
                return this.metalHeroPrefab || this.groundMonkPrefab;
            default:
                cc.warn(`[GameManager] Unsupported character "${character}", fallback to groundMonkPrefab`);
                return this.groundMonkPrefab;
        }
    }


    private resolvePlayerController(playerNode: cc.Node): PlayerController {
        return resolvePlayerController(playerNode);
    }


    spawnPlayer(player: any, sessionId: string, isLocal: boolean): cc.Node {
        let playerNode = cc.instantiate(this.getPlayerPrefab(player.character));

        this.playerNodes.push(playerNode);

        // Basic properties
        playerNode.active = false;

        playerNode.name = `P${player.id}`;

        playerNode.parent = cc.find("Canvas");

        playerNode.setPosition(player.x, player.y);

        // Player Name Label (hidden)
        let labelNode = new cc.Node('Player Label');
        labelNode.active = false;
        labelNode.parent = playerNode;

        // HP Label
        let labelNode2 = new cc.Node('HP Label');
        labelNode2.color = cc.color(0, 0, 0);
        const label2 = labelNode2.addComponent(cc.Label);
        label2.string = `HP: ${player.hp}`;
        label2.fontSize = 12;
        labelNode2.parent = playerNode;
        labelNode2.setPosition(0, 60, 0);
        labelNode2.active = false;

        // Player Controller
        let controller = this.resolvePlayerController(playerNode);
        if (!controller) {
            cc.error(`[GameManager] Missing PlayerController on prefab for character "${player.character}"`);
            return playerNode;
        }
        controller.isLocal = isLocal;
        controller.sessionId = sessionId;
        controller.id = player.id;
        controller.hp = player.hp;
        // 初始化血條
        if (UIManager.instance) {
            UIManager.instance.updateHP(player.id - 1, player.hp, 100);
            // 設定角色頭像
            const panel = player.id === 1 ? UIManager.instance.p1Panel : UIManager.instance.p2Panel;
            if (panel) {
                panel.setAvatar(player.character);
                panel.setIsLocalPlayer(isLocal);
            }
        }
        // Set rb to Static if nonlocal
        if (!isLocal) {
            let rb = playerNode.getComponent(cc.RigidBody);
            if (rb) {
                rb.active = false;
                rb.type = cc.RigidBodyType.Kinematic;
                rb.active = true;
                rb.linearVelocity = cc.v2(0, 0);
                rb.angularVelocity = 0;
            }
        }

        return playerNode;
    }


    spawnMap(mapName: string) {
        console.log(`Spawned Map: ${mapName}`);

        let mapPrefab: cc.Prefab = null;
        switch (mapName) {
            case "map0": mapPrefab = this.map0Prefab; break;
            case "map1": mapPrefab = this.map1Prefab; break;
            case "map2": mapPrefab = this.map2Prefab; break;
            default: mapPrefab = this.map0Prefab; break;
        }

        if (mapPrefab) {
            const mapNode = cc.instantiate(mapPrefab);
            mapNode.parent = cc.find("Canvas");
            mapNode.setPosition(0, 0);
            const uiLayer = cc.find("Canvas/UI_Layer");
            if (uiLayer) uiLayer.setSiblingIndex(uiLayer.parent.childrenCount - 1);
        }
    }


    updateTimer(timer: number) {
        if (this.timerLabel) this.timerLabel.string = timer.toString();
    }


    updateHeartLabel() {
        let str: string = ''
        this.playerNodes.forEach((node) => {
            let controller = this.resolvePlayerController(node);
            if (controller) {
                str += `P${controller.id}: ${controller.heart}❤️ `;
            }
        })
        if (this.heartLabel) this.heartLabel.string = str;
    }


    gameReady() {
        this.isReady = true;
        this.waitingLabel.node.active = false;

        this.playerNodes.forEach((node) => {
            node.active = true;
        });
    }


    gameStart() {
        this.hasRecordedCurrentRound = false;
        this.resetLocalRoundDamageTracking();
        this.playerNodes.forEach((node) => {
            const controller = this.resolvePlayerController(node);
            if (controller) {
                controller.onRestart();
                controller.isControllable = true;
            }
        });
    }


    gameBreak() {
        this.recordLocalRoundStat("BREAK");
        this.playerNodes.forEach((node) => {
            const controller = this.resolvePlayerController(node);
            if (controller) {
                controller.isControllable = false;
            }
        });
    }

    private getSortedStatePlayers(state: any): any[] {
        const players: any[] = [];
        state?.players?.forEach?.((player: any, sessionId: string) => {
            players.push({
                id: player.id,
                name: player.name,
                hp: player.hp,
                sessionId,
            });
        });
        return players.sort((a, b) => a.id - b.id);
    }

    private getLocalRoundResult(players: any[], winnerNameFromState?: string): string {
        if (winnerNameFromState) {
            return winnerNameFromState;
        }

        if (players.length < 2) {
            return "DRAW";
        }

        if (players[0].hp === players[1].hp) {
            return "DRAW";
        }

        return players[0].hp > players[1].hp ? players[0].name : players[1].name;
    }

    private clampPercent(value: number): number {
        return Math.max(0, Math.min(100, Math.round(value)));
    }

    private resetLocalRoundDamageTracking() {
        this.localRoundP1DealtPercent = 0;
        this.localRoundP2DealtPercent = 0;
    }

    public recordLocalAttackDamage(targetSessionId: string, damage: number) {
        if (this.hasRecordedCurrentRound) {
            return;
        }

        const state = NetworkManager.instance?.getRoomState?.();
        if (!state?.players) {
            return;
        }

        const players = this.getSortedStatePlayers(state);
        const targetPlayer = players.find((player) => player.sessionId === targetSessionId);
        const attackerPlayer = players.find((player) => player.sessionId !== targetSessionId);

        if (!targetPlayer || !attackerPlayer) {
            return;
        }

        const safeDamage = Math.max(0, Number.isFinite(damage) ? damage : 0);
        const targetHp = Math.max(0, Number.isFinite(targetPlayer.hp) ? targetPlayer.hp : 0);
        const appliedDamage = Math.min(safeDamage, targetHp);

        if (attackerPlayer.id === 1) {
            this.localRoundP1DealtPercent = Math.min(100, this.localRoundP1DealtPercent + appliedDamage);
        } else if (attackerPlayer.id === 2) {
            this.localRoundP2DealtPercent = Math.min(100, this.localRoundP2DealtPercent + appliedDamage);
        }
    }

    private recordLocalRoundStat(source: "BREAK" | "END") {
        if (this.hasRecordedCurrentRound) {
            return;
        }

        const state = NetworkManager.instance?.getRoomState?.();
        const players = this.getSortedStatePlayers(state);
        if (players.length < 2) {
            return;
        }

        const round: RoundStatData = {
            round: this.localRoundStats.length + 1,
            p1DealtPercent: this.clampPercent(this.localRoundP1DealtPercent),
            p2DealtPercent: this.clampPercent(this.localRoundP2DealtPercent),
            result: this.getLocalRoundResult(players, source === "END" ? state?.winner : undefined),
        };

        this.localRoundStats.push(round);
        this.hasRecordedCurrentRound = true;
    }


    private buildMatchStatsData(state: any): MatchStatsData | null {
        if (!state?.players) {
            return null;
        }

        let p1Name = "P1";
        let p2Name = "P2";

        state.players.forEach((player: any) => {
            if (player.id === 1) p1Name = player.name || "P1";
            if (player.id === 2) p2Name = player.name || "P2";
        });

        const rounds: RoundStatData[] = [];
        let totalP1Dealt = 0;
        let totalP2Dealt = 0;
        let p1RoundWins = 0;
        let p2RoundWins = 0;

        const hasLocalRoundStats = this.localRoundStats.length > 0;
        const hasServerRoundStats = !!state?.roundStats && typeof state.roundStats.forEach === "function";
        const rawRounds: any[] = [];

        if (hasLocalRoundStats) {
            rawRounds.push(...this.localRoundStats);
        } else if (hasServerRoundStats) {
            state.roundStats.forEach((round: any) => rawRounds.push(round));
        }

        rawRounds.forEach((round: any) => {
            const row: RoundStatData = {
                round: round.round,
                p1DealtPercent: round.p1DealtPercent,
                p2DealtPercent: round.p2DealtPercent,
                result: round.result,
            };

            rounds.push(row);
            totalP1Dealt += row.p1DealtPercent;
            totalP2Dealt += row.p2DealtPercent;

            if (row.result === p1Name) p1RoundWins += 1;
            if (row.result === p2Name) p2RoundWins += 1;
        });

        return {
            p1Name,
            p2Name,
            totalP1Dealt,
            totalP2Dealt,
            p1RoundWins,
            p2RoundWins,
            rounds,
        };
    }


    gameEnd(){
        const state = NetworkManager.instance.getRoomState();
        const winner = state.winner;
        this.recordLocalRoundStat("END");

        // 找贏家的角色 Prefab
        let winnerPrefab: cc.Prefab = null;
        let winnerCharacter: string | null = null;
        state.players.forEach((player: any) => {
            if (player.name === winner) {
                winnerPrefab = this.getPlayerPrefab(player.character);
                winnerCharacter = player.character || null;
            }
        });

        const matchStats = this.buildMatchStatsData(state);
        FirebaseStats.recordCurrentMatch(matchStats, state)
            .catch((error) => {
                cc.warn("[GameManager] Failed to record Firebase match stats", error);
            });

        // 延遲跳轉，讓死亡特效與 Camera Shake 播完再切場景
        this.scheduleOnce(() => {
            NetworkManager.instance.transitionToGameOverScene({
                winnerName: winner,
                winnerPrefab: winnerPrefab || null,
                winnerCharacter,
                matchStats,
            });
        }, 2.5);
    }


    gameTerminated(){
        // 如果有 GameOverPanel 就不自動跳轉，讓玩家選 Again/Quit
        if (this.gameOverPanel && this.gameOverPanel.node.active) return;
        cc.director.loadScene("join_room_scene");
    }


    getNodeFromPool(prefabName: string, prefab: cc.Prefab){
        // Create new node pool
        if(!this.nodePools.has(prefabName)){
            this.nodePools.set(prefabName, new cc.NodePool());
        }
        
        const pool = this.nodePools.get(prefabName);
        let node: cc.Node = null;
        
        // Get node from pool first, if pool is empty, then instantiate  
        if(pool.size() > 0){
            node = pool.get();
            console.log("Node Pooling: Get node from pool");
        }
        else{
            node = cc.instantiate(prefab);
            console.log("Node Pooling: Instantiate");
        }

        node.name = prefabName;

        return node;
    }


    handleSpawnPrefab(prefabName: string, infos: any) {
        // prefabName is the same as NetworkManager.instance.spawnPrefab(prefabName)
        // Every infos contains
        // .uid: the unique id for this prefab
        // .isLocal: whether is prefab is created locally

        let node: cc.Node = null;

        const exampleProjectilePrefabName = this.exampleProjectilePrefab
            ? this.exampleProjectilePrefab.name
            : "exampleProjectilePrefab";
        const arrowProjectilePrefabName = this.arrowProjectilePrefab
            ? this.arrowProjectilePrefab.name
            : "arrowProjectilePrefab";
        const arrowBeamPrefabName = this.arrowBeamPrefab
            ? this.arrowBeamPrefab.name
            : "arrowBeamPrefab";
        const dragonProjectilePrefabName = this.dragonProjectilePrefab
            ? this.dragonProjectilePrefab.name
            : "dragonProjectilePrefab";


        switch (prefabName) {
            case exampleProjectilePrefabName:
                // node = this.getNodeFromPool(exampleProjectilePrefabName, this.exampleProjectilePrefab);

                // node.setPosition(infos.x, infos.y);

                // let rb = node.getComponent(cc.RigidBody);
                // if (rb) {
                //     rb.linearVelocity = cc.v2(300, 0);
                //     rb.awake = true;
                // }

                // let controller = node.getComponent(ProjectileController);
                // controller.initialize(
                //     infos.isLocal,
                //     infos.uid,
                //     "exampleProjectileAttack",
                //     10,
                //     0
                // );

                break;

            case arrowProjectilePrefabName:
                if (!this.arrowProjectilePrefab) {
                    cc.warn("[GameManager] arrowProjectilePrefab is not assigned");
                    break;
                }

                node = this.getNodeFromPool(arrowProjectilePrefabName, this.arrowProjectilePrefab);
                node.active = true;
                node.setPosition(infos.x, infos.y);
                node.scaleX = Math.abs(node.scaleX) * (infos.direction >= 0 ? 1 : -1);
                node.angle = infos.angle || 0;

                let arrowRb = node.getComponent(cc.RigidBody);
                if (arrowRb) {
                    arrowRb.gravityScale = 0;
                    arrowRb.enabledContactListener = true;
                    arrowRb.linearVelocity = cc.v2((infos.speed || 0) * (infos.direction || 1), infos.vy || 0);
                    arrowRb.awake = true;
                }

                let arrowController = node.getComponent(ProjectileController);
                if (arrowController) {
                    arrowController.initialize(
                        infos.isLocal,
                        infos.uid,
                        infos.attackType || "arrowRangedAttack",
                        infos.damage || 0,
                        infos.kbScale || 0
                    );
                }

                if (infos.isLocal && infos.lifetime > 0) {
                    this.scheduleOnce(() => {
                        if (this.prefabNodes.has(infos.uid)) {
                            NetworkManager.instance.destroyPrefab(infos.uid);
                        }
                    }, infos.lifetime);
                }

                break;

            case arrowBeamPrefabName:
                if (!this.arrowBeamPrefab) {
                    cc.warn("[GameManager] arrowBeamPrefab is not assigned");
                    break;
                }

                node = this.getNodeFromPool(arrowBeamPrefabName, this.arrowBeamPrefab);
                node.active = false;
                node.setPosition(infos.x, infos.y);
                node.scaleX = Math.abs(node.scaleX) * (infos.direction >= 0 ? 1 : -1);

                let beamSprite = node.getComponent(cc.Sprite);
                if (!beamSprite) {
                    beamSprite = node.addComponent(cc.Sprite);
                } else {
                    beamSprite.enabled = false;
                }

                let beamAnim = node.getComponent(cc.Animation);
                node.active = true;
                if (beamSprite) {
                    beamSprite.enabled = true;
                }
                if (beamAnim) {
                    const clips = beamAnim.getClips();
                    const clipName = infos.animationName
                        || (clips && clips.length > 0 && clips[0] ? clips[0].name : "");
                    if (clipName) {
                        beamAnim.play(clipName);
                    }
                }

                if (infos.isLocal && infos.duration > 0) {
                    this.scheduleOnce(() => {
                        if (this.prefabNodes.has(infos.uid)) {
                            NetworkManager.instance.destroyPrefab(infos.uid);
                        }
                    }, infos.duration);
                }

                break;

            case dragonProjectilePrefabName:
                if (!this.dragonProjectilePrefab) {
                    cc.warn("[GameManager] dragonProjectilePrefab is not assigned");
                    break;
                }

                node = this.getNodeFromPool(dragonProjectilePrefabName, this.dragonProjectilePrefab);
                node.setPosition(infos.x, infos.y);
                node.scaleX = Math.abs(node.scaleX) * (infos.direction >= 0 ? 1 : -1);

                const dragonRb = node.getComponent(cc.RigidBody);
                if (dragonRb) {
                    dragonRb.gravityScale = 0;
                    dragonRb.enabledContactListener = true;
                    dragonRb.linearVelocity = cc.v2(0, 0);
                    dragonRb.awake = true;
                }

                const dragonProjectile = node.getComponent(DragonProjectile);
                if (dragonProjectile) {
                    dragonProjectile.destroyOnAnimationFinished = false;
                    dragonProjectile.launch(infos.direction || 1);
                }

                const dragonController = node.getComponent(ProjectileController);
                if (dragonController) {
                    dragonController.initialize(
                        infos.isLocal,
                        infos.uid,
                        infos.attackType || "fireDragonAttack",
                        infos.damage || 0,
                        infos.kbScale || 0
                    );
                }

                if (infos.isLocal && infos.lifetime > 0) {
                    this.scheduleOnce(() => {
                        if (this.prefabNodes.has(infos.uid)) {
                            NetworkManager.instance.destroyPrefab(infos.uid);
                        }
                    }, infos.lifetime);
                }

                break;

            // TODO: more prefabs types

            default:
                break;
        }

        if (node) {
            this.prefabNodes.set(infos.uid, node);
            cc.find("Canvas").addChild(node);
        }
    }


    handleDestroyPrefab(prefabId: string) {
        if (this.prefabNodes.has(prefabId)) {
            const node = this.prefabNodes.get(prefabId);

            if (node && cc.isValid(node, true)) {
                // Call despawn function
                let controller = node.getComponent(ProjectileController);
                if (controller && controller.onDespawn) {
                    controller.onDespawn();
                }
                
                let dragonController = node.getComponent(DragonProjectile);
                if (dragonController && dragonController.onDespawn) {
                    dragonController.onDespawn();
                }
                
                // Return to pool first, if sth went wrong, then use destroy
                const prefabName = node.name;

                if(this.nodePools.has(prefabName)){
                    this.nodePools.get(prefabName).put(node);
                    console.log("Node Pooling: Return to pool");
                }
                else {
                    node.destroy();
                    console.log("Node Pooling: Destroy Node");
                }
            }

            this.prefabNodes.delete(prefabId);
        }
    }
}
