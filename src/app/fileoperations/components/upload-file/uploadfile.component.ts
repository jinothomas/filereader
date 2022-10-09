import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { FileOperationsService } from '../../services/fileoperations/fileoperations.service';
import {MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.scss']
})
export class UploadfileComponent {
  
  displayedColumns: string[] = ['file_id', 'file_name', 'performed_on','performed_by','result'];
  dataSource: any = new MatTableDataSource<any>(); 
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  records: any;
  showTable: boolean = true;
  pageSize: number = 10;
  currentPage: number = 0;
  recordCount: number = 50;
  pageSizeOptions: number[] = [10, 25, 50];

  fileInfos?: Observable<any>;

  @ViewChild('fileinput')
  fileinput?: ElementRef;

  constructor(public dialog: MatDialog, private fileopsService: FileOperationsService , private router: Router) {
    this.fileopsService.getRecent().subscribe((data: any)=>{
      if(data) {
        this.dataSource = data;
      }
  });
  }
  
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    if(this.selectedFiles && this.selectedFiles[0].type!=='text/csv') {
      let error: any = {
        message :'FileFormat is not supported',
        icon: 'warning'
      }
      this.openDialog('Error', error);
  }
    this.progress = 0;
  }

  clearInput() {
    if (this.fileinput) {
      this.fileinput.nativeElement.value = null;
    }
    this.progress = 0;
    this.selectedFiles = undefined;
  }
  openDialog(action: any,payload: any) {
    payload.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '20%',
      height: '20%',
      data:payload
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Close'){
        this.clearInput();
      }
    });
  }

 

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.fileopsService.uploadFile(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              if (event.status==200) {
                const payload = {
                  message : "File uploaded Successfully",
                  icon: "info"
                }
                this.openDialog("Success",payload);
              }
              this.fileopsService.getRecent().subscribe((event: any)=>{
                if(event.records) {
                  this.dataSource = event.records;
                }
              });
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          });

      }

      this.selectedFiles = undefined;
    }

}
}
