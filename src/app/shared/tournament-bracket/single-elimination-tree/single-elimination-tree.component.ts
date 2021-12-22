import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { Game } from 'src/app/models/game.model';
import { Round, Tournament } from '../declarations/interfaces';

@Component({
  selector: 'app-single-elimination-tree',
  templateUrl: './single-elimination-tree.component.html',
  styleUrls: ['./single-elimination-tree.component.scss'],
})
export class SingleEliminationTreeComponent implements OnInit, OnChanges {
  @Input() matchTemplate!: TemplateRef<any>;
  @Input() tournament!: Tournament;

  public winnersBracket!: Round[];
  //@ts-ignore
  public final: Round;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.hasOwnProperty('tournament') &&
      changes['tournament'].currentValue
    ) {
      this.winnersBracket = this.tournament.rounds.filter((round) => {
        return round.type === 'Winnerbracket';
      });
    }
    //@ts-ignore
    this.final = this.tournament.rounds
      .filter((round) => {
        return round.type === 'Final';
      })
      .shift();
  }


}
