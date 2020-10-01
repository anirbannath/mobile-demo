import { createReducer, on } from '@ngrx/store';
import { initialState } from '../../models/app-state';
import { Contact, ContactDictionary } from '../../models/contact';
import { loadContacts, setContacts, errorContacts, cancelLoadContacts, setSelectedContact } from '../actions/contacts.actions';

export const flatenContacts = (contacts: Array<Contact>): ContactDictionary => {
  if (contacts && contacts.length > 0) {
    const result: ContactDictionary = {};
    contacts.forEach(contact => {
      result[contact.id] = contact;
    });
    return result;
  }
}

export const contactsReducer = createReducer(
  initialState,
  on(loadContacts, (state) => ({ ...state, loading: true })),
  on(setContacts, (state, { contacts }) => ({ ...state, loading: false, error: null, data: flatenContacts(contacts) })),
  on(errorContacts, (state, { error }) => ({ ...state, loading: false, error: error, data: null })),
  on(cancelLoadContacts, (state) => ({ ...state, loading: false }))
);

export const selectedContactIdReducer = createReducer(
  0,
  on(setSelectedContact, (state, { id }) => id)
);
