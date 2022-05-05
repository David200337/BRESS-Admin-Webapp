import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Game } from 'src/app/models/game.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { RpcService } from 'src/app/services/rpc.service';
import { LoaderToggleService } from 'src/app/services/loader-toggle.service';

@Component({
  selector: 'app-game-court-item',
  templateUrl: './game-court-item.component.html',
  styleUrls: ['./game-court-item.component.scss'],
})
export class GameCourtItemComponent implements OnInit {
  @Input() games!: Game[];
  @Input() tournamentId!: number;
  @Output() gameEvent = new EventEmitter<Game>();

  constructor(private rpcService: RpcService) {}

  ngOnInit(): void {}

  onClick(game: Game) {
    this.gameEvent.emit(game);
  }

  drop(event: CdkDragDrop<string[]>) {
    this.rpcService
      .moveInQueue(
        this.tournamentId,
        this.games[event.previousIndex].id,
        this.games[event.currentIndex].queueIndex
      )
      .subscribe((res) => {
        console.log(res);
      });
    moveItemInArray(this.games, event.previousIndex, event.currentIndex);
  }
}
