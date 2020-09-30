import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, withLatestFrom, map, delay, tap } from 'rxjs/operators';
import { appActions } from '../../app-actions';
import { environment } from '../../../environments/environment';
import { selectContactsData } from '../selectors/contacts.selectors';
import { cancelLoadContacts, setContacts } from '../actions/contacts.actions';
import { Contact } from '../../models/contact';

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

}
