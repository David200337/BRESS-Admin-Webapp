import { Category } from "./category.model";
import { GenericModel } from "./generic.model";
import { Player } from "./player.model";

export class Tournament extends GenericModel {
	public title: string;
	public beginDateTime: Date;
	public entryFee: number; // TODO: Fix possible floating point error
	public maxPlayers: number;
	public minPlayers: number;
	public idealPoolSize: number;
	public categories: Category[];
	public players: Player[];
	public hasStarted: boolean;

	constructor(
		id: number,
		title: string,
		beginDateTime: Date,
		entryFee: number,
		maxPlayers: number,
		minPlayers: number,
		idealPoolSize: number,
		categories: Category[],
		players: Player[],
		hasStarted: boolean
	) {
		super(id);
		this.title = title;
		this.beginDateTime = beginDateTime;
		this.entryFee = entryFee;
		this.maxPlayers = maxPlayers;
		this.minPlayers = minPlayers;
		this.idealPoolSize = idealPoolSize;
		this.categories = categories;
		this.players = players;
		this.hasStarted = hasStarted;
	}
}
