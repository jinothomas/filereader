import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class FileOperationsService {

    constructor(private http: HttpClient) {}

    uploadFile = (file: File) :  Observable<HttpEvent<any>>  => {

        const data : FormData = new FormData();
        data.append('file', file, file.name);
        
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        const request = new HttpRequest('POST', `/filereader/fileoperations/uploadfile`, data, {
            reportProgress: true,
            responseType: 'json',
            headers
          });
        return this.http.request(request);
    }

    getFiles(): Observable<any> {
        return this.http.get(`/filereader/fileoperations/files`);
      }
}