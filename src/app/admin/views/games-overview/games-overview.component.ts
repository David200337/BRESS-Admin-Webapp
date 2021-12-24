import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concat, map, switchMap, tap } from 'rxjs';
import { Field } from 'src/app/models/field.model';
import { Game } from 'src/app/models/game.model';
import { Player } from 'src/app/models/player.model';
import { SkillLevel } from 'src/app/models/skillLevel.model';
import { Tournament } from 'src/app/models/tournament.model';
import { EditGameService } from 'src/app/services/edit-game.service';
import { LoaderToggleService } from 'src/app/services/loader-toggle.service';
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
    private route: ActivatedRoute,
    private loaderToggle: LoaderToggleService,
  ) { 
    this.showPopup = false;
    loaderToggle.loaderVisible();
  }

  ngOnInit(): void {
    this.games = [];
    this.activeGames = [];
    this.futureGames = [];
  
    this.route.params.subscribe(params => {
      this.tournamentId = params['id'];
    });

    this.editGameService.tournamentId = this.tournamentId;

    this.tournamentService.get(this.tournamentId)
        .subscribe(res => this.tournament = res)

    concat(
      this.tournamentService.getPoolQueue(this.tournamentId),
      this.tournamentService.getFinaleQueue(this.tournamentId)
    ).pipe(
      tap(g => console.info(g)),
      tap(g => this.games.push(...g)),
      tap(() => console.info(this.games)),
      tap(() => this.sortGames(this.games)),
    ).subscribe()
    .add(() => this.loaderToggle.loaderInvisible());
    
  }

  /**
   * @function sortGames
   * @param games the array of games to sort
   * sort the provided games array into started games, the next game and all future games
   */
  sortGames(games: Game[]) {
    console.log(games);
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
    console.info(this.activeGames);
  }

  selectGame(game: Game) {
    this.editGameService.showEdit(game.id);
  }

  refreshGames() {
    console.log("refresh games");
    this.loaderToggle.loaderVisible();
    this.games = [];
    this.activeGames = [];
    this.futureGames = [];
    
    concat(
      this.tournamentService.getPoolQueue(this.tournamentId),
      this.tournamentService.getFinaleQueue(this.tournamentId)
    ).pipe(
      tap(g => console.info(g)),
      tap(g => this.games.push(...g)),
      tap(() => console.info(this.games)),
      tap(() => this.sortGames(this.games)),
    ).subscribe()
    .add(() => this.loaderToggle.loaderInvisible());
  }
}
