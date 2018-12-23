import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumComponent } from './components/num/num.component';
import { FormsModule } from '@angular/forms';
import { AddExerciseComponent } from './components/add-exercise/add-exercise.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { BackConfirmationComponent } from './components/back-confirmation/back-confirmation.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    NumComponent,
    AddExerciseComponent,
    ConfirmationComponent,
    BackConfirmationComponent
  ],
  exports: [
    NumComponent,
    AddExerciseComponent,
    ConfirmationComponent,
    BackConfirmationComponent,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
