import { Observable, throwError } from 'rxjs';

export const handleHttpError = (error: any): Observable<any> => {
    let errorMessage: string = error.message;
    return throwError(errorMessage ? errorMessage : error);
};
  