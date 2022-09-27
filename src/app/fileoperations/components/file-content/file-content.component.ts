import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FileOperationsService } from '../../services/fileoperations/fileoperations.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-file-content',
  templateUrl: './file-content.component.html',
  styleUrls: ['./file-content.component.scss']
})
export class FileContentComponent implements OnInit {
  fileName: string = '';
  pageSize: number = 10;
  currentPage: number = 0;
  recordCount: number = 50;
  pageSizeOptions: number[] = [100, 500, 1000];
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];
  showTable: boolean  = true;
  file_id: any; 

  @ViewChild(MatTable,{static:true}) table?: MatTable<any>;

  @ViewChild('paginator') paginator: MatPaginator | any;

  constructor(private fileopsService: FileOperationsService,  private route: ActivatedRoute, public dialog: MatDialog ) {
    this.file_id = this.route.snapshot.paramMap.get('file_id');
    this.fileopsService.getContents(this.file_id).subscribe((data: any)=>{
        if(data?.body?.records) {
          const records = data.body.records;
          this.fileName = records? records[0].file_name : '';
          this.displayedColumns = records[0].content[0] ? this.createTableHeaders(records[0].content[0]) : [];
          this.dataSource = records[0].content? records[0].content : [];
          this.pageSize = 100 ;
          this.paginator.pageIndex = this.currentPage;
          this.paginator.length = records[0].content? records[0].content.length : 0;
        }
    });
   }

  ngOnInit(): void {
  }

  createTableHeaders = (input: any) => {
    return Object.keys(input).filter((item)=>{
      return item !='id';
    });
  }
  
  pageChanged = ($pageEvent: PageEvent) => { 
    this.pageSize = $pageEvent.pageSize;
    this.currentPage = $pageEvent.pageIndex;
    this.fileopsService.getContents(this.file_id).subscribe((event: any)=>{
      if(event.status==200) {
        this.dataSource = event.body? event.body.records: [];
        this.pageSize = event.body?.no_of_records;
        this.paginator.pageIndex = this.currentPage;
      }
    });
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

}
