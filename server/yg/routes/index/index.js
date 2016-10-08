function startRoute(app){
  app.route.get('/', function(req, res, next) {
    res.render('index/'+app.config.main, { what: 'best', who: 'me', muppets: [ 'Kermit', 'Fozzie', 'Gonzo' ]  });
  });
  return app.route;
}
module.exports = startRoute;




