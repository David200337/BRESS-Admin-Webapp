import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Game } from 'src/app/models/game.model';

@Component({
  selector: 'app-game-court-item',
  templateUrl: './game-court-item.component.html',
  styleUrls: ['./game-court-item.component.scss']
})
export class GameCourtItemComponent implements OnInit {
  @Input() games!: Game[];
  @Output() gameEvent = new EventEmitter<Game>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(game: Game) {
    this.gameEvent.emit(game);
  }
}
