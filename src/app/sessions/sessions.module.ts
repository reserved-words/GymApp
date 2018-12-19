import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentSetComponent } from './current/set.component';
import { SessionsComponent } from './sessions/sessions.component';
import { CompletedSessionComponent } from './completed/session.component';
import { CompletedExerciseComponent } from './completed/exercise.component';
import { CompletedSetComponent } from './completed/set.component';
import { PlannedSessionComponent } from './planned/session.component';
import { PlannedExerciseComponent } from './planned/exercise.component';
import { CurrentSessionComponent } from './current/session.component';
import { PlannedSetComponent } from './planned/set.component';
import { CurrentExerciseComponent } from './current/exercise.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SessionsComponent,
    CompletedSessionComponent,
    CompletedExerciseComponent,
    CompletedSetComponent,
    PlannedSessionComponent,
    PlannedExerciseComponent,
    PlannedSetComponent,
    CurrentSessionComponent,
    CurrentExerciseComponent,
    CurrentSetComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: 'sessions', component: SessionsComponent },
      { path: 'sessions/completed/:id', component: CompletedSessionComponent },
      { path: 'sessions/planned/:id', component: PlannedSessionComponent },
      { path: 'sessions/start', component: CurrentSessionComponent }
    ]),
  ]
})
export class SessionsModule { }
