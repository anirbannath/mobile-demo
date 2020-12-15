import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../_shared/models/user';
import { Note } from '../_shared/models/note';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

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
