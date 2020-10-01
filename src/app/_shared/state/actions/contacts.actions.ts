import { createAction, props } from '@ngrx/store';
import { appActions } from '../app-actions';
import { Contact } from '../../models/contact';

export const loadContacts = createAction(appActions.loadContacts);
export const setContacts = createAction(appActions.setContacts, props<{ contacts: Array<Contact> }>());
export const errorContacts = createAction(appActions.errorContacts, props<{ error: string }>());
export const cancelLoadContacts = createAction(appActions.cancelLoadContacts);

export const setSelectedContact = createAction(appActions.setSelectedContact, props<{ id: number }>());

export const selectContact = createAction(appActions.selectContact, props<{ search: any }>());
