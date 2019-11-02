module.exports = {
  session: {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  },
  evernote: {
    consumerKey: process.env.API_CONSUMER_KEY,
    consumerSecret: process.env.API_CONSUMER_SECRET,
    sandbox: false,
    china: false,
    callbackPath: 'auth/callback',
    notebookName: '공부',
    notesNum: 100,
    specOption: {
      includeTitle: true,
      includeCreated: true,
      includeUpdated: true,
      includeTagGuids: true,
    },
  },
  mongoDB: {
    url: process.env.MONGODB_URL,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};
