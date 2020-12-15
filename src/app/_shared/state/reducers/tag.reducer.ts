import { createReducer, on } from '@ngrx/store';
import { initialState } from '../../models/app-state';
import { Tag, TagDictionary } from '../../models/tag';
import { loadTags, setTags, errorTags, cancelLoadTags } from '../actions/tags.actions';

export const flattenTags = (tags: Array<Tag>): TagDictionary => {
  if (tags?.length > 0) {
    const result: TagDictionary = {};
    tags.forEach(tag => {
      result[tag.id] = tag;
    });
    return result;
  }
}

export const tagsReducer = createReducer(
  initialState,
  on(loadTags, (state) => ({ ...state, loading: true })),
  on(setTags, (state, { tags }) => ({ ...state, loading: false, error: null, data: flattenTags(tags) })),
  on(errorTags, (state, { error }) => ({ ...state, loading: false, error: error, data: null })),
  on(cancelLoadTags, (state) => ({ ...state, loading: false }))
);
