import { BrowserModule } from '@angular/platform-browser'; // Always needed
import { NgModule } from '@angular/core'; // Always needed
import { FormsModule } from '@angular/forms'; // Needed for ngModel directive
import { HttpClientModule } from '@angular/common/http'; // Needed for HTTP requests

import { AppComponent } from './app.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { SessionsComponent } from './sessions/sessions.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { SessionComponent } from './session/session.component';
import { SetComponent } from './shared/set.component';
import { NumComponent } from './shared/num.component';

@NgModule({
  declarations: [
    AppComponent, 
    ExercisesComponent,
    SessionsComponent,
    ExerciseComponent,
    SessionComponent,
    SetComponent,
    NumComponent],
  imports: [ // External modules
    BrowserModule, 
    FormsModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
