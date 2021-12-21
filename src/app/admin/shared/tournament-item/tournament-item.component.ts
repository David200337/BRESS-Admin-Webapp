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

  title!: String;
  date!: Date;
  skillLevel!: String;
  playerCount!: number;
  playerMax!: number

  constructor() {
    this.title = "Speeltoernoei beginners"
    this.date = new Date();
    this.skillLevel = "Beginners"
    this.playerCount = 18;
    this.playerMax = 32;
   }

  ngOnInit(): void {
  }

}
