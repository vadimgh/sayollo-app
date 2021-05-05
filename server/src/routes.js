
/**
 * app/routes.js
 */

'use strict';

const auth = require('./middlewares/authorization');
const authCtrl = require('./controllers/auth');
const transactionsCtrl = require('./controllers/transactions');

module.exports = function (app) {

  // secured restful api routes
  app.get('/api/transactions',transactionsCtrl.getData);

  app.post('/api/user/signin', authCtrl.signin);

  // serve index.html for all other route
  app.all('/*', function (req, res) { res.send(404, { success: false, message: 'Not found' }) });
};