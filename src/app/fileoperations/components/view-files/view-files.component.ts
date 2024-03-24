import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FileOperationsService } from '../../services/fileoperations/fileoperations.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-files',
  templateUrl: './view-files.component.html',
  styleUrls: ['./view-files.component.scss']
})
export class ViewFilesComponent implements AfterViewInit {

  displayedColumns: string[] = ['file_id', 'file_name', 'created_on','created_by','file_size','accessmodifier','action'];
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
  pageSizeOptions: number[] = [10, 30, 50];

  @ViewChild(MatTable,{static:true}) table?: MatTable<any>;

  @ViewChild('paginator') paginator: MatPaginator | any;

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

  openDialog(action: any,payload: any) {
    payload.action = action;
    switch(action) {
       case 'Delete':
        payload.message = 'Do you want to delete the File?'; 
        payload.icon ='delete';
        break;
       case 'Error':
        payload.message = 'Unable to Perform the Operation!';
        payload.icon ='error';
        break;
    }

    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '20%',
      height: '20%',
      data:payload
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  deleteRowData(row_obj: any){
    this.fileopsService.deleteFile(row_obj.file_id).subscribe((data: any)=>{
      if(data.body && data.body.status_text=='DELETED') {
        this.dataSource = this.dataSource.filter((value: any,key: any)=>{
          return value.file_id != row_obj.file_id;
        });
      }
    },(error: any)=> {
       this.openDialog('Error', row_obj);
       console.error(error)
    });
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

}
