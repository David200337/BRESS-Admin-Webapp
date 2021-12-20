import { Player } from "./player.model";

export class Pool {
	public id: number;
	public poolNumber: number;
	public players: Player[];

	constructor(id: number, poolNumber: number, players: Player[]) {
		this.id = id;
		this.poolNumber = poolNumber;
		this.players = players;
	}
}
