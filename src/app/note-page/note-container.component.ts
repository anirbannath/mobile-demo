import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Note } from '../_shared/models/note';
import { TagDictionary } from '../_shared/models/tag';
import { selectNoteById, selectNotesLoading } from '../_shared/state/selectors/notes.selectors';
import { selectTagsData } from '../_shared/state/selectors/tags.selectors';

@Component({
  selector: 'app-note-container',
  template: `
    <app-note-page
      [tags]="tags$ | async"
      [loading]="loading$ | async"
      [note]="note$ | async">
    </app-note-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteContainerComponent implements OnInit {

  tags$: Observable<TagDictionary>;
  loading$: Observable<boolean>;
  note$: Observable<Note>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.tags$ = this.store.select(selectTagsData);
    this.loading$ = this.store.select(selectNotesLoading);
    this.note$ = this.activatedRoute.params.pipe(
      switchMap(params => this.store.select(selectNoteById, { id: params['id'] })));
  }

}
