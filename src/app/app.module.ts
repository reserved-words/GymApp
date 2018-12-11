import { BrowserModule } from '@angular/platform-browser'; // Always needed
import { NgModule } from '@angular/core'; // Always needed
import { FormsModule } from '@angular/forms' // Needed for ngModel directive

import { AppComponent } from './app.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { SessionsComponent } from './sessions/sessions.component';
import { ExerciseComponent } from './exercise/exercise.component';

@NgModule({
  declarations: [
    AppComponent, 
    ExercisesComponent,
    SessionsComponent,
    ExerciseComponent],
  imports: [ // External modules
    BrowserModule, 
    FormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
