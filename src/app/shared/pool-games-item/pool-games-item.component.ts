import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Game } from 'src/app/models/game.model';

@Component({
  selector: 'app-pool-games-item',
  templateUrl: './pool-games-item.component.html',
  styleUrls: ['./pool-games-item.component.scss']
})
export class PoolGamesItemComponent implements OnInit {
  @Output() gameEvent = new EventEmitter<void>();
  @Input() games!: Game[];

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.gameEvent.emit()
  }

}
