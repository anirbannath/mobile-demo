import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnChanges, PLATFORM_ID, SimpleChanges } from '@angular/core';
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
  @Input() duration = 2000;
  @Input() interim: string;
  @Input() final: string;
  @Input() acknowledgement: string;

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private _cd: ChangeDetectorRef,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['interim']?.currentValue || changes['final']?.currentValue ||
      changes['acknowledgement']?.currentValue) {
      this._setTimeoutHandler && clearTimeout(this._setTimeoutHandler);
      this.showToast = true;
      this._setTimeoutHandler = setTimeout(() => {
        this.showToast = false;
        this._cd.markForCheck();
      }, this.duration);
    }

    if (isPlatformBrowser(this.platformId) && changes['acknowledgement']?.currentValue) {
      const msg = new SpeechSynthesisUtterance();
      msg.text = changes['acknowledgement']?.currentValue;
      window.speechSynthesis.speak(msg);
    }
  }

}
