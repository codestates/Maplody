require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const cookieParser = require('cookie-parser');
const userRouter = require('./router/userRouter');
const postRouter = require('./router/postRouter');

const { sequelize } = require('./models');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const HTTPS_PORT = process.env.HTTPS_PORT || 4000;

sequelize.sync();

app.use(
  cors({
    origin: [
      'https://localhost:3000',
      'http://localhost:3000',
      'http://maplody.site/*',
      'https://www.maplody.site/*',
      'https://maplody.site/*',
      `${process.env.CLOUDFRONT_ENDPOINT}`,
      `${process.env.S3_ENDPOINT}`,
    ],
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'authorization'],
  }),
);

app.use(cookieParser());
app.use('/post', postRouter);
app.use('/', userRouter);

let server;

console.log(`server running at ${HTTPS_PORT}`);
server = app.listen(HTTPS_PORT);

module.exports = server;
