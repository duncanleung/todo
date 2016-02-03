// Required in /app/config/express.js

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index',
      {
        title: 'ToDo App',
        user: JSON.stringify(req.user)
      }
    );
  });
};