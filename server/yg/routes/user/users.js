function startRoute(app){
  app.route.get(app.config.paths.user.path, function(req, res, next) {
    var result={ 'what': 'best','who': 'me', muppets: [ 'Kermit1111', 'Fozzie2222', 'Gonzo3333' ]  };
    res.write(JSON.stringify(result));
    res.end();
    //res.send('respond with a resource');
  });
  return app.route;
}
module.exports = startRoute;
