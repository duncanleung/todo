exports.render = function(req, res) {
  res.render('index', {
    title: 'To Do',
    user: req.user ? req.user.username : ''
  });
}
