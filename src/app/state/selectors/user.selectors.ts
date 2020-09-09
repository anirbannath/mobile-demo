import { AppState } from '../../models/app-state';
import { createSelector } from '@ngrx/store';

export const selectUser = (state: AppState) => state.user;

export const selectUserLoading = createSelector(
  selectUser,
  (user) => user.loading
);

export const selectUserData = createSelector(
  selectUser,
  (user) => user.data
);

export const selectUserError = createSelector(
  selectUser,
  (user) => user.error
);
