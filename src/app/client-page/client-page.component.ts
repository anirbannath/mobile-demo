import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Contact } from '../models/contact';
import { Note } from '../models/note';

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientPageComponent {

  readonly loaders = Array.from(Array(5));

  @Input() context: number;
  @Input() contactLoading: boolean;
  @Input() contactData: Contact;
  @Input() contactError: string;
  @Input() notesLoading: boolean;
  @Input() notesData: Array<Note>;
  @Input() notesError: string;

}
