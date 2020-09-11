import { createAction, props } from '@ngrx/store';
import { appActions } from '../../app-actions';

export const setForceDarkTheme = createAction(appActions.setForceDarkTheme, props<{ force: boolean }>());
export const setSupportDarkTheme = createAction(appActions.setSupportDarkTheme, props<{ support: boolean }>());
