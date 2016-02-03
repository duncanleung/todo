// Required in server.js

var User = require('../app/models/user.server.model.js');

module.exports = function(passport) {

  LocalStrategy = require('passport-local').Strategy;

  // Sessions Setup - Persistent Login
  // ==============================
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findOne(
      {_id: id},
      '-password',
      function(err, user) {
        done(err, user);
      }
    );
  });

  // Login Strategies Setup
  // ==============================
  passport.use(new LocalStrategy(function(username, password, done) {
    User.findOne(
      {username: username},
      function(err, user) {
        if (err) {
          return done(err);
        }
        
        if (!user) {
          return done(null, false, {message: 'Unknown user'});
        }

        if (!user.authenticate(password)) {
          return done(null, false, {message: 'Invalid password'});
        }

        return done(null, user);
      }
    );
  }));
};