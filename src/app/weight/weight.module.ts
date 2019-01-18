import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { WeightMainComponent } from './main/main.component';
import { AuthGuard } from '../auth/auth.guard';
import { ChartComponent } from './chart/chart.component';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  declarations: [
    WeightMainComponent,
    ChartComponent
  ],
  imports: [
    SharedModule,
    ChartModule,
    RouterModule.forChild([
      { path: 'weight', component: WeightMainComponent, canActivate: [AuthGuard] }
    ])
  ]
})
export class WeightModule { }
