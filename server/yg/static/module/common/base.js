var jQ = $;

$.ns = function (packageName) {
    var packages = packageName.split('.');
    for (var i = 0, l = packages.length, path = ''; i < l; i++) {
        path += (i > 0 ? '.' : '') + packages[i];
        eval('if(typeof ' + path + ' == "undefined") window.' + path + ' = {}');
    }
};

//ie6 ie7版本低提示
if($.browser.msie && ($.browser.version == '7.0' || $.browser.version == '6.0')){
    window.location.href = "../error/browser.html";
}

$.ns('G');

$.ROOT = {
    DOMAIN: 'http://wwww.yingu.com/'
};

try {
    document.domain = 'yingu.com';
}
catch (e) {
}

//获取字符串长度，一个汉字长度为2
$.widthCheck = function (s) {

    var w = 0,
        chineseReg = /[^\x00-\xFF]/;

    for (var i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        if (chineseReg.test(c)) {
            w += 2;
        }
        else {
            w++;
        }
    }

    return w;

};

$.password = function (id) {
    $('#' + id).bind('keydown', function (e) {
        if (e.keyCode == 32) {
            return false;
        }
    });
}

$.rand = function () {
    return parseInt(Math.random() * 1000000, 10);
};


$.eval = function (s) {
    return eval('(' + s + ')');
};

$.cutString = function (string, max) {
    if (string == undefined) {
        return '';
    }
    var omet = '...';
    if (string.split('').length > max) {
        return string.substring(0, max) + omet;
    }
    return string;
};

$_REQUEST = function (method, url, data, cb, type) {
    $XHR = $.ajax({
        url: url,
        type: method,
        data: data,
        dataType: "html",
        cache: false,
        success: function (d) {

            if (type == 'json') {
                var json = eval('(' + d + ')');
                json.err = 0;
                cb(json);
            }
            else {

                cb(d);
            }
        },
        error: function (d) {
            cb({
                err: 1,
                status: d.msg
            });
        }
    });

    return $XHR;
};

$.GET = function (url, data, cb, type) {
    return $_REQUEST('GET', url, data, cb, type);
};

$.POST = function (url, data, cb, type) {
    return $_REQUEST('POST', url, data, cb, type);
};

//用于判断ajax请求时，用户是否处于登录态
$.ifLogon = function (r) {

    if (r.indexOf('reg_login') > -1 || r.indexOf('请登录') > -1) {
        return false;
    }
    else {
        return true;
    }
};

