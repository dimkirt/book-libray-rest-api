const mongoose = require('mongoose');
const Books = require('./books');

module.exports = {
  Books,
  connect: function connect(config) {
    const options = {
      useNewUrlParser: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
      reconnectInterval: 500, // Reconnect every 500ms
      poolSize: 10, // Maintain up to 10 socket connections
    };
    return mongoose.connect(config.uri, options);
  },
};
