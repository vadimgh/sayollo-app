import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from '../environments/environment';
import { handleHttpErrorResponse } from '../utils/handle-http-error-response';
import { TransactionData } from '../types/transaction-data';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  constructor(private http: HttpClient) {}

  getTransactionsData(): Observable<TransactionData> {
    const url = `${environment.apiUrl}/api/user/transaction/get-all`;

    return this.http.get<{ data: TransactionData }>(url).pipe(
      switchMap((res) => of(res.data)),
      catchError(handleHttpErrorResponse)
    );
  }

  cancelTransaction(transactionPayload): Observable<{ success: boolean, message: string }> {
    const url = `${environment.apiUrl}/api/user/transaction/cancel-one`;

    return this.http.post<{ success: boolean, message: string }>(url, transactionPayload).pipe(
      switchMap((res) => of(res)),
      catchError(handleHttpErrorResponse)
    );
  }
}
