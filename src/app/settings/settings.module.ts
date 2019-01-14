import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ExerciseDetailComponent } from './exercise-detail/exercise-detail.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { SharedModule } from '../shared/shared.module';
import { SettingsMainComponent as SettingsMainComponent } from './main/main.component';
import { AuthGuard } from '../auth/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'settings', component: SettingsMainComponent, canActivate: [AuthGuard] },
      { path: 'settings/exercises/:id', component: ExerciseDetailComponent, canActivate: [AuthGuard] }
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
