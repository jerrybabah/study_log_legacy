if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

module.exports = {
  session: {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  },
  evernote: {
    temporaryToken: {
      consumerKey: process.env.API_CONSUMER_KEY,
      consumerSecret: process.env.API_CONSUMER_SECRET,
      sandbox: true,
      china: false,
    },
    callback: 'http://localhost:3000/auth/callback',
  },
};
