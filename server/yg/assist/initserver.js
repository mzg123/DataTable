/**
 * Created by Administrator on 2016/9/30.
 */
var initserver=function(app){
    initserver.prototype.app=app;
    this.init();
}
initserver.prototype={
    init:function(){
        this.startMulcpu();
        this.catch500();
        this.catch404();
    },
    catch404:function(){
        console.log(this.app);
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
