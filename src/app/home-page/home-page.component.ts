import { Component, Input } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  readonly loaders = Array.from(Array(5));
  readonly today = Date.now();

  @Input() loading: boolean;
  @Input() data: User;
  @Input() error: string;

}
