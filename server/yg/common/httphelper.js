var http = require('http');
var httphelper={
    get:function(app,req,success){

    },
    post:function(app,req,success){

    },
    err:function(){

    }
}

module.exports = httphelper;




function find (req, success){

    var headers = req.headers;
    headers.host = 'localhost';

    var options = {
        host: 'localhost',
        port: 8001,
        path: '/data',
        method: 'GET',
        headers: headers
    };

    req = http.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (data) {
            console.log('>>> ', data);
            data = JSON.parse(data);
            success(data);
        });
    });

    req.on('error', function(e){
        console.log("auth_user error: " + e.message);
    });

    req.end();
}