//ipad下
$.uaApple = (function () {
    return (/\((iPhone|iPad|iPod)/i).test(navigator.userAgent);
})();


//关于IE6下背景图hover的解决
if ($.IE6) {
    try {
        document.execCommand("BackgroundImageCache", false, true);
    }
    catch (e) {
    }
}
//工具方法
$.utils = {
    //获取路径参数值
    getUrlParams: function () {
        var arr = arguments;
        var value = {};
        var url = location.search;
        if (url.indexOf('?') != -1) {
            var str = url.substr(1);
            if (str.indexOf('&') != -1) {
                var v = str.split('&');
                for (var i = 0; i < arr.length; i++) {
                    for (var j = 0; j < v.length; j++) {
                        if (arr[i] == v[j].split('=')[0]) value[arr[i]] = v[j].split('=')[1];
                    }
                }
            }
            else value[str.split('=')[0]] = str.split('=')[1];
        }
        return value;
    },
    //路径追加参数
    setUrlParams: function (url, args) {
        if (typeof args == 'undefined') return url;
        var u = (url.indexOf('?') != -1) ? (url + '?') : (url + '&');
        var arr = [];
        for (var name in args) {
            arr.push(name + '=' + args[name]);
        }
        u += arr.join('&');
        return u;
    },
    getUrlParam: function (name) {
        var url = location.search, result = {};
        var params = url.match(/([^?&]*)&?/g) || [];
        for (var i = 0, ilen = params.length, tmp; i < ilen; i++) {
            if (tmp = params[i]) {
                tmp = tmp.replace("&", "").split("=");
                result[tmp[0]] = tmp[1] || "";
            }
        }
        return name ? result[name] : result;
    },
    setUrlParam: function (name, value) {
        var params = $.utils.getUrlParam();
        if (arguments.length == 2) {
            params[name] = value;
        }
        else if (typeof name == 'object') {
            $.extend(params, name);
        }
        return "?" + $.utils.json2query(params);
    },
    json2query: function (obj) {
        if (!obj) return;
        var res = [];
        for (var p in obj) {
            res.push(p + "=" + obj[p]);
        }
        return res.join("&");
    },
    //获取cookie
    getCookie: function (name) {
        var tmp, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)", "gi");
        if ((tmp = reg.exec(unescape(document.cookie))))
            return (tmp[2]);
        return null;
    },
    //设置cookie
    setCookie: function (name, value, expires, path, domain) {
        var str = name + "=" + escape(value);
        if (expires != null || expires != '') {
            if (expires == 0) {
                expires = 100 * 365 * 24 * 60;
            }
            var exp = new Date();
            exp.setTime(exp.getTime() + expires * 60 * 1000);
            str += "; expires=" + exp.toGMTString();
        }
        if (path) {
            str += "; path=" + path;
        }
        if (domain) {
            str += "; domain=" + domain;
        }
        document.cookie = str;
    },
    //删除cookie
    delCookie: function (name, path, domain) {
        document.cookie = name + "=" +
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    },
    //异步加载js,css,img
    load: function (type, url, callback, id) {
        if (type !== 'img' && type !== 'script' && type !== 'css') return;
        var road = null;
        if (type === 'img') {
            road = new Image();
            road.src = url;
        }
        else {
            if (type === 'script') {
                road = document.createElement('script');
                road.type = 'text/javascript';
                road.src = url;
                if (typeof id != 'undefined') road.id = id;
            }
            else {
                road = document.createElement('link');
                road.type = 'text/css';
                road.rel = 'stylesheet';
                road.href = url;
            }
            document.getElementsByTagName('head')[0].appendChild(road);
        }
        if (road.readyState) {
            road.onreadystatechange = function () {
                if (road.readyState == 'loaded' || road.readyState == 'complete') {
                    road.onreadystatechange = null;
                    if (callback && Object.prototype.toString.call(callback) === '[object Function]') callback(road);
                }
            }
        }
        else {
            road.onload = function () {
                callback(road);
            }
        }
    },
    //时间戳
    now: function () {
        return new Date().getTime();
    },
    //全角数字和字母转半角
    removeSBC: function (str, flag) {
        var i;
        var result = '';
        for (i = 0; i < str.length; i++) {
            var str1 = str.charCodeAt(i);
            if (str1 < 65296) {
                result += String.fromCharCode(str.charCodeAt(i));
                continue;
            }
            if (str1 < 125 && !flag)
                result += String.fromCharCode(str.charCodeAt(i));
            else
                result += String.fromCharCode(str.charCodeAt(i) - 65248);
        }
        return result;
    },

    //获取当前日期
    getCurrentDate: function (style) {

        style = style || 'style1';
        var date = new Date(),
            year = date.getFullYear(),
            month = date.getMonth() == 0 ? 1 : date.getMonth() + 1,
            day = date.getDate();

        if (style == 'style1') {
            return parseInt(year) + '-' + parseInt(month) + '-' + parseInt(day);
        }

    },
    id: (function () {
        var id = 1;
        return function () {
            return id++;
        }
    })(),

    getDateOffset: function (now, os) {
        os = os || 0;
        var offset = new Date,
            cy = now.getFullYear(),
            cm = now.getMonth();
        if (cm + 1 < os) {
            offset.setFullYear(cy - 1);
            offset.setMonth(12 + cm - os);
        }
        else {
            offset.setMonth(cm - os);
        }
        return offset;
    },

    mask:function(el,options){
        if(typeof el == 'string') el = $(el);
        $.utils.unmask(el);
        el.data('pos_css',el.css('position'))
            .css({position:'relative'});
        var mask = $("<div class='mask-el'  ></div>");
        el.append(mask);
        return mask;
    },

    unmask:function(el){
        if(typeof el == 'string') el = $(el);
        el.find('mask-el').remove();
        var op = el.data('pos_css');
        if(op){
            el.css({position:op});
        }
    },

    showLoading:function(){
        var loadEl = $(".loadMask-ajax");
        if(loadEl[0]){
            loadEl.remove();
        }
        var ww = $(window).width(),
            progressLen = ww*.95,
            fps = 30,
            stepLen = progressLen/fps,
            curLen = ww*.3,
            maskHtml = '<div class="loadMask-ajax" >' +
            '<div class="load-progress" ></div>' +
            '</div>';
        loadEl = $(maskHtml);
        var proBar = loadEl.find('.load-progress')
        var proId = setInterval(function(){
            curLen += stepLen;
            proBar.width(curLen);
            if(curLen > progressLen){
                clearInterval(proId);
            }
        },600/fps);
        proBar.width(curLen).attr('pro-id',proId);
        $('body').append(loadEl);
    },

    hideLoading:function(){
        var loadEl = $(".loadMask-ajax");
        if(loadEl[0]){
            var proId = parseFloat( loadEl.find('.load-progress').attr('pro-id'));
            if(proId){
                clearInterval(proId);
                loadEl.find('.load-progress').width($(window).width());
            }
            setTimeout(function(){
                loadEl.remove();
            },30)
        }
    },
    getCD:function(name,timelen){
        var val = $.utils.getCookie(name);
        if(!val) return false;
        val = parseInt(val);
        var count = Math.round((Date.now() - val)/1000);
        if(count >= timelen) return false;
        else{
            return timelen - count;
        }
    },
    setCD:function(name,timelen){

        $.utils.setCookie(name,Date.now(),timelen/60)
    }

};


