/*
 * src/controllers/user.js
 */

'use strict';

const getTransactions = require('../resource/get-transactions');

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
      data: { ...resGetTransactions.transactions, ...resGetTransactions.user },
    });
  } catch (err) {
    res.send(500, { success: false, message: 'Error fetching transactions' });
  }
};

exports.getData = getData;
