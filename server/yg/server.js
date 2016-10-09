var express = require('express')
    , engine = require('ejs-locals')
    , app = express()

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


 require('./assist/initserver').init(app);
//模拟服务器
require('./common/testServer')(app);

require('./common/httpslisten')(app);


