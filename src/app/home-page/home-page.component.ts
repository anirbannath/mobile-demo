import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../models/user';
import { Note } from '../models/note';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  readonly loaders = Array.from(Array(5));
  readonly today = Date.now();

  @Input() userLoading: boolean;
  @Input() userData: User;
  @Input() userError: string;
  @Input() notesLoading: boolean;
  @Input() notesData: Array<Note>;
  @Input() notesError: string;
  @Output() selectNote = new EventEmitter<number>();

  onSelectNote(id: number) {
    this.selectNote.emit(id);
  }

}
