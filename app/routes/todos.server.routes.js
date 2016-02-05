// Required in /app/config/express.js

var Todo = require('../../app/models/todos.server.model.js');

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

// Middleware checks if current user (req.user) is the creator of current todo (req.todo)
var hasAuthorization = function(req, res, next) {
  if(req.todo.creator.id !== req.user.id) {
    return res.status(403).send({
      message: 'User is not authorized'
    });
  }
  next();
};

// Return Any Mongoose Errors
var getErrorMessage = function(err) {
  if(err.errors) {
    for(var errName in err.errors) {
      if(err.errors[errName].message) {
        return err.errors[errName].message;
      }
      else {
        return 'Unknown server error: ' + err;
      }
    }
  }
};


module.exports = function(app) {
  // /api/todos
  // ==============================
  app.route('/api/todos')
    // If user is logged in then pull todos from Mongo
    .get(requiresLogin, function(req, res) {
          // Sort Todo by descending 'created' date
          Todo.find({creator: req.user._id}).sort('-created').populate('creator', 'name username').exec(function(err, todos) {
            if(err) {
              return res.status(400).send({
                message: getErrorMessage(err)
              });
            }
            else {
              res.json(todos);
            }
          });
    })
    // If user is logged in then create todo and store to Mongo
    .post(requiresLogin, function(req, res) {
          var todo = new Todo(req.body);
          // Authenticated Passport user as Todo creator
          todo.creator = req.user;
          // Save Todo
          todo.save(function(err) {
            if(err) {
              return res.status(400).send({
                message: getErrorMessage(err)
              });
            }
            else {
              res.json(todo);
            }
          });
    });

  // /api/todos/:todoId
  // ==============================
  app.route('/api/todos/:todoId')
    
    // Todo from req.todo that was attached by todoById middleware
    .get(requiresLogin, hasAuthorization, function(req, res) {
        res.json(req.todo);
    })
    // Update Todo fetched by todoById
    .put(requiresLogin, hasAuthorization, function(req, res) {
          var todo = req.todo;

          todo.title = req.body.title;
          todo.comment = req.body.comment;
          todo.completed = req.body.completed;

          todo.save(function(err) {
            if(err) {
              return res.status(400).send({
                message: getErrorMessage(err)
              });
            }
            else {
              console.log(todo);
              res.json(todo);
            }
          });
    })
    // Delete Todo fetched by todoById
    .delete(requiresLogin, hasAuthorization, function(req, res) {
          var todo = req.todo;

          todo.remove(function(err) {
            if(err) {
              return res.status(400).send({
                message: getErrorMessage(err)
              });
            }
            else {
              res.json(todo);
            }
          });
    });

  // Use middleware to fetch Todo document and attach to req.todo
  app.param('todoId', function(req, res, next, id) {
        Todo.findById(id).populate('creator', 'name username')
        .exec(function(err, todo) {
          if(err) {
            return next(err);
          }
          if(!todo) {
            return next(new Error('Failed to load todo ' + id));
          }

          req.todo = todo;
          next();
        });
  });
};
