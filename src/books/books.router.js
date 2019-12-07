const debug = require('debug')('books');
const express = require('express');
const _ = require('lodash');

function createSelfLinkOnBook(host, book) {
  return _.set(book.toJSON(), 'links.self', `http://${host}/api/v1/books/${book._id}`);
}

function createGenreFilterLinkOnBook(host, book) {
  return _.set(book.toJSON(), 'links.filterByThisGenre', `http://${host}/api/v1/books/?genre=${encodeURIComponent(book.genre)}`);
}

function createRouter(booksModel) {
  const bookRouter = express.Router();

  bookRouter.route('/').get(async (req, res) => {
    try {
      const query = {};
      if (req.query.genre) { // This needs sanitization
        query.genre = req.query.genre;
      }

      if (req.query.author) { // This needs sanitization
        query.author = req.query.author;
      }

      const books = await booksModel.findAllBooks(query);
      const booksDto = books.map((book) => createSelfLinkOnBook(req.headers.host, book));
      res.json(booksDto);
    } catch (error) {
      debug(error);
      res.status(500).send('Internal Server Error');
    }
  });

  bookRouter.route('/:id').get(async (req, res) => {
    try {
      const book = await booksModel.findBookById(req.params.id);
      const bookDto = createGenreFilterLinkOnBook(req.headers.host, book);
      res.json(bookDto);
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  });

  bookRouter.route('/').post(async (req, res) => {
    try {
      const book = await booksModel.createBook(req.body.title, req.body.author, req.body.genre);
      res.status(201).json(book);
    } catch (error) {
      debug(error);
      res.status(500).send('Internal Server Error');
    }
  });

  bookRouter.route('/:id').put(async (req, res) => {
    try {
      const updateParams = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
      };

      const book = await booksModel.findOneAndUpdate(req.params.id, updateParams);
      res.status(200).json(book);
    } catch (error) {
      debug(error);
      res.status(500).send('Internal Server Error');
    }
  });

  bookRouter.route('/:id').patch(async (req, res) => {
    try {
      const patchParams = {
        title: req.body.title || null,
        author: req.body.author || null,
        genre: req.body.genre || null,
      };

      const book = await booksModel.findOneAndPatch(req.params.id, patchParams);
      res.status(200).json(book);
    } catch (error) {
      debug(error);
      res.status(500).send('Internal Server Error');
    }
  });

  bookRouter.route('/:id').delete(async (req, res) => {
    try {
      await booksModel.deleteOneBookById(req.params.id);
      res.status(204).json();
    } catch (error) {
      debug(error);
      res.status(500).send('Internal Server Error');
    }
  });

  return bookRouter;
}

module.exports = {
  createRouter,
};
