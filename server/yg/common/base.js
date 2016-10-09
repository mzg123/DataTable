var config=require('./config');
var base={
    getRequestOptions:function(path,method,port,headers){
        var options;
        headers?(options= {
            host: config.serverIp,
            port:  port,
            path: path,
            method: method,
            headers: headers
        }):options= {
            host: config.serverIp,
            port:  port,
            path: path,
            method: method
        }
        return options;
    }
}
module.exports=base;
