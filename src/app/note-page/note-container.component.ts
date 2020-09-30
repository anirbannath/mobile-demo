import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Note } from '../models/note';
import { saveNote } from '../state/actions/notes.actions';
import { selectNoteById, selectNotesLoading } from '../state/selectors/notes.selectors';

@Component({
  selector: 'app-note-container',
  template: `
    <app-note-page
      [loading]="loading$ | async"
      [note]="note$ | async">
    </app-note-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteContainerComponent implements OnInit {

  loading$: Observable<boolean>;
  note$: Observable<Note>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.loading$ = this.store.select(selectNotesLoading);
    this.note$ = this.activatedRoute.params.pipe(
      switchMap(params => this.store.select(selectNoteById, { id: params['id'] })));
  }

}
