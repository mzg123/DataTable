
var option= {
    parentCon: "login",
    missUserHandle: function () {
        alert("忘记用户名");
    }
    , missPSHandle: function () {
        alert("忘记密码");
    }
    , registerHandle: function () {
        alert("注册");
    }
    ,valityFormHandle:function(){

    }
    //, missUserUrl:"http://www.baidu.com"
    // , missPSUrl:"http://www.baidu.com"
    // , registerUrl:"http://www.baidu.com"
}
require("../block/login_1/login_1.css");
require("../block/login_1/login_1.js").init(option);

var d={
    formId:"loginform",
    submitHandler: function () {},
    errorHandler: function (errs) {},
    passedHandler: function () {},
    fields: [
        {    name:"username"
            , validRule:[
            { required: true},
            {maxValue: 20000000}
        ],
            errorMsg:[
                {   required: "<i class='icon_tips' ></i>投资金额为500的整数倍且不能为空"},
                {  maxValue: "<i class='icon_tips' ></i>请输入有效金额不能大于"}
            ],
            output: "usernameerror",
            validator : function(){
            }

        }
    ],
    errorMessage: {
        money: {
            required: "<i class='icon_tips' ></i>投资金额为500的整数倍且不能为空",
            maxValue: "<i class='icon_tips' ></i>请输入有效金额不能大于"
            //pattern: "<i class='icon_tips' ></i>请输入有效金额"
        }
    }
};

require("../block/validation/validation.js").valid(d);



























