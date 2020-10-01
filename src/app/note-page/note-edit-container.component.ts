import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Note } from '../_shared/models/note';
import { saveNote } from '../_shared/state/actions/notes.actions';
import { selectNoteById } from '../_shared/state/selectors/notes.selectors';

@Component({
  selector: 'app-note-container',
  template: `
    <app-note-edit-page
      [note]="note$ | async"
      (save)="onSave($event)">
    </app-note-edit-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteEditContainerComponent implements OnInit {

  note$: Observable<Note>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.note$ = this.activatedRoute.params.pipe(
      switchMap(params => this.store.select(selectNoteById, { id: params['id'] })));
  }

  onSave(note: Note) {
    this.store.dispatch(saveNote({ note: note }));
  }

}
