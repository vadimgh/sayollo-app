import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export const handleHttpErrorResponse = (error: HttpErrorResponse) => {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.warn('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.warn(`Backend returned code ${error}`);
  }
  // return an observable with a user-facing error message
  return throwError('Something bad happened; please try again later.');
};
