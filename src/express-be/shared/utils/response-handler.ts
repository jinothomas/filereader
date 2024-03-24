import { Observable, throwError } from 'rxjs';

export const handleHttpError = (error: any) => {
    let errorMessage: string = error.message;
    throw new Error(errorMessage ? errorMessage : error);
};
  