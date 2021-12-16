import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoolPlayersItemComponent } from './pool-players-item/pool-players-item.component';
import { PoolGamesItemComponent } from './pool-games-item/pool-games-item.component';
import { DoubleEliminationTreeComponent } from './tournament-bracket/double-elimination-tree/double-elimination-tree.component';
import { SingleEliminationTreeComponent } from './tournament-bracket/single-elimination-tree/single-elimination-tree.component';
import { MatchComponent } from './tournament-bracket/match/match.component';


@NgModule({
  declarations: [
    PoolPlayersItemComponent,
    PoolGamesItemComponent,
    SingleEliminationTreeComponent,
    DoubleEliminationTreeComponent,
    MatchComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PoolGamesItemComponent,
    PoolPlayersItemComponent,
    SingleEliminationTreeComponent,
    DoubleEliminationTreeComponent,
    MatchComponent
  ],
})
export class SharedModule { }
