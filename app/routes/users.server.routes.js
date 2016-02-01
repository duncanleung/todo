// Required in /app/config/express.js

var users = require('../../app/controllers/users.server.controller'),
  passport = require('passport');

module.exports = function(app) {
  app.route('/signup')
    .get(users.renderSignup)
    .post(users.signup);

  app.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', {
      successRedirect: '/todos',
      failureRedirect: '/login',
      failureFlash: true
    }));

  app.get('/logout', users.logout);

  app.route('/users/:userId')
    .get(users.read)
    .put(users.update)
    .delete(users.delete);

  // .param middleware. Handle all routes with param :userId
  // Query database and return req.user if user w' Id exists
  app.param('userId', users.userByID);

  app.get('/oauth/facebook', passport.authenticate('facebook', {
    failureRedirect: '/login',
    scope:['email']
  }));

  app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/login',
    successRedirect: '/',
    scope:['email']
  }));
};