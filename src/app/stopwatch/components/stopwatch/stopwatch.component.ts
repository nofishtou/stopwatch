import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormattedDate } from '../../models/formatted-date.model';
import { StopwatchService } from '../../services/stopwatch.service';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss'],
})
export class StopwatchComponent implements OnInit, OnDestroy {
  isStarted = false;
  time = {
    hours: '00',
    minutes: '00',
    seconds: '00',
  };
  dataSub$;
  constructor(private stopwatchService: StopwatchService) {}

  @ViewChild('stopwatchWaitButton') waitButton: ElementRef;

  ngOnInit(): void {
    this.dataSub$ = this.stopwatchService.stopwatch$.subscribe((data) => {
      this.time = this.formatDate(data.time);
      this.isStarted = data.isStarted;
    });
  }

  ngOnDestroy() {
    this.dataSub$.unsubscribe();
  }

  onClickBegin(): void {
    this.stopwatchService.begin(this.waitButton.nativeElement);
  }

  onClickReset(): void {
    this.stopwatchService.reset();
  }

  formatDate(date): FormattedDate {
    const formattedDate = {
      seconds: `${date.seconds}`,
      minutes: `${date.minutes}`,
      hours: `${date.hours}`,
    };

    if (+formattedDate.seconds < 10) {
      formattedDate.seconds = `0${formattedDate.seconds}`;
    }

    if (+formattedDate.minutes < 10) {
      formattedDate.minutes = `0${formattedDate.minutes}`;
    }

    if (+formattedDate.hours < 10) {
      formattedDate.hours = `0${formattedDate.hours}`;
    }

    return formattedDate;
  }
}
