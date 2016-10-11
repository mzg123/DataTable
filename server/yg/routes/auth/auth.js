
function startRoute(app){
    app.route.get('/*', function(req, res, next) {
        console.log(req.path);
        console.log( req.url);
        res.redirect('/login')


       // app.httpRep.req(app,req,res,options,success,error);
    });
    return app.route;
}

module.exports = startRoute;