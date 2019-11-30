// Fake db
const books = [
  {
    id: '1',
    title: 'Flow',
    author: 'Mihaly Csikszentmihalyi',
    genre: null,
  },
  {
    id: '2',
    title: 'Zero to One',
    author: 'Peter Thiel',
    genre: 'Business',
  },
  {
    id: '3',
    title: 'Outliers',
    author: 'Malcolm Gladwell',
    genre: null,
  },
  {
    id: '4',
    title: 'The 7 Habits of Highly Effective People',
    author: 'Stephen Covey',
    genre: null,
  },
  {
    id: '5',
    title: 'The Power of Habit',
    author: 'Charles Duhigg',
    genre: null,
  },
];

module.exports = {
  findAllBooks(query) {
    const queryParams = Object.keys(query);
    const filteredBooks = queryParams.reduce(
      (booksAcc, filterParam) => booksAcc.filter(
        (book) => book[filterParam] === query[filterParam],
      ),
      books,
    );
    return Promise.resolve(filteredBooks);
  },

  findBookById(bookId) {
    return books.find((book) => book.id === bookId);
  },
};
