import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { IDataValueGroup } from '../../interfaces/dataValueGroup';

@Component({
  selector: 'gym-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {

  @Input() title: string;
  @Input() valueGroups: IDataValueGroup[];

  displayType: string = 'Chart';
  chart: Chart;
  displayTypes: string[] = ['Chart','Table'];

  ngOnInit() {
    this.drawChart();
  }

  ngOnChanges(){
    this.drawChart();
  }

  drawChart() {
    
    var series = [];
    if (this.valueGroups){
      for (var group of this.valueGroups){
        var data = [];
        for (var item of group.dataValues){
          data.push({ x: new Date(item.date), y: item.value });
        }
        series.push({ name: group.name, data: data, type: 'line', marker: {symbol: 'circle'} });
      }
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
          text: ''
        }
      },
      legend: {
        enabled: (series.length > 1),
        layout: 'horizontal'
      },
      plotOptions: {
        series: {
          connectNulls: true
        }
      },
      series: series
    });
  }

  onChangeDisplayType(selectedType: string){
    this.displayType = selectedType;
  }
}
