import { Field } from './field.model';
import { GenericModel } from './generic.model';
import { Player } from './player.model';

export class Game extends GenericModel {
  public score: string;
  public winner: number;
  public inQueue: boolean;
  public gameStarted: boolean;
  public field: Field | undefined;
  public player1: Player;
  public player2: Player;
  public queueIndex: number;

  constructor(
    id: number,
    score: string,
    winner: number,
    inQueue: boolean,
    gameStarted: boolean,
    field: Field | undefined,
    player1: Player,
    player2: Player,
    queueIndex: number
  ) {
    super(id);
    this.score = score;
    this.winner = winner;
    this.inQueue = inQueue;
    this.gameStarted = gameStarted;
    this.field = field;
    this.player1 = player1;
    this.player2 = player2;
    this.queueIndex = queueIndex;
  }
}
