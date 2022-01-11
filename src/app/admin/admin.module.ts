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
import { TournamentOverviewComponent } from './views/tournament-overview/tournament-overview.component';
import { CategorySelectorComponent } from './shared/category-selector/category-selector.component';
import { TournamentService } from '../services/tournament.service';
import { GamesOverviewComponent } from './views/games-overview/games-overview.component';
import { CourtItemComponent } from './shared/court-item/court-item.component';
import { GameCourtItemComponent } from './shared/game-court-item/game-court-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryBracketComponent } from './views/category-bracket/category-bracket.component';
import { EditPlayerComponent } from './views/edit-player/edit-player.component';
import { CreatePlayerComponent } from './views/player/create-player/create-player.component';
import { CreateSkilllevelComponent } from './views/create-skilllevel/create-skilllevel.component';
import { PlayerListComponent } from './views/player/player-list/player-list.component';
import { PlayerDetailComponent } from './views/player/player-detail/player-detail.component';
import { LiveScoreComponent } from './views/live-score/live-score.component';
import { FilterPipe } from './pipes/filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    DashboardComponent,
    TournamentItemComponent,
    CreateTournamentComponent,
    PoolDetailComponent,
    EditTournamentComponent,
    EditGameComponent,
    TournamentDetailComponent,
    TournamentOverviewComponent,
    CategorySelectorComponent,
    GamesOverviewComponent,
    CourtItemComponent,
    GameCourtItemComponent,
    CategoryBracketComponent,
    EditPlayerComponent,
    CreatePlayerComponent,
    CreateSkilllevelComponent,
    PlayerListComponent,
    PlayerDetailComponent,
    LiveScoreComponent,
    FilterPipe,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
  ],
  exports: [
    DashboardComponent,
    CreateTournamentComponent,
    PoolDetailComponent,
    EditTournamentComponent,
    TournamentDetailComponent,
    TournamentOverviewComponent,
    CategoryBracketComponent
  ],
  providers: [
    TournamentService
  ]
})
export class AdminModule { }
