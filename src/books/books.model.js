function createBooksModel(db) {
  return {
    findAllBooks: () => db.Books.findAllBooks(),
    findBookById: (bookId) => db.Books.findBookById(bookId),
  };
}

module.exports = {
  createBooksModel,
};
