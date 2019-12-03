import 'dotenv/config';
import config from 'config';

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import redis from 'redis';
import connectRedis from 'connect-redis';
import logger from 'morgan';
import history from 'connect-history-api-fallback';
import cors from 'cors';

import mongoose from 'mongoose';

import indexRouter from './routes/index';
import apiRouter from './routes/api';
import authRouter from './routes/auth';

const app = express();

const { url, options } = config.get('mongoDB');
mongoose.connect(url, options);

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
  console.log('Connected to mongod server');
});

if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: 'http://localhost:8080' }));
}
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

let sessionOption = config.get('session');

if (process.env.NODE_ENV === 'production') {
  const { host: redisHost, port: redisPort, pass: redisPass } = config.get('redis');
  const redisClient = redis.createClient(redisPort, redisHost);
  redisClient.auth(redisPass, (err) => {
    if (err) {
      console.log(err);
    }
  });

  const RedisStore = connectRedis(session);

  sessionOption = {
    ...sessionOption,
    store: new RedisStore({
      client: redisClient,
      logErrors: true,
    }),
  };
}

app.use(session(sessionOption));

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/auth', authRouter);

app.use(history());
app.use(express.static(path.join(__dirname, '../public')));

export default app;
