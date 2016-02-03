// Require NPM Package Dependencies
var mongoose = require('mongoose');

// Set the server environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';


var config = require('./config/config'),
    // mongoose = require('./config/mongoose'),
    express = require('./config/express'),
    passport = require('./config/passport');

var app = express(),
    passport = passport();

// Connect the Mongo Database
mongoose.connect(config.db);

app.listen(config.port);

module.exports = app;
console.log(process.env.NODE_ENV + ' server on port', config.port);
