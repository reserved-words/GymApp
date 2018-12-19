import { BrowserModule } from '@angular/platform-browser'; // Always needed
import { NgModule } from '@angular/core'; // Always needed
import { HttpClientModule } from '@angular/common/http'; // Needed for HTTP requests
import { RouterModule } from '@angular/router'; // Needed for routing

import { AppComponent } from './app.component';
import { SettingsModule } from './settings/settings.module';
import { ChartsModule } from './charts/charts.module';
import { SessionsModule } from './sessions/sessions.module';
import { WeightModule } from './weight/weight.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [ // External modules
    BrowserModule, 
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'sessions', pathMatch: 'full' },
      { path: '**', redirectTo: 'sessions', pathMatch: 'full' }
    ]),
    SessionsModule,
    ChartsModule,
    WeightModule,
    SettingsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
