const debug = require('debug')('books');
const express = require('express');

function createRouter(booksModel) {
  const bookRouter = express.Router();

  bookRouter.route('/')
    .get(async (req, res) => {
      try {
        const books = await booksModel.findAllBooks();
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
