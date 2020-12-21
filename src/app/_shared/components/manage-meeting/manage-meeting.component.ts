import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component,
  EventEmitter, Inject, Input, Output, PLATFORM_ID
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStoreService } from '../../services/app-store.service';
import { setAssistantAcknowledgement, setAssistantContext } from '../../state/actions/voice-assistant.actions';
import { DateValue } from './manage-meeting.model';

declare global {
  interface Date {
    isValid(): boolean;
    addDays(days: number): Date;
  }
}

Date.prototype.isValid = function () {
  // If the date object is invalid it
  // will return 'NaN' on getTime()
  // and NaN is never equal to itself.
  return this.getTime() === this.getTime();
};

Date.prototype.addDays = function (days: number) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

@Component({
  selector: 'app-manage-meeting',
  templateUrl: './manage-meeting.component.html',
  styleUrls: ['./manage-meeting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'va-index': '100' }
})
export class ManageMeetingComponent implements AfterViewInit {

  meetingDisabled: boolean;

  readonly months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  readonly daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  readonly years = Array.from(Array(5)).map((_, i) => new Date().getFullYear() + i);
  readonly hours = Array.from(Array(25)).map((_, i) => this.get00(i));
  readonly minutes = Array.from(Array(61)).map((_, i) => this.get00(i));
  days: Array<string>;

  value: DateValue;
  dateValueString = '';

  @Input() confirmation: boolean;
  private _meeting: Date;
  @Input()
  get meeting() { return this._meeting; }
  set meeting(value: Date) {
    this._meeting = value;
    if (this._meeting) {
      this.value = this.parseDate(this._meeting);
    }
    this.meetingChange.emit(this._meeting);
  }

  @Output() meetingChange = new EventEmitter<Date>();
  @Output() dismiss = new EventEmitter<void>();

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private cd: ChangeDetectorRef,
    private store: Store,
    private appStore: AppStoreService
  ) {
    this._meeting = new Date();
    this.value = this.parseDate(this._meeting);
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId) && this.confirmation && this.appStore.isAssistantActive) {
      this.appStore.isHomeLoadedOnce = true;
      this.store.dispatch(setAssistantAcknowledgement({
        acknowledgement: (<HTMLElement>document.querySelector('[va-article="enter-date"]'))?.innerText.replace(/\s/g, ' ')
      }))
    }
  }

  onMonthChange() {
    this.days = this.setDaysOfMonth(this.value.selectedYear, this.value.selectedMonth);
  }

  submit() {
    this.meeting = this.meetingDisabled ? null : this.toDate(this.value);
    this.dismiss.emit();
  }

  cancel() {
    this.dismiss.emit();
  }

  toggleDisabled() {
    this.meetingDisabled = !this.meetingDisabled;
  }

  tryParseDateValue() {
    if (this.dateValueString) {
      let parsedDate = this.dateValueString.toLowerCase()
        .replace(/at/gi, '')
        .replace(/^(\d+)\w+/, '$1')
        .replace('noon', '12:00')
        .replace('tomorrow', new Date().addDays(1).toDateString());
      const date = new Date(parsedDate);
      if (date.isValid()) {
        this.value = this.parseDate(date);
      }
    }
    setTimeout(() => {
      this.dateValueString = '';
      this.cd.markForCheck();
    }, 1);
  }

  private setDaysOfMonth(year: string | number, month: string | number) {
    if (+month === 1 &&
      (+year % 4 === 0 || +year % 100 === 0 || +year % 400 === 0)) {
      return Array.from(Array(29)).map((_, i) => (i + 1) + '');
    }
    return Array.from(Array(this.daysInMonth[month])).map((_, i) => (i + 1) + '');
  }

  private get00(i: number) {
    return i < 10 ? '0' + i : i + ''
  }

  private parseDate(value: Date) {
    if (value) {
      value = new Date(value);
      this.days = this.setDaysOfMonth(value.getFullYear(), value.getMonth());
      return {
        selectedYear: value.getFullYear() + '',
        selectedMonth: value.getMonth() + '',
        selectedDate: value.getDate() + '',
        selectedHour: this.get00(value.getHours()),
        selectedMinute: this.get00(value.getMinutes()),
      } as DateValue;
    }
  }

  private toDate(value: DateValue) {
    if (value) {
      return new Date(
        +this.value.selectedYear,
        +this.value.selectedMonth,
        +this.value.selectedDate,
        +this.value.selectedHour,
        +this.value.selectedMinute,
      );
    }
  }

}
