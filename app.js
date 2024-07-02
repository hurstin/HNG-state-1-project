const express = require('express');
const morgan = require('morgan');
const router = require('./route');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use((req, res, next) => {
  res.send('hello from the server side');
  console.log('hello from the middleware');
  next();
});

app.use('/api/hello', router);

module.exports = app;
