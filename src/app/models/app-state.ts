import { User } from './user';
import { ContactDictionary } from './contact';
import { NoteDictionary } from './note';

export interface AppState {
  user: AppDataState<User>,
  contacts: AppDataState<ContactDictionary>,
  selectedContactId: number,
  notes: AppDataState<NoteDictionary>
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
