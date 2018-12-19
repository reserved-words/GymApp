import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumComponent } from './num/num.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    NumComponent
  ],
  exports: [
    NumComponent,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
