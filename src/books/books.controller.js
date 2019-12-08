const _ = require('lodash');
const debug = require('debug')('books');

function BooksController(booksModel) {
  function createSelfLinkOnBook(host, book) {
    return _.set(book, 'links.self', `http://${host}/api/v1/books/${book._id}`);
  }

  function createGenreFilterLinkOnBook(host, book) {
    return _.set(book, 'links.filterByThisGenre', `http://${host}/api/v1/books/?genre=${encodeURIComponent(book.genre)}`);
  }

  async function getBooks(req, res) {
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
      res.json({ books: booksDto });
    } catch (error) {
      debug(error);
      res.status(500).send('Internal Server Error');
    }
  }

  async function getBookById(req, res) {
    try {
      const book = await booksModel.findBookById(req.params.id);
      const bookDto = createGenreFilterLinkOnBook(req.headers.host, book);
      res.json({ book: bookDto });
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  }

  async function postBook(req, res) {
    try {
      const book = await booksModel.createBook(req.body.title, req.body.author, req.body.genre);
      const bookDto = createSelfLinkOnBook(req.headers.host, book);
      res.status(201).json({ book: bookDto });
    } catch (error) {
      debug(error);
      res.status(500).send('Internal Server Error');
    }
  }

  async function putBook(req, res) {
    try {
      const updateParams = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
      };

      const book = await booksModel.findOneAndUpdate(req.params.id, updateParams);
      const bookDto = createSelfLinkOnBook(req.headers.host, book);
      res.status(200).json({ book: bookDto });
    } catch (error) {
      debug(error);
      res.status(500).send('Internal Server Error');
    }
  }

  async function patchBook(req, res) {
    try {
      const patchParams = {
        title: req.body.title || null,
        author: req.body.author || null,
        genre: req.body.genre || null,
      };

      const book = await booksModel.findOneAndPatch(req.params.id, patchParams);
      const bookDto = createSelfLinkOnBook(req.headers.host, book);
      res.status(200).json({ book: bookDto });
    } catch (error) {
      debug(error);
      res.status(500).send('Internal Server Error');
    }
  }

  async function deleteBook(req, res) {
    try {
      await booksModel.deleteOneBookById(req.params.id);
      res.status(204).json();
    } catch (error) {
      debug(error);
      res.status(500).send('Internal Server Error');
    }
  }

  return {
    getBooks,
    getBookById,
    postBook,
    putBook,
    patchBook,
    deleteBook,
  };
}

module.exports = BooksController;
