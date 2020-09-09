import { createAction, props } from '@ngrx/store';
import { appActions } from '../../app-actions';

export const loadNotes = createAction(appActions.loadNotes);
export const setNotes = createAction(appActions.setNotes, props<{ notes: Array<any> }>());
export const errorNotes = createAction(appActions.errorNotes, props<{ error: string }>());
export const cancelLoadNotes = createAction(appActions.cancelLoadNotes);
