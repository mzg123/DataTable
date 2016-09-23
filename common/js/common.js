/**
 * Created by Administrator on 2016/9/23.
 */
var Config={
    "SeajsBaseUrl":"http://localhost:63342/mzg/DataTable/common/js/" //admin/user/user_index.js
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
