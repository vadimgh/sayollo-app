/**
 * configuration file
 *
 */

'use strict';

module.exports = {
  development: {
    externalApiUrl: 'https://6u3td6zfza.execute-api.us-east-2.amazonaws.com',
    externalApiLoginUserPath: '/prod/user/login',
    externalApiUserTransaction: '/prod/user/transactions',
    username: 'test1',
    password: 'test1pass',
    jwtSecret: 'secret'
  },
  test: {},
  production: {
    externalApiUrl: 'https://6u3td6zfza.execute-api.us-east-2.amazonaws.com',
    externalApiLoginUserPath: '/prod/user/login',
    externalApiUserTransaction: '/prod/user/transactions',
    username: 'test1',
    password: 'test1pass',
    jwtSecret: 'secret'
  },
};
