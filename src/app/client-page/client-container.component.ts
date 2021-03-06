import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Contact } from '../_shared/models/contact';
import { Note } from '../_shared/models/note';
import { TagDictionary } from '../_shared/models/tag';
import { setSelectedNote } from '../_shared/state/actions/notes.actions';
import { selectContactsLoading, selectIndividualContactData, selectContactsError } from '../_shared/state/selectors/contacts.selectors';
import { selectNotesLoading, selectNotesError, selectClientNotesData } from '../_shared/state/selectors/notes.selectors';
import { selectTagsData } from '../_shared/state/selectors/tags.selectors';

@Component({
  selector: 'app-client-container',
  template: `
    <app-client-page
      [tagsData]="tagsData$ | async"
      [contactLoading]="contactLoading$ | async"
      [contactData]="contactData$ | async"
      [contactError]="contactError$ | async"
      [notesLoading]="notesLoading$ | async"
      [notesData]="notesData$ | async"
      [notesError]="notesError$ | async"
      (selectNote)="onSelectNote($event)">
    </app-client-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientContainerComponent implements OnInit {

  tagsData$: Observable<TagDictionary>;
  contactLoading$: Observable<boolean>;
  contactData$: Observable<Contact>;
  contactError$: Observable<string>;
  notesLoading$: Observable<boolean>;
  notesData$: Observable<Array<Note>>;
  notesError$: Observable<string>;

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.tagsData$ = this.store.select(selectTagsData);
    this.contactLoading$ = this.store.select(selectContactsLoading);
    this.contactData$ = this.store.select(selectIndividualContactData);
    this.contactError$ = this.store.select(selectContactsError);
    this.notesLoading$ = this.store.select(selectNotesLoading);
    this.notesData$ = this.store.select(selectClientNotesData);
    this.notesError$ = this.store.select(selectNotesError);
  }

  onSelectNote(id: number) {
    this.store.dispatch(setSelectedNote({ id: id }));
  }

}
