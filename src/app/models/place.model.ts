import { Category } from "./category.model";
import { GenericModel } from "./generic.model";
import { Player } from "./player.model";

export class Place extends GenericModel {
	public score: number;
	public category: Category;
	public player: Player;

	constructor(id: number, score: number, category: Category, player: Player) {
		super(id);
		this.score = score;
		this.category = category;
		this.player = player;
	}
}
