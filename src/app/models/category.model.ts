import { GenericModel } from './generic.model';
import { Round } from './round.model';
import { Pool } from './pool.model';

export class Category extends GenericModel {
  public name: string;
  public rounds: Round[];
  public pools: Pool[];

  constructor(id: number, name: string, rounds: Round[], pools: Pool[]) {
    super(id);
    this.name = name;
    this.rounds = rounds;
    this.pools = pools;
  }
}
