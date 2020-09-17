import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../models/note';

@Component({
  selector: 'app-note-page',
  templateUrl: './note-page.component.html',
  styleUrls: ['./note-page.component.scss']
})
export class NotePageComponent {

  private _note: Note;
  @Input() loading: boolean;
  @Input() edit: boolean;
  @Input()
  get note() { return this._note }
  set note(value: Note) { this._note = { ...value } };

  @Output() save = new EventEmitter<Note>();

  onSave() {
    this.save.emit(this.note);
  }

}
