const express = require('express');
const mongoose = require('mongoose');

const indexRouter = express.Router();

indexRouter.route('/health')
  .get(async (req, res) => {
    const mongoStates = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting',
    };

    res.status(200).json(
      {
        uptime: process.uptime(),
        mongo: mongoStates[mongoose.connection.readyState],
      },
    );
  });

module.exports = indexRouter;
