/**
 * src/app.js
 */

'use strict';

const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

module.exports = function (app, config, passport) {
  // main app configuration
  app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.logger('dev'));
    app.use(express.methodOverride());

    // setup for cookie based session
    app.use(express.cookieParser());
    app.use(
      express.cookieSession({
        secret: 'thisisthefirstclasssecret',
      })
    );

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
  });
};
