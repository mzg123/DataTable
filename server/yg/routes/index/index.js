
function startRoute(app){
  app.route.get('/', function(req, res, next) {
    var options=app.base.getRequestOptions("/user","get",app.config.serverPort,null);

    app.httpRep.req(app,req,res,options,success,error);
  });
  return app.route;
}
var success=function  (lapp,lres,jsonData){
  lres.render('index/'+lapp.config.main, jsonData);
}
var error=function (lapp,lres,errMsg){
  lres.render('index/'+lapp.config.main, { what: 'best', who: 'me', muppets: [ 'Kermit444', 'Fozzie444', 'Gonzo44' ]  });
}
module.exports = startRoute;




