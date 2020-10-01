import { createAction, props } from '@ngrx/store';
import { appActions } from '../app-actions';
import { User } from '../../models/user';

export const loadUser = createAction(appActions.loadUser);
export const setUser = createAction(appActions.setUser, props<{ user: User }>());
export const errorUser = createAction(appActions.errorUser, props<{ error: string }>());
export const cancelLoadUser = createAction(appActions.cancelLoadUser);
