const mongoose = require('mongoose');

const { Schema } = mongoose;

const BookSchema = new Schema({
  title: { type: String },
  author: { type: String },
  genre: { type: String },
});

const Books = mongoose.model('Books', BookSchema);

module.exports = {
  findAllBooks(query) {
    return Books.find(query);
  },

  findBookById(bookId) {
    return Books.findOne({ _id: bookId });
  },

  createBook(title, author, genre) {
    return Books.create({
      title,
      author,
      genre,
    });
  },

  findOneAndUpdate(bookId, updateBody) {
    return Books.findOneAndUpdate(
      { _id: bookId },
      updateBody,
      { new: true },
    );
  },

  async findOneAndPatch(bookId, patchBody) {
    const book = await Books.findOne({ _id: bookId });
    const patchedBook = Object.entries(patchBody).reduce((bookModified, keyValuePair) => {
      const param = keyValuePair[0];
      const value = keyValuePair[1];

      if (value) {
        bookModified.set(param, value);
      }
      return bookModified;
    }, book);

    return patchedBook.save();
  },

  deleteOneBookById(bookId) {
    return Books.deleteOne({ _id: bookId });
  },
};
