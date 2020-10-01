export interface Contact {
  id?: number,
  firstName?: string,
  lastName?: string,
  type?: string,
  netWorth?: number,
  notes?: Array<number>
}

export interface ContactDictionary {
  [index: number]: Contact;
}
