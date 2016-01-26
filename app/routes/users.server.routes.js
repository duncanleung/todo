var passport = require('passport');
var users = require('../../app/controllers/users.server.controller');

module.exports = function(app) {
  app.route('/users')
    .post(users.create)
    .get(users.list);

  app.route('/users/:userId')
    .get(users.read)
    .put(users.update)
    .delete(users.delete);

  app.param('userId', users.userById);

  app.route('/register')
    .get(users.renderRegister)
    .post(users.register);

  app.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
    }));

  app.get('/logout', users.logout);
};
