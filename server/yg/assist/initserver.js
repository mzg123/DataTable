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
        this.startMulcpu(app);
        this.catch404(app);
        this.catch500(app);
    },
    catch404:function(app){

        app.use(function(req, res, next) {
            var err = new Error('Not Found');
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

    }
}

module.exports=initserver;
