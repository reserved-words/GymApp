import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumComponent } from './components/num/num.component';
import { FormsModule } from '@angular/forms';
import { AddExerciseComponent } from './components/add-exercise/add-exercise.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { BackConfirmationComponent } from './components/back-confirmation/back-confirmation.component';
import { ChartComponent } from './components/chart/chart.component';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChartModule
  ],
  declarations: [
    NumComponent,
    AddExerciseComponent,
    ConfirmationComponent,
    BackConfirmationComponent,
    ChartComponent
  ],
  exports: [
    NumComponent,
    AddExerciseComponent,
    ConfirmationComponent,
    BackConfirmationComponent,
    ChartComponent,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
