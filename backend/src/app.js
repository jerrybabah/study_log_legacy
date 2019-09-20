import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import logger from 'morgan';
import history from 'connect-history-api-fallback';
import config from 'config';

import indexRouter from './routes/index';
import apiRouter from './routes/api';
import authRouter from './routes/auth';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session(config.get('session')));

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/auth', authRouter);

app.use(history());
app.use(express.static(path.join(__dirname, '../public')));

export default app;
