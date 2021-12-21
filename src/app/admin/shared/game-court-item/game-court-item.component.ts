import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game.model';

@Component({
  selector: 'app-game-court-item',
  templateUrl: './game-court-item.component.html',
  styleUrls: ['./game-court-item.component.scss']
})
export class GameCourtItemComponent implements OnInit {
  @Input() games!: Game[];

  constructor() { }

  ngOnInit(): void {
  }

}
