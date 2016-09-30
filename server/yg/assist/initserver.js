/**
 * Created by Administrator on 2016/9/30.
 */
var initserver=function(app){
    this.prototype.app=app;
    this.init();
}
initserver.prototype={
    init:function(app){
        this.startMulcpu();
        this.catch500();
        this.catch404();
    },
    catch404:function(){

        this.app.use(function(req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });
    },
    catch500:function(){

    },
    startMulcpu:function(){

    }
}

module.exports=initserver;
