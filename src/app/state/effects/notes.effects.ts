import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { appActions } from '../../app-actions';
import { environment } from '../../../environments/environment';
import { selectNotesData } from '../selectors/notes.selectors';
import { cancelLoadNotes, setNotes, errorNotes } from '../actions/notes.actions';
import { Note } from '../../models/note';

@Injectable()
export class NotesEffects {

  constructor(
    private store: Store,
    private actions$: Actions
  ) { }

  loadNotes = createEffect(() => this.actions$.pipe(
    ofType(appActions.loadNotes),
    withLatestFrom(this.store.select(selectNotesData)),
    switchMap(([action, notesData]) => {
      return new Observable<Action>(subscriber => {
        if (notesData) {
          subscriber.next(cancelLoadNotes());
          subscriber.complete();
        } else {
          try {
            const dbRequest = indexedDB.open(environment.dbName, environment.dbVersion);
            dbRequest.onsuccess = () => {
              try {
                const db = dbRequest.result,
                  tx = db.transaction('notes', 'readonly'),
                  notesTx = tx.objectStore('notes'),
                  notesDataRequest: IDBRequest<Array<Note>> = notesTx.getAll();
                notesDataRequest.onsuccess = (event) => {
                  setTimeout(() => {
                    subscriber.next(setNotes({ notes: notesDataRequest.result }));
                    subscriber.complete();
                  }, environment.dataDelay);
                };
              } catch (ex) {
                console.error(ex);
                subscriber.next(errorNotes({ error: `This feature uses the Browser's IndexedDB. To use this feature, please use Google Chrome.` }));
                subscriber.complete();
              }
            }
          } catch (ex) {
            console.error(ex);
            subscriber.next(errorNotes({ error: `This feature uses the Browser's IndexedDB. To use this feature, please use Google Chrome.` }));
            subscriber.complete();
          }
        }
      });
    })
  ));

}
