const express = require('express');
const booksControllerFactory = require('./books.controller');

function createRouter(booksModel) {
  const bookRouter = express.Router();
  const booksController = booksControllerFactory(booksModel);

  bookRouter.route('/').get(booksController.getBooks);
  bookRouter.route('/:id').get(booksController.getBookById);
  bookRouter.route('/').post(booksController.postBook);
  bookRouter.route('/:id').put(booksController.putBook);
  bookRouter.route('/:id').patch(booksController.patchBook);
  bookRouter.route('/:id').delete(booksController.deleteBook);
  return bookRouter;
}

module.exports = {
  createRouter,
};
