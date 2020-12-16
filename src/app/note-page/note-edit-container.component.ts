import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Note } from '../_shared/models/note';
import { Tag } from '../_shared/models/tag';
import { saveNote } from '../_shared/state/actions/notes.actions';
import { selectNoteById } from '../_shared/state/selectors/notes.selectors';
import { selectTagsList } from '../_shared/state/selectors/tags.selectors';

@Component({
  selector: 'app-note-container',
  template: `
    <app-note-edit-page
    [tags]="tags$ | async"
      [note]="note$ | async"
      (save)="onSave($event)">
    </app-note-edit-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteEditContainerComponent implements OnInit {

  tags$: Observable<Array<Tag>>;
  note$: Observable<Note>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.tags$ = this.store.select(selectTagsList);
    this.note$ = this.activatedRoute.params.pipe(
      switchMap(params => this.store.select(selectNoteById, { id: params['id'] })));
  }

  onSave(note: Note) {
    this.store.dispatch(saveNote({ note: note }));
  }

}
