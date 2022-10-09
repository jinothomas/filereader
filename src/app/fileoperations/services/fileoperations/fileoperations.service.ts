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

  getContents = (file_id: string): Observable<any> => {
    const request = new HttpRequest('GET',`/filereader/fileoperations/content/${file_id}`,{});
    return this.http.request(request);
  }

  deleteFile = (file_id: string): Observable<any> => {
    const request = new HttpRequest('DELETE',`/filereader/fileoperations/${file_id}`,{});
    return this.http.request(request);
  }

  getRecent = (): Observable<any> => {
    const records = [{
      'file_id' : "FR1234",
      'file_name':  "Test_File.csv",
      'performed_on': "24-07-21",
      'performed_by': "Jino Thomas",
      'result': "SUCCESS"
    },{
      'file_id' : "FR1235",
      'file_name':  "Test_File.csv",
      'performed_on': "24-07-21",
      'performed_by': "Jino Thomas",
      'result': "SUCCESS"
    },{
      'file_id' : "FR1236",
      'file_name':  "Test_File.csv",
      'performed_on': "24-07-21",
      'performed_by': "Jino Thomas",
      'result': "SUCCESS"
    },{
      'file_id' : "FR1237",
      'file_name':  "Test_File.csv",
      'performed_on': "24-07-21",
      'performed_by': "Jino Thomas",
      'result': "SUCCESS"
    },{
      'file_id' : "FR1238",
      'file_name':  "Test_File.csv",
      'performed_on': "24-07-21",
      'performed_by': "Jino Thomas",
      'result': "FAILURE"
    }];

    return new Observable((subscriber)=> {
      subscriber.next(records);
      subscriber.complete();
    })
  }
}