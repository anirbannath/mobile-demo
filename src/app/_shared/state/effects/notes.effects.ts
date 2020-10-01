import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, Location } from '@angular/common';
import { Router } from '@angular/router';
import { Action, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeAll, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { appActions } from '../app-actions';
import { environment } from '../../../../environments/environment';
import { selectNotesList } from '../selectors/notes.selectors';
import { cancelLoadNotes, setNotes, loadNotes as loadAllNotes, errorNotes, setSelectedNote } from '../actions/notes.actions';
import { Note } from '../../models/note';

@Injectable()
export class NotesEffects {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private store: Store,
    private actions$: Actions,
    private location: Location,
    private router: Router,
  ) { }

  loadNotes = createEffect(() => this.actions$.pipe(
    ofType(appActions.loadNotes),
    switchMap((action) => {
      if (!isPlatformBrowser(this.platformId)) {
        return EMPTY;
      } else {
        return new Observable<Action>(subscriber => {
          try {
            const dbRequest = indexedDB.open(environment.dbName, environment.dbVersion);
            dbRequest.onsuccess = () => {
              try {
                const db = dbRequest.result,
                  tx = db.transaction('notes', 'readonly'),
                  notesTx = tx.objectStore('notes'),
                  notesDataRequest: IDBRequest<IDBCursorWithValue> = notesTx.openCursor(IDBKeyRange.lowerBound(1));
                const notes: Array<Note> = [];
                notesDataRequest.onsuccess = (event) => {
                  const result = notesDataRequest.result;
                  if (result) {
                    notes.push(result.value);
                    result.continue();
                  } else {
                    setTimeout(() => {
                      subscriber.next(setNotes({ notes: notes }));
                      subscriber.complete();
                    }, environment.dataDelay);
                  }
                };
              } catch (ex) {
                // console.error(ex);
                subscriber.next(errorNotes({ error: `This feature uses the Browser's IndexedDB. To use this feature, please use Google Chrome.` }));
                subscriber.complete();
              }
            }
          } catch (ex) {
            // console.error(ex);
            subscriber.next(errorNotes({ error: `This feature uses the Browser's IndexedDB. To use this feature, please use Google Chrome.` }));
            subscriber.complete();
          }
        });
      }
    })
  ));

  saveNote = createEffect(() => this.actions$.pipe(
    ofType(appActions.saveNote),
    withLatestFrom(this.store.select(selectNotesList)),
    switchMap(([action, notes]) => {
      if (!isPlatformBrowser(this.platformId)) {
        return EMPTY;
      } else {
        return new Observable<Action>(subscriber => {
          try {
            const dbRequest = indexedDB.open(environment.dbName, environment.dbVersion);
            dbRequest.onsuccess = () => {
              try {
                const db = dbRequest.result,
                  tx = db.transaction('notes', 'readwrite'),
                  notesStore = tx.objectStore('notes');
                const note = (<any>action).note;
                const noteIndex = notes.length > 0 ? (notes[notes.length - 1].id + 1) : Date.now();
                const putRequest = notesStore.put({
                  ...note,
                  id: note.id || noteIndex
                });
                putRequest.onsuccess = (event) => {
                  subscriber.next(loadAllNotes());
                  subscriber.complete();
                  this.location.back();
                }
                putRequest.onerror = (event) => {
                  subscriber.next(cancelLoadNotes());
                  subscriber.complete();
                }
              } catch (ex) {
                // console.error(ex);
                subscriber.next(cancelLoadNotes());
                subscriber.complete();
              }
            }
          } catch (ex) {
            // console.error(ex);
            subscriber.next(cancelLoadNotes());
            subscriber.complete();
          }
        });
      }
    })
  ));

  selectNoteById = createEffect(() => this.actions$.pipe(
    ofType(appActions.setSelectedNote),
    tap((action) => {
      const noteId = (<any>action).id;
      this.router.navigate(['note', noteId]);
    })
  ), { dispatch: false })

}
