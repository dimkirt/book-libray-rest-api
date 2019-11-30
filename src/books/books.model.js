function createBooksModel(db) {
  return {
    findAllBooks: (query) => db.Books.findAllBooks(query),
    findBookById: (bookId) => db.Books.findBookById(bookId),
  };
}

module.exports = {
  createBooksModel,
};
