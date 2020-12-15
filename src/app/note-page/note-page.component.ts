import { Component, Input } from '@angular/core';
import { Note } from '../_shared/models/note';
import { TagDictionary } from '../_shared/models/tag';

@Component({
  selector: 'app-note-page',
  templateUrl: './note-page.component.html',
  styleUrls: ['./note-page.component.scss']
})
export class NotePageComponent {

  @Input() tags: TagDictionary;
  @Input() loading: boolean;
  @Input() note: Note;

}