$.fn.disablePaste = function(){
    $(this).attr('onpaste','return false');
    return this;
};

//处理在FF下node无outerHTML属性的问题
if (typeof(HTMLElement) != "undefined" && !$.browser.msie) {
    HTMLElement.prototype.__defineSetter__("outerHTML", function (s) {
        var r = this.ownerDocument.createRange();
        r.setStartBefore(this);
        var df = r.createContextualFragment(s);
        this.parentNode.replaceChild(df, this);
        return s;
    });
    HTMLElement.prototype.__defineGetter__("outerHTML", function () {
        var a = this.attributes, str = "<" + this.tagName.toLowerCase(), i = 0;
        for (; i < a.length; i++)
            if (a[i].specified)
                str += " " + a[i].name + '="' + a[i].value + '"';
        if (!this.canHaveChildren)
            return str + " />";
        return str + ">" + this.innerHTML + "</" + this.tagName.toLowerCase() + ">";
    });

    HTMLElement.prototype.__defineGetter__("canHaveChildren", function () {
        return !/^(area|base|basefont|col|frame|hr|img|br|input|isindex|link|meta|param)$/.test(this.tagName.toLowerCase());
    });
}

//为Array添加方法
Array.prototype.min = function () {
    return Math.min.apply({}, this)
};

Array.prototype.max = function () {
    return Math.max.apply({}, this)
};

