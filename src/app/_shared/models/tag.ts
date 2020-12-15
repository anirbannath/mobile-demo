export interface Tag {
  id?: number,
  name?: string,
  keywords?: Array<string>
}

export interface TagDictionary {
  [index: number]: Tag;
}
