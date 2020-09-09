import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../models/contact';

@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsPageComponent {

  readonly loaders = Array.from(Array(10));

  @Input() loading: boolean;
  @Input() data: Array<Contact>;
  @Input() error: string;

  @Output() selectContact = new EventEmitter<number>();

  onSelectContact(id: number) {
    id && this.selectContact.emit(id);
  }

}
