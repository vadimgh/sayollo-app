import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { handleHttpErrorResponse } from '../utils/handle-http-error-response';
import { environment } from '../environments/environment';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // just for this case - without using
  // local storage to persist data for
  // great user experiance
  private _userSubject: BehaviorSubject<User | null> = new BehaviorSubject(
    null
  );

  constructor(private http: HttpClient) {}

  get user() {
    return this._userSubject.value;
  }

  signUp(userPayload): Observable<User> {
    const url = `${environment.apiUrl}/api/user/signin`;

    return this.http.post<{ data: User }>(url, userPayload).pipe(
      switchMap((res) => {
        this._userSubject.next(res.data);
        return of(res.data);
      }),
      catchError(handleHttpErrorResponse)
    );
  }
}
