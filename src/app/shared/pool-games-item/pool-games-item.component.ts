import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pool-games-item',
  templateUrl: './pool-games-item.component.html',
  styleUrls: ['./pool-games-item.component.scss']
})
export class PoolGamesItemComponent implements OnInit {
  @Output() gameEvent = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.gameEvent.emit()
  }

}
