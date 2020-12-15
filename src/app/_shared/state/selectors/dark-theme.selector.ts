import { createSelector } from '@ngrx/store';
import { AppState } from '../../models/app-state';

export const selectDarkTheme = (state: AppState) => state.darkTheme;

export const selectSupportDarkTheme = createSelector(
  selectDarkTheme,
  (darkTheme) => darkTheme?.isSupported
);

export const selectForceDarkTheme = createSelector(
  selectDarkTheme,
  (darkTheme) => darkTheme?.isForced
);
