// Base Setup
// ==============================

// Set the server environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Require NPM Package Dependencies
var mongoose = require('mongoose'),
    express = require('express'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    flash = require('connect-flash'),
    session = require('express-session'),
    morgan = require('morgan');

var config = require('./config/config');

var app = express();

// Passport Config
require('./config/passport.js')(passport);


// Configuration
// ==============================

mongoose.connect(config.db);

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

app.use(express.static('./public'));

// Server Routes
// ==============================
app.get('/', function(req, res) {
  res.render('index',
    {
      title: 'ToDo App',
      user: JSON.stringify(req.user)
    }
  );
});

require('./app/routes/users.server.routes.js')(app);
require('./app/routes/todos.server.routes.js')(app);

// Catchall Route for Angular
app.use('/*', function(req, res) {
  res.render('index', {
    title: 'ToDo App',
    user: JSON.stringify(req.user)
  });
});

// Start the server
// ==============================
app.listen(config.port);

console.log(process.env.NODE_ENV + ' server on port', config.port);
