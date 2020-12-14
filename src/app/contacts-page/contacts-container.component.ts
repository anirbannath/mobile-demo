import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectContactsLoading, selectContactsError, selectContactsList } from '../_shared/state/selectors/contacts.selectors';
import { setSelectedContact } from '../_shared/state/actions/contacts.actions';
import { Contact } from '../_shared/models/contact';

@Component({
  selector: 'app-contacts-container',
  template: `
    <app-contacts-page
      [loading]="loading$ | async"
      [data]="contactsData$ | async"
      [error]="error$ | async"
      (selectContact)="onSelectContact($event)">
    </app-contacts-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsContainerComponent implements OnInit {

  loading$: Observable<boolean>;
  contactsData$: Observable<Array<Contact>>;
  error$: Observable<string>;

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.loading$ = this.store.select(selectContactsLoading);
    this.contactsData$ = this.store.select(selectContactsList);
    this.error$ = this.store.select(selectContactsError);
  }

  onSelectContact(id: number) {
    this.store.dispatch(setSelectedContact({ id: id }));
  }

}
