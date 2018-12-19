import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChartsComponent } from './charts/charts.component';
import { ChartComponent } from './chart/chart.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ChartsComponent,
    ChartComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'charts', component: ChartsComponent },
      { path: 'charts/:id', component: ChartComponent }
    ])
  ]
})
export class ChartsModule { }
