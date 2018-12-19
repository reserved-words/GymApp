import { BrowserModule } from '@angular/platform-browser'; // Always needed
import { NgModule } from '@angular/core'; // Always needed
import { FormsModule } from '@angular/forms'; // Needed for ngModel directive
import { HttpClientModule } from '@angular/common/http'; // Needed for HTTP requests
import { RouterModule } from '@angular/router'; // Needed for routing

import { AppComponent } from './app.component';
import { SessionsComponent } from './sessions/sessions.component';
import { ChartsComponent } from './charts/charts.component';

import { ChartComponent } from './charts/chart.component';

import { PlannedSessionComponent } from './planned/session.component';
import { PlannedExerciseComponent } from './planned/exercise.component';
import { PlannedSetComponent } from './planned/set.component';

import { CompletedSessionComponent } from './completed/session.component';
import { CompletedExerciseComponent } from './completed/exercise.component';
import { CompletedSetComponent } from './completed/set.component';

import { CurrentSessionComponent } from './current/session.component';
import { CurrentExerciseComponent } from './current/exercise.component';
import { CurrentSetComponent } from './current/set.component';

import { NumComponent } from './shared/num.component';
import { SettingsModule } from './settings/settings.module';

@NgModule({
  declarations: [
    AppComponent, 
    ChartsComponent,
    ChartComponent,
    SessionsComponent,
    CompletedSessionComponent,
    CompletedExerciseComponent,
    CompletedSetComponent,
    PlannedSessionComponent,
    PlannedExerciseComponent,
    PlannedSetComponent,
    CurrentSessionComponent,
    CurrentExerciseComponent,
    CurrentSetComponent,
    NumComponent],
  imports: [ // External modules
    BrowserModule, 
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'sessions', component: SessionsComponent },
      { path: 'sessions/completed/:id', component: CompletedSessionComponent },
      { path: 'sessions/planned/:id', component: PlannedSessionComponent },
      { path: 'sessions/start', component: CurrentSessionComponent },
      { path: 'charts', component: ChartsComponent },
      { path: 'charts/:id', component: ChartComponent },
      { path: '', redirectTo: 'sessions', pathMatch: 'full' },
      { path: '**', redirectTo: 'sessions', pathMatch: 'full' }
    ]),
    SettingsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
