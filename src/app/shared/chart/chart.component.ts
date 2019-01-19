import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { IDataValue } from '../interfaces/dataValue';

@Component({
  selector: 'gym-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {

  @Input() title: string;
  @Input() values: IDataValue[];

  displayType: string = 'Chart';
  chart: Chart;
  displayTypes: string[] = ['Chart','Table'];

  ngOnInit() {
    var data = <any>[];
    for (var d of this.values){
      data.push({ x: new Date(d.date), y: d.value });
    }

    this.chart = new Chart({
      chart: {
        type: 'spline'
      },
      title: {
        text: ''
      },
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
        title: {
          text: 'kg'
        }
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          connectNulls: true
        }
      },
      series: [
        {
          name: 'Weight',
          type: 'line',
          data: data
      }]
    });
  }

  ngOnChanges(){
    this.ngOnInit();
  }

  onChangeDisplayType(selectedType: string){
    this.displayType = selectedType;
  }
}
