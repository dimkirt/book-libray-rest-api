const sql = require('mssql');

module.exports = {
  async findAllBooks() {
    const dbReq = new sql.Request();
    const books = await dbReq.query('select * from books');
    return books.recordset;
  },

  async findBookById(bookId) {
    const dbReq = new sql.Request();
    const book = await dbReq
      .input('id', sql.Int, bookId)
      .query('select * from books where id = @id');
    return book.recordset[0];
  },
};
