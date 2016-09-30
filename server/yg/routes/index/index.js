function startRoute(router){
  router.get('/', function(req, res, next) {
    res.render('index/index', { what: 'best', who: 'me', muppets: [ 'Kermit', 'Fozzie', 'Gonzo' ]  });
  });
  return router;
}
module.exports = startRoute;




