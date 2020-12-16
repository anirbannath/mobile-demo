import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DateValue } from './manage-meeting.model';

@Component({
  selector: 'app-manage-meeting',
  templateUrl: './manage-meeting.component.html',
  styleUrls: ['./manage-meeting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageMeetingComponent {

  readonly months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  readonly daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  readonly years = Array.from(Array(5)).map((_, i) => new Date().getFullYear() + i);
  readonly hours = Array.from(Array(25)).map((_, i) => this.get00(i));
  readonly minutes = Array.from(Array(61)).map((_, i) => this.get00(i));
  days: Array<string>;

  value: DateValue;

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
    private datePipe: DatePipe
  ) {
    this._meeting = new Date();
    this.value = this.parseDate(this._meeting);
  }

  onMonthChange() {
    this.setDaysOfMonth(this.value.selectedYear, this.value.selectedMonth);
  }

  submit() {
    this.meeting = this.toDate(this.value);
    this.dismiss.emit();
  }

  cancel() {
    this.dismiss.emit();
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
