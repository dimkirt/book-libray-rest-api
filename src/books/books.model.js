function createBooksModel(db) {
  return {
    findAllBooks: (query) => db.Books.findAllBooks(query),
    findBookById: (bookId) => db.Books.findBookById(bookId),
    createBook: (title, author, genre) => db.Books.createBook(title, author, genre),
    findOneAndUpdate: (bookId, updateBody) => db.Books.findOneAndUpdate(bookId, updateBody),
    findOneAndPatch: (bookId, patchBody) => db.Books.findOneAndPatch(bookId, patchBody),
    deleteOneBookById: (bookId) => db.Books.deleteOneBookById(bookId),
  };
}

module.exports = {
  createBooksModel,
};
