import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() back: boolean;
  @Input() cancel: boolean;
  @Input() settings: boolean;
  @Input() note: boolean;
  @Input() edit: boolean;
  @Input() save: boolean;

  @Output() onSave = new EventEmitter<void>();

  constructor(
    private location: Location
  ) { }

  goBack() {
    this.location.back();
  }

  onSaveClick() {
    this.onSave.emit();
  }

}
