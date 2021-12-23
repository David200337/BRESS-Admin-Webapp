import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../models/game.model';
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
    return this.tournamentService.updateFinalGame(this.tournamentId, this.gameId, score);
  }
}
