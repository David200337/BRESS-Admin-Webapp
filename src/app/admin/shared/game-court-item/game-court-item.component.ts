import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Game } from 'src/app/models/game.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-game-court-item',
  templateUrl: './game-court-item.component.html',
  styleUrls: ['./game-court-item.component.scss'],
})
export class GameCourtItemComponent implements OnInit {
  @Input() games!: Game[];
  @Output() gameEvent = new EventEmitter<Game>();

  constructor() {}

  ngOnInit(): void {}

  onClick(game: Game) {
    this.gameEvent.emit(game);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.games, event.previousIndex, event.currentIndex);
    //TODO call api to save this order
  }
}
