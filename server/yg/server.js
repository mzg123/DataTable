var express = require('express')
    , engine = require('ejs-locals')
    , app = express()
    ,router = express.Router();
var path = require('path');
var config=require('./common/config');
app.express=express;
app.path=path;
app.route=router;
// 设置引擎
app.engine('ejs', engine);
app.set('views',__dirname + '\\views\\ejs');
app.set('view engine', 'ejs'); // so you can render('index')

//添加中间件
require('./assist/initmiddleware')(app);
//初始化路由页面
require('./assist/initroutes')(app);
app.listen(config.port);

//启动多核cpu
//错误处理
 require('./assist/initserver').init(app);
//iss.init(app);
//require('./assist/initserver').init(app);
// development error han
// dler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send("error");
        //res.render('error', {
        //    message: err.message,
        //    error: err
        //});
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send("error");
    //res.render('error', {
    //    message: err.message,
    //    error: {}
    //});
});
