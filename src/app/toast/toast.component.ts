import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { toastAnimation } from './toast.animation';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [toastAnimation]
})
export class ToastComponent implements OnChanges {

  private _setTimeoutHandler: any;
  showToast: boolean;
  @Input() debounceTime = 2000;
  @Input() interim: string;
  @Input() final: string;

  constructor(
    private _cd: ChangeDetectorRef
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['interim']?.currentValue || changes['final']?.currentValue) {
      this._setTimeoutHandler && clearTimeout(this._setTimeoutHandler);
      this.showToast = true;
    }
    if (changes['final']?.currentValue) {
      this._setTimeoutHandler = setTimeout(() => {
        this.showToast = false;
        this._cd.detectChanges();
      }, this.debounceTime);
    }
  }

}
