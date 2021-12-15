import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { TournamentItemComponent } from './shared/tournament-item/tournament-item.component';
import { CreateTournamentComponent } from './views/create-tournament/create-tournament.component';



@NgModule({
  declarations: [
    DashboardComponent,
    TournamentItemComponent,
    CreateTournamentComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DashboardComponent,
    CreateTournamentComponent
  ]
})
export class AdminModule { }
