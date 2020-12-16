import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../../models/note';
import { TagDictionary } from '../../models/tag';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesComponent {

  @Input() isLoading: boolean;
  @Input() notes: Array<Note>;
  @Input() error: string;
  @Input() loaders = Array.from(Array(5));
  @Input() tags: TagDictionary;

  @Output() selectNote = new EventEmitter<number>();

  onSelectNote(id: number) {
    this.selectNote.emit(id);
  }

}
