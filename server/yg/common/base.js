var config=require('./config');
var base={
    getRequestOptions:function(path,method,headers){
        var options;
        headers?(options= {
            host: config.serverIp,
            port:  config.serverPort,
            path: path,
            method: method,
            headers: headers
        }):options= {
            host: config.serverIp,
            port:  config.serverPort,
            path: path,
            method: method
        }
        return options;
    }
}
module.exports=base;
