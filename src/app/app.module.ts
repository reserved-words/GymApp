import { BrowserModule } from '@angular/platform-browser'; // Always needed
import { NgModule } from '@angular/core'; // Always needed
import { FormsModule } from '@angular/forms'; // Needed for ngModel directive
import { HttpClientModule } from '@angular/common/http'; // Needed for HTTP requests
import { RouterModule } from '@angular/router'; // Needed for routing

import { AppComponent } from './app.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { SessionsComponent } from './sessions/sessions.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { SessionComponent } from './session/session.component';
import { SessionExerciseComponent } from './session/exercise.component';
import { SessionSetComponent } from './session/set.component';
import { NumComponent } from './shared/num.component';
import { ChartsComponent } from './charts/charts.component';
import { ChartComponent } from './charts/chart.component';
import { ExerciseGuard } from './exercise/exercise.guard';
import { SessionGuard } from './session/session.guard';

@NgModule({
  declarations: [
    AppComponent, 
    ExercisesComponent,
    SessionsComponent,
    ExerciseComponent,
    SessionComponent,
    SessionExerciseComponent,
    SessionSetComponent,
    NumComponent,
    ChartsComponent,
    ChartComponent],
  imports: [ // External modules
    BrowserModule, 
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'exercises', component: ExercisesComponent },
      { path: 'exercises/:id', component: ExerciseComponent, canActivate: [ExerciseGuard] },
      { path: 'sessions', component: SessionsComponent },
      { path: 'sessions/:id', component: SessionComponent, canActivate: [SessionGuard] },
      { path: 'sessions/:start/:id', component: SessionComponent, canActivate: [SessionGuard] },
      { path: 'charts', component: ChartsComponent },
      { path: 'charts/:id', component: ChartComponent },
      { path: '', redirectTo: 'sessions', pathMatch: 'full' },
      { path: '**', redirectTo: 'sessions', pathMatch: 'full' }
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
