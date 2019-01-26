import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { IDataValueGroup } from '../../interfaces/dataValueGroup';
import { Icon } from '../../enums/icon.enum';

@Component({
  selector: 'gym-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {
  Icon = Icon;
  @Input() title: string;
  @Input() valueGroups: IDataValueGroup[];
  @Input() displayType: string;

  chart: Chart;

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
        text: '',

      },
      xAxis: {
        type: 'datetime',
        title: {
          text: ''
        }
      },
      yAxis: {
        title: {
          text: 'kg'
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
}
