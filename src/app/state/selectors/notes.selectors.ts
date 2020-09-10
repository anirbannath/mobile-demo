import { AppState } from '../../models/app-state';
import { createSelector } from '@ngrx/store';
import { selectSelectedContactId } from './contacts.selectors';
import { Note } from '../../models/note';

export const selectNotes = (state: AppState) => state.notes;

export const selectNotesLoading = createSelector(
  selectNotes,
  (notes) => notes.loading
);

export const selectNotesData = createSelector(
  selectNotes,
  (notes) => notes.data
);

export const selectNotesList = createSelector(
  selectNotesData,
  (noteDictonary) => {
    const list: Array<Note> = [];
    if (noteDictonary) {
      Object.keys(noteDictonary).forEach(key => {
        list.push(noteDictonary[key]);
      });
    }
    return list;
  }
);

export const selectNotesError = createSelector(
  selectNotes,
  (notes) => notes.error
);

export const selectClientNotesData = createSelector(
  selectNotesList,
  selectSelectedContactId,
  (notes, id) => id ? notes.filter(note => note.contactId === id) : []
);