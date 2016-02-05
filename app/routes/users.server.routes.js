// Required in /app/config/express.js

var User = require('../../app/models/user.server.model.js'),
    passport = require('passport');

var getErrorMessage = function(err) {
  var message = '';
  if(err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = 'Username already exists';
        break;
      default:
        message = 'Something went wrong: ' + err;
    }
  }
  else {
    for (var errName in err.errors) {
      if (err.errors[errName].message)
        message = err.errors[errName].message;
    }
  }

  return message;
};


module.exports = function(app) {
  // /signup
  // ==============================
  app.route('/signup')
    // If user is not logged in then show Signup
    .get(function(req, res, next) {
          if(!req.user) {
            res.render('signup', {
              title: 'Signup for ToDo',
              messages: req.flash('error')
            });
          }
          else {
            // Otherwise redirect to '/todos' (Angular app)
            return res.redirect('/todos');
          }
    })
    // Create new user on POST /signup
    .post(function(req, res, next) {
          if(!req.user) {
            var user = new User(req.body);
            var message = null;
            user.provider = 'local';
            user.save(function(err) {
              if (err) {
                var message = getErrorMessage(err);
                req.flash('error', message);
                return res.redirect('/signup');
              }

              // Passport Login
              req.login(user, function(err) {
                if (err) {
                  return next(err);
                }
                return res.redirect('/todos');
              });
            });
          }
          else {
            return res.redirect('/todos');
          }
    });

  // /login
  // ==============================
  app.route('/login')
    // If user is not logged in then show Login
    .get(function(req, res, next) {
          if(!req.user) {
            res.render('login', {
              title: 'ToDo Login',
              messages: req.flash('error') || req.flash('info')
            });
          }
          else {
            // Otherwise redirect to '/todos' (Angular app)
            return res.redirect('/todos');
          }
    })
    // Check login attempt with Passport
    .post(passport.authenticate('local', {
      successRedirect: '/todos',
      failureRedirect: '/login',
      failureFlash: true
    }));

  // Passport req.logout() and send user back to '/'
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // Single /:userId Routes
  // ==============================
  app.route('/users/:userId')
    // Retrieve single user
    .get(function(req, res) {
      res.json(req.user);
    })
    // Update single user
    .put(function(req, res, next) {
      User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
        if (err) {
          return next(err);
        }
        else {
          res.json(user);
        }
      });
    })
    // Delete single user
    .delete(function(req, res, next) {
      req.user.remove(function(err) {
        if (err) {
          return next(err);
        }
        else {
          res.json(req.user);
        }
      });
    });

  // .param middleware. Handle all routes with param :userId
  // Query database and return req.user if user w' Id exists
  app.param('userId', function(req, res, next, id) {
    User.findOne({
        _id: id
      },
      function(err, user) {
        if (err) {
          return next(err);
        }
        else {
          req.user = user;
          next();
        }
      }
    );
  });
};