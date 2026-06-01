import { Room, Client, CloseCode } from "colyseus";
import { MyRoomState, Player } from "./schema/MyRoomState.js";


const READY_TIME = 1;
const GAME_TIME = 120;
const BREAK_TIME = 3;
const END_TIME = 7;

enum GAMESTATE{
	INIT,		// Initial state
	READY,		// Ready up, player can't move 
	GAME,		// Player start fighting
	BREAK,		// When one player is dead
	END,		// Time runs out or one player lost all hp
	TERMINATED 	// Game completely end
};


// mapName: [{p1.x, p1.y}, {p2.x, p2.y}]
const SPAWN_POINTS_CONFIG: { [key: string]: { x: number; y: number }[] } = {
    "map0": [
        { x: -200, y: 220 },
        { x: 500,  y: -175 }
    ],
    "map1": [
        { x: -850, y: -100 },
        { x: 750,  y: -100 }
    ],
    "map2": [
        { x: 800,  y: 200 },
        { x: -600, y: 75 }
    ],
};



export class MyRoom extends Room {
	maxClients: number = 2;
	state: MyRoomState;
	
	gameTimer: any = null;
	syncSignals: Map<string, Set<string>> = new Map<string, Set<string>>();
	
	
	onCreate(options: any) {
		/**
		 * Called when a new room is created.
		*/

		this.state = new MyRoomState(); 		
		this.messageHandlers();

		console.log("room", this.roomId, "created!");
	}


	onJoin(client: Client, options: any) {
		/**
		 * Called when a client joins the room.
		 */
		
		const player = new Player();

		player.character = options.chosenCharacter;
    	
		// 1 or 2
		player.id = this.clients.length; 
		
		// TODO: change this to player name (it's "P1" or "P2" for now)
		player.name = `P${player.id.toString()}`;
		
		console.log(client.sessionId, "joined!");
		
		this.state.players.set(client.sessionId, player);
		
		if (this.clients.length >= this.maxClients) {
            this.lock();
            console.log(`${this.roomId} has maximum players!`);
        }
	}


	onLeave(client: Client, code: CloseCode) {
		/**
		 * Called when a client leaves the room.
		 */

		this.state.winner = this.getOtherPlayer(client.sessionId).name;
		this.state.gameState = GAMESTATE.END;

		this.state.players.delete(client.sessionId);
		console.log(client.sessionId, "left!", code);
	}


	onDispose() {
		/**
		 * Called when the room is disposed.
		 */

		console.log("room", this.roomId, "disposing...");
	}


	hasPlayer(sessionId: string){
		return this.state.players.has(sessionId);
	}


	getPlayer(sessionId: string){
		return this.state.players.get(sessionId);
	}


	getOtherPlayer(sessionId: string){
		for (const [sId, player] of this.state.players.entries()) {
			if (sessionId !== sId) {
				return player;
			}
		}
		return null;
	}


	playerLoseOneHeart(sessionId: string){
		if (this.state.gameState !== GAMESTATE.GAME) return;

		const player = this.getPlayer(sessionId);
		player.heart -= 1;

		const otherplayer = this.getOtherPlayer(sessionId);
		
		if(player.heart === 0){
			this.state.winner = otherplayer.name;
			this.state.gameState = GAMESTATE.END;
		}
		else{
			this.state.gameState = GAMESTATE.BREAK;
		}
	}


	checkHigherHP(){
		let sessionIds: string[] = [];
		let HPs: number[] = [];
		
		this.state.players.forEach((player, sessionId) => {
			sessionIds.push(sessionId);
			HPs.push(player.hp);
		});

		if(HPs.length === 2 && HPs[0] !== HPs[1]){
			if(HPs[0] > HPs[1]) this.playerLoseOneHeart(sessionIds[1]);
			if(HPs[0] < HPs[1]) this.playerLoseOneHeart(sessionIds[0]);
		}
		else{
			this.state.gameState = GAMESTATE.BREAK;
		}
	}


	addSignal(client: Client, signal: string){
		if(!this.hasPlayer(client.sessionId)) return false;
		
		console.log(`Adding signal ${signal} sent by ${client.sessionId}`);

		if (!this.syncSignals.has(signal)){
			this.syncSignals.set(signal, new Set<string>());
		}

		const clients = this.syncSignals.get(signal);
		clients.add(client.sessionId);

		// Check if every client has sent this signal
		if(clients.size >= this.maxClients){
			this.syncSignals.delete(signal);
			return true;
		}
		else{
			return false;
		}
	}


	startCountDown(second: number): Promise<void> {
		const HZ = 5;

		return new Promise((resolve) => {
			this.state.timer = second;
			let checkTimer = second * HZ;
			const initialState = this.state.gameState;

			this.gameTimer = this.clock.setInterval(() => {
				// Immediately stop upon gameState changes
				if (this.state.gameState !== initialState) {
					this.gameTimer.clear();
					resolve();
					return;
				}

				if (checkTimer > 1) {
					checkTimer--;
					this.state.timer = Math.ceil(checkTimer / HZ);
				}
				else {
					this.gameTimer.clear();
					resolve();
				}
			}, 1000 / HZ);
		});
	}


