import { Component } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-horizontalchart',
  templateUrl: './horizontalchart.component.html',
  styleUrls: ['./horizontalchart.component.scss']
})
export class HorizontalchartComponent {

  public barChartOptions: ChartOptions = {
    responsive: true
  };
  public barChartType: ChartType = 'horizontalBar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [10], label: 'Used', stack: 'a' },
    { data: [90], label: 'Available', stack: 'a' },
  ];
  public barChartLabels: string[] = ['Records'];

  public barChartColors = [{ backgroundColor: ['#D61C4E']},{ backgroundColor: ['#002b5c']}];

  constructor() { }

  ngOnInit() {
  }

  // events
  public chartClicked(event: any): void {
    console.log(event);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    const clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }


}
