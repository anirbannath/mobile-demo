export const environment = {
  production: true,
  dbName: 'mobileDemo',
  dbVersion: 1,
  dataDelay: 2500,
  deployBaseUrl: undefined,
  dbDataSource: {
    notes: '/data/notes.json'
  },
  dataSource: {
    user: '/data/user.json',
    tags: '/data/system-tags.json',
    contacts: '/data/contacts.json'
  },
  instructionResolver: '/api/resolve-instruction'
};
