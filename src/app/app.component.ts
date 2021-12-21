import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Tournament } from './shared/tournament-bracket/declarations/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'bress-admin-webapp';

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
    this.http.get('https://bress-api.azurewebsites.net/api/tournament/2').subscribe((res: any) => {
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

      let index: number = 0;
      let isDone: boolean = false;
      this.myTournamentData.rounds.forEach((obj: any) => {
        if (obj.matches[0].teams[0].name == 'Not determined' && !isDone) {
          index++;
        } else {
          isDone = true;
        }
      });
      console.log(index);
      const newdata = this.myTournamentData.rounds.splice(index, this.myTournamentData.rounds.length - (cat0.rounds.length - 1));
      this.myTournamentData = { rounds: newdata };
    });
  }
}
