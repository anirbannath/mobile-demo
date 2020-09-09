import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { appActions } from '../../app-actions';
import { environment } from '../../../environments/environment';
import { selectNotesData } from '../selectors/notes.selector';
import { cancelLoadNotes, setNotes } from '../actions/notes.actions';
import { Note } from 'src/app/models/note';

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
          const dbRequest = indexedDB.open(environment.dbName, environment.dbVersion);
          dbRequest.onsuccess = () => {
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
          }
        }
      });
    })
  ));

}
