define("personal/money_redemption", ["ui/verifyInput/VerifyInput","ui/modal/modal","common/config", 'ui/validation/validation','ui/notify/jquery.noty.packaged'], function (require, exports, module) {

    //产品详情依赖的模块

    var modal = require('ui/modal/modal');
    var VerifyInput = require("ui/verifyInput/VerifyInput");
    var config = require('common/config');
    require('ui/validation/validation');

    //短信获取验证码

    $("#getMsg").on("click", function () {
        if ($(this).hasClass("btn_disable")) {
            return;
        }
        else {
            $.ajax({
                type: "post",
                url: config.api.verifyCodeMsg,
                //data: {},
                dataType: "json",
                success: function (data) {
                    noty({text:'短信验证码已发送至您的手机，请输入短信中的验证码。',timeout:3000});
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
                            $("#showbox").text(countdown +"s");
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
                    noty({text:'短信验证短信发送失败，请重新发送！',timeout:3000});


                }

            });

        }

    });
    //提现信息确认弹窗
    exports.run = function () {
        var btnValid = $("#submitRedemption");
        btnValid.on('click', function () {
            if (btnValid.hasClass("btn_disable")) {
                return;
            } else {
                $.ajax({
                    type: "post",
                    url: "",
                    data: {},
                    dataType: "json",
                    success: function (data) {
                        modal.show({
                            title: "赎回",
                            content: $("#redemptionModel").html(),
                            size:{width:650,height:250},
                            showFoot: true,
                            showClose: true,
                            buttons: [
                                {
                                    name: "关闭",
                                }

                            ]
                        })

                    },
                    exception: function (data) {
                        //modal.show({
                        //    title: "赎回",
                        //    content: $("#redemptionModelWrong").html(),
                        //    size: {width: 650, height: 200},
                        //    showFoot: true,
                        //    showClose: true,
                        //    buttons: [
                        //
                        //        {
                        //            name: "关闭",
                        //
                        //        }
                        //
                        //    ]
                        //});
                    }

                });
            }


        });
        var vp = new VerifyInput({input: "#vrCode"});

       $("#shuhuiForm").validate({
            submitHandler: function () {

            },
            errorHandler: function (errs) {
                btnValid[ "addClass" ]("btn_disable");
            },
            passedHandler:function(){
                btnValid[ "removeClass" ]("btn_disable");
            },
            fields: {

                codeWrong: {
                    required: true,
                    pattern: /^\d{6}$/,
                    output: "#codeWrongTip"

                },
                verifyCode: {
                    required: true,
                    pattern: /^\d{6}$/,
                    output: "#passWordTip"

                }
            },
            errorMessage: {

                codeWrong: {
                    required: "<i class='icon_tips' ></i>请输入验证码",
                    pattern: "<i class='icon_tips' ></i>验证码由6位数字组成",
                },
                verifyCode: {
                    required: "<i class='icon_tips' ></i>请输入支付密码",
                    pattern: "<i class='icon_tips' ></i>支付密码由6位数字组成"
                }
            }
        },function(validator){
           var isValid = validator.isValid;
           btnValid[isValid ?  "removeClass": "addClass" ]("btn_disable");

       });




    }

});

