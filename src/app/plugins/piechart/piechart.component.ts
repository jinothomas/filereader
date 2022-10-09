import { Component } from '@angular/core';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent {

  public pieChartLabels:string[] = ['Success', 'Failure', 'Invalid'];
  public pieChartData:number[] = [80, 15, 5];
  public pieChartType:ChartType = 'pie';
  public pieChartColors = [{ backgroundColor: ['#002b5c', '#D61C4E', '#FEDB39']},];
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
}
