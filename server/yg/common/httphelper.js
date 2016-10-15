var http = require('http');
var https = require('https');
var querystring=require('querystring');
var httphelper={
    options:{
        host: 'localhost',
        port: 8001,
        path: '/data',
        method: 'GET',
        headers: null
    },
    req:function(app,req,lres,options,success,error,data){
        //options.headers|| (options.headers= req.headers);

        var htp=http;
        if(req.protocol == 'https'){
            htp=https;
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
            options.port=app.config.serverSsl;

        }
        var lreq = htp.request(options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function (data) {
                try{
                    success(app,lres,JSON.parse(data));
                }
                catch (e){
                    error(app,lres,e.message);
                    app.datelogger.info("原始返回数据："+data)
                    app.datelogger.trace(e);
                }

            });
        });
        lreq.on('error', function(e){
            error(app,lres,e.message);
            app.datelogger.trace(e);
        });
        data&&lreq.write(querystring.stringify(data));
        lreq.end();
    },
    req:function(option){
        //options.headers|| (options.headers= req.headers);
        //app,req,lres,options,success,error,data
        var htp=http;

        if(option.req.protocol == 'https'){
            htp=https;
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
            option.options.port=option.app.config.serverSsl;
        }
        var lreq = htp.request(option.options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function (data) {
                try{
                    option.success(option.app,option.res,JSON.parse(data));
                }
                catch (e){
                    option.error(option.app,option.res,e.message);
                    option.app.datelogger.info("原始返回数据："+data)
                    option.app.datelogger.trace(e);
                }
            });
        });
        lreq.on('error', function(e){
            option.error(option.app,option.res,e.message);
            option.app.datelogger.trace(e);
        });
        option.data&&lreq.write(querystring.stringify(option.data));
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
    reqSsl:function(option){
        //options.headers|| (options.headers= req.headers);
        //app,req,options,success,error
        var lreq = https.request(option.options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function (data) {
                try{
                    option.success(JSON.parse(data));
                }
                catch (e){
                    option.error(e.message);
                    option.app.datelogger.info("原始返回数据："+data)
                    option.app.datelogger.trace(e);
                }

            });
        });
        lreq.on('error', function(e){
            option.error(e.message);
            option.app.datelogger.trace(e);
        });
        lreq.end();
    },
    err:function(app,e){

    }
}

module.exports = httphelper;

