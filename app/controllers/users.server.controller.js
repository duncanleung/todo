// Required in /app/routes/users.server.routes.js

var User = require('mongoose').model('User'),
  passport = require('passport');

// Return any Mongoose errors
var getErrorMessage = function(err) {
  var message = '';
  if (err.code) {
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

// Middleware to run Passport req.isAuthenticated()
// If user is not logged in, send 401
exports.requiresLogin = function(req, res, next) {
  if(!req.isAuthenticated()) {
    return res.status(401).send({
      message: 'User is not logged in.'
    });
  }
  next();
}

// If user is not logged in then show Login
// Otherwise redirect to '/' (Angular app)
exports.renderLogin = function(req, res, next) {
  if (!req.user) {
    res.render('login', {
      title: 'ToDo Login',
      messages: req.flash('error') || req.flash('info')
    });
  }
  else {
    return res.redirect('/');
  }
};

// If user is not logged in then show Signup
// Otherwise redirect to '/' (Angular app)
exports.renderSignup = function(req, res, next) {
  if (!req.user) {
    res.render('signup', {
      title: 'Signup for ToDo',
      messages: req.flash('error')
    });
  }
  else {
    return res.redirect('/');
  }
};

// Create new user on POST /signup
exports.signup = function(req, res, next) {
  if (!req.user) {
    var user = new User(req.body);
    var message = null;
    user.provider = 'local';
    user.save(function(err) {
      if (err) {
        var message = getErrorMessage(err);
        req.flash('error', message);
        return res.redirect('/signup');
      }

      req.login(user, function(err) {
        if (err)
          return next(err);
        
        return res.redirect('/');
      });
    });
  }
  else {
    return res.redirect('/');
  }
};

// Passport req.logout() and send user back to '/'
exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

exports.saveOAuthUserProfile = function(req, profile, done) {
  User.findOne({
      provider: profile.provider,
      providerId: profile.providerId
    },
    function(err, user) {
      if (err) {
        return done(err);
      }
      else {
        if (!user) {
          var possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');
          User.findUniqueUsername(possibleUsername, null, function(availableUsername) {
            profile.username = availableUsername;
            user = new User(profile);

            user.save(function(err) {
              if (err) {
                var message = _this.getErrorMessage(err);
                req.flash('error', message);
                return res.redirect('/signup');
              }

              return done(err, user);
            });
          });
        }
        else {
          return done(err, user);
        }
      }
    }
  );
};

// Fetch user document and attach to req.user
// Middleware for app.param
exports.userByID = function(req, res, next, id) {
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
};

exports.read = function(req, res) {
  res.json(req.user);
};

exports.update = function(req, res, next) {
  User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
    if (err) {
      return next(err);
    }
    else {
      res.json(user);
    }
  });
};

exports.delete = function(req, res, next) {
  req.user.remove(function(err) {
    if (err) {
      return next(err);
    }
    else {
      res.json(req.user);
    }
  });
};