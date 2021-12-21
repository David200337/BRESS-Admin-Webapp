import { Field } from "./field.model";
import { GenericModel } from "./generic.model";
import { Player } from "./player.model";

export class Game extends GenericModel {
	public score: string;
	public winner: number;
	public inQueue: boolean;
    public gameStarted: boolean;
	public field: Field;
	public player1: Player;
	public player2: Player;

	constructor(
		id: number,
		score: string,
		winner: number,
		inQueue: boolean,
        gameStarted: boolean,
		field: Field,
		player1: Player,
		player2: Player
	) {
		super(id);
		this.score = score;
		this.winner = winner;
		this.inQueue = inQueue;
        this.gameStarted = gameStarted;
		this.field = field;
		this.player1 = player1;
		this.player2 = player2;
	}
}
