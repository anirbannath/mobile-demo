import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';
import { loadContacts } from '../state/actions/contacts.actions';
import { selectContactsLoading, selectIndividualContactData, selectContactsError, selectSelectedContactId } from '../state/selectors/contacts.selectors';

@Component({
  selector: 'app-client-container',
  template: `
    <app-client-page
      [context]="context$ | async"
      [loading]="loading$ | async"
      [data]="contactData$ | async"
      [error]="error$ | async">
    </app-client-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientContainerComponent implements OnInit {

  context$: Observable<number>;
  loading$: Observable<boolean>;
  contactData$: Observable<Contact>;
  error$: Observable<string>;

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.context$ = this.store.select(selectSelectedContactId);
    this.loading$ = this.store.select(selectContactsLoading);
    this.error$ = this.store.select(selectContactsError);
    this.contactData$ = this.store.select(selectIndividualContactData);
    this.store.dispatch(loadContacts());
  }

}
