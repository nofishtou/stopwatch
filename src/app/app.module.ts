import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StopwatchModule } from './stopwatch/stopwatch.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, StopwatchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
