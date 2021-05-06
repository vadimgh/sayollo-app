/*
 * src/controllers/auth.js
 */

'use strict';

const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const config = require('../../config/config')[
  process.env.NODE_ENV || 'development'
];
const loginUser = require('../util/login-user');


const signin = async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    // for testing (basic checking)
    if (username !== config.username || password !== config.password)
      return res.send(401, { success: false, message: 'Wrong credentials' });

    const loginRes = await loginUser({
      Username: username,
      Password: password,
    });

    if (loginRes.code !== 200)
      return res.send(401, { success: false, message: 'Wrong credentials' });

    const jwtBearerToken = jwt.sign(
      {
        userId: crypto.randomBytes(20).toString('hex'),
      },
      config.jwtSecret,
      { expiresIn: 3600 }
    );

    res.send(200, {
      success: true,
      message: 'Authenticated',
      data: { jwtBearerToken, expiresIn: 3600 },
    });
  } catch (err) {
    res.send(401, { success: false, message: 'Wrong credentials' });
  }
};

exports.signin = signin;
