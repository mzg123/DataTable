
function login(app){
    app.route.get(app.myPath.login.path, function(req, res, next) {
        app.base.setCookie(res,"SESSIONID","Ap4GTEq",{ expires: new Date(Date.now() + 105000),httpOnly: true});
        res.render(app.myPath.login_1.render,{cdn:app.config.cdn});
        //app.httpRep.req(app,req,res,options,success,error);
    });
    return app.route;
}
module.exports = login;




