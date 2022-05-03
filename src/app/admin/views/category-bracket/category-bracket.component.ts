import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { EditGameService } from 'src/app/services/edit-game.service';
import { LoaderToggleService } from 'src/app/services/loader-toggle.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { TournamentInterface } from 'src/app/shared/tournament-bracket/declarations/interfaces';

@Component({
  selector: 'app-category-bracket',
  templateUrl: './category-bracket.component.html',
  styleUrls: ['./category-bracket.component.scss'],
})
export class CategoryBracketComponent implements OnInit, OnDestroy {
  myTournamentData: TournamentInterface = { rounds: [] };

  public tournament: any = {};
  public categoryList: Category[] = [];
  public selectedCategoryIndex: number = 0;
  public hasFinales = false;
  public interval: any;

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute,
    public editGame: EditGameService,
    public toggleLoader: LoaderToggleService
  ) {
    this.toggleLoader.loaderVisible();
  }

  ngOnInit(): void {
    this.toggleLoader.loaderVisible();
    this.setDefaultBracket();
    this.hideGameEdit();
    this.route.paramMap
      .pipe(
        switchMap((params: any) => {
          const tournamentId = +params.get('tournamentId')!;
          return this.tournamentService.get(tournamentId);
        })
      )
      .subscribe((result: any) => {
        this.tournament = result;
        this.categoryList = this.tournament.categories;
        this.editGame.tournamentId = this.tournament.id;
        this.createBracket(
          this.tournament.categories[this.selectedCategoryIndex].id
        );
        this.startRefresh();
      });
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  setDefaultBracket() {
    this.myTournamentData = {
      rounds: [
        {
          type: 'Winnerbracket',
          name: '',
          matches: [
            {
              teams: [
                { name: 'Not determined', score: 0 },
                { name: 'Not determined', score: 0 },
              ],
              id: 0,
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
          name: '',
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
          name: '',
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
          name: '',
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
  }

  startRefresh() {
    this.refreshData();
    this.interval = setInterval(() => {
      this.refreshData();
    }, 10000);
  }

  refreshData() {
    this.tournamentService.get(this.tournament.id).subscribe((result) => {
      this.tournament = result;
      this.createBracket(
        this.tournament.categories[this.selectedCategoryIndex].id
      );
    });
  }

  createBracket(categoryId: number): void {
    this.setDefaultBracket();
    let category: any = {};
    this.tournament.categories.forEach((cat: any) => {
      if (cat.id == categoryId) {
        category = cat;
      }
    });

    let hasFinales = false;
    category.rounds.forEach((item: any) => {
      if (!item.isPoolRound) {
        hasFinales = true;
        this.myTournamentData.rounds.forEach((round: any) => {
          if (item.games.length === round.matches.length) {
            let gameList: any = [];

            for (let i = 0; i < round.matches.length; i++) {
              const game = item.games[i];
              const scorePlayer1: number =
                game.score == null ? 0 : game.score.split(' - ')[0];
              const scorePlayer2: number =
                game.score == null ? 0 : game.score.split(' - ')[1];
              const gamePlayed: boolean =
                scorePlayer1 != 0 || scorePlayer2 != 0;
              gameList.push({
                teams: [
                  {
                    name: game.player1.firstName + ' ' + game.player1.lastName,
                    score: scorePlayer1,
                    gamePlayed,
                  },
                  {
                    name: game.player2.firstName + ' ' + game.player2.lastName,
                    score: scorePlayer2,
                    gamePlayed,
                  },
                ],
                id: game.id,
              });
            }

            round.matches = gameList;
          }
        });
      }
    });

    if (hasFinales) {
      let newlist = [];
      let isFirst: boolean = true;
      for (let i = 0; i < this.myTournamentData.rounds.length; i++) {
        if (
          this.myTournamentData.rounds[i].matches[0].teams[0].name !=
          'Not determined'
        ) {
          newlist.push(this.myTournamentData.rounds[i]);
          isFirst = false;
        } else if (!isFirst) {
          newlist.push(this.myTournamentData.rounds[i]);
        }
      }
      this.myTournamentData = { rounds: newlist };
    }

    this.hasFinales = hasFinales;
    this.toggleLoader.loaderInvisible();
  }

  updateGameScore(game: any) {
    this.toggleLoader.loaderInvisible();

    this.refreshData();
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
