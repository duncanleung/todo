// Required in server.js

var config = require('./config'),
    express = require('express'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    flash = require('connect-flash'),
    session = require('express-session'),
    morgan = require('morgan');

module.exports = function() {
  var app = express();

  app.use(morgan('dev'));
  
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: 'orangecountcodeschoolallcodeallday'
  }));

  app.set('views', './app/views');
  app.set('view engine', 'ejs');

  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());

  // Routes
  app.use(express.static('./public'));

  require('../app/routes/index.server.routes.js')(app);
  require('../app/routes/users.server.routes.js')(app);
  require('../app/routes/todos.server.routes.js')(app);

  app.use('/*', function(req, res) {
    res.render('index', {
      title: 'ToDo App',
      user: JSON.stringify(req.user)
    });
  });

  return app;
};