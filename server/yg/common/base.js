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

$._ajax = $.ajax;

$.ajax = function (options) {
    if (typeof options == 'object') {
        var data = options.data || {};
        if (typeof __globalData != "undefined" && __globalData._csrf) {
            data._csrf = __globalData._csrf;
        }
        var _succ = options.success || $.noop;
        var _exception = options.exception || $.noop;
        var dataType = options.dataType || (options.dataType = 'json');
        options.success = function (res) {

            if(options.showLoading){
                $.utils.hideLoading();
            }

            if (dataType == 'json') {
                if (res.code == 0) {
                    _succ.apply(this, arguments);
                }
                else {
                    var tmp = _exception.apply(this, arguments);
                    if (tmp !== false) {
                        ajaxException.apply(this, arguments);
                    }
                }
            }
            else {
                _succ.apply(this, arguments);
            }

        }

        options.error = ajaxError;

        if(options.showLoading){
            $.utils.showLoading();
        }
    }
    $._ajax.apply($, arguments);
}

module.exports=base;
