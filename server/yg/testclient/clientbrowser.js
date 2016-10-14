var http = require('http');
var https = require('https');
var httphelper={
    req:function(options){
        //options.headers|| (options.headers= req.headers);

        var htp=http;
        var lreq = htp.request(options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function (data) {
                try{
                    console.log(data);
                }
                catch (e){

                    console.log(e.message);
                }

            });
        });
        lreq.on('error', function(e){

            console.trace(e);
        });
        lreq.end();
    },
    reqSsl:function(options){
        //options.headers|| (options.headers= req.headers);

        var lreq = https.request(options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function (data) {
                try{
                    console.log(data);
                }
                catch (e){
                    console.log(e.message);
                }

            });
        });
        lreq.on('error', function(e){
            console.log(e.message);
        });
        lreq.end();
    }
}

var  options={
    host: '10.0.130.129',
        port: 4441,//4441   3000
        path: '/',
        method: 'GET'

};
options={
    host: '10.0.130.129',
    port: 3000,//4441   3000
    path: '/db',
    method: 'GET'

};

setInterval(function(){
    for(var i=0;i<1;i++){
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        //httphelper.reqSsl(options);
        httphelper.req(options);
    }
},1000);
while(false){

    httphelper.req(options);

}



