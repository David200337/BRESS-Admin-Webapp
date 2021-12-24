import { GenericModel } from "./generic.model";
import { Round } from "./round.model";

export class Category extends GenericModel {
	public name: string;
	public rounds: Round[];

	constructor(id: number, name: string, rounds: Round[]) {
        super(id);
		this.name = name;
		this.rounds = rounds;
	}
}
