var http = require('http');
var https = require('https');
var httphelper={
    options:{
        host: 'localhost',
        port: 8001,
        path: '/data',
        method: 'GET',
        headers: null
    },
    req:function(app,req,options,success,error){
        //options.headers|| (options.headers= req.headers);
        var htp=http;
        if(req.protocol == 'https'){
            console.log(1000)
            htp=https;
            options.port=app.config.serverSsl;
        }
        var lreq = htp.request(options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function (data) {
                try{
                    success(JSON.parse(data));
                }
                catch (e){
                    error(e.message);
                    app.datelogger.info("原始返回数据："+data)
                    app.datelogger.trace(e);
                }

            });
        });
        lreq.on('error', function(e){
            error(e.message);
            app.datelogger.trace(e);
        });
        lreq.end();
    },
    reqSsl:function(app,req,options,success,error){
        //options.headers|| (options.headers= req.headers);
        var lreq = https.request(options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function (data) {
                try{
                    success(JSON.parse(data));
                }
                catch (e){
                    error(e.message);
                    app.datelogger.info("原始返回数据："+data)
                    app.datelogger.trace(e);
                }

            });
        });
        lreq.on('error', function(e){
            error(e.message);
            app.datelogger.trace(e);
        });
        lreq.end();
    },
    err:function(app,e){

    }
}

module.exports = httphelper;

