var d={
    formId:"loginform",
    submitHandler: function () {},
    errorHandler: function (errs) {},
    passedHandler: function () {},
    fields: [
        {    name:"username"
            ,validRule:{
            required: true,
            minLength: 1,
            maxLength: 3,
            pattern: /^[a-z]{1,20}/
            //,minValue: 200
            //, maxValue: 2000
        },
            errorMsg:{
                required: "用户名不能为空",
                minLength: "长度最小20",
                maxLength: "长度最大20",
                pattern: "正则表达式错误",
                minValue: "请输入有效金额不能小于200",
                maxValue: "请输入有效金额不能大于2000"
            },
            output: "usernameerror",
            validator : function(){
            }
        }
        , {    name:"password"
            ,validRule:{
                required: true,
                maxValue: 20000000
            },
            errorMsg:{
                required: "密码不能为空",
                maxValue: "请输入有效金额不能大于"
            },
            output: "passworderror",
            validator : function(){
            }
        }
    ],
    errorMessage: {
        money: {
            required: "投资金额为500的整数倍且不能为空",
            maxValue: "请输入有效金额不能大于"
            //pattern: "<i class='icon_tips' ></i>请输入有效金额"
        }
    }
};

require("./validation.js").init(d);