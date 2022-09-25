import { Observable, throwError } from 'rxjs';
import { STATUS_CODES } from '../models/shared.enums';
import { FileReaderResponse } from '../models/shared.model';



export function handleResponse(input : any) : FileReaderResponse {
    let response : FileReaderResponse = {
        status : input.status
    };
    switch (input.status) {
      case STATUS_CODES.OK:
         response.body = input.response ? input.response : {}
         response.status_message = "OK"
        break;
      case STATUS_CODES.CREATED:
        response.status_message = "Created"
        break;
      case STATUS_CODES.ACCEPTED:
        response.status_message = "Accepted"
        break;
      case STATUS_CODES.BAD_REQUEST:
        response.status_message = "Bad Request"
        break;
      case STATUS_CODES.FORBIDDEN:
        response.status_message = "Forbidden"
        break;
      case STATUS_CODES.UNAUTHORIZED:
        response.status_message = "Unauthorized"
        break;
      default:
        response.status_message = "Something went wrong"
        break;
    }

    return response;
}

export const handleHttpError = (error: any): Observable<any> => {
    let errorMessage: string = error.message;
    return throwError(errorMessage ? errorMessage : error);
};
  