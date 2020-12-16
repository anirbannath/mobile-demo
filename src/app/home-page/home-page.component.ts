import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../_shared/models/note';
import { TagDictionary } from '../_shared/models/tag';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {

  readonly now = new Date();
  meetingCount = 0;
  nextMeeting = null;

  @Input() tagsData: TagDictionary;
  @Input() notesLoading: boolean;
  private _notes: Array<Note>;
  @Input()
  get notesData() { return this._notes; }
  set notesData(value: Array<Note>) {
    this._notes = value;
    const meetingsToday = this._notes?.length > 0 ? this._notes.filter(note => {
      const noteMeeting = note.meeting && new Date(note.meeting);
      return noteMeeting &&
        noteMeeting.getFullYear() === this.now.getFullYear() &&
        noteMeeting.getMonth() === this.now.getMonth() &&
        noteMeeting.getDate() === this.now.getDate();
    }).map(note => note.meeting).sort((a, b) => new Date(a).getTime() - new Date(b).getTime()) : [];
    this.meetingCount = meetingsToday.length;
    this.nextMeeting = meetingsToday[0];
  }
  @Input() notesError: string;

  @Output() selectNote = new EventEmitter<number>();

  onSelectNote(id: number) {
    this.selectNote.emit(id);
  }

}
