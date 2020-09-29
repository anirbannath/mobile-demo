export const environment = {
  production: true,
  dbName: 'mobileDemo',
  dbVersion: 1,
  dataDelay: 2500,
  dbDataSource: {
    notes: '/data/notes.json'
  },
  dataSource: {
    user: '/data/user.json',
    contacts: '/data/contacts.json'
  },
  instructionResolver: '/api/resolve-instruction'
};
