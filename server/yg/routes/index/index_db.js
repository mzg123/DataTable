var indexcontr = require('../../controller/index/indexcontroller');
var lapp=null;
function startRoute(app){
  lapp=app;
  app.route.get('/db', function(req, res, next) {

    //var options=app.base.getRequestOptions(app.config.main.path,"get",app.config.serverPort,null);
     indexcontr.getData({app:app,res:res,success:getResult,error:error});

    //res.end();

    // var op={
    //  app:app,
    //  req:req,
    //  options:options,
    //  success:success,
    //  error:error
    //}
    //app.httpRep.req(op);
  });
  return app.route;
}
function getResult(lres,data){

 // console.log(data);
  lres.write(JSON.stringify(data));
  lres.end();
}
function error (lres,errMsg){
  lres.render(lapp.config.main.render, { what: 'best', who: 'me', muppets: [ 'errorerrorerrorerrorerrorerror', 'errorerrorerrorerrorerrorerrorerror', 'errorerrorerrorerrorerrorerrorerrorerror' ]  });
}


module.exports = startRoute;




