import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTournamentComponent } from './admin/views/create-tournament/create-tournament.component';
import { DashboardComponent } from './admin/views/dashboard/dashboard.component';
import { EditTournamentComponent } from './admin/views/edit-tournament/edit-tournament.component';
import { PoolDetailComponent } from './admin/views/pool-detail/pool-detail.component';
import { TournamentDetailComponent } from './admin/views/tournament-detail/tournament-detail.component';
import { TournamentOverviewComponent } from './admin/views/tournament-overview/tournament-overview.component';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path: "login", pathMatch: "full", component: LoginComponent },
  { path: "dashboard", pathMatch: "full", component: DashboardComponent },
  { path: "create-tournament", pathMatch: "full", component: CreateTournamentComponent },
  { path: "tournament/:id", pathMatch: "full", component: TournamentOverviewComponent },
  { path: "tournament/:id/score-overview", pathMatch: "full", component: TournamentDetailComponent },
  { path: "tournament/:id/edit-tournament", pathMatch: "full", component: EditTournamentComponent },
  { path: "tournament/:id/pool/:id", pathMatch: "full", component: PoolDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
