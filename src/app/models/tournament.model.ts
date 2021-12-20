import { Category } from "./category.model";
import { GenericModel } from "./generic.model";

export class Tournament extends GenericModel {
	public title: string;
	public beginDateTime: Date;
	public entreeFee: number; // TODO: Fix possible floating point error
	public maxPlayers: number;
	public minPlayers: number;
	public idealPoolSize: number;
	public categories: Category[];

	constructor(
		id: number,
		title: string,
		beginDateTime: Date,
		entreeFee: number,
		maxPlayers: number,
		minPlayers: number,
		idealPoolSize: number,
		categories: Category[]
	) {
		super(id);
		this.title = title;
		this.beginDateTime = beginDateTime;
		this.entreeFee = entreeFee;
		this.maxPlayers = maxPlayers;
		this.minPlayers = minPlayers;
		this.idealPoolSize = idealPoolSize;
		this.categories = categories;
	}
}
