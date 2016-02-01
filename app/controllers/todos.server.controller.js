// Required in /app/routes/todo.server.routes.js

var mongoose = require('mongoose'),
    Todo = mongoose.model('Todo');

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

// Middleware to check that current user (req.user) is the creator of current todo (req.todo)
exports.hasAuthorization = function(req, res, next) {
  if(req.todo.creator.id !== req.user.id) {
    return res.status(403).send({
      message: 'User is not authorized'
    });
  }
  next();
};

// Create New Todo from req.body
exports.create = function(req, res) {
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
};

// Fetch collection of Todo documents
exports.list = function(req, res) {
  // Sort Todo by descending 'created' date
  Todo.find().sort('-created').populate('creator', 'name username').exec(function(err, todos) {
    if(err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    }
    else {
      res.json(todos);
    }
  });
};

// Output Todo from req.todo that was attached by todoById
exports.read = function(req, res) {
  res.json(req.todo);
};

// Fetch Todo document and attach to req.todo
// Middleware for app.param
exports.todoById = function(req, res, next, id) {
  Todo.findById(id).populate('creator', 'name username').exec(function(err, todo) {
    if(err) {
      return next(err);
    }
    if(!todo) {
      return next(new Error('Failed to load todo ' + id));
    }

    req.todo = todo;
    next();
  });
};

// Update Todo Previously Fetched by todoById
exports.update = function(req, res) {
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
};

// Delete Todo Previously Fetched by todoById
exports.delete = function(req, res) {
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
};