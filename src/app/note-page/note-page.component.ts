import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../models/note';

@Component({
  selector: 'app-note-page',
  templateUrl: './note-page.component.html',
  styleUrls: ['./note-page.component.scss']
})
export class NotePageComponent {

  @Input() loading: boolean;
  @Input() note: Note;

}
