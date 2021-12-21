import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game.model';

@Component({
  selector: 'app-games-overview',
  templateUrl: './games-overview.component.html',
  styleUrls: ['./games-overview.component.scss']
})
export class GamesOverviewComponent implements OnInit {
  games!: Game[];
  activeGames!: Game[];
  futureGames!: Game[];
  nextGame!: Game;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * @function sortGames
   * @param games the array of games to sort
   * @description sort the provided games array into started games, the next ame and all future games
   */
  sortGames(games: Game[]) {
    games.forEach(g => {
      if (true /* g.gameStarted */ ) {
        this.activeGames.push(g)
      } else {
        this.futureGames.push(g)
      }
    });
    
    this.nextGame = this.futureGames.shift()!;
  }
}
