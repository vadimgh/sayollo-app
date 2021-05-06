/*
 * src/controllers/check-authentication.js
 */
'use strict'

const expressJwt = require('express-jwt');

const config = require('../../config/config')[
  process.env.NODE_ENV || 'development'
];

module.exports = expressJwt({
  secret: config.jwtSecret,
  algorithms: ['HS256']
});