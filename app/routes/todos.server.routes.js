// Required in /app/config/express.js

var users = require('../../app/controllers/users.server.controller'),
    todos = require('../../app/controllers/todos.server.controller');

module.exports = function(app) {
  app.route('/api/todos')
    .get(todos.list)
    .post(users.requiresLogin, todos.create);
};