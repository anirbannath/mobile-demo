import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() back: boolean;
  @Input() settings: boolean;

  constructor(
    private location: Location
  ) { }

  goBack() {
    this.location.back();
  }

}
