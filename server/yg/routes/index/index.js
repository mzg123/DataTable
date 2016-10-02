function startRoute(app){
  app.route.get('/', function(req, res, next) {
    res.render('index/index', { what: 'best', who: 'me', muppets: [ 'Kermit', 'Fozzie', 'Gonzo' ]  });
  });
  return app.route;
}
module.exports = startRoute;




