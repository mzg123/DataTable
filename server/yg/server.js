var express = require('express')
    , engine = require('ejs-locals')
    , app = express()
    , serverapp = express()
    ,router = express.Router();
var path = require('path');
var config=require('./common/config');
var base=require('./common/base');
var httpRep=require('./common/httphelper');
app.express=express;
app.path=path;
app.route=router;
app.config=config;
app.base=base;
app.httpRep=httpRep;

// 设置引擎
app.engine('ejs', engine);
app.set('views',__dirname + '\\views\\ejs');
app.set('view engine', 'ejs'); // so you can render('index')

//添加中间件
require('./assist/initmiddleware')(app);
//初始化路由页面
require('./assist/initroutes')(app);
app.listen(config.port,config.ip);
serverapp.listen(config.serverPort,config.serverIp);
serverapp.get('/', function(req, res, next) {
    res.send("hello");
})
serverapp.get('/user', function(req, res, next) {
        var result={ 'what': 'best','who': 'me', muppets: [ 'Kermit1111', 'Fozzie2222', 'Gonzo3333' ]  };
        res.write(JSON.stringify(result));
        res.end();
        //res.send('respond with a resource');
    });
//启动多核cpu
//错误处理
 require('./assist/initserver').init(app);
//iss.init(app);
//require('./assist/initserver').init(app);
// development error han
// dler
// will print stacktrace
//app.set('env', 'production');
//console.log(app.get('env'));
//if (app.get('env') === 'development') {
//    app.use(function(err, req, res, next) {
//        res.status(err.status || 500);
//        res.send("error");
//
//    });
//}


