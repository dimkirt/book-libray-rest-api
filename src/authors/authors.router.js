const debug = require('debug')('authors');
const express = require('express');

const authorRouter = express.Router();

authorRouter.route('/')
  .get((req, res) => {
    try {
      res.json({ success: true });
    } catch (error) {
      debug(error);
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = authorRouter;
