import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoolPlayersItemComponent } from './pool-players-item/pool-players-item.component';
import { PoolGamesItemComponent } from './pool-games-item/pool-games-item.component';
import { SingleEliminationTreeComponent } from './tournament-bracket/single-elimination-tree/single-elimination-tree.component';
import { MatchComponent } from './tournament-bracket/match/match.component';
import { LoaderComponent } from './loader/loader.component';


@NgModule({
  declarations: [
    PoolPlayersItemComponent,
    PoolGamesItemComponent,
    SingleEliminationTreeComponent,
    MatchComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PoolGamesItemComponent,
    PoolPlayersItemComponent,
    SingleEliminationTreeComponent,
    MatchComponent,
    LoaderComponent
  ],
})
export class SharedModule { }
