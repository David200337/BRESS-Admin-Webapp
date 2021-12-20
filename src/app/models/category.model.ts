import { Round } from "./round.model";

export class Category {
	public id: number = -1;
	public name: string = "";
	public rounds: Round[];

	constructor(id: number, name: string, rounds: Round[]) {
		this.id = id;
		this.name = name;
		this.rounds = rounds;
	}
}
