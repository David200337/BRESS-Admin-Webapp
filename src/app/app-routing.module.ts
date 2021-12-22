import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryBracketComponent } from './admin/views/category-bracket/category-bracket.component';
import { CreateTournamentComponent } from './admin/views/create-tournament/create-tournament.component';
import { DashboardComponent } from './admin/views/dashboard/dashboard.component';
import { EditTournamentComponent } from './admin/views/edit-tournament/edit-tournament.component';
import { GamesOverviewComponent } from './admin/views/games-overview/games-overview.component';
import { PoolDetailComponent } from './admin/views/pool-detail/pool-detail.component';
import { TournamentDetailComponent } from './admin/views/tournament-detail/tournament-detail.component';
import { TournamentOverviewComponent } from './admin/views/tournament-overview/tournament-overview.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path: "login", pathMatch: "full", component: LoginComponent },
  { path: "register", pathMatch: "full", component: RegisterComponent },
  { path: "dashboard", pathMatch: "full", component: DashboardComponent },
  { path: "create-tournament", pathMatch: "full", component: CreateTournamentComponent },
  { path: "tournament/:id", pathMatch: "full", component: TournamentOverviewComponent },
  { path: "tournament/:id/games", pathMatch: "full", component: GamesOverviewComponent },
  { path: "tournament/:id/score-overview", pathMatch: "full", component: TournamentDetailComponent },
  { path: "tournament/:id/edit-tournament", pathMatch: "full", component: EditTournamentComponent },
  { path: "tournament/:id/pool/:id", pathMatch: "full", component: PoolDetailComponent },
  { path: "tournament/:tournamentId/category/:categoryId/bracket", pathMatch: "full", component: CategoryBracketComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
