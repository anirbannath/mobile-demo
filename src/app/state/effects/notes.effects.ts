// import { Injectable } from '@angular/core';
// import { Action, Store } from '@ngrx/store';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { Observable } from 'rxjs';
// import { switchMap, withLatestFrom } from 'rxjs/operators';
// import { appActions } from '../../app-actions';
// import { environment } from '../../../environments/environment';
// import { selectContactsData } from '../selectors/contacts.selectors';
// import { cancelLoadContacts, setContacts } from '../actions/contacts.actions';
// import { Contact } from '../../models/contact';

// @Injectable()
// export class NotesEffects {

//   constructor(
//     private store: Store,
//     private actions$: Actions
//   ) { }

//   loadNotes = createEffect(() => this.actions$.pipe(
//     ofType(appActions.loadContacts),
//     withLatestFrom(
//       this.store.select(selectContactsData),
//       this.store.select(selectContactsData)
//     ),
//     switchMap(([action, contactsData]) => {
//       return new Observable<Action>(subscriber => {
//         if (contactsData) {
//           subscriber.next(cancelLoadContacts());
//           subscriber.complete();
//         } else {
//           const dbRequest = indexedDB.open(environment.dbName, environment.dbVersion);
//           dbRequest.onsuccess = () => {
//             const db = dbRequest.result,
//               tx = db.transaction('contacts', 'readonly'),
//               contactsTx = tx.objectStore('contacts'),
//               contactsDataRequest: IDBRequest<Array<Contact>> = contactsTx.getAll();
//             contactsDataRequest.onsuccess = (event) => {
//               setTimeout(() => {
//                 subscriber.next(setContacts({ contacts: contactsDataRequest.result }));
//                 subscriber.complete();
//               }, environment.dataDelay);
//             };
//           }
//         }
//       });
//     })
//   ));

// }
