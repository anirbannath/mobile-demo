import { createAction, props } from '@ngrx/store';
import { Tag } from '../../models/tag';
import { appActions } from '../app-actions';

export const loadTags = createAction(appActions.loadTags);
export const setTags = createAction(appActions.setTags, props<{ tags: Array<Tag> }>());
export const errorTags = createAction(appActions.errorTags, props<{ error: string }>());
export const cancelLoadTags = createAction(appActions.cancelLoadTags);
