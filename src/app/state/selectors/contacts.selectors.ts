import { AppState } from '../../models/app-state';
import { createSelector } from '@ngrx/store';

export const selectContacts = (state: AppState) => state.contacts;

export const selectContactsLoading = createSelector(
  selectContacts,
  (contacts) => contacts.loading
);

export const selectContactsData = createSelector(
  selectContacts,
  (contacts) => contacts.data
);

export const selectContactsList = createSelector(
  selectContactsData,
  (contactDictonary) => {
    const list = [];
    if (contactDictonary) {
      Object.keys(contactDictonary).forEach(key => {
        list.push(contactDictonary[key]);
      });
    }
    return list;
  }
);

export const selectContactsError = createSelector(
  selectContacts,
  (contacts) => contacts.error
);

export const selectSelectedContactId = (state: AppState) => state.selectedContactId;

export const selectIndividualContactData = createSelector(
  selectContactsData,
  selectSelectedContactId,
  (contactsDictionary, id) => contactsDictionary && id ? contactsDictionary[id] : null
);
