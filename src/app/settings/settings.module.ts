import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ExerciseDetailGuard } from './exercise-detail/exercise-detail.guard';
import { ExerciseDetailComponent } from './exercise-detail/exercise-detail.component';
import { ExercisesComponent } from './exercises/exercises.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'settings', component: ExercisesComponent },
      { path: 'settings/exercises/:id', component: ExerciseDetailComponent, canActivate: [ExerciseDetailGuard] }
    ]),
  ],
  declarations: [
    ExercisesComponent,
    ExerciseDetailComponent
  ],
})
export class SettingsModule { }
