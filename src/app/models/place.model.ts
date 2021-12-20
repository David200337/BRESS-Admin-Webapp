import { Category } from "./category.model";
import { Player } from "./player.model";

export class Place {
	public id: number;
	public score: number;
	public category: Category;
	public player: Player;

	constructor(id: number, score: number, category: Category, player: Player) {
		this.id = id;
		this.score = score;
		this.category = category;
		this.player = player;
	}
}
