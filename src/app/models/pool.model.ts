import { Game } from "./game.model";
import { GenericModel } from "./generic.model";
import { Player } from "./player.model";

export class Pool extends GenericModel {
	public poolNumber: number;
	public players: Player[];
	public games: Game[];

	constructor(
		id: number, 
		poolNumber: number, 
		players: Player[],
		games: Game[],
		) {
		super(id);
		this.poolNumber = poolNumber;
		this.players = players;
		this.games = games;
	}
}
