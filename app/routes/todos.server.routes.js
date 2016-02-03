// Required in /app/config/express.js

var /*users = require('../../app/controllers/users.server.controller'),*/
    todos = require('../../app/controllers/todos.server.controller');

// Middleware to run Passport req.isAuthenticated()
// If user is not logged in, send 401
var requiresLogin = function(req, res, next) {
  if(!req.isAuthenticated()) {
    return res.status(401).send({
      message: 'User is not logged in.'
    });
  }
  next();
};


module.exports = function(app) {
  app.route('/api/todos')
    .get(todos.list)
    .post(requiresLogin, todos.create);

  app.route('/api/todos/:todoId')
    .get(todos.read)
    .put(requiresLogin, todos.hasAuthorization, todos.update)
    .delete(requiresLogin, todos.hasAuthorization, todos.delete);

  // Every route that has todoId param will call middleware
  app.param('todoId', todos.todoById);
};