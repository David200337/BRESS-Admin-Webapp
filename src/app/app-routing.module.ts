import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryBracketComponent } from './admin/views/category-bracket/category-bracket.component';
import { CreatePlayerComponent } from './admin/views/create-player/create-player.component';
import { CreateSkilllevelComponent } from './admin/views/create-skilllevel/create-skilllevel.component';
import { CreateTournamentComponent } from './admin/views/create-tournament/create-tournament.component';
import { DashboardComponent } from './admin/views/dashboard/dashboard.component';
import { EditPlayerComponent } from './admin/views/edit-player/edit-player.component';
import { EditTournamentComponent } from './admin/views/edit-tournament/edit-tournament.component';
import { GamesOverviewComponent } from './admin/views/games-overview/games-overview.component';
import { PlayerColumnComponent } from './admin/views/player/player-column/player-column.component';
import { PlayerDetailComponent } from './admin/views/player/player-detail/player-detail.component';
import { PoolDetailComponent } from './admin/views/pool-detail/pool-detail.component';
import { TournamentDetailComponent } from './admin/views/tournament-detail/tournament-detail.component';
import { TournamentOverviewComponent } from './admin/views/tournament-overview/tournament-overview.component';
import { LoaderComponent } from './shared/loader/loader.component';
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
  { path: "tournament/:id/score-overview/:categoryId/:poolId", pathMatch: "full", component: PoolDetailComponent },
  { path: "tournament/:tournamentId/bracket", pathMatch: "full", component: CategoryBracketComponent },
  { path: "create-player", pathMatch: "full", component: CreatePlayerComponent },
  { path: "players/:id/edit", pathMatch: "full", component: EditPlayerComponent },
  { path: "svg", pathMatch: "full", component: LoaderComponent },
  { path: "create-skilllevel", pathMatch: "full", component: CreateSkilllevelComponent },
  {
    path: "players",
    component: PlayerColumnComponent,
    children: [
      { path: ":id", pathMatch: "full", component: PlayerDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
