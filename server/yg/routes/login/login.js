
function login(app){
    app.route.get('/login', function(req, res, next) {
//res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });
        res.cookie("SESSIONID","Ap4GTEq",{httpOnly: true});
        res.cookie("mzg","1234567895125876");
        res.render('login/login');
        //app.httpRep.req(app,req,res,options,success,error);
    });
    return app.route;
}

module.exports = login;




