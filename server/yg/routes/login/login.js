
function login(app){
    app.route.get('/login', function(req, res, next) {
        res.render('login/login');
        //app.httpRep.req(app,req,res,options,success,error);
    });
    return app.route;
}

module.exports = login;




