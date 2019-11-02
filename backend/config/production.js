module.exports = {
  mongoDB: {
    url: process.env.MONGODB_URL,
    options: {
      dbName: process.env.MONGODB_DB_NAME,
      user: process.env.MONGODB_USER_NAME,
      pass: process.env.MONGODB_PASSWORD,
    },
  },
};
