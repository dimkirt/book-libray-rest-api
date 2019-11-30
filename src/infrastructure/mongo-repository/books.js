const mongoose = require('mongoose');

const { Schema } = mongoose;

const BookSchema = new Schema({
  title: { type: String },
  author: { type: String },
  genre: { type: String },
});

const Books = mongoose.model('Books', BookSchema);

module.exports = {
  findAllBooks() {
    return Books.find({});
  },

  findBookById(bookId) {
    return Books.find({ _id: bookId });
  },
};
