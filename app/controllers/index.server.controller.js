exports.render = function(req, res) {
    res.render('index', {
      title: 'ToDo App',
      user: JSON.stringify(req.user)
    });
};