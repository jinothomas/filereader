import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileOperationsService } from '../../services/fileoperations/fileoperations.service';

@Component({
  selector: 'app-file-content',
  templateUrl: './file-content.component.html',
  styleUrls: ['./file-content.component.scss']
})
export class FileContentComponent implements OnInit {
  fileName: string = 'CSV File Name';

  constructor(private fileopsService: FileOperationsService,  private route: ActivatedRoute ) {
    this.fileopsService.getContents(this.route.snapshot.paramMap.get('file_id')).subscribe((data: any)=>{
         this.fileName = data?.body?.records? data.body?.records[0].file_name : '';
    });
   }

  ngOnInit(): void {
  }
  
}
