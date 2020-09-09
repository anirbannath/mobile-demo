export const environment = {
  production: true,
  dbName: 'mobileDemo',
  dbVersion: 1,
  dataDelay: 2500,
  dbDataSource: {
    notes: '/mobile-demo/data/notes.json'
  },
  dataSource: {
    user: '/mobile-demo/data/user.json',
    contacts: '/mobile-demo/data/contacts.json'
  },
  voiceNavigatorUrl: 'http://localhost:5000/'
};
