import { Injectable } from '@angular/core';
import { interval, BehaviorSubject, fromEvent } from 'rxjs';
import { buffer, debounceTime, filter, tap } from 'rxjs/operators';
import { State } from '../models/state.model';

@Injectable({
  providedIn: 'root',
})
export class StopwatchService {
  state: State = {
    isStarted: false,
    time: {
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
  };

  stopwatch$ = new BehaviorSubject(this.state);

  doubleClick$;
  intervalSub$;
  doubleClickSub$;

  begin(btn): void {
    this.state.isStarted = !this.state.isStarted;
    this.stopwatch$.next(this.state);
    this.doubleClickChecker(btn);
    if (this.state.isStarted) {
      if(this.intervalSub$) {
        this.intervalSub$.unsubscribe();
      }
      this.start();
    } else {
      this.stop();
    }
  }

  start(): void {
    this.intervalSub$ = interval(1000)
      .pipe(
        tap(() => {
          this.state.time.seconds += 1;
          if (this.state.time.seconds > 59 || this.state.time.minutes > 59) {
            this.formatDate();
          }
          this.stopwatch$.next(this.state);
        })
      )
      .subscribe();
  }

  doubleClickChecker(btn): void {
    if (this.doubleClickSub$) {
      this.doubleClickSub$.unsubscribe();
    }

    this.doubleClick$ = fromEvent(btn, 'click');

    this.doubleClickSub$ = this.doubleClick$
      .pipe(
        buffer(this.doubleClick$.pipe(debounceTime(300))),
        filter((list: []) => list.length > 1)
      )
      .subscribe(() => this.pause());
  }

  pause(): void {
    if (this.intervalSub$) {
      this.intervalSub$.unsubscribe();
      this.state.isStarted = false;
      this.stopwatch$.next(this.state);
    }
  }

  reset(): void {
    if (this.intervalSub$) {
      this.doubleClickSub$.unsubscribe();
      this.intervalSub$.unsubscribe();
      this.state.isStarted = false;
      this.state.time = {
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
      this.stopwatch$.next(this.state);
    }
  }

  stop(): void {
    if (this.intervalSub$) {
      this.intervalSub$.unsubscribe();
      this.state.isStarted = false;
      this.state.time = {
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
      this.stopwatch$.next(this.state);
      this.start();
    }
  }

  formatDate(): void {
    if (this.state.time.seconds > 59) {
      this.state.time.seconds = 0;
      this.state.time.minutes += 1;
    }
    if (this.state.time.minutes > 59) {
      this.state.time.minutes = 0;
      this.state.time.hours += 1;
    }
  }
}
