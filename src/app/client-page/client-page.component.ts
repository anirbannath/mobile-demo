import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Contact } from '../_shared/models/contact';
import { Note } from '../_shared/models/note';
import { TagDictionary } from '../_shared/models/tag';

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientPageComponent {

  @Input() tagsData: TagDictionary;
  @Input() contactLoading: boolean;
  @Input() contactData: Contact;
  @Input() contactError: string;
  @Input() notesLoading: boolean;
  @Input() notesData: Array<Note>;
  @Input() notesError: string;
  @Output() selectNote = new EventEmitter<number>();

  onSelectNote(id: number) {
    this.selectNote.emit(id);
  }

}
