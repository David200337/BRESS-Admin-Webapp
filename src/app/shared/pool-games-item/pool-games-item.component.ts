import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Game } from 'src/app/models/game.model';
import { EditGameService } from 'src/app/services/edit-game.service';

@Component({
  selector: 'app-pool-games-item',
  templateUrl: './pool-games-item.component.html',
  styleUrls: ['./pool-games-item.component.scss']
})
export class PoolGamesItemComponent implements OnInit {
  @Output() gameEvent = new EventEmitter<void>();
  @Input() games!: Game[];

  constructor(
    private editGameService: EditGameService
  ) { }

  ngOnInit(): void {
  }

  onClick(id: number) {
    this.editGameService.showEdit(id);
    this.gameEvent.emit()
  }

}
