import { createSelector } from '@ngrx/store';
import { AppState } from '../../models/app-state';
import { Tag } from '../../models/tag';

export const selectTags = (state: AppState) => state.tags;

export const selectTagsLoading = createSelector(
  selectTags,
  (tags) => tags?.loading
);

export const selectTagsData = createSelector(
  selectTags,
  (tags) => tags?.data
);

export const selectTagsError = createSelector(
  selectTags,
  (tags) => tags?.error
);

export const selectTagsList = createSelector(
  selectTagsData,
  (tagDictionary) => {
    const list: Array<Tag> = [];
    if (tagDictionary) {
      Object.keys(tagDictionary).forEach(key => {
        list.push(tagDictionary[key]);
      });
    }
    return list;
  }
);
