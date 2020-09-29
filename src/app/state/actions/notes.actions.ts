import { createAction, props } from '@ngrx/store';
import { Note } from '../../models/note';
import { appActions } from '../../app-actions';

export const loadNotes = createAction(appActions.loadNotes);
export const saveNote = createAction(appActions.saveNote, props<{ note: Note }>());
export const setNotes = createAction(appActions.setNotes, props<{ notes: Array<any> }>());
export const errorNotes = createAction(appActions.errorNotes, props<{ error: string }>());
export const cancelLoadNotes = createAction(appActions.cancelLoadNotes);

export const setSelectedNote = createAction(appActions.setSelectedNote, props<{ id: number }>());
export const selectNote = createAction(appActions.selectNote, props<{ search: any }>());
