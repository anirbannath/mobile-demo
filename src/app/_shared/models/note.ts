import { Tag } from "./tag";

export interface Note {
  id?: number,
  title?: string,
  description?: string,
  occurredOn?: Date,
  contactId?: number,
  tags?: Array<number>,
  meeting?: Date
}

export interface NoteDictionary {
  [index: number]: Note;
}
