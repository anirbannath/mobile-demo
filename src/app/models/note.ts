export interface Note {
  id?: number,
  title?: string,
  description?: string,
  occurredOn?: Date,
  contactId?: number
}

export interface NoteDictionary {
  [index: number]: Note;
}
