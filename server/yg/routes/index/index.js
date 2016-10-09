

function startRoute(app){
  app.route.get('/', function(req, res, next) {
    var lreq, lres, lnext,lapp;
    lreq=req; lres=res;lnext=next;lapp=app;
    var success=function  (jsonData){
      lres.render('index/'+lapp.config.main, jsonData);
    }
    var error=function (errMsg){
      lres.render('index/'+lapp.config.main, { what: 'best', who: 'me', muppets: [ 'Kermit444', 'Fozzie444', 'Gonzo44' ]  });
    }
    var options=app.base.getRequestOptions("/user","get",app.config.serverPort,null);
    app.httpRep.req(app,req,options,success,error);
  });
  return app.route;
}

module.exports = startRoute;




