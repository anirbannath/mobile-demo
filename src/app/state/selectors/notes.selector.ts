import { AppState } from '../../models/app-state';
import { createSelector } from '@ngrx/store';

export const selectNotes = (state: AppState) => state.notes;

export const selectNotesLoading = createSelector(
  selectNotes,
  (contacts) => contacts.loading
);

export const selectNotesData = createSelector(
  selectNotes,
  (contacts) => contacts.data
);

export const selectNotesList = createSelector(
  selectNotesData,
  (noteDictonary) => {
    const list = [];
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
  (contacts) => contacts.error
);
