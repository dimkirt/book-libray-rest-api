/* eslint-disable global-require */
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const booksModelFactory = require('./books/books.model');
const booksRouterFactory = require('./books/books.router');

function createApp(db) {
  const app = express();

  const booksModel = booksModelFactory.createBooksModel(db);
  const booksRouter = booksRouterFactory.createRouter(booksModel);

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use('/', require('./health/index.routers'));
  app.use('/api/v1/books', booksRouter);
  app.use('/api/v1/authors', require('./authors/authors.router'));

  app.use(morgan('tiny')); // combined gives a lot of information

  return app;
}

module.exports = {
  createApp,
};
