import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as moment from 'moment';

import { handleHttpErrorResponse } from '../utils/handle-http-error-response';
import { environment } from '../environments/environment';
import { User } from '../types/user';
import { TOKEN_STORAGE_DATA_KEYS } from '../types/token-storage-data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _setSession(jwtData) {
    const expiresAt = moment().add(jwtData.expiresIn, 'second');
    localStorage.setItem(TOKEN_STORAGE_DATA_KEYS.token, jwtData.jwtBearerToken);
    localStorage.setItem(TOKEN_STORAGE_DATA_KEYS.expiresAt, JSON.stringify(expiresAt.valueOf()));
  }

  constructor(private http: HttpClient) {}

  logIn(userPayload): Observable<User> {
    const url = `${environment.apiUrl}/api/user/signin`;

    return this.http.post<{ data: User }>(url, userPayload).pipe(
      switchMap((res) => {
        this._setSession(res.data);
        return of(res.data);
      }),
      catchError(handleHttpErrorResponse)
    );
  }

  isLoggedIn() {
    return (
      localStorage.getItem(TOKEN_STORAGE_DATA_KEYS.token) && moment().isBefore(this.getExpiration())
    );
  }

  getExpiration() {
    const expiration = localStorage.getItem(TOKEN_STORAGE_DATA_KEYS.expiresAt);
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  getToken() {
    return localStorage.getItem(TOKEN_STORAGE_DATA_KEYS.token);
  }
}
