
function login(app){
    app.route.get('/login', function(req, res, next) {

        res.cookie("ssid","Ap4GTEq");
        res.cookie("mzg","1234567895125876");
        res.render('login/login');
        //app.httpRep.req(app,req,res,options,success,error);
    });
    return app.route;
}

module.exports = login;




