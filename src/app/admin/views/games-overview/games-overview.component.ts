import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concat, map, switchMap, tap } from 'rxjs';
import { Game } from 'src/app/models/game.model';
import { Tournament } from 'src/app/models/tournament.model';
import { EditGameService } from 'src/app/services/edit-game.service';
import { LoaderToggleService } from 'src/app/services/loader-toggle.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-games-overview',
  templateUrl: './games-overview.component.html',
  styleUrls: ['./games-overview.component.scss'],
})
export class GamesOverviewComponent implements OnInit, OnDestroy {
  tournamentId!: number;
  tournament!: Tournament;
  games!: Game[];
  activeGames!: Game[];
  futureGames!: Game[];
  nextGame!: Game[];

  selectedGame: Game | undefined;
  showPopup: boolean;

  interval: any;

  constructor(
    private tournamentService: TournamentService,
    public editGameService: EditGameService,
    private route: ActivatedRoute,
    private loaderToggle: LoaderToggleService
  ) {
    this.showPopup = false;
    loaderToggle.loaderVisible();
  }

  ngOnInit(): void {
    let gamesList: Game[] = [];

    this.route.params.subscribe((params: any) => {
      this.tournamentId = params['id'];
    });

    this.editGameService.tournamentId = this.tournamentId;

    this.tournamentService
      .get(this.tournamentId)
      .subscribe((res) => (this.tournament = res));

    concat(
      this.tournamentService.getPoolQueue(this.tournamentId)
    )
      .pipe(
        tap((res) => console.log(res)),
        tap((g) => gamesList.push(...g)),
        tap(() => this.sortGames(gamesList))
      )
      .subscribe()
      .add(() => {
        this.games = gamesList;
        this.loaderToggle.loaderInvisible();
        this.startRefresh();
      });
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  startRefresh() {
    this.interval = setInterval(() => {
      this.refreshGames();
    }, 10000);
  }

  /**
   * @function sortGames
   * @param games the array of games to sort
   * sort the provided games array into started games, the next game and all future games
   */
  sortGames(games: Game[]) {
    let sortedActive: Game[] = [];
    let sortedFuture: Game[] = [];

    games.forEach((g) => {
      if (!g.score) {
        if (g.field) {
          sortedActive.push(g);
        } else {
          sortedFuture.push(g);
        }
      }
    });
    this.activeGames = sortedActive;
    this.futureGames = sortedFuture;
    this.activeGames = this.activeGames.sort((a, b) => {
      if (a.field!.name > b.field!.name) {
        return 1;
      }

      if (a.field!.name < b.field!.name) {
        return -1;
      }

      return 0;
    });
    this.games = games;
    this.loaderToggle.loaderInvisible();
  }

  selectGame(game: Game) {
    this.editGameService.showEdit(game.id);
  }

  refreshGames() {
    let gameList: Game[] = [];

    concat(
      this.tournamentService.getPoolQueue(this.tournamentId)
    )
      .pipe(tap((g) => gameList.push(...g)))
      .subscribe()
      .add(() => {
        this.sortGames(gameList);
      });
  }
}
