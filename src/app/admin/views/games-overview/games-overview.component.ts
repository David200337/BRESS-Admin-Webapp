import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Field } from 'src/app/models/field.model';
import { Game } from 'src/app/models/game.model';
import { Player } from 'src/app/models/player.model';
import { SkillLevel } from 'src/app/models/skillLevel.model';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-games-overview',
  templateUrl: './games-overview.component.html',
  styleUrls: ['./games-overview.component.scss']
})
export class GamesOverviewComponent implements OnInit {
  tournamentId! : number;
  games!: Game[];
  activeGames!: Game[];
  futureGames!: Game[];
  nextGame!: Game;

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // this.games = new Array();
    // this.activeGames = new Array();
    // this.futureGames = new Array();
    // for (let index = 0; index < 5; index++) {
    //   this.games.push(new Game(0, "0 - 0", 0, true, true, new Field(0, "test field", true), new Player(0, "name1", "email", new SkillLevel(0, "level")), new Player(0, "name2", "email", new SkillLevel(0, "level"))))
    //   this.games.push(new Game(0, "0 - 0", 0, true, false, undefined, new Player(0, "name1", "email", new SkillLevel(0, "level")), new Player(0, "name2", "email", new SkillLevel(0, "level"))))
    // }
    this.route.params.subscribe(params => {
      this.tournamentId = params['id'];
    }); 

    this.tournamentService.getPoolQueue(this.tournamentId)
        .pipe(
          tap(g => console.info(g))
        )
        .subscribe(g => this.games.push(g));

    this.sortGames(this.games);
    console.log(this.activeGames);
    
  }

  /**
   * @function sortGames
   * @param games the array of games to sort
   * sort the provided games array into started games, the next game and all future games
   */
  sortGames(games: Game[]) {
    games.forEach(g => {
      if (g.gameStarted) {
        this.activeGames.push(g)
      } else {
        this.futureGames.push(g)
      }
    });
    
    this.nextGame = this.futureGames.shift()!;
  }
}
