;
function startRoute(app){
    app.route.get('/*', function(req, res, next) {
        handleAuth(app,req,res,next,req.headers.cookie);
    });
    return app.route;
}
function handleAuth(app,req,res,next,cookie){
    var cookieObj=app.lcookie.parse(cookie);
    console.log(cookieObj.SESSIONID);
    app.config.noAuthPath.indexOf(req.path)!=-1?next():cookieObj.SESSIONID?auth(app,req,res,next,cookieObj):res.redirect('/login');
}
function auth(app,req,res,next,cookieObj){
console.log(33);
    var options=app.base.getRequestOptions("/auth","get",app.config.serverPort,null);
    var data={ssid:cookieObj.SESSIONID};
    // app.httpRep.req(app,req,res,options,success,error,data);
    next();
}
var success=function  (lapp,lres,jsonData){
    //lres.render('index/'+lapp.config.main, jsonData);
}
var error=function (lapp,lres,errMsg){
    //lres.render('index/'+lapp.config.main, { what: 'best', who: 'me', muppets: [ 'Kermit444', 'Fozzie444', 'Gonzo44' ]});
}
module.exports = startRoute;