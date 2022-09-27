import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
  providedIn: "root",
})
export class FileOperationsService {
  constructor(private http: HttpClient) {}

  uploadFile = (file: File): Observable<HttpEvent<any>> => {
    const data: FormData = new FormData();
    data.append("file", file, file.name);

    let headers = new HttpHeaders();
    headers.append("Content-Type", "multipart/form-data");
    const request = new HttpRequest(
      "POST",
      `/filereader/fileoperations/uploadfile`,
      data,
      {
        reportProgress: true,
        responseType: "json",
        headers,
      }
    );
    return this.http.request(request);
  };

  getFiles = (page_no: number , page_size: number): Observable<any> => {
    const request = new HttpRequest('GET',`/filereader/fileoperations/files`,{params : new HttpParams().set("page_no", page_no).set("page_size", page_size) });
    return this.http.request(request);
  }

  getContents = (file_id: any): Observable<any> => {
    const request = new HttpRequest('GET',`/filereader/fileoperations/content/${file_id}`,{});
    return this.http.request(request);
  }
}