import { Injectable } from '@angular/core';
import { catchError, delay, Observable, of, switchMap, tap } from 'rxjs';
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

  enterScore(score: number[][]): Observable<any> {
    this.showPopUp = false;
    return this.tournamentService.getFinalGame(this.tournamentId, 0, this.gameId)
      .pipe(tap((res) => console.log(res)))
      .pipe(switchMap(() => { return this.enterFinalGameScore(score) }), catchError(() => { return this.enterPoolGameScore(score) }));
  }

  enterPoolGameScore(score: number[][]): Observable<PoolGame> {
    this.showPopUp = false;
    console.log("enterPoolGameScore");
    
    return this.tournamentService.updatePoolGame(this.tournamentId, this.gameId, score);
  }

  enterFinalGameScore(score: number[][]): Observable<PoolGame> {
    this.showPopUp = false;
    console.log("enterFinalGameScore");
    
    return this.tournamentService.updateFinalGame(this.tournamentId, this.gameId, score);
  }
}
