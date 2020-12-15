import { createSelector } from '@ngrx/store';
import { AppState } from '../../models/app-state';
import { selectSelectedContactId } from './contacts.selectors';
import { Note, NoteDictionary } from '../../models/note';

export const selectNotes = (state: AppState) => state.notes;

export const selectNotesLoading = createSelector(
  selectNotes,
  (notes) => notes?.loading
);

export const selectNotesData = createSelector(
  selectNotes,
  (notes) => notes?.data
);

export const selectNotesList = createSelector(
  selectNotesData,
  (noteDictionary) => {
    const list: Array<Note> = [];
    if (noteDictionary) {
      Object.keys(noteDictionary).forEach(key => {
        list.push(noteDictionary[key]);
      });
    }
    return list;
  }
);

export const selectNotesError = createSelector(
  selectNotes,
  (notes) => notes?.error
);

export const selectClientNotesData = createSelector(
  selectNotesList,
  selectSelectedContactId,
  (notes, id) => id ? notes.filter(note => note.contactId === id) : []
);

export const selectNoteById = createSelector(
  selectNotesData,
  selectSelectedContactId,
  (notedictionary: NoteDictionary, contactId: number, props: { id: number }) =>
    props?.id && notedictionary && notedictionary[props.id] ? notedictionary[props.id] : {
      title: '',
      description: '',
      contactId: contactId,
      occurredOn: new Date(Date.now()),
      meeting: '',
      tags: [],
      tagNames: []
    } as Note
);
