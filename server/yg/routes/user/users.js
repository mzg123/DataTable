function startRoute(router){
  router.get('/user', function(req, res, next) {
    res.send('respond with a resource');
  });
  return router;
}
module.exports = startRoute;
