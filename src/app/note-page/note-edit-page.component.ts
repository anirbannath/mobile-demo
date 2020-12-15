import {
  AfterViewInit, ChangeDetectionStrategy, Component, ElementRef,
  EventEmitter, Input, Output, ViewChild
} from '@angular/core';
import { Note } from '../_shared/models/note';

@Component({
  selector: 'app-note-edit-page',
  templateUrl: './note-edit-page.component.html',
  styleUrls: ['./note-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteEditPageComponent implements AfterViewInit {

  isTagsOpen: boolean;
  isMeetingOpen: boolean;

  private _note: Note;
  @Input()
  get note() { return this._note }
  set note(value: Note) { this._note = { ...value } };

  @Output() save = new EventEmitter<Note>();

  @ViewChild('description') description: ElementRef<HTMLElement>;

  ngAfterViewInit() {
    this.description.nativeElement.focus();
  }

  onSave() {
    this.save.emit(this.note);
  }

  openTags() {
    this.isTagsOpen = true;
  }

  closeTags() {
    this.isTagsOpen = false;
  }

  openMeeting() {
    this.isMeetingOpen = true;
  }

  closeMeeting() {
    this.isMeetingOpen = false;
  }

}
