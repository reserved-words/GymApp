import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { WeightMainComponent } from './main/main.component';

@NgModule({
  declarations: [
    WeightMainComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'weight', component: WeightMainComponent }
    ])
  ]
})
export class WeightModule { }