(function () {

    $.validationSettings = {
        lazyValidate: false
    };

    var ajaxStatusMap = {
        100: "参数非法",
        101: "登录失效，请重新登录",
        200: "图片验证码错误",
        300: "手机验证码错误",
        400: "验证码发送过于频繁",
        500: "服务器错误，请联系管理员",
        999: "没有参数",
        602: "发送过于频繁，请稍后再试",
        703: "没找到需要上传的文件",
        704: "文件太大了",
        705: "不允许的上传文件类型",
        1000: "手机号不合法",
        1001: "用户名不和规则",
        1002: "用户名已被占用",
        1003: "密码过长",
        1004: "密码过短",
        1005: "手机号格式不正确",
        1006: "此手机号码已被注册",
        1007: "验证码不正确",
        1008: "手机号跟用户名不匹配",
        1009: "用户不存在",
        1010: "请先发送短信验证码",
        10011: "验证码已过期，请重新发送",
        1012: "手机验证码不正确",
        1013: "请先完成第一步，填写基本信息",
        1014: "请先完成第二步，验证手机号",
        1015: "密码不合法",
        1016: "密码太简单",
		1017: "手机号码不存在",
        1018: "请先完成第一步，验证身份",
        1019: "输入密码和登录账号密码不符",
        1020: "输入身份证与实名认证的身份证号不一致",
        1021: "邮箱发送失败",
        1022: "录入身份证信息不合法",
        1023: "实名认证失败",
        1024: "实名认证失败次数超出限制",
        1025: "该身份信息已存在",
		1026: "录入用户名与登录时不一致",
        1029: "用户名不存在",
        1030:"邮箱地址格式有误",
        1031: "身份信息错误",
        1032: "身份证号与真实姓名不一致，请24小时后重新认证",//"实名认证失败，请明日重新操作",
        1033:"身份证号与真实姓名不一致，您还可以输入1次",// "实名认证失败，您还有1次认证机会，请重新输入",
        1034: "邀请码必须为6位数字、15位或18位身份证号",
        1035: "邀请码无效，请输入正确的邀请码",
        2000: "支付密码不正确",
        2001: "银行卡号不正确",
        2002: "银行卡号绑定重复",
        2003: "银行卡号绑定失败",
        2004: "银行卡绑定失败次数超出限制,请明天再来绑定",
		2005: "输入的支付密码与设置的支付密码不一致",
		2006: "出借金额不能为空",
		2007: "预期年化收益率不能为空",
		2008: "请选择出借期限",
		2009: "请选择还款方式",
        2010: "余额不足",
        2011: "债权已失效",
        2020: "债权余额不足",
		2040: "新手标新手才能买",
        2050: "优惠券无效",
        2051: "转账处理失败",
        2052: "可用余额不足",
        2053: "冻结余额不足",
        2054: "优惠券类型不匹配",
        2055: "优惠券已使用",
        2056: "优惠券已过期",
        1027: "当前操作发送邮件超过10封",
		1028: "邮箱地址已存在",
        2100: "支付密码锁定，<a href='/user/pay-pwd-find'class='red' target='_blank' >请重置</a>",
        2101: "支付密码不正确，您还有1次输入机会，请重新输入",
        2102: "支付密码不正确，您还有2次输入机会，请重新输入",
        2103: "支付密码不正确，您还有3次输入机会，请重新输入",
        2104: "支付异常",
        2201: "剩余可转让金额不足",
        2202: "债权转让信息状态不正确",
        2203: "不能购买自己的转让债权",
        2204: "转让债权信息找不到",
        2205: "购买债权不存在",
        2206: "不支持的转让类型",
        2207: "不足最短期限",
        2208: "派息前3个工作日不能发布转让信息",
        2209: "当天不能发布转让信息",
        2210: "数量不足",
        2301:"该计划已募集完成",//"您购买的银多利已经关闭",
        2302:"您购买的银多利支付失败",
        2303:"您购买的银多利不存在",
        2304:"该笔债权剩余可出借金额不足",//"您购买的银多利剩余金额不足"
        2401:"该笔债权已售空",//"您购买的银多利已经关闭",
        2402:"您购买的月盈利支付失败",
        2403:"您购买的月盈利不存在",
        2404:"该笔债权剩余可出借金额不足",//"您购买的银多利剩余金额不足"
        2405:"您购买的月盈利未到发布日期",
        2406:"您的支付金额必须是计划的剩余金额",
        2407:"您的支付金额必须是递增金额的整数倍"

        //1017:"验证码已过期请重新发送",
        //1018:"请先发送短信验证码",
        //1019:"请先完成第一步，验证旧手机号码",
        //1020:"输入手机号和登录账号不符",
        //1021:"输入邮箱和登录账号不符",
        //1022:"请先绑定邮箱",
        //1023:"密码太长",
        //1024:"密码太短",
        //1025:"旧手机号不正确",
        //1026:"远程服务返回空",
        //1027:"请先完成注册第一步，完成基本信息"
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
            if(typeof ygModal == 'object'){
                ygModal.alert(msg);
            }else{
                alert(msg)
            }
        }
    }

    function ajaxError(xhr, error, textStatus) {
        $.utils.hideLoading();
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

            if(options.showLoading){
                $.utils.showLoading();
            }
        }
        $._ajax.apply($, arguments);
    }

    var noop = $.noop;

    if (!window.console) {

        var console_log = function () {
            var res = [], args = arguments;
            for (var i = 0, al = args.length; i < al; i++) {
                if (typeof args[i] == 'object') {
                    res.push("{Object}");
                } else {
                    res.push(args[i]);
                }
            }
            return res.join(' ');
        }

        window.console = {
            log: console_log,
            warn: console_log,
            error: console_log
        }
    }

    if (!Date.now) {
        Date.now = function () {
            return (new Date).getTime();
        }
    }

    Date.prototype.format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (v) {
            for (var i = 0, ilen = this.length; i < ilen; i++) {
                if (this[i] == v) {
                    return i;
                }
            }
            return -1;
        }
    }
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function (cal) {
            if (typeof cal != 'function') return;
            for (var i = 0, ilen = this.length; i < ilen; i++) {
                cal && cal.call(this, this[i], i, this);
            }
        }
    }

    if (!Array.prototype.filter) {
        Array.prototype.filter = function (cal) {
            if (typeof cal != 'function') return;
            var res = [];
            for (var i = 0, ilen = this.length; i < ilen; i++) {
                var tmp = cal.call(this, this[i], i, this);
                if (tmp === true) {
                    res.push(this[i]);
                }
            }
            return res;
        }
    }
    if (!Array.prototype.map) {
        Array.prototype.map = function (func) {
            if (!func) return;
            var len = this.length, res = [];
            for (var i = 0; i < len; i++) {
                res.push(func.call(this, this[i], i, this));
            }
            return res;
        }
    }

    if (!Function.prototype.bind) {
        Function.prototype.bind = function (context) {
            var self = this;
            return function () {
                self.apply(context, arguments);
            }
        }
    }

    Function.prototype.delay = function (time) {
        var self = this, tid;
        return function () {

            var args = arguments, _self = this;
            if (tid !== undefined) {
                clearTimeout(tid);
                tid = undefined;
            }
            tid = setTimeout(function () {
                tid = undefined;
                self.apply(_self, args);
            }, time);
        }
    };

    String.prototype.format = function(data){
        return this.replace(/({(.*?)})/g,function(a,b,c){
            return data[c] === undefined ? '' : data[c]
        })
    }

    //$.numberUpperCase = function(val){
    //	return val;
    //}

    $.numberUpperCase = function numberUpperCase(n) {

        if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
            return "数据非法";
        var unit = "万千佰拾亿千佰拾万千佰拾亿千佰拾万千佰拾元角分", str = "";
        n += "00";
        var p = n.indexOf('.');
        if (p >= 0)
            n = n.substring(0, p) + n.substr(p + 1, 2);
        unit = unit.substr(unit.length - n.length);
        for (var i = 0; i < n.length; i++)
            str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
        return str.replace(/零(千|佰|拾|角)/g, "零")
            .replace(/(零)+/g, "零")
            .replace(/零(万|亿|元)/g, "$1")
            .replace(/(亿)万|壹(拾)/g, "$1$2")
            .replace(/^元零?|零分/g, "")
            .replace(/元$/g, "元整");
    }

    function _prec(str, len, filler) {
        if (str.length > len) {
            return str.substring(0, len);
        } else if (str.length < len) {
            filler = filler || '0';
            for (var i = 0, os = len - str.length; i < os; i++) {
                str += filler;
            }
            return str;
        }
        return str;
    }

    $.numberFormat = function (val, precision) {
        val = parseFloat(val);
        if (precision) {
            val = Math.round(val * Math.pow(10, precision)) / Math.pow(10, precision);
        }
        val += "";
        var vals = val.split('.'), digits = vals[0].split(''), fl = vals[1], res = '', i = digits.length - 1, j = 0, digit;
        while (digit = digits[i]) {
            if (j != 0 && j % 3 == 0) {
                res = "," + res;
            }
            res = digit + res;
            i--, j++;
        }
        if (precision) {
            fl ? (fl = _prec(fl, precision)) : (fl = _prec('', precision));
            return res + '.' + fl;
        } else if (fl) {
            return res + '.' + fl;
        }
        return res;
    };

    $.getClipBoardData = function(evt){
        var pastedText ="";
        if (window.clipboardData && window.clipboardData.getData) { // IE
            pastedText = window.clipboardData.getData('Text');
        } else {
            pastedText = evt.originalEvent.clipboardData.getData('Text');//e.clipboardData.getData('text/plain');
        }
        return pastedText;
    }

    if (!
            /*@cc_on!@*/
            0) return;
    var e = "abbr, article, aside, audio, canvas, datalist, details, dialog, eventsource, figure, footer, header, hgroup, mark, menu, meter, nav, output, progress, section, time, video".split(', ');
    var i = e.length;
    while (i--) {
        document.createElement(e[i])
    }



})()



