/**
 * src/passport.js
 * passport configuration file
 */

'use strict';

const LocalStrategy = require('passport-local').Strategy;

const loginUser = require('./util/login-user');

module.exports = function (passport, config) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // deseriallize user
  passport.deserializeUser(function(id, done) {
    done(null, {
      id: config.userId,
      username: config.username
    })
  });

  // local strategy
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
      },
      async (username, password, done) => {
        try {
          // for testing (basic checking)
          if (username !== config.username || password !== config.password)
            return done({ message: 'User not found' });

          const loginRes = await loginUser({
            Username: username,
            Password: password,
          });

          if (loginRes.code !== 200) return done({ message: 'User not found' });

          return done(null, {
            id: config.userId,
            username,
          });
        } catch (err) {
          return done({ message: 'User not found' });
        }
      }
    )
  );
};
