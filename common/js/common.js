/**
 * Created by Administrator on 2016/9/23.
 */
var Config={
    "SeajsBaseUrl":"http://localhost:63342/mzg/DataTable/common/js/", //admin/user/user_index.js
    "api":{
        "user_edit":"user_edit",
        "jqueryDataTableConfig":{

        }
    }
}

seajs.config({
    base: Config.SeajsBaseUrl
});
(function($){
    var cache = {};
    $.MT||($.MT = function MT(id,str,data){
        // Figure out if we're getting a template, or if we need to
        // load the template - and be sure to cache the result.
        var fn;
        if(!/\W/.test(id)){
            fn = cache[id] = cache[id] || MT(str);
        }
        else{
            str = typeof str === 'undefined' ? id : str;
            fn =  new Function("obj",
                "var p=[],print=function(){p.push.apply(p,arguments);};" +
                    // Introduce the data as local variables using with(){}
                "with(obj){p.push('" +
                    // Convert the template into pure JavaScript
                str.replace(/&lt;%/g, "<%").replace(/%&gt;/g, "%>")
                    .replace(/[\r\t\n]/g, " ")
                    .split("<%").join("\t")
                    .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                    .replace(/\t=(.*?)%>/g, "',$1,'")
                    .split("\t").join("');")
                    .split("%>").join("p.push('")
                    .split("\r").join("\\'")
                + "');}return p.join('');");
        }
        return data ? fn( data ) : fn;

    });

})(jQuery);


(function($){
    var ajaxStatusMap = {
        100: "参数非法"
    }

    function ajaxException(res) {
        console.log(res);
        if (!res) return;
        var msg = res.message || ajaxStatusMap[res.code] || "错误";
        if (res.code == 301 || res.redirect) {
            location.href = res.redirect;
        } else if (res.code == -1) {
            location.href = res.data.url;
        }
        else {
            alert(msg);
        }
    }

    function ajaxError(xhr, error, textStatus) {
        console.error('ajax',xhr.responseURL,xhr.status,xhr.statusText);
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

            //if(options.showLoading){
            //    $.utils.showLoading();
            //}
        }
        $._ajax.apply($, arguments);
    }


})(jQuery);
