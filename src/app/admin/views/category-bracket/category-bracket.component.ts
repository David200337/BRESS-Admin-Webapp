import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { TournamentService } from 'src/app/services/tournament.service';
import { Tournament } from 'src/app/shared/tournament-bracket/declarations/interfaces';

@Component({
  selector: 'app-category-bracket',
  templateUrl: './category-bracket.component.html',
  styleUrls: ['./category-bracket.component.scss']
})
export class CategoryBracketComponent implements OnInit {

  myTournamentData: Tournament = {
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

  public tournament: any = {};
  public categoryList: Category[] = [];
  constructor(private tournamentService: TournamentService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params) => {
        const tournamentId = +params.get("tournamentId")!;

        return this.tournamentService.get(tournamentId);
      })
    ).subscribe((result: any) => {
      this.tournament = result.result;
      this.categoryList = this.tournament.categories;
      this.createBracket(this.tournament.categories[0].id);
    });
  }

  createBracket(categoryId: number): void {
    let category: any = {};
    this.tournament.categories.forEach((cat: any) => {
      if (cat.id == categoryId) {
        category = cat;
      }
    })
    category.rounds.forEach((item: any) => {

      if (!item.isPoolRound) {
        this.myTournamentData.rounds.forEach((round: any) => {

          if (item.games.length === round.matches.length) {
            let gameList: any = [];

            for (let i = 0; i < round.matches.length; i++) {
              const game = item.games[i];
              const scorePlayer1: number = game.score == null ? 0 : game.score.split(" - ")[0];
              const scorePlayer2: number = game.score == null ? 0 : game.score.split(" - ")[1];

              gameList.push({ teams: [{ name: game.player1.name, score: scorePlayer1 }, { name: game.player2.name, score: scorePlayer2 }] });
            }

            round.matches = gameList;
          }
        })
      }
    });


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


  switchCategory(category: Category) {
    // console.warn(`Method not implemented. \n@param category: ${JSON.stringify(category)}`);
    if (category != null) this.createBracket(category.id);
  }
}
