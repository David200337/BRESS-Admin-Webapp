import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('https://bress-api.azurewebsites.net/api/tournament/1').subscribe((res: any) => {
      console.log(res.result);
      const cat0 = res.result.categories[0];

      cat0.rounds.forEach((item: any) => {

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
    });
  }

}
