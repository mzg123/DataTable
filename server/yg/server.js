var express = require('express')
    , engine = require('ejs-locals')
    , app = express()

    ,router = express.Router();
var path = require('path');
var config=require('./common/config');
var base=require('./common/base');
var httpRep=require('./common/httphelper');
var lcookie = require('cookie')
app.express=express;
app.path=path;
app.myPath=config.paths;
app.lcookie=lcookie;
app.route=router;
app.config=config;
app.base=base;
app.httpRep=httpRep;
app.index=0;
// 设置引擎
app.engine('ejs', engine);
app.set('views',__dirname + '\\views\\ejs');
app.set('view engine', 'ejs'); // so you can render('index')
//添加中间件
require('./assist/initmiddleware')(app);
//初始化路由页面
require('./assist/initroutes')(app);
app.listen(config.port,config.ip);
//启动ssl
//require('./common/httpslisten')(app);

 require('./assist/initserver').init(app);
//模拟服务器
require('./common/testServer')(app);