	async runGameLoop() {
		this.resetRound();

		this.state.gameState = GAMESTATE.READY;
		let isGameTerminated = false;
		let gameRound = 0;

		while (!isGameTerminated) {
			switch (this.state.gameState) {
				case GAMESTATE.READY:
					await this.startCountDown(READY_TIME);

					if (this.state.gameState === GAMESTATE.READY) {
						this.state.gameState = GAMESTATE.GAME;
					}
					
					break;

				case GAMESTATE.GAME:
					gameRound++;
					if(gameRound !== 1) this.resetRound();

					await this.startCountDown(GAME_TIME);
					
					// Run out of time
					if (this.state.gameState === GAMESTATE.GAME) {
						this.checkHigherHP();
					}

					break;

				case GAMESTATE.BREAK:
					await this.startCountDown(BREAK_TIME);

					if (this.state.gameState === GAMESTATE.BREAK) {
						this.state.gameState = GAMESTATE.GAME;
					}

					break;

				case GAMESTATE.END:
					await this.startCountDown(END_TIME);

					this.state.gameState = GAMESTATE.TERMINATED;

					break;
					
				case GAMESTATE.TERMINATED:
					isGameTerminated = true; 
					break;
			}
		}
	}


	resetRound(){
		this.resetPlayerPositions();
		this.reserPlayerHp();
	}


	resetPlayerPositions() {

		const points = SPAWN_POINTS_CONFIG[this.state.mapName];
		this.state.players.forEach((p) => {
			const pt = points[p.id - 1];
			p.x = pt.x;
			p.y = pt.y;
		});


		const positions = Array.from(this.state.players.entries()).map(([sessionId, player]) => ({
			sessionId: sessionId,
			x: player.x, 
			y: player.y 
		}));


		this.broadcast("S_resetPositions", {
			positions: positions
		});
	}


	reserPlayerHp(){
		this.state.players.forEach((p) => {
			p.hp = 100;
		});
		this.broadcast("S_resetHp");
	}

	
	chooseRandomMap(){
		const maps = ["map0", "map1", "map2"];
		this.state.mapName = maps[Math.floor(Math.random() * maps.length)];
	}


	messageHandlers(){

		this.onMessage("C_connectedSignal", (client: Client) => {
			if(!this.addSignal(client, "C_connectedSignal")) return;

			// After all players are connected
			this.chooseRandomMap();
			this.state.isPending = false;
		});
		

		this.onMessage("C_enteredGameSignal", async (client: Client) => {
			if(!this.addSignal(client, "C_enteredGameSignal")) return;

			// After all players are in game scene
			// this.resetPlayerPositions();
			this.runGameLoop();
		});


		this.onMessage("C_sendPosition", (client: Client, message: any) => {
			const player = this.getPlayer(client.sessionId);
			
			if (player) {
				player.x = message.x;
				player.y = message.y;
			}
        });


		this.onMessage("C_sendScaleX", (client: Client, message: any) => {
			const player = this.getPlayer(client.sessionId);
			
			if (player) player.scaleX = message.scaleX;
        });


		this.onMessage("C_sendHp", (client: Client, message: any) => {
			const player = this.getPlayer(client.sessionId);
			
			if (player) player.hp = message.hp;
        });


		this.onMessage("C_playSoundEffect", (client: Client, message: {clipName: string, volume: number}) => {
			this.broadcast("S_playSoundEffect", { 
				senderId: client.sessionId, 
				clipName: message.clipName, 
				volume: message.volume, 
			}, { except: client });
		});
		

		this.onMessage("C_playAnimation", (client: Client, clipName: string) => {
			this.broadcast("S_playAnimation", { 
				senderId: client.sessionId, 
				clipName: clipName 
			}, { except: client });
		});
		
		
		this.onMessage("C_stopAnimation", (client: Client, clipName: string) => {
			this.broadcast("S_stopAnimation", { 
				senderId: client.sessionId, 
				clipName: clipName 
			}, { except: client });
		});


		this.onMessage("C_playerDead", (client) => {
			this.playerLoseOneHeart(client.sessionId);
		});


		this.onMessage("C_checkAttack", (client: Client, message: { 
			attackType: string,
			targetSessionId: string, 
			hitX: number,
			hitY: number,
			damage: number,
            kbX: number,
            kbY: number
		}) => {
			
			const target = this.getPlayer(message.targetSessionId);

			if(target){
				const dx = target.x - message.hitX;
				const dy = target.y - message.hitY;
				const distance = Math.sqrt(dx * dx + dy * dy);

				// dist between where client sees target player vs where target player actually is
				const TOLERATE_DISTANCE = 150;

				if (distance <= TOLERATE_DISTANCE) {
					
					this.broadcast("S_attackResult", {
						isValid: true,
						attackType: message.attackType,
						targetSessionId: message.targetSessionId,
						damage: message.damage,
						kbX: message.kbX,
						kbY: message.kbY
					});
					return;
				}
			}

			this.broadcast("S_attackResult", {
				isValid: false,
				attackType: message.attackType,
				targetSessionId: message.targetSessionId,
				damage: message.damage,
				kbX: message.kbX,
				kbY: message.kbY
			});
		});


		this.onMessage("C_spawnPrefab", (client: Client, message: any) => {
			this.broadcast("S_spawnPrefab",{
				senderId: client.sessionId,
				prefabName: message.prefabName,
				infos: message.infos
			}, { except: client });
        });
		
		
		this.onMessage("C_destroyPrefab", (client: Client, uid: string) => {
			this.broadcast("S_destroyPrefab",{
				uid: uid
			}, { except: client });
        });
	}
}
