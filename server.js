process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config/config'),
    mongoose = require('./config/mongoose'),
    express = require('./config/express');

var db = mongoose();
var app = express();

app.listen(config.port);

module.exports = app;
console.log(process.env.NODE_ENV + ' server on port', config.port);
