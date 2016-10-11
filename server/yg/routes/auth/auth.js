
function startRoute(app){
    app.route.get('/*', function(req, res, next) {
        console.log(req.headers.cookie);
        res.redirect('/login')


       // app.httpRep.req(app,req,res,options,success,error);
    });
    return app.route;
}

module.exports = startRoute;