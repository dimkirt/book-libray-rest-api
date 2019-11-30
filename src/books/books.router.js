const debug = require('debug')('books');
const express = require('express');

function createRouter(booksModel) {
  const bookRouter = express.Router();

  bookRouter.route('/')
    .get(async (req, res) => {
      try {
        const query = {};
        if (req.query.genre) { // This needs sanitization
          query.genre = req.query.genre;
        }

        if (req.query.author) { // This needs sanitization
          query.author = req.query.author;
        }

        const books = await booksModel.findAllBooks(query);
        res.json(books);
      } catch (error) {
        debug(error);
        res.status(500).send('Internal Server Error');
      }
    });

  bookRouter.route('/:id')
    .get(async (req, res) => {
      try {
        const book = await booksModel.findBookById(req.params.id);
        res.json(book);
      } catch (error) {
        res.status(500).send('Internal Server Error');
      }
    });
  return bookRouter;
}

module.exports = {
  createRouter,
};
