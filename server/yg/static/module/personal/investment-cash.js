define("personal/investment-cash", ["ui/verifyInput/VerifyInput", 'ui/notify/jquery.noty.packaged', "ui/modal/modal", 'ui/validation/validation', "common/config", 'ui/select/select'], function (require, exports, module) {

    //产品详情依赖的模块

    var VerifyInput = require("ui/verifyInput/VerifyInput");
    var modal = require('ui/modal/modal');
    require('ui/validation/validation');
    var config = require('common/config');
    require('ui/select/select');


    //选择银行select
    $("#tixianForm #chooseMyBank").ygSelect({
        width: 500,
        height: 36,
        dataSource: function () {

            var fragment = $($("#bankTemplate").html().trim()),
                result  =[];

            fragment.each(function(i,v){
                var tmp = $(v);
                if(tmp.hasClass('chooseMy')){
                    result.push({
                        value: tmp.attr("value"),
                        display: v.outerHTML
                    })
                }
            });

            return result;
        }
    });

    //提现信息确认弹窗
    exports.run = function () {

        //未设置支付密码弹窗
        if (__globalData.userState) {
            showForcePay();
        }
        function showForcePay(){
            var content;
            switch (__globalData.userState){
                case 1:
                    content = $("#setPassword").html();
                    break;
                case 2:
                    content = $("#authentication").html();
                    break;
                case 3:
                    content = $("#needBindCard").html();
                    break;
            }

            modal.show({
                title: "提示",
                content: content,
                size: {width: 650, height: 200},
                showFoot: false,
                showClose: false,
                buttons: [
                    {
                        name: "关闭"
                    }
                ]

            });
        }

        var chooseOtherBank = $("#chooseOtherBank");
        //使用新银行卡

        $("#chooseNewBankBtn").on("click", function () {


            $("#chooseNewBank").hide();
            $("#backMyBank").show();

        });
        //返回我的银行卡
        $("#backMyBankBtn").on("click", function () {
            $("#chooseNewBank").show();
            $("#backMyBank").hide();
            $("#bank").val("");

        });
        //选择其他银行
        $("#chooseOtherBankBtn").on("click", function () {
            $("#backMyBank").show();
            chooseOtherBank.hide();
        });
        //更多银行
        $("#moreBankBtn").on("click",function(){
            $(this).hide();
            $("#moreBank").show();
        });

        //网银支付使用新银行卡
        var bankChoose = $("#bankChoose .choose");
        bankChoose.click(function () {
            var self = $(this);
            bankChoose.removeClass("on");
            self.addClass("on");
            $("#bank").val(self.attr('bank-code')).trigger('change');
            $("#backMyBank").hide();
            chooseOtherBank.show();

            var imgSrc = $("#bankChoose .choose.on").children("img").attr("src");
            var bankNameValue = $("#backMyBank .choose.on").attr("bank-name");
            var bankCodeValue = $("#backMyBank .choose.on").attr("bank-code");
            chooseOtherBank.children().children().children("img").attr("src", imgSrc);
            chooseOtherBank.children().children().attr("bank-name", bankNameValue);
            chooseOtherBank.children().children().attr("bank-code", bankCodeValue);
            return false;
        });
        //短信获取验证码

        $("#getMsg").on("click", function () {

            if ($(this).hasClass("btn_disable")) {
                return;
            }
            else {
                $.ajax({
                    type: "post",
                    url: config.api.verifyCodeMsg + "/SMS_100_403",
                    //data: {},
                    dataType: "json",
                    success: function (data) {

                        noty({text: '短信验证码已发送至您的手机，请输入短信中的验证码。', timeout: 3000});
                        var countdown = 60;

                        function settime(obj) {
                            if (countdown == 0) {
                                $("#phoneTip").hide();
                                $("#getMsg").removeClass("btn_disable");
                                $("#showbox").text();
                                countdown = 60;
                                return;
                            } else {
                                $("#phoneTip").show();
                                $("#getMsg").addClass("btn_disable");
                                $("#showbox").text(countdown + "s");
                                countdown--;
                            }
                            setTimeout(function () {
                                    settime(obj)
                                }
                                , 1000)
                        }

                        settime(this);

                    },
                    error: function (data) {

                        noty({text: '短信验证短信发送失败，请重新发送！', timeout: 3000});

                    }

                });

            }

        });
        //提现
        var btnValid = $("#submitCash");
        btnValid.on('click', function () {
            if(__globalData.userState){
                showForcePay();
                return;
            }
            if (btnValid.hasClass("btn_disable")) {
                return;
            } else {
                if ($("#bank").val()) {
                    btnValid.attr("href", "http://www.baidu.com");

                } else {
                    //$("#tixianForm").submit();
                    doWidthdrawals($("#tixianForm").data('validator').getFormData());

                }

            }
        });

        function doWidthdrawals(data){

            $.ajax({
                type: "post",
                url: config.api.withdrawals,
                data: data,
                dataType: "json",
                success: function (data) {
                    //modal.show({
                    //    title: "提现",
                    //    content: $("#cashSuccess").html(),
                    //    size: {width: 650, height: 220},
                    //    showFoot: true,
                    //    showClose: false,
                    //    buttons: [
                    //        {
                    //            name: "关闭",
                    //        }
                    //
                    //    ]
                    //})

                    location.href = data.data;

                },
                //error: function (data) {
                //    modal.show({
                //        title: "提现",
                //        content: $("#cashWrong").html(),
                //        size: {width: 650, height: 220},
                //        showFoot: true,
                //        showClose: false,
                //        buttons: [
                //
                //            {
                //                name: "关闭",
                //
                //            }
                //
                //        ]
                //    })
                //}

            });
        }

        var vp = new VerifyInput({input: "#vrCode"});

        $("#tixianForm").validate({
            submitHandler: function () {
                var data = this.getFormData();
                doWidthdrawals(data);
                return false;
            },
            errorHandler: function (errs) {
                btnValid["addClass"]("btn_disable");
            },
            passedHandler: function () {
                btnValid["removeClass"]("btn_disable");
            },
            selectById:true,
            fields: {
                chooseMyBank:{
                    required:true,
                    output:'#chooseMyBankTip'
                },
                cashNum: {
                    required: true,
                    pattern: /^[\d\.]+$/,
                    minValue: 1,
                    //maxValue: 9999999999,
                    output: "#cashNumTip"
                },
                verifyCode: {
                    required: true,
                    pattern: /^\d{6}$/,
                    output: "#codeWrongTip"
                },
                //payPwd: {
                //    required: true,
                //    pattern: /^\d{6}$/,
                //    output: "#passWordTip"
                //}
            },
            errorMessage: {
                chooseMyBank:{
                    required:"<i class='icon_tips' ></i>请选择一张绑定的银行卡"
                },
                cashNum: {
                    required: "<i class='icon_tips' ></i>请输入金额",
                    //maxValue: "<i class='icon_tips' ></i>超出提现最大金额",
                    minValue: "<i class='icon_tips' ></i>请输入金额"
                },
                verifyCode: {
                    required: "<i class='icon_tips' ></i>请输入验证码",
                    pattern: "<i class='icon_tips' ></i>验证码由6位数字组成"
                },
                payPwd: {
                    required: "<i class='icon_tips' ></i>请输入支付密码",
                    pattern: "<i class='icon_tips' ></i>支付密码由6位数字组成"
                }
            }
        }, function (validator) {
            var isValid = validator.isValid;
            btnValid[isValid ? "removeClass" : "addClass"]("btn_disable");
        });


    }

});

