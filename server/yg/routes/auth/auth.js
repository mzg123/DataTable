;
function startRoute(app){
    app.route.get('/*', function(req, res, next) {
        console.log(req.path);
        handleAuth(app,req,res,next,req.headers.cookie);
    });
    return app.route;
}
function handleAuth(app,req,res,next,cookie){
    var cookieObj=app.lcookie.parse(cookie);
    app.config.noAuthPath.indexOf(req.path)!=-1?next():cookieObj.ssid?auth(app,req,res,next,cookieObj):res.redirect('/login');
}
function auth(app,req,res,next,cookieObj){

    var options=app.base.getRequestOptions("/auth","get",app.config.serverPort,null);
    var data={ssid:cookieObj.ssid};
    // app.httpRep.req(app,req,res,options,success,error,data);
    next();
}
var success=function  (lapp,lres,jsonData){
    lres.render('index/'+lapp.config.main, jsonData);
}
var error=function (lapp,lres,errMsg){
    lres.render('index/'+lapp.config.main, { what: 'best', who: 'me', muppets: [ 'Kermit444', 'Fozzie444', 'Gonzo44' ]  });
}
module.exports = startRoute;