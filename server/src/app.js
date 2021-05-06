/**
 * src/app.js
 */

'use strict';

const express = require('express');

const cors = require('cors');

module.exports = function (app) {
  // main app configuration
    app.set('port', process.env.PORT || 3000);
    app.use(cors());
    app.use(express.bodyParser());
    app.use(express.logger('dev'));
    app.use(app.router);
};
