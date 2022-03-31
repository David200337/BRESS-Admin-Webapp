import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, concatMap, map, Observable, of, throwError } from 'rxjs';
import { LoaderToggleService } from './loader-toggle.service';

@Injectable({
  providedIn: 'root'
})
export class RpcService {

  constructor(private httpClient: HttpClient, private loaderToggle: LoaderToggleService) { }
  protected readonly APIUrl = "https://bress-toernooi.nl/api";

  public startTournament(tournamentId: number): Observable<any> {
    return this.httpClient
      .post<any>(`${this.APIUrl}/tournament/${tournamentId}/GeneratePools`, {})
      .pipe(
        concatMap((response) => {
          return this.httpClient.post<any>(`${this.APIUrl}/tournament/${tournamentId}/StartPoolGames`, {});
        }),
        concatMap((response) => {
          return of(response);
        }),
        catchError(this.handleError)
      );
  }

  // TODO: Review for possible changes
  private handleError(error: HttpErrorResponse) {
    console.log(error);
    confirm(error.error.message);
    this.loaderToggle.loaderInvisible();
    return throwError(() => error);
  }

}
