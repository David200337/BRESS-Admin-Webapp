import { Game } from "./game.model";

export class Round {
	public id: number;
	public isFinished: boolean;
	public poolGames: Game[];

	constructor(id: number, isFinished: boolean, poolGames: Game[]) {
		this.id = id;
		this.isFinished = isFinished;
		this.poolGames = poolGames;
	}
}
