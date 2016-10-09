/**
 * Created by Administrator on 2016/9/30.
 */
//var initserver=function(){
//    //this.prototype.app=app;
//    //this.init();
//
//}
var initserver={
    init:function(app){
        if (app.config.env === 'production') {
            app.set('env', 'production');
        }
        else if(app.config.env === 'development') {
            app.set('env', 'development');
        }

        this.startMulcpu(app);
        this.catch404(app);
        this.catch500(app);
        this.globleError(app);
    },
    catch404:function(app){
        app.use(function(req, res, next) {

            var err = new Error(req.path+' Not Found');
            err.status = 404;
            next(err);
        });
    },
    catch500:function(app){
        app.use(function(err, req, res, next) {

            app.datelogger.trace(err);
            res.status(err.status || 500);
            res.send("error");
            //res.render('error', {
            //    message: err.message,
            //    error: {}
            //});
        });
    },
    startMulcpu:function(){

    },
    globleError:function(app){
        process.on('uncaughtException', function (err) {
            app.datelogger.info("globleError:");
            app.datelogger.trace(err);
        });
    }
}

module.exports=initserver;
