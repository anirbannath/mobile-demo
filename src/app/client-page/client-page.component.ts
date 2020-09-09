import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Contact } from '../models/contact';

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientPageComponent {

  readonly loaders = Array.from(Array(5));

  @Input() context: number;
  @Input() loading: boolean;
  @Input() data: Contact;
  @Input() error: string;

}
