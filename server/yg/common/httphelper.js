var http = require('http');
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
        lreq = http.request(options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function (data) {
                success(JSON.parse(data));
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

