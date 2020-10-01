import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../_shared/models/user';
import { Note } from '../_shared/models/note';
import { selectUserLoading, selectUserData, selectUserError } from '../_shared/state/selectors/user.selectors';
import { selectNotesLoading, selectNotesError, selectNotesList } from '../_shared/state/selectors/notes.selectors';
import { setSelectedNote } from '../_shared/state/actions/notes.actions';

@Component({
  selector: 'app-home-container',
  template: `
    <app-home-page
      [userLoading]="userLoading$ | async"
      [userData]="userData$ | async"
      [userError]="userError$ | async"
      [notesLoading]="notesLoading$ | async"
      [notesData]="notesData$ | async"
      [notesError]="notesError$ | async"
      (selectNote)="onSelectNote($event)">
    </app-home-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeContainerComponent implements OnInit {

  userLoading$: Observable<boolean>;
  userData$: Observable<User>;
  userError$: Observable<string>;
  notesLoading$: Observable<boolean>;
  notesData$: Observable<Array<Note>>;
  notesError$: Observable<string>;

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.userLoading$ = this.store.select(selectUserLoading);
    this.userData$ = this.store.select(selectUserData);
    this.userError$ = this.store.select(selectUserError);
    this.notesLoading$ = this.store.select(selectNotesLoading);
    this.notesData$ = this.store.select(selectNotesList);
    this.notesError$ = this.store.select(selectNotesError);
  }

  onSelectNote(id: number) {
    this.store.dispatch(setSelectedNote({ id: id }));
  }

}
