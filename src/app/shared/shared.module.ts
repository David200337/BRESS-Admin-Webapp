import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoolPlayersItemComponent } from './pool-players-item/pool-players-item.component';
import { PoolGamesItemComponent } from './pool-games-item/pool-games-item.component';


@NgModule({
  declarations: [
    PoolPlayersItemComponent,
    PoolGamesItemComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PoolGamesItemComponent,
    PoolPlayersItemComponent,
  ],
})
export class SharedModule { }
