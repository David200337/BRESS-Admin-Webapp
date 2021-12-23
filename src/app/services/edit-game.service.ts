import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../models/game.model';
import { PoolGame } from '../models/poolGame.model';
import { TournamentService } from './tournament.service';

@Injectable({
  providedIn: 'root'
})
export class EditGameService {
  public tournamentId: number = 0;
  public gameId: number = 0;
  public isPoolGame: boolean = false;
  public showPopUp: boolean = false;

  constructor(private tournamentService: TournamentService) { }

  showEdit(gameId: number, isPoolgame: boolean = false) {
    this.showPopUp = true;
    this.gameId = gameId;
    this.isPoolGame = isPoolgame;
    console.log(gameId);
  }

  hideEdit() {
    this.showPopUp = false;
    this.isPoolGame = false;
    this.gameId = 0;
  }

  enterScore(score: boolean[]): Observable<any> {
    if (this.isPoolGame) {
      return this.enterPoolGameScore(score);
    } else {
      this.showPopUp = false;
      this.isPoolGame = false;
      return this.tournamentService.updateFinalGame(this.tournamentId, this.gameId, score);
    }
  }

  enterPoolGameScore(score: boolean[]): Observable<PoolGame> {
    this.showPopUp = false;
    this.isPoolGame = false;
    return this.tournamentService.updatePoolGame(this.tournamentId, this.gameId, score);
  }
}
