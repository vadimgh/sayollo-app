/**
 * src/app.js
 */

'use strict';

const express = require('express');

module.exports = function (app, config, passport) {
  // main app configuration
  app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
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
