import {Component, Input, OnChanges, SimpleChanges, TemplateRef} from '@angular/core';
import {Round, Tournament} from '../declarations/interfaces';

@Component({
  selector: 'app-double-elimination-tree',
  templateUrl: './double-elimination-tree.component.html',
  styleUrls: ['./double-elimination-tree.component.scss']
})
export class DoubleEliminationTreeComponent implements OnChanges {
  @Input()
  matchTemplate!: TemplateRef<any>;
  @Input()
  tournament!: Tournament;

  public losersBracket!: Round[];
  public winnersBracket!: Round[];
  //@ts-ignore
  public final: Round;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.losersBracket = this.tournament.rounds.filter(round => {
      return round.type === 'Loserbracket';
    });
    this.winnersBracket = this.tournament.rounds.filter(round => {
      return round.type === 'Winnerbracket';
    });
      //@ts-ignore
    this.final = this.tournament.rounds.filter(round => {
      return round.type === 'Final';
    }).shift();
  }

}
