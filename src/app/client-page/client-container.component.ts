import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';
import { Note } from '../models/note';
import { loadContacts } from '../state/actions/contacts.actions';
import { selectContactsLoading, selectIndividualContactData, selectContactsError, selectSelectedContactId } from '../state/selectors/contacts.selectors';
import { selectNotesLoading, selectNotesError, selectClientNotesData } from '../state/selectors/notes.selector';

@Component({
  selector: 'app-client-container',
  template: `
    <app-client-page
      [context]="context$ | async"
      [contactLoading]="contactLoading$ | async"
      [contactData]="contactData$ | async"
      [contactError]="contactError$ | async"
      [notesLoading]="notesLoading$ | async"
      [notesData]="notesData$ | async"
      [notesError]="notesError$ | async">
    </app-client-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientContainerComponent implements OnInit {

  context$: Observable<number>;
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
    this.context$ = this.store.select(selectSelectedContactId);
    this.contactLoading$ = this.store.select(selectContactsLoading);
    this.contactData$ = this.store.select(selectIndividualContactData);
    this.contactError$ = this.store.select(selectContactsError);
    this.notesLoading$ = this.store.select(selectNotesLoading);
    this.notesData$ = this.store.select(selectClientNotesData);
    this.notesError$ = this.store.select(selectNotesError);
    this.store.dispatch(loadContacts());
  }

}
