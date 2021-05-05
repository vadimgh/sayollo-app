
/**
 * app/routes.js
 */

'use strict';

const authCtrl = require('./controllers/auth');
const transactionsCtrl = require('./controllers/transactions');

module.exports = function (app) {

  app.post('/api/user/signin', authCtrl.signin);

  app.get('/api/user/transaction/get-all', transactionsCtrl.getData);

  app.post('/api/user/transaction/cancel-one', transactionsCtrl.postCancelTransaction);

  // not found
  app.all('/*', function (req, res) { res.send(404, { success: false, message: 'Not found' }) });
};