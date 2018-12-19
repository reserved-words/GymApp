import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ExerciseDetailGuard } from './exercise-detail/exercise-detail.guard';
import { ExerciseDetailComponent } from './exercise-detail/exercise-detail.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'settings', component: ExercisesComponent },
      { path: 'settings/exercises/:id', component: ExerciseDetailComponent, canActivate: [ExerciseDetailGuard] }
    ]),
    SharedModule
  ],
  declarations: [
    ExercisesComponent,
    ExerciseDetailComponent
  ],
})
export class SettingsModule { }
