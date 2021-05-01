import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StopwatchComponent } from './components/stopwatch/stopwatch.component';



@NgModule({
  declarations: [
    StopwatchComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    StopwatchComponent
  ]
})
export class StopwatchModule { }
