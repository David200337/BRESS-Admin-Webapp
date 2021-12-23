import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { Field } from 'src/app/models/field.model';
import { Game } from 'src/app/models/game.model';
import { Player } from 'src/app/models/player.model';
import { SkillLevel } from 'src/app/models/skillLevel.model';
import { Tournament } from 'src/app/models/tournament.model';
import { EditGameService } from 'src/app/services/edit-game.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-games-overview',
  templateUrl: './games-overview.component.html',
  styleUrls: ['./games-overview.component.scss']
})
export class GamesOverviewComponent implements OnInit {
  tournamentId!: number;
  tournament!: Tournament
  games!: Game[];
  activeGames!: Game[];
  futureGames!: Game[];
  nextGame!: Game[];

  selectedGame: Game | undefined;
  showPopup: boolean;

  constructor(
    private tournamentService: TournamentService,
    public editGameService: EditGameService,
    private route: ActivatedRoute
  ) { 
    this.showPopup = false;
  }

  ngOnInit(): void {
    this.games = [];
    this.activeGames = [];
    this.futureGames = [];
  
    this.route.params.subscribe(params => {
      this.tournamentId = params['id'];
    }); 

    this.tournamentService.getPoolQueue(this.tournamentId)
        .pipe(
          tap(g => this.games = Array.from(g)),
          tap(() => this.sortGames(this.games)),
        ).subscribe(); 
  }

  /**
   * @function sortGames
   * @param games the array of games to sort
   * sort the provided games array into started games, the next game and all future games
   */
  sortGames(games: Game[]) {
    games.forEach(g => {
      if (!g.winner) {
        if (g.gameStarted) {
          g.field = new Field(0, "test field", true);
          this.activeGames.push(g);
        } else {
          this.futureGames.push(g);
        }
      }
    });
    this.nextGame = [this.futureGames.shift()!];
    console.log(this.nextGame);
  }

  selectGame(game: Game) {
    this.editGameService.showEdit(game.id);
  }
}
