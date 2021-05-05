'use strict'

const fetch = require('node-fetch');

const config = require('../../config/config')[
  process.env.NODE_ENV || 'development'
];

module.exports = () =>
  fetch(`${config.externalApiUrl}${config.externalApiUserTransaction}`, {
    method: 'get',
  })
    .then(res => res.text())
    .then(res => JSON.parse(res.replace(/[']/g, '"')));
