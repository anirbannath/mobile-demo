import { ActionReducerMap } from '@ngrx/store';
import { userReducer } from './user.reducer';
import { AppState } from '../../models/app-state';
import { contactsReducer, selectedContactIdReducer } from './contacts.reducer';
import { notesReducer } from './notes.reducer';
import { voiceAssistantReducer } from './voice-assistant.reducer';

export const reducers: ActionReducerMap<AppState> = {
  user: userReducer,
  contacts: contactsReducer,
  selectedContactId: selectedContactIdReducer,
  notes: notesReducer,
  voiceAssistant: voiceAssistantReducer
};
