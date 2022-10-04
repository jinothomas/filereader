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
  dataSource: any;
  displayedColumns: string[] = [];
  showTable: boolean  = true;
  file_id: any; 
  default_type: string = 'text';
  editDisabled: boolean = true;
  records: any;

  @ViewChild(MatTable,{static:true}) table?: MatTable<any>;

  @ViewChild('paginator') paginator: MatPaginator | any;

  constructor(private fileopsService: FileOperationsService,  private route: ActivatedRoute, public dialog: MatDialog ) {
    this.file_id = this.route.snapshot.paramMap.get('file_id');
    this.fileopsService.getContents(this.file_id).subscribe((data: any)=>{
        if(data?.body?.records) {
          this.records = data.body.records;
          this.mapResponse();
        }
    });
   }

  private mapResponse() {
    this.fileName = this.records ? this.records[0].file_name : '';
    this.displayedColumns = this.records[0].content[0] ? this.createTableHeaders(this.records[0].content[0]) : [];
    this.dataSource = this.records[0].content ? this.records[0].content : [];
    this.pageSize = 100;
    this.paginator.pageIndex = this.currentPage;
    this.paginator.length = this.records[0].content ? this.records[0].content.length : 0;
  }

  ngOnInit(): void {
  }

  createTableHeaders = (input: any) => {
    let headers = Object.keys(input).filter((item)=>{
      return item !='id';
    });
    headers.length > 0 ? headers.push('Action') :  headers;
    return headers;
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

  triggerAction(action: string,element: any) {

    let dialogRef: any;

    switch(action) {
      case 'Add':
        this.addRowData(element);
        break;
      case 'Edit':
        element.action = action;
        this.editDisabled = false;
        break;
      case 'Delete':
        element.action = action;
        dialogRef = this.dialog.open(DialogBoxComponent, {
          width: '20%',
          height: '20%',
          data:element
        });
        break;
      case 'Cancel':
        element.action = undefined;
        break;
      case 'Save':
        break;    
        default:
       
        break;
    }

    
    

    dialogRef.afterClosed().subscribe((result: any) => {
      if( result && result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
        element.action = undefined;
    });


  }

  addRowData(element: any) {
    let headers = Object.keys(element).filter((item)=>{
      return item !='id' && item !='action';
    });
    let newRow: any = {};

    headers.forEach(item=> {
      newRow[item] = "";
    })
    this.dataSource = [...this.dataSource, newRow];
  }
  
  deleteRowData(row_obj: any){
     this.dataSource = this.dataSource.filter((value: any,key: any)=>{
       return value.id != row_obj.id;
     });
   }

   isEditEnabled(element: any) {
    return element.action && element.action == 'Edit';
   }
}
