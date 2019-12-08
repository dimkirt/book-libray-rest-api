const mongoose = require('mongoose');

const { Schema } = mongoose;

const BookSchema = new Schema({
  title: { type: String },
  author: { type: String },
  genre: { type: String },
});

const Books = mongoose.model('Books', BookSchema);

function removeDocumentVersion(doc) {
  if ('__v' in doc) {
    // eslint-disable-next-line no-param-reassign
    doc.__v = undefined;
  }
  return doc;
}

module.exports = {
  findAllBooks(query) {
    return Books.find(query)
      .then((res) => res.map((el) => el.toObject()))
      .then((res) => res.map(removeDocumentVersion));
  },

  findBookById(bookId) {
    return Books.findOne({ _id: bookId })
      .then((res) => res.toObject())
      .then(removeDocumentVersion);
  },

  createBook(title, author, genre) {
    return Books.create({
      title,
      author,
      genre,
    })
      .then((res) => res.toObject())
      .then(removeDocumentVersion);
  },

  findOneAndUpdate(bookId, updateBody) {
    return Books.findOneAndUpdate(
      { _id: bookId },
      updateBody,
      { new: true },
    )
      .then((res) => res.toObject())
      .then(removeDocumentVersion);
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

    return patchedBook
      .save()
      .then((res) => res.toObject())
      .then(removeDocumentVersion);
  },

  deleteOneBookById(bookId) {
    return Books.deleteOne({ _id: bookId });
  },
};
