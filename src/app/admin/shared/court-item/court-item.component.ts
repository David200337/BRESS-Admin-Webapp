import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Field } from 'src/app/models/field.model';
import { Game } from 'src/app/models/game.model';

@Component({
  selector: 'app-court-item',
  templateUrl: './court-item.component.html',
  styleUrls: ['./court-item.component.scss']
})
export class CourtItemComponent implements OnInit {
  @Input() field!: Field;
  @Input() game!: Game;
  @Output() gameEvent = new EventEmitter<Game>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onClick() {
    this.gameEvent.emit(this.game)
  }
}
