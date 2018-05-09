import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderByPipe } from 'app/pipes/order-by.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    OrderByPipe
  ],
  exports: [
    OrderByPipe
  ]
})
export class SharedModule { }
