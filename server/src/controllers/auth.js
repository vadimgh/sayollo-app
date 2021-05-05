
/*
* src/controllers/auth.js
*/

'use strict'

const passport = require('passport');

const signin = (req, res, next) => {
  passport.authenticate('local', function (err, user, info) {
    if (err) { return res.send(401, { success: false, message: err.message }) }
    if (!user) {
      return res.send(401, { success: false, message: info.message });
    }
    // if user logged in
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.send(user);
    });
  })(req, res, next);
}

exports.signin = signin;