import { GenericModel } from "./generic.model";
import { Player } from "./player.model";

export class Pool extends GenericModel {
	public poolNumber: number;
	public players: Player[];

	constructor(id: number, poolNumber: number, players: Player[]) {
		super(id);
		this.poolNumber = poolNumber;
		this.players = players;
	}
}
