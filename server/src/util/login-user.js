'use strict'

const fetch = require('node-fetch');

const config = require('../../config/config')[
  process.env.NODE_ENV || 'development'
];

module.exports = userPayload =>
  fetch(`${config.externalApiUrl}${config.externalApiLoginUserPath}`, {
    method: 'post',
    body: JSON.stringify(userPayload),
  })
    .then(res => res.text())
    .then(res => JSON.parse(res.replace(/[']/g, '"')));
