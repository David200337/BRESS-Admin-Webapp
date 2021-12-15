import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { TournamentItemComponent } from './shared/tournament-item/tournament-item.component';



@NgModule({
  declarations: [
    DashboardComponent,
    TournamentItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class AdminModule { }
