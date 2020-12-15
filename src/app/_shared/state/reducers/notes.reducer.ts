import { createReducer, on } from '@ngrx/store';
import { initialState } from '../../models/app-state';
import { Note, NoteDictionary } from '../../models/note';
import { loadNotes, setNotes, errorNotes, cancelLoadNotes } from '../actions/notes.actions';

export const flattenNotes = (notes: Array<Note>): NoteDictionary => {
  if (notes && notes.length > 0) {
    const result: NoteDictionary = {};
    notes.forEach(note => {
      result[note.id] = note;
    });
    return result;
  }
}

export const notesReducer = createReducer(
  initialState,
  on(loadNotes, (state) => ({ ...state, loading: true })),
  on(setNotes, (state, { notes }) => ({ ...state, loading: false, error: null, data: flattenNotes(notes) })),
  on(errorNotes, (state, { error }) => ({ ...state, loading: false, error: error, data: null })),
  on(cancelLoadNotes, (state) => ({ ...state, loading: false }))
);
