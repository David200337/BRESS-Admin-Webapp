import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryBracketComponent } from './admin/views/category-bracket/category-bracket.component';
import { CreateFieldComponent } from './admin/views/create-field/create-field.component';
import { CreatePlayerComponent } from './admin/views/player/create-player/create-player.component';
import { CreateSkilllevelComponent } from './admin/views/create-skilllevel/create-skilllevel.component';
import { CreateTournamentComponent } from './admin/views/create-tournament/create-tournament.component';
import { DashboardComponent } from './admin/views/dashboard/dashboard.component';
import { EditFieldComponent } from './admin/views/edit-field/edit-field.component';
import { EditPlayerComponent } from './admin/views/player/edit-player/edit-player.component';
import { EditTournamentComponent } from './admin/views/edit-tournament/edit-tournament.component';
import { GamesOverviewComponent } from './admin/views/games-overview/games-overview.component';
import { LiveScoreComponent } from './admin/views/live-score/live-score.component';
import { PlayerDetailComponent } from './admin/views/player/player-detail/player-detail.component';
import { PoolDetailComponent } from './admin/views/pool-detail/pool-detail.component';
import { TournamentDetailComponent } from './admin/views/tournament-detail/tournament-detail.component';
import { TournamentOverviewComponent } from './admin/views/tournament-overview/tournament-overview.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path: "login", pathMatch: "full", component: LoginComponent },
  { path: "register", pathMatch: "full", component: RegisterComponent },
  { path: "dashboard", pathMatch: "full", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "create-tournament", pathMatch: "full", component: CreateTournamentComponent, canActivate: [AuthGuard] },
  { path: "tournament/:id", pathMatch: "full", component: TournamentOverviewComponent, canActivate: [AuthGuard] },
  { path: "tournament/:id/games", pathMatch: "full", component: GamesOverviewComponent, canActivate: [AuthGuard] },
  { path: "tournament/:id/score-overview", pathMatch: "full", component: TournamentDetailComponent, canActivate: [AuthGuard] },
  { path: "tournament/:id/edit-tournament", pathMatch: "full", component: EditTournamentComponent, canActivate: [AuthGuard] },
  { path: "tournament/:id/score-overview/:categoryId/:poolId", pathMatch: "full", component: PoolDetailComponent, canActivate: [AuthGuard] },
  { path: "tournament/:tournamentId/bracket", pathMatch: "full", component: CategoryBracketComponent, canActivate: [AuthGuard] },
  { path: "tournament/:id/live-score", pathMatch: "full", component: LiveScoreComponent, canActivate: [AuthGuard] },
  { path: "players/create", pathMatch: "full", component: CreatePlayerComponent, canActivate: [AuthGuard] },
  { path: "players/:id/edit", pathMatch: "full", component: EditPlayerComponent, canActivate: [AuthGuard] },
  { path: "create-skilllevel", pathMatch: "full", component: CreateSkilllevelComponent, canActivate: [AuthGuard] },
  { path: "fields/create", pathMatch: "full", component: CreateFieldComponent, canActivate: [AuthGuard]},
  { path: "fields/:id", pathMatch: "full", component: EditFieldComponent, canActivate: [AuthGuard]},
  { path: "fields/:id/edit", pathMatch: "full", component: EditFieldComponent, canActivate: [AuthGuard]},
  { path: "players/:id", pathMatch: "full", component: PlayerDetailComponent, canActivate: [AuthGuard] },
  { path: "create-skilllevel", pathMatch: "full", component: CreateSkilllevelComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
