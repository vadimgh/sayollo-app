const http = require('http');
const express = require('express');
var passport = require('passport');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
const app = express();
const server = http.createServer(app);

// passport config (local strategy, serializing, deserializing)
require('./src/passport')(passport, config);

// express app config
require('./src/app')(app, config, passport);

// routes
require('./src/routes')(app);

// start server
server.listen(app.get('port'), function () {
  console.log(
      ' server listening on port ' +
      app.get('port') +
      ' for ' +
      env
  );
});
