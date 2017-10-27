'use strict';

//my config - ENV variables
require('./config/config');

// load modules
const express = require('express');
const morgan = require('morgan');
const jsonParser = require('body-parser').json;

//my db connection module
const {mongoose} = require('./db/mongoose');

//load routes
const users = require('./routes/users');
const courses = require('./routes/courses');

var app = express();

// set our port
app.set('port', process.env.PORT || 5000);

//parse data into json format for requests
app.use(jsonParser());

// morgan gives us http request logging
app.use(morgan('dev'));

// setup our static route to serve files from the "public" folder
app.use('/', express.static('public'));

//route middleware
app.use('/api/users', users);
app.use('/api/courses', courses);

// catch 404 and forward to global error handler
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// Express's global error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// start listening on our port
var server = app.listen(app.get('port'), function() {
  console.log('Express server is listening on port ' + server.address().port);
});

//export app for testing
module.exports = {app};
