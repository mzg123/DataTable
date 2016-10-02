function startRoute(app){
  app.route.get('/user', function(req, res, next) {
    res.send('respond with a resource');
  });
  return app.route;
}
module.exports = startRoute;
