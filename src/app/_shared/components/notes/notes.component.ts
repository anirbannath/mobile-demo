import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../../models/note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent {

  @Input() isLoading: boolean;
  @Input() notes: Array<Note>;
  @Input() error: string;
  @Input() loaders = Array.from(Array(5));

  @Output() selectNote = new EventEmitter<number>();

  onSelectNote(id: number) {
    this.selectNote.emit(id);
  }

}
