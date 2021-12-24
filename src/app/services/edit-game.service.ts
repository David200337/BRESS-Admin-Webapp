import { Injectable } from '@angular/core';
import { catchError, delay, Observable, of, switchMap } from 'rxjs';
import { Game } from '../models/game.model';
import { PoolGame } from '../models/poolGame.model';
import { TournamentService } from './tournament.service';

@Injectable({
  providedIn: 'root'
})
export class EditGameService {
  public tournamentId: number = 0;
  public gameId: number = 0;
  public showPopUp: boolean = false;

  constructor(private tournamentService: TournamentService) { }

  showEdit(gameId: number) {
    this.showPopUp = true;
    this.gameId = gameId;
    console.log(gameId);
  }

  hideEdit() {
    this.showPopUp = false;
    this.gameId = 0;
  }

  enterScore(score: boolean[]): Observable<any> {
    this.showPopUp = false;
    return this.tournamentService.getFinalGame(this.tournamentId, 0, this.gameId)
      .pipe(switchMap(() => { return this.enterFinalGameScore(score) }), catchError(() => { return this.enterPoolGameScore(score) }));
  }

  enterPoolGameScore(score: boolean[]): Observable<PoolGame> {
    this.showPopUp = false;
    return this.tournamentService.updatePoolGame(this.tournamentId, this.gameId, score);
  }

  enterFinalGameScore(score: boolean[]): Observable<PoolGame> {
    this.showPopUp = false;
    return this.tournamentService.updateFinalGame(this.tournamentId, this.gameId, score);
  }
}
