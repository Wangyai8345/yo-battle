import { Schema, MapSchema, type } from "@colyseus/schema";


export class Player extends Schema {
    @type("number") x: number = 0;
    @type("number") y: number = 0;
    @type("number") scaleX: number = 1;

    @type("number") id: number = 1;  // 1 or 2
    @type("string") name: string = "";
    @type("number") heart: number = 3;
    @type("number") hp: number = 100;

    @type("string") character: string;
}

export class MyRoomState extends Schema {
    @type({ map: Player }) players = new MapSchema<Player>();
    @type("boolean") isPending: boolean = true;
    @type("number") gameState: number = 0;

    @type("number") timer: number = 0;
    @type("string") winner: string = "";
    @type("string") mapName: string = "";
}