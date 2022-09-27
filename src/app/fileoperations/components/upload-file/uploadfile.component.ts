import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
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
export class UploadfileComponent implements AfterViewInit{
  

  displayedColumns1: string[] = ['id', 'name', 'action'];
  displayedColumns: string[] = ['file_id', 'file_name', 'created_on','created_by','file_size','accessmodifier','action'];
  dataSource = new MatTableDataSource<any>(); 
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

  @ViewChild(MatTable,{static:true}) table?: MatTable<any>;

  @ViewChild('paginator') paginator: MatPaginator | any;

  @ViewChild('fileinput')
  fileinput?: ElementRef;

  constructor(public dialog: MatDialog, private fileopsService: FileOperationsService , private router: Router) {
    this.fileopsService.getFiles(this.currentPage,this.pageSize).subscribe((event: any)=>{
      if(event.status==200) {
        this.dataSource = event.body? event.body.records: [];
        this.pageSize = event.body?.no_of_records;
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = 42;
      }
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator ? this.paginator : null;
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    if(this.selectedFiles && this.selectedFiles[0].type!=='text/csv') {
      let error: any = {
        errorMessage :'FileFormat is not supported'
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
  openDialog(action: any,obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: action ==('Delete' || 'Error')? '20%' : '80%',
      height: action ==('Delete' || 'Error')? '20%' : '80%',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  deleteRowData(row_obj: any){
   /* this.dataSource = this.dataSource.filter((value: any,key: any)=>{
      return value.id != row_obj.id;
    });*/
  }

  pageChanged = ($pageEvent: PageEvent) => { 
    this.pageSize = $pageEvent.pageSize;
    this.currentPage = $pageEvent.pageIndex;
    this.fileopsService.getFiles(this.currentPage,this.pageSize).subscribe((event: any)=>{
      if(event.status==200) {
        this.dataSource = event.body? event.body.records: [];
        this.pageSize = event.body?.no_of_records;
        this.paginator.pageIndex = this.currentPage;
      }
    });
  } 

  goToContentPage = ($clickEvent : any) => {
    if (!$clickEvent.action) {
      let route = `/file-content/${$clickEvent.file_id}`;
      this.router.navigate([route], {});
    }
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
                this.message = "File uploaded Successfully"
              }
              this.fileopsService.getFiles(0,10).subscribe((event: any)=>{
                if(event.status==200) {
                  this.dataSource = event.body? event.body.records: [];
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
