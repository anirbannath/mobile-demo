import { createReducer, on } from '@ngrx/store';
import { loadUser, setUser, errorUser, cancelLoadUser } from '../../state/actions/user.actions';
import { initialState } from 'src/app/models/app-state';

export const userReducer = createReducer(
  initialState,
  on(loadUser, (state) => ({ ...state, loading: true })),
  on(setUser, (state, { user }) => ({ ...state, loading: false, error: null, data: user })),
  on(errorUser, (state, { error }) => ({ ...state, loading: false, error: error, data: null })),
  on(cancelLoadUser, (state) => ({ ...state, loading: false }))
);
