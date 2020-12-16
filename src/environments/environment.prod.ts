export const environment = {
  production: true,
  dbName: 'mobileDemo',
  dbVersion: 1,
  dataDelay: 2500,
  deployBaseUrl: undefined,
  dbDataSource: {
    notes: '/mobile-demo/data/notes.json'
  },
  dataSource: {
    user: '/mobile-demo/data/user.json',
    tags: '/mobile-demo/data/system-tags.json',
    contacts: '/mobile-demo/data/contacts.json'
  },
  instructionResolver: '/api/resolve-instruction'
};
