/**
 * middleware for securing routes
 *
 */

'use strict';

// require signin middleware (check if request is authorized)
exports.requiresSignin = function (req, res, next) {
  if (!req.isAuthenticated()) {
    return res.send(401, {
      success: false,
      message: 'requires authentication'
    });
  }
  next();
};
