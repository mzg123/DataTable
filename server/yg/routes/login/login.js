var logincontr = require('../../controller/login/logincontroller');
var lapp=null;
function login(app){
    lapp=app;
    app.route.get(app.myPath.login.path, function(req, res, next) {
        app.base.setCookie(res,"SESSIONID","Ap4GTEq",{ expires: new Date(Date.now() + 105000),httpOnly: true});
        res.render(app.myPath.login_1.render,{cdn:app.config.cdn});
        //app.httpRep.req(app,req,res,options,success,error);
    });
    app.route.post(app.myPath.login.path, function(req, res, next) {

        logincontr.getData({app:app,res:res,success:getResult,error:error,data:{username:req.body["username"],password:req.body["password"]}});
        // res.redirect("http://10.0.130.129:3000/");
        //app.base.setCookie(res,"SESSIONID","Ap4GTEq",{ expires: new Date(Date.now() + 105000),httpOnly: true});
        //res.render(app.myPath.login_1.render,{cdn:app.config.cdn});
        ////app.httpRep.req(app,req,res,options,success,error);
    });
    return app.route;
}

function getResult(lres,data){
    lres.write('{ "login": true,"code":0 }', "utf-8");
    lres.end();
}
function error (lres,errMsg){
    console.log(4444444444444);
    lres.render(lapp.myPath.login_1.render,{cdn:app.config.cdn});
    //lres.render(lapp.config.main.render, { what: 'best', who: 'me', muppets: [ 'errorerrorerrorerrorerrorerror', 'errorerrorerrorerrorerrorerrorerror', 'errorerrorerrorerrorerrorerrorerrorerror' ]  });
}

module.exports = login;







