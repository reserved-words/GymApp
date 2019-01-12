import { NgModule } from '@angular/core';
import { CurrentSetComponent } from './current/set/set.component';
import { SessionsMainComponent } from './main/main.component';
import { CompletedSessionComponent } from './completed/session/session.component';
import { CompletedExerciseComponent } from './completed/exercise/exercise.component';
import { CompletedSetComponent } from './completed/set/set.component';
import { PlannedSessionComponent } from './planned/session/session.component';
import { PlannedExerciseComponent } from './planned/exercise/exercise.component';
import { CurrentSessionComponent } from './current/session/session.component';
import { PlannedSetComponent } from './planned/set/set.component';
import { CurrentExerciseComponent } from './current/exercise/exercise.component';
import { NextSessionExerciseComponent } from './current/next-session-exercise/next-session-exercise.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SessionsMainComponent,
    CompletedSessionComponent,
    CompletedExerciseComponent,
    CompletedSetComponent,
    PlannedSessionComponent,
    PlannedExerciseComponent,
    PlannedSetComponent,
    CurrentSessionComponent,
    CurrentExerciseComponent,
    CurrentSetComponent,
    NextSessionExerciseComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: SessionsMainComponent },
      { path: 'completed/:id', component: CompletedSessionComponent },
      { path: 'planned/:id', component: PlannedSessionComponent },
      { path: 'start', component: CurrentSessionComponent },
      { path: 'start/:id', component: CurrentSessionComponent }
    ]),
  ]
})
export class SessionsModule { }
