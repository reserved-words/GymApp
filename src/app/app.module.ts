import { BrowserModule } from '@angular/platform-browser'; // BrowserModule always needed
import { NgModule, APP_INITIALIZER } from '@angular/core'; // NgModule lways needed
import { HttpClientModule } from '@angular/common/http'; // Needed for HTTP requests
import { RouterModule } from '@angular/router'; // Needed for routing

import { AppComponent } from './app.component';
import { SettingsModule } from './settings/settings.module';
import { ChartsModule } from './charts/charts.module';
import { SessionsModule } from './sessions/sessions.module';
import { WeightModule } from './weight/weight.module';
import { ServicesModule } from './services/services.module';
import { ConfigService } from './services/config.service';
import { HttpModule } from '@angular/http';
import { AuthGuard } from './auth/auth.guard';
import { LoginModule } from './login/login/login.module';

export function initializeApp(configService: ConfigService){
  return () => configService.load();
}

@NgModule({
  imports: [ // External modules
    BrowserModule, 
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot([
      { 
        path: '**', 
        redirectTo: '', 
        pathMatch: 'full',
        canActivate: [AuthGuard] 
      }
    ]),
    SessionsModule,
    ChartsModule,
    WeightModule,
    SettingsModule,
    ServicesModule,
    LoginModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService], multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
