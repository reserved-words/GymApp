import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartsMainComponent } from './main/main.component';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../auth/auth.guard';

@NgModule({
  declarations: [
    ChartsMainComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'charts', component: ChartsMainComponent, canActivate: [AuthGuard] }
    ])
  ]
})
export class ChartsModule { }
