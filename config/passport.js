// Required in server.js

var User = require('../app/models/user.server.model.js');

module.exports = function(passport) {

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
  require('./strategies/local.js')();
};