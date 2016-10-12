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
    },
    setCookie:function(res,name,value,option){
        res.cookie(name,value,option);
    },
    getCookie:function(app,req,cookiename){
        var r=null;
        req.headers.cookie&&(r=app.lcookie.parse( req.headers.cookie)[cookiename]);
       return r;
    }
}
module.exports=base;
