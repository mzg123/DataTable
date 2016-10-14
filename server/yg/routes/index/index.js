
function startRoute(app){
  app.route.get('/', function(req, res, next) {
    var options=app.base.getRequestOptions(app.config.main.path,"get",app.config.serverPort,null);

    app.httpRep.req(app,req,res,options,success,error);
  });
  return app.route;
}
function success  (lapp,lres,jsonData){
  lres.render(lapp.config.main.render, jsonData);
}
function error (lapp,lres,errMsg){
  lres.render(lapp.config.main.render, { what: 'best', who: 'me', muppets: [ 'Kermit444', 'Fozzie444', 'Gonzo44' ]  });
}
module.exports = startRoute;




