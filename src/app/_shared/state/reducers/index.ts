import { ActionReducerMap } from '@ngrx/store';
import { userReducer } from './user.reducer';
import { AppState } from '../../models/app-state';
import { contactsReducer, selectedContactIdReducer } from './contacts.reducer';
import { notesReducer } from './notes.reducer';
import { voiceAssistantReducer } from './voice-assistant.reducer';
import { darkThemeReducer } from './dark-theme.reducer';
import { tagsReducer } from './tag.reducer';

export const reducers: ActionReducerMap<AppState> = {
  user: userReducer,
  tags: tagsReducer,
  contacts: contactsReducer,
  selectedContactId: selectedContactIdReducer,
  notes: notesReducer,
  voiceAssistant: voiceAssistantReducer,
  darkTheme: darkThemeReducer,
};
