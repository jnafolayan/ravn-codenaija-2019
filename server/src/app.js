import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import logger from './utils/logger';
import mongoose from 'mongoose';
require('mongoose-type-url');
import cors from 'cors';

import indexRouter from './routes';
import reportsRouter from './routes/reports';
import feedsRouter from './routes/feeds';

import {config} from "dotenv";
import reportModel from "./models/report";
import  feedModel from "./models/feeds";
import socket from "socket.io";

config();
require('rootpath')();

const app = express();
const bodyParser = require('body-parser');
const jwt = require('src/_helpers/jwt');
const errorHandler = require('src/_helpers/errorHandler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use JWT auth to secure the api
// app.use(jwt());

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_DATABASE,
    MONGO_HOST,
    MONGO_PORT,
} = process.env;
const MONGO_URL =  process.env.ENV === 'dev' ? `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}?authMechanism=DEFAULT&authSource=admin` : process.env.URI;
mongoose.connect(MONGO_URL, { useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });

const db = mongoose.connection;
db.on('error', (err) => {
    logger.error(
        'Error occurred whilst initializing database connection' + err.message
    );
});
db.once('open', () => {
    // we"re connected!
    logger.info('Database connection was initiated successfully');
});


const {model, Schema, SchemaTypes} = mongoose;
const reportsModel = reportModel({Schema, Url: SchemaTypes.Url, model});
const feedsModel = feedModel({Schema, Url: SchemaTypes.Url, model});


// api routes
app.use('/api/v1/reports', reportsRouter(express.Router(), reportsModel));
app.use('/api/v1/feeds', feedsRouter(express.Router(), feedsModel));
app.use('/', indexRouter(express.Router()));
app.use('/api/v1/users', require('./Users/users.controller'));

// global error handler
app.use(errorHandler);





export  {app, socket};
