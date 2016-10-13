define("personal/safe-paymentFind", ['ui/validation/validation', "ui/modal/modal","common/config"], function (require, exports, module) {
        var modal = require('ui/modal/modal');

        require('ui/validation/validation');
        var config = require('common/config');

        var VMCD = "ppwdgtbck_vmcd";

        function vmCD(cd){
            var countdown = cd || 60;
            if(!cd){
                $.utils.setCD(VMCD,60);
            }
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
        }

        exports.run = function () {
            //短信获取验证码

            var vmcd = $.utils.getCD(VMCD,60);
            if(vmcd){
                vmCD(vmcd);
            }

            $("#getMsg").on("click", function () {
                if ($(this).hasClass("btn_disable")) {
                    return;
                }
                else {
                    $.ajax({
                        type: "post",
                        url: config.api.verifyCodeMsg + "/resetpaypwd",
                        // data: {},
                        dataType: "json",
                        success: function (data) {
                            modal.alert('短信验证码已发送至您的手机，请输入短信中的验证码。');
                            vmCD();
                        },
                        error: function (data) {
                            modal.alert('短信验证短信发送失败，请重新发送！');

                        }

                    });


                }

            });


            //验证身份
            var btnValid = $("#users");
            btnValid.on('click', function () {
                if (btnValid.hasClass("btn_disable")) {
                    return;
                } else {
                    $("#usersForm").submit();
                }

            });

            function submitUserForm(data){
                $.ajax({
                    url:'/u/verifyGetBackPayPwd',
                    type:'post',
                    data:data,
                    showLoading:true,
                    success:function(res){
                        window.location.href  = res.data;
                    }
                })
            }

            $("#usersForm").validate({
                submitHandler: function () {
                    submitUserForm(this.getFormData());
                    return false;
                },
                errorHandler: function (errs) {
                    btnValid["addClass"]("btn_disable");
                },
                passedHandler: function () {
                    btnValid["removeClass"]("btn_disable");
                },
                selectById:true,
                lazyValidate:true,
                fields: {
                    codeWrong: {
                        required: true,
                        pattern: /^\d{6}$/,
                        output: "#codeWrongTip"
                    },
                    idNum: {
                        required: true,
                        pattern:config.formPatterns.idCode,
                        output: "#idNumTip"
                    }
                    //passwordWrong: {
                    //    required: true,
                    //    pattern: /^\d{6}$/,
                    //    //validator: function () {
                    //    //    var value = $(this).val(), count = 0;
                    //    //    if (!value) return "<i class='icon_tips' ></i>请填写支付密码";
                    //    //
                    //    //    if (/\d+/.test(value))
                    //    //        count++;
                    //    //    if (/[a-zA-Z]+/.test(value))
                    //    //        count++;
                    //    //    if (/[^0-9a-zA-Z]+/.test(value))
                    //    //        count++;
                    //    //    if (count < 2) {
                    //    //        return "<i class='icon_tips' ></i>至少包含数字、字母（区分大小写）、符号中的2种"
                    //    //    }
                    //    //    if (value.length < 6 || value.length > 16) {
                    //    //        return "<i class='icon_tips' ></i>密码长度应在6~16位"
                    //    //    }
                    //    //},
                    //    output: "#passwordWrongTip"
                    //}

                },

                errorMessage: {
                    codeWrong: {
                        required: "<i class='icon_tips' ></i>请输入短信验证码",
                        pattern: "<i class='icon_tips' ></i>短信验证码不正确"
                    },
                    idNum: {
                        required: "<i class='icon_tips' ></i>请输入身份证号",
                        pattern: "<i class='icon_tips' ></i>身份证号不正确"
                    }
                    //passwordWrong: {
                    //    required: "<i class='icon_tips' ></i>请填写支付密码",
                    //    pattern: "<i class='icon_tips' ></i>支付密码由6位数字组成"
                    //}
                }
            }, function (validator) {
                var isValid = validator.isValid;
                btnValid[isValid ? "removeClass" : "addClass"]("btn_disable");
            });
            //设置新密码
            var btnValid2 = $("#submit");
            btnValid2.on('click', function () {
                if (btnValid2.hasClass("btn_disable")) {
                    return;
                } else {
                   $.ajax({
                        url:'/u/getBackPayPwd',
                        type:'post',
                       showLoading:true,
                        data:$("#setpasswordForm").data('validator').getFormData(),
                        success:function(res){
							$("#safePaymentFind").hide();
							$("#setPaymentSucess").show();
                           // window.location.href  = res.data;
                        }
                    })
                }

            });
            //验证新密码
            $("#setpasswordForm").validate({
                submitHandler: function () {

                },
                errorHandler: function (errs) {
                    btnValid2["addClass"]("btn_disable");
                },
                passedHandler: function () {
                    btnValid2["removeClass"]("btn_disable");
                },
                selectById:true,
                lazyValidate:true,
                fields: {
                    passwordWrong: {
                        required: true,
                        pattern: /^\d{6}$/,
                        //validator: function () {
                        //    var value = $(this).val(), count = 0;
                        //    if (!value) return "<i class='icon_tips' ></i>请填写支付密码";
                        //
                        //    if (/\d+/.test(value))
                        //        count++;
                        //    if (/[a-zA-Z]+/.test(value))
                        //        count++;
                        //    if (/[^0-9a-zA-Z]+/.test(value))
                        //        count++;
                        //    if (count < 2) {
                        //        return "<i class='icon_tips' ></i>至少包含数字、字母（区分大小写）、符号中的2种"
                        //    }
                        //    if (value.length < 6 || value.length > 16) {
                        //        return "<i class='icon_tips' ></i>密码长度应在6~16位"
                        //    }
                        //},
                        output: "#passwordWrongTip"
                    },
                    passwordWrong2: {
                        required: true,
                        pattern: /^\d{6}$/,
                        validator: function () {
                            var value = $("#passwordWrong").val();
                            var value2 = $("#passwordWrong2").val();
                            if(!value) return "<i class='icon_tips' ></i>两次密码不一致";
                            if (value != value2) return "<i class='icon_tips' ></i>两次密码不一致";

                        },
                        output: "#passwordWrongTip2"
                    }

                },
                errorMessage: {
                    passwordWrong: {
                        required: "<i class='icon_tips' ></i>请输入支付密码",
                        pattern: "<i class='icon_tips' ></i>支付密码由6位数字组成"
                    },
                    passwordWrong2: {
                        required: "<i class='icon_tips' ></i>两次密码不一致",
                        pattern: "<i class='icon_tips' ></i>两次密码不一致"
                    }
                }
            }, function (validator) {
                var isValid2 = validator.isValid;
                btnValid2[isValid2 ? "removeClass" : "addClass"]("btn_disable");
            });


        }


    }
)
;

