import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, withLatestFrom, map, delay, tap, mergeAll } from 'rxjs/operators';
import { appActions } from '../../app-actions';
import { environment } from '../../../environments/environment';
import { selectContactsData, selectContactsList } from '../selectors/contacts.selectors';
import { cancelLoadContacts, setContacts, setSelectedContact } from '../actions/contacts.actions';
import { Contact } from '../../models/contact';
import { setAssistantAcknowledgement } from '../actions/voice-assistant.actions';

@Injectable()
export class ContactsEffects {

  constructor(
    private store: Store,
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) { }

  loadContacts = createEffect(() => this.actions$.pipe(
    ofType(appActions.loadContacts),
    withLatestFrom(this.store.select(selectContactsData)),
    switchMap(([action, contactsData]) => {
      if (contactsData) {
        return of(cancelLoadContacts());
      } else {
        return this.http.get(environment.dataSource.contacts).pipe(
          delay(environment.dataDelay),
          map((data: Array<Contact>) => setContacts({ contacts: data })));
      }
    })
  ));

  selectContactById = createEffect(() => this.actions$.pipe(
    ofType(appActions.setSelectedContact),
    tap((action) => {
      this.router.navigate(['client']);
    })
  ), { dispatch: false })

  selectContact = createEffect(() => this.actions$.pipe(
    ofType(appActions.selectContact),
    withLatestFrom(this.store.select(selectContactsList)),
    switchMap(([action, contacts]) => {
      let selectedContact: Contact = null;
      const search = (<any>action).search;
      if (!isNaN(+search)) {
        selectedContact = contacts[search - 1];
      } else {
        if (contacts?.length > 0) {
          contacts.some(_contact => {
            if (new RegExp(search, 'i').test(`${_contact.firstName} ${_contact.lastName}`)) {
              selectedContact = _contact;
              return true;
            }
          })
        }
      }
      if (selectedContact !== null) {
        return [
          of(setSelectedContact({ id: selectedContact.id })),
          of(setAssistantAcknowledgement({ acknowledgement: `Selecting contact: ${selectedContact.firstName} ${selectedContact.lastName}.` }))
        ]
      } else {
        return [
          of(setAssistantAcknowledgement({ acknowledgement: `Sorry, I couldn't find the contact you are searching for.` }))
        ];
      }
    }),
    mergeAll()
  ));

}
