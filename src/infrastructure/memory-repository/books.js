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
    genre: null,
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
  findAllBooks() {
    return Promise.resolve(books);
  },

  findBookById(bookId) {
    return books.find((book) => book.id === bookId);
  },
};
