import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { TournamentItemComponent } from './shared/tournament-item/tournament-item.component';
import { CreateTournamentComponent } from './views/create-tournament/create-tournament.component';
import { PoolDetailComponent } from './views/pool-detail/pool-detail.component';
import { SharedModule } from '../shared/shared.module';
import { EditGameComponent } from './shared/edit-game/edit-game.component';
import { EditTournamentComponent } from './views/edit-tournament/edit-tournament.component';
import { TournamentDetailComponent } from './views/tournament-detail/tournament-detail.component';
import { AppRoutingModule } from '../app-routing.module';




@NgModule({
  declarations: [
    DashboardComponent,
    TournamentItemComponent,
    CreateTournamentComponent,
    PoolDetailComponent,
    EditTournamentComponent,
    EditGameComponent,
    TournamentDetailComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
  ],
  exports: [
    DashboardComponent,
    CreateTournamentComponent,
    PoolDetailComponent,
    EditTournamentComponent,
    TournamentDetailComponent
  ]
})
export class AdminModule { }
