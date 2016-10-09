var httpRep=require('../../common/httphelper');
var lreq, lres, lnext,lapp;
function startRoute(app){
  app.route.get('/', function(req, res, next) {
    lreq=req; lres=res;lnext=next;lapp=app;
    var options=app.base.getRequestOptions("/user","get",null);
    httpRep.req(app,req,options,success,error);
  });
  return app.route;
}
function success(jsonData){
  lres.render('index/'+lapp.config.main, jsonData);
}
function error(errMsg){
  lres.render('index/'+lapp.config.main, { what: 'best', who: 'me', muppets: [ 'Kermit444', 'Fozzie444', 'Gonzo44' ]  });
}
module.exports = startRoute;




