import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ExerciseDetailGuard } from './exercise-detail/exercise-detail.guard';
import { ExerciseDetailComponent } from './exercise-detail/exercise-detail.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { SharedModule } from '../shared/shared.module';
import { SettingsMainComponent as SettingsMainComponent } from './main/main.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'settings', component: SettingsMainComponent },
      { path: 'settings/exercises/:id', component: ExerciseDetailComponent, canActivate: [ExerciseDetailGuard] }
    ]),
    SharedModule
  ],
  declarations: [
    ExercisesComponent,
    ExerciseDetailComponent,
    SettingsMainComponent
  ],
})
export class SettingsModule { }
