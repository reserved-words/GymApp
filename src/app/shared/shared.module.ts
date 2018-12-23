import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumComponent } from './num/num.component';
import { FormsModule } from '@angular/forms';
import { AddExerciseComponent } from './add-exercise/add-exercise.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    NumComponent,
    AddExerciseComponent
  ],
  exports: [
    NumComponent,
    AddExerciseComponent,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
