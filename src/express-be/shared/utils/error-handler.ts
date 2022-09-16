import { Observable, throwError } from 'rxjs';

export const handleHttpError = (error: Error): Observable<any> => {
  let errorMessage: string = error.message;
  return throwError(errorMessage ? errorMessage : error);
};
