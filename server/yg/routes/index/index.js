var httpRep=require('../../common/httphelper');
var lreq, lres, lnext;
function startRoute(app){
  app.route.get('/', function(req, res, next) {
    lreq=req; lres=res;lnext=next;
    //var options=app.base.getRequestOptions("/user",get,null);
    //httpRep.req(app,req,options,success,error);
    res.render('index/'+app.config.main, { what: 'best', who: 'me', muppets: [ 'Kermit', 'Fozzie', 'Gonzo' ]  });
  });
  return app.route;
}
function success(jsonData){
  console.log(jsonData);
  //lreq.render('index/'+app.config.main, { what: 'best', who: 'me', muppets: [ 'Kermit', 'Fozzie', 'Gonzo' ]  });
}
function error(errMsg){

}
module.exports = startRoute;




