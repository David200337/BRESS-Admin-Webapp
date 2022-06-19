import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient) { }
  protected readonly APIUrl = "https://bress-toernooi.nl/api";

  public login(email: string, password: string): Observable<any> {
    return this.httpClient
      .post<any>(this.APIUrl + '/login', {
        email: email,
        password: password,
      })
      .pipe(
        map((response) => {
          localStorage.setItem('user', JSON.stringify(response.result));
        }),
        catchError(this.handleError)
      );
  }

  public getToken(): string | null {
    const currentUser: any = this.getCurrentUser();

    if (currentUser.token) {
      return currentUser.token;
    }

    return null;
  }

  public getCurrentUser(): any {
    const stringifiedObject = localStorage.getItem('user');

    if (stringifiedObject) {
      return JSON.parse(stringifiedObject);
    }

    return {};
  }

  public isLoggedIn(): boolean {
    if (this.getCurrentUser().expireDate != undefined) {
      return new Date(this.getCurrentUser().expireDate) > new Date();
    } else {
      return false;
    }
  }

  public logOut(): any {
    localStorage.removeItem('user');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  // TODO: Review for possible changes
  private handleError(error: HttpErrorResponse) {
    // Handle HTTP errors
    console.log(error);

    return throwError(() => error);
  }
}
