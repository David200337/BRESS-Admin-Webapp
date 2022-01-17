import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concat, Observable, switchMap, tap } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Game } from 'src/app/models/game.model';
import { Pool } from 'src/app/models/pool.model';
import { Tournament } from 'src/app/models/tournament.model';
import { EditGameService } from 'src/app/services/edit-game.service';
import { LoaderToggleService } from 'src/app/services/loader-toggle.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { TournamentInterface } from 'src/app/shared/tournament-bracket/declarations/interfaces';
import { CategorySelectorComponent } from '../../shared/category-selector/category-selector.component';


@Component({
  selector: 'app-live-score',
  templateUrl: './live-score.component.html',
  styleUrls: ['./live-score.component.scss']
})
export class LiveScoreComponent implements OnInit, AfterViewInit {
  @ViewChild(CategorySelectorComponent) categorySelector!: CategorySelectorComponent;

  tournamentId!: number;
  tournament!: Tournament
  games!: Game[];
  activeGames!: Game[];
  futureGames!: Game[];
  nextGame!: Game[];
  pools$!: Observable<Pool[]>;

  selectedGame: Game | undefined;
  showPopup: boolean;

  interval: any;

  categoryList: Category[] = [];
  selectedCategoryIndex: number = 0;
  hasFinales: Boolean = false;

  myTournamentData: TournamentInterface = {
    rounds: [
      {
        type: 'Winnerbracket',
        name: "",
        matches: [
          {
            teams: [
              { name: 'Not determined', score: 0 },
              { name: 'Not determined', score: 0 },
            ],
            id: 0
          },
          {
            teams: [
              { name: 'Not determined', score: 0 },
              { name: 'Not determined', score: 0 },
            ],
          },
          {
            teams: [
              { name: 'Not determined', score: 0 },
              { name: 'Not determined', score: 0 },
            ],
          },
          {
            teams: [
              { name: 'Not determined', score: 0 },
              { name: 'Not determined', score: 0 },
            ],
          },
          {
            teams: [
              { name: 'Not determined', score: 0 },
              { name: 'Not determined', score: 0 },
            ],
          },
          {
            teams: [
              { name: 'Not determined', score: 0 },
              { name: 'Not determined', score: 0 },
            ],
          },
          {
            teams: [
              { name: 'Not determined', score: 0 },
              { name: 'Not determined', score: 0 },
            ],
          },
          {
            teams: [
              { name: 'Not determined', score: 0 },
              { name: 'Not determined', score: 0 },
            ],
          },
        ],
      },
      {
        type: 'Winnerbracket',
        name: "",
        matches: [
          {
            teams: [
              { name: 'Not determined', score: 0 },
              { name: 'Not determined', score: 0 },
            ],
          },
          {
            teams: [
              { name: 'Not determined', score: 0 },
              { name: 'Not determined', score: 0 },
            ],
          },
          {
            teams: [
              { name: 'Not determined', score: 0 },
              { name: 'Not determined', score: 0 },
            ],
          },
          {
            teams: [
              { name: 'Not determined', score: 0 },
              { name: 'Not determined', score: 0 },
            ],
          },
        ],
      },
      {
        type: 'Winnerbracket',
        name: "",
        matches: [
          {
            teams: [
              { name: 'Not determined', score: 0 },
              { name: 'Not determined', score: 0 },
            ],
          },
          {
            teams: [
              { name: 'Not determined', score: 0 },
              { name: 'Not determined', score: 0 },
            ],
          },
        ],
      },
      {
        type: 'Final',
        name: "",
        matches: [
          {
            teams: [
              { name: 'Not determined', score: 0 },
              { name: 'Not determined', score: 0 },
            ],
          },
        ],
      },
    ],
  };

  constructor(
    private tournamentService: TournamentService,
    public editGameService: EditGameService,
    private route: ActivatedRoute,
    private loaderToggle: LoaderToggleService,
    private editGame: EditGameService
  ) {
    this.showPopup = false;
    loaderToggle.loaderVisible();
  }
  ngAfterViewInit(): void {
    this.categorySelector.selectCategoryByIndex(this.selectedCategoryIndex)
  }

