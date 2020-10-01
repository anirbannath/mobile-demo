import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { DarkTheme } from '../../models/dark-theme';
import { setForceDarkTheme, setSupportDarkTheme } from '../actions/dark-theme.actions';

const initialState: DarkTheme = {
  isSupported: false,
  isForced: false
}

export const darkThemeReducer = createReducer(
  initialState,
  on(setSupportDarkTheme, (state, { support }) => ({ ...state, isSupported: support })),
  on(setForceDarkTheme, (state, { force }) => ({ ...state, isForced: force })),
);
