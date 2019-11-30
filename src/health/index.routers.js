const express = require('express');

const indexRouter = express.Router();

indexRouter.route('/')
  .get(async (req, res) => {
    res.send('Up and running');
  });

module.exports = indexRouter;
