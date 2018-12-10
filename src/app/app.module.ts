import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { SessionsComponent } from './sessions/sessions.component';

@NgModule({
  declarations: [
    AppComponent, 
    ExercisesComponent,
    SessionsComponent],
  imports: [BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
