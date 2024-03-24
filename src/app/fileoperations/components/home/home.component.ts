import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'phone','role','validity'];
  dataSource: any = new MatTableDataSource<any>(); 
  records : any = [{
    'name' : "Harley Davidson",
    'email':  "testuser@email.com",
    'phone': "+11 000000000",
    'role': "Manager",
    'validity': "31-Dec-2025"
  },{
    'name' : "Roice Rolls",
    'email':  "techArch@email.com",
    'phone': "+11 000000000",
    'role': "Tech Architect",
    'validity': "31-Dec-2030"
  },{
    'name' : "Taburo Toyota",
    'email':  "testuser@email.com",
    'phone': "+11 000000000",
    'role': "Test Lead",
    'validity': "31-Dec-2022"
  },
  {
    'name' : "Henry Ford",
    'email':  "testuser@email.com",
    'phone': "+11 000000000",
    'role': "Test Lead",
    'validity': "31-Dec-2022"
  }
];

  constructor() {
   }

  ngOnInit(): void {
    this.dataSource = this.records;
  }

}
