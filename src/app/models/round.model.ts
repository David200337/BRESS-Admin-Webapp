import { Game } from "./game.model";
import { GenericModel } from "./generic.model";

export class Round extends GenericModel {
	public isFinished: boolean;
	public poolGames: Game[];

	constructor(id: number, isFinished: boolean, poolGames: Game[]) {
		super(id);
		this.isFinished = isFinished;
		this.poolGames = poolGames;
	}
}
