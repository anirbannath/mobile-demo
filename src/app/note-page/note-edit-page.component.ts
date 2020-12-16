import {
  AfterViewInit, ChangeDetectionStrategy, Component, ElementRef,
  EventEmitter, Input, Output, ViewChild
} from '@angular/core';
import { Note } from '../_shared/models/note';
import { Tag } from '../_shared/models/tag';

@Component({
  selector: 'app-note-edit-page',
  templateUrl: './note-edit-page.component.html',
  styleUrls: ['./note-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteEditPageComponent implements AfterViewInit {

  isTagsOpen: boolean;
  isMeetingOpen: boolean;
  isConfirmationOpen: boolean;

  confirmed: boolean;

  @Input() tags: Array<Tag>;
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
    if (!this.confirmed && this.note.tags.indexOf(1) > -1) {
      this.isConfirmationOpen = true;
      this.openMeeting();
    } else {
      this.save.emit(this.note);
    }
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
    if (this.isConfirmationOpen) {
      this.isConfirmationOpen = false;
      this.confirmed = true;
    }
    this.isMeetingOpen = false;
  }

  onDescriptionChange() {
    const desc = this.note.description?.toLowerCase();
    this.tags.forEach(tag => {
      if (tag.keywords.some(keyword => desc.indexOf(keyword) > -1)) {
        this.addTag(tag.id);
      }
    })
  }

  addTag(id: number) {
    if (!this.note.tags) {
      this.note.tags = [];
    }
    if (this.note.tags.indexOf(id) === -1) {
      this.note.tags = [...this.note.tags, id];
    }
  }

}
