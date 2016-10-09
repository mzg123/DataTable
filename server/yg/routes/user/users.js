function startRoute(app){
  app.route.get('/user', function(req, res, next) {
    var result={ 'what': 'best','who': 'me', muppets: [ 'Kermit1111', 'Fozzie2222', 'Gonzo3333' ]  };
    res.write(JSON.stringify(result));
    res.end();
    //res.send('respond with a resource');
  });
  return app.route;
}
module.exports = startRoute;
