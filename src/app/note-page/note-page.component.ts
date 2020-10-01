import { Component, Input } from '@angular/core';
import { Note } from '../_shared/models/note';

@Component({
  selector: 'app-note-page',
  templateUrl: './note-page.component.html',
  styleUrls: ['./note-page.component.scss']
})
export class NotePageComponent {

  @Input() loading: boolean;
  @Input() note: Note;

}
