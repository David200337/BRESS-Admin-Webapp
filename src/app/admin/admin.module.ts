import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { TournamentItemComponent } from './shared/tournament-item/tournament-item.component';
import { CreateTournamentComponent } from './views/create-tournament/create-tournament.component';
import { PoolDetailComponent } from './views/pool-detail/pool-detail.component';
import { SharedModule } from '../shared/shared.module';
import { EditTournamentComponent } from './views/edit-tournament/edit-tournament.component';




@NgModule({
  declarations: [
    DashboardComponent,
    TournamentItemComponent,
    CreateTournamentComponent,
    PoolDetailComponent
    EditTournamentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    DashboardComponent,
    CreateTournamentComponent,
    PoolDetailComponent,
    EditTournamentComponent
  ]
})
export class AdminModule { }
