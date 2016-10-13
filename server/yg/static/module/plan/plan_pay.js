define("plan/plan_pay", ["ui/verifyInput/VerifyInput", "ui/modal/modal", 'ui/validation/validation', "common/config", ], function (require, exports, module) {

    //产品详情依赖的模块

    var VerifyInput = require("ui/verifyInput/VerifyInput");
    var modal = require('ui/modal/modal');
    require('ui/validation/validation');
    var config = require('common/config');



    //提现信息确认弹窗
    exports.run = function () {
        var vp = new VerifyInput({input: "#verifyCode"});

        //短信获取验证码

        $("#getMsg").on("click", function () {

            if ($(this).hasClass("btn_disable")) {
                return;
            }
            else {
                $.ajax({
                    type: "post",
                   	 url: __globalData.sendVerifyCode,
                    //data: {},
                    dataType: "json",
                    success: function (data) {
                        modal.alert('短信验证码已发送至您的手机，请输入短信中的验证码。');
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
                        modal.alert('短信验证短信发送失败，请重新发送！');

                    }

                });

            }

        });
        //支付
        var btnValid = $("#btnPay");
        btnValid.on('click', function () {
            //if(__globalData.userState){
            //    showForcePay();
            //    return;
            //}
            if (btnValid.hasClass("btn_disable")) {
                return;
            }
            doWidthdrawals($("#productPayForm").data('validator').getFormData());
        });

        function doWidthdrawals(data){
        	
        	data.amount = $("#amount").val();
        	data.planId = $("#planId").val();

            $.ajax({
                type: "post",
                url: '/u/uPlanPay',
                data: data,
                dataType: "json",
                showLoading:true,
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



        $("#productPayForm").validate({
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
                    pattern: "<i class='icon_tips' ></i>验证码由6位数字组成"
                },
                verifyCode: {
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

