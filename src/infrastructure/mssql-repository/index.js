const sql = require('mssql');
const Books = require('./books');

module.exports = {
  Books,
  connect: function connect(config) {
    return sql.connect(config);
  },
};
