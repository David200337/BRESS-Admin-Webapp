import { Component, Input, OnInit } from '@angular/core';
import { Tournament } from 'src/app/models/tournament.model';

@Component({
  selector: 'app-tournament-item',
  templateUrl: './tournament-item.component.html',
  styleUrls: ['./tournament-item.component.scss']
})
export class TournamentItemComponent implements OnInit {
  /**
   * @todo Implent domain model class
   */
  @Input() tournament: Tournament | undefined = undefined

  constructor() {
   }

  ngOnInit(): void {
  }

}
