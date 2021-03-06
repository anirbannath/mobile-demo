import { User } from './user';
import { ContactDictionary } from './contact';
import { NoteDictionary } from './note';
import { SpeechAssistantMeta } from './voice-assistant';
import { DarkTheme } from './dark-theme';
import { TagDictionary } from './tag';

export interface AppState {
  user: AppDataState<User>,
  contacts: AppDataState<ContactDictionary>,
  selectedContactId: number,
  notes: AppDataState<NoteDictionary>,
  tags: AppDataState<TagDictionary>,
  voiceAssistant: AppDataState<SpeechAssistantMeta>,
  darkTheme: DarkTheme,
};

export interface AppDataState<T> {
  data: T,
  loading: boolean,
  error: string
};

export const initialState: AppDataState<any> = {
  data: null,
  loading: false,
  error: null
};
