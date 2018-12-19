import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { WeightComponent } from './weight/weight.component';

@NgModule({
  declarations: [
    WeightComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'weight', component: WeightComponent }
    ])
  ]
})
export class WeightModule { }
