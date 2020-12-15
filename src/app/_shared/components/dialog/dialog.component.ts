import { AfterViewInit, Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { dialogAnimations } from './dialog.animations';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  animations: dialogAnimations,
})
export class DialogComponent implements AfterViewInit, OnDestroy {

  show = 'true';

  @Output() dismiss = new EventEmitter<void>();

  ngAfterViewInit(): void {
    this.show = 'true';
  }

  onDismiss() {
    this.dismiss.emit();
  }

  ngOnDestroy() {
    this.show = 'false';
  }

}
