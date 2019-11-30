const mongoose = require('mongoose');
const Books = require('./books');

module.exports = {
  Books,
  connect: function connect(config) {
    return mongoose.connect(config.uri);
  },
};
