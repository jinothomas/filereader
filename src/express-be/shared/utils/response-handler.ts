import { Observable, throwError } from 'rxjs';
import { FileReaderResponse } from '../models/shared.model';


export enum STATUS_CODES {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    UNSUPPORTED_MEDIA_TYPE = 415,
    INTERNAL_SEVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    INSUFFICIENT_STORAGE = 507
}


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
  