  ngOnInit(): void {
    let gamesList: Game[] = [];

    this.route.params.subscribe((params: any) => {
      this.tournamentId = params['id'];
    });

    this.editGameService.tournamentId = this.tournamentId;

    this.tournamentService.get(this.tournamentId)
      .subscribe(res => this.tournament = res)

    concat(
      this.tournamentService.getPoolQueue(this.tournamentId),
      this.tournamentService.getFinaleQueue(this.tournamentId)
    ).pipe(
      tap(g => gamesList.push(...g)),
      tap(() => this.sortGames(gamesList)),
    ).subscribe()
      .add(() => {
        this.games = gamesList;
      });

    this.hideGameEdit()
    this.tournamentService.get(this.tournamentId).subscribe((result: any) => {
      this.tournament = result;
      this.categoryList = this.tournament.categories;
      this.editGame.tournamentId = this.tournament.id
      this.createBracket(this.tournament.categories[this.selectedCategoryIndex].id);
      this.startRefresh()
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.interval)
  }

  startRefresh() {
    this.interval = setInterval(() => {
      this.selectedCategoryIndex++;
      if (this.selectedCategoryIndex > 2) {
        this.selectedCategoryIndex = 0;
      }
      this.categorySelector.selectCategoryByIndex(this.selectedCategoryIndex)
      this.refreshGames()
      this.refreshData();
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

    games.forEach(g => {
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
    this.nextGame = [this.futureGames.shift()!];
    this.games = games;
    this.loaderToggle.loaderInvisible();
  }

  selectGame(game: Game) {
    this.loaderToggle.loaderInvisible();
    this.editGameService.showEdit(game.id);
  }

  refreshGames() {
    let gameList: Game[] = [];

    concat(
      this.tournamentService.getPoolQueue(this.tournamentId),
      this.tournamentService.getFinaleQueue(this.tournamentId)
    ).pipe(
      tap(g => gameList.push(...g))
    ).subscribe().add(() => {
      this.sortGames(gameList)
    })
  }

  refreshData() {
    this.tournamentService.get(this.tournament.id).subscribe((result) => {
      this.tournament = result;
      this.createBracket(this.tournament.categories[this.selectedCategoryIndex].id);
    })
  }

  createBracket(categoryId: number): void {
    let category: any = {};
    this.tournament.categories.forEach((cat: any) => {
      if (cat.id == categoryId) {
        category = cat;
      }
    })

    let hasFinales = false;
    category.rounds.forEach((item: any) => {
      if (!item.isPoolRound) {
        hasFinales = true;
        this.myTournamentData.rounds.forEach((round: any) => {

          if (item.games.length === round.matches.length) {
            let gameList: any = [];

            for (let i = 0; i < round.matches.length; i++) {
              const game = item.games[i];
              const scorePlayer1: number = game.score == null ? 0 : game.score.split(" - ")[0];
              const scorePlayer2: number = game.score == null ? 0 : game.score.split(" - ")[1];
              const gamePlayed: boolean = scorePlayer1 != 0 || scorePlayer2 != 0;
              gameList.push({ teams: [{ name: game.player1.firstName, score: scorePlayer1, gamePlayed }, { name: game.player2.firstName, score: scorePlayer2, gamePlayed }], id: game.id });
            }

            round.matches = gameList;
          }
        })
      }
    });

    if (hasFinales) {
      let newlist = [];
      let isFirst: boolean = true;
      for (let i = 0; i < this.myTournamentData.rounds.length; i++) {
        if (this.myTournamentData.rounds[i].matches[0].teams[0].name != 'Not determined') {
          newlist.push(this.myTournamentData.rounds[i]);
          isFirst = false;
        } else if (!isFirst) {
          newlist.push(this.myTournamentData.rounds[i]);
        }
      }
      this.myTournamentData = { rounds: newlist };
    }
    this.pools$ = this.tournamentService.getAllPools(this.tournamentId, categoryId);
    this.hasFinales = hasFinales;
    this.loaderToggle.loaderInvisible();
  }

  updateGameScore(game: any) {
    this.loaderToggle.loaderInvisible();

    this.refreshData()
  }


  switchCategory(category: Category) {
    if (category != null) this.createBracket(category.id);
    for (let i = 0; i < this.categoryList.length; i++) {
      if (this.categoryList[i].id == category.id) {
        this.selectedCategoryIndex = i;
      }
    }
  }

  hideGameEdit() {
    this.editGame.hideEdit();
  }



}
