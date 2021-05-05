/*
 * src/controllers/user.js
 */

'use strict';

const fs = require('fs');
const path = require('path');

const getTransactions = require('../util/get-transactions');

// getting transaction data
// from external api
const getData = async (req, res) => {
  try {
    const resGetTransactions = await getTransactions();

    if (resGetTransactions.error_code)
      return res.send(500, {
        success: false,
        message: 'Error fetching transactions',
      });

    res.send(200, {
      success: true,
      message: 'Transactions fetched',
      data: {
        ...{ transactions: resGetTransactions.transactions },
        ...{ user: resGetTransactions.user },
      },
    });
  } catch (err) {
    res.send(500, { success: false, message: 'Error fetching transactions' });
  }
};

const postCancelTransaction = async (req, res) => {
  try {
    const filePath = path.join(
      __dirname,
      '..',
      '..',
      'storage',
      'canceled-transactions.log'
    );
    const data = `[${new Date().toISOString()}] Canceled transaction: price ${
      req.body && req.body.price
    }, Product Name - ${
      req.body && req.body.product && req.body.product.productName
    } \r\n`;
    await fs.promises.writeFile(filePath, data, { encoding: 'utf8', flag: 'a+' });

    res.send(200, {
      success: true,
      message: 'Transaction canceled',
    });
  } catch (err) {
    res.send(500, { success: false, message: 'Error canceling transaction' });
  }
};

exports.getData = getData;
exports.postCancelTransaction = postCancelTransaction;
