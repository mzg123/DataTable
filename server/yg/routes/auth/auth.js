;
function startRoute(app){
    app.route.get('/*', function(req, res, next) {
        handleAuth(app,req,res,next,req.headers.cookie);
    });
    return app.route;
}
function handleAuth(app,req,res,next,cookie){
    var asessionid=app.base.getCookie(app,req,'SESSIONID');
    console.log(asessionid);
    app.config.noAuthPath.indexOf(req.path)!=-1?next():asessionid?auth(app,req,res,next,asessionid):res.redirect('/login');
}
function auth(app,req,res,next,asessionid){
    var options=app.base.getRequestOptions("/auth","get",app.config.serverPort,null);
    var data={ssid:asessionid};
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