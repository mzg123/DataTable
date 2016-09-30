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
        this.catch500(app);
        this.catch404(app);
    },
    catch404:function(app){

        app.use(function(req, res, next) {
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
