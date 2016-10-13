/**
 * Created by liujiangtao on 2015/12/11 0011. verifyInviteCode
 */
define('common/config',[],function(require,exports,module){

    var mode = 0;//0:online,1:lan debug,2:local debug

    var apiMap = {
        login:"/login",
        verifyCodeImg:"/captcha/captcha.jpg",
        verifyCodeMsg:"/u/sendsmscode",
        doRegister:"/joining",
        verifyIdentity:"/registerVerifyCode",
        verifyIdentity4fp:"/getBackPasswordVerifyCode",
        getBackPassword:"/getBackPassword",
        setPassword:"/resetPassword",
        getUserMessage:"/u/getUserMsg",  //
        delUserMessage:"/u/delNotice",
        getMessageDetail:"/u/getNoticeDetail",
        getInvestRecord:'/personal/findInvestmentRecord',
        upload:"/basic/upload",
        submitChangeCardData:'/user/changeCardData',
        sendVerifyMail:"/personal/modifyMobileByEmail",
        userVerifyNBindCard:"/user/verifyNBindCard",

        getAllProv:"/dict/getAllProv",
        //params  (Integer provCd)
        getOneProv:"/dict/getOneProv",
        getAllCity:"/dict/getAllCity",
        //params (Integer provCd)
        getCityByProv:"/dict/getCityByProv",
        getAllBank:"/dict/getAllBank",
        //提现的接口
        withdrawals:'/u/cash',
        //加入记录接口
        //(int type,page  page)
        productPurchaseRecords:"/product/buyList",
        /*productPurchaseRecords:{
            url:'/product/buyList',
            params:['type','page.size','page.current'],
            method:"get",
            //data:[]
        },*/
        //个人中心-投资管理
        getWealthOrderList:"/personal/getWealthOrderList",
        //购买
        orderPay:"/u/pay",
        //支付记录
        getRecordMessage:"",

        about_monitor_report:"/about/monitor_report/list",
        //我的账户-优惠劵
        getCouponList: '/u/getCupon',

        checkUserExist:"/checkUserNameIsExist",
        unbindcard:"/u/getUserBankcardDto",
        unbindcard_model:"/u/cancelBindingBankcard",
        phoneNumberBounded:"/cgi/queryUserByMobile",
        verifyInviteCode:"/verifyInviteCode",
        //找回用户名
        userNameFind:'/findusername'

        };

    var api = (function(){
        var res = {},
            prefix = mode == 2 ? "/yingu_ol/api" : "";

        for(var p in apiMap){
            res[p] = prefix+apiMap[p];
        }
        return res;
    })();

    exports = {
        mode:mode,
        api:api,
        formPatterns:{
            username:/^[a-zA-Z][0-9a-zA-Z]+$|^1[3578]\d{9}$/,
            usernameOnly:/^[a-zA-Z][0-9a-zA-Z]+$/,
            password:/^[0-9a-zA-Z~!@#$%^&*\-_\.]{8,16}$/,
            phoneNumber:/^1[34578]\d{9}$/,
            verifyCode:/^[0-9a-zA-Z]{4}$/,
            verifyCodeMsg:/^[0-9a-zA-Z]{6}$/,
            verifyCodeMsg_n:/^[0-9]{6}$/,
            email:/^.+@(\w+\.)+\w+$/,
            fullName:/^[0-9a-zA-Z\.\u0391-\uFFE5]{2,}$/,
            idCode:/^[0-9]{17}[0-9Xx]$|^[0-9]{15}$/,
            idFatom:/^\d{6}$/,
            inviteCode:/^\d{6}$|^[0-9]{17}[0-9Xx]$|^[0-9]{15}$/,
            //军官证
            oidCode:/^[0-9]{8}$/
        }
    }


    module.exports = exports;
});