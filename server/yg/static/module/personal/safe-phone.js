define("personal/safe-phone", ['ui/validation/validation', "ui/modal/modal","common/config"], function (require, exports, module) {
        var modal = require('ui/modal/modal');

        require('ui/validation/validation');
        var config = require('common/config');

        function initEvent(){

            // $("#phoneNumber").on('change',function(){
            //     var self = $(this),
            //         val = self.val();

            //     if(!self.data('valid')) return;

            //     checkPhoneNumber(val);

            // }.delay(30))
        }

        function checkPhoneNumber(val){

            $.ajax({
                url:"/u/queryUserByMobile",
                type:'post',
                dataType:'json',
                data:{
                    phoneNumber:val
                },
                exception:function(){
                    $("#phoneNumberTip").html("<i class='icon_tips' ></i>此手机号已被注册");
                }
            })

        }

        exports.run = function () {
            //短信获取验证码

            $("#getMsg").on("click", function () {
                if ($(this).hasClass("btn_disable")) {
                    return;
                }
                else {
                    $.ajax({
                        type: "post",
                        url: config.api.verifyCodeMsg + "/modifymobile",
                        // data: {},
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
                            modal.alert('短信验证短信发送失败，请重新发送！');

                        }

                    });


                }

            });
            var isVerifyMsgCD = false,isPhonumberValid = false;
            $("#getMsg2").on("click", function () {
                if ($(this).hasClass("btn_disable")) {
                    return;
                }
                else {
                    $.ajax({
                        type: "post",
                        url: config.api.verifyCodeMsg + "/modifymobile",
                        data: {"phoneNumber" : $("#phoneNumber").val()},
                        dataType: "json",
                        success: function (data) {
                            modal.alert('短信验证码已发送至您的手机，请输入短信中的验证码。');
                            isVerifyMsgCD = true;
                            var countdown = 60;
                            function settime(obj) {
                                if (countdown <= 0) {
                                    $("#phoneTip").hide();
                                    isPhonumberValid && $("#getMsg2").removeClass("btn_disable");
                                    $("#showbox").text();
                                    countdown = 60;
                                    isVerifyMsgCD = false;
                                    return;
                                } else {
                                    $("#phoneTip").show();
                                    $("#getMsg2").addClass("btn_disable");
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
                            modal.alert('短信验证短信发送失败，请重新发送！');

                        }

                    });


                }

            });
            $("#phoneNumber").on('change',function(evt){
                var valid = isPhonumberValid = $(this).data('valid');
                if(valid && !isVerifyMsgCD){
                    $("#getMsg2").removeClass('btn_disable');
                }else{
                    $("#getMsg2").addClass('btn_disable');
                }
            }.delay(0));
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
                    url:'/u/verifyModifyPhonenumber',
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
                fields: {
                    codeWrong: {
                        required: true,
                        pattern: /^\d{6}$/,
                        output: "#codeWrongTip"
                    }

                },

                errorMessage: {
                    codeWrong: {
                        required: "<i class='icon_tips' ></i>请输入短信验证码",
                        pattern: "<i class='icon_tips' ></i>短信验证码不正确"
                    }
                }
            }, function (validator) {
                var isValid = validator.isValid;
                btnValid[isValid ? "removeClass" : "addClass"]("btn_disable");
            });
            //设置新手机号
            var btnValid2 = $("#submit");
            btnValid2.on('click', function () {
                if (btnValid2.hasClass("btn_disable")) {
                    return;
                } else {
                    //$("#setPhoneForm").submit();
					$.ajax({
                        url:'/u/modifyPhonenumber/modifymobilesuccess',
                        type:'post',
                        showLoading:true,
						data:$("#setPhoneForm").data('validator').getFormData(),
                        success:function(res){
                            window.location.href  = res.data;
                        }
                    })
                }

            });
            //验证新手机号
            $("#setPhoneForm").validate({
                submitHandler: function () {

                },
                errorHandler: function (errs) {
                    btnValid2["addClass"]("btn_disable");
                },
                passedHandler: function () {
                    btnValid2["removeClass"]("btn_disable");
                },
                selectById:true,

                fields: {
                    phoneNumber: {
                        required: true,
                        pattern: config.formPatterns.phoneNumber,
                        output: "#phoneNumberTip"
                    },
                    codeWrong: {
                        required: true,
                        pattern: /^\d{6}$/,
                        output: "#codeWrongTip"
                    }

                },
                errorMessage: {
                    phoneNumber: {
                        required: "<i class='icon_tips' ></i>请输入手机号",
                        pattern: "<i class='icon_tips' ></i>手机号不正确"
                    },
                    codeWrong: {
                        required: "<i class='icon_tips' ></i>请输入短信验证码",
                        pattern: "<i class='icon_tips' ></i>短信验证码不正确"
                    }
                }
            }, function (validator) {
                var isValid2 = validator.isValid;
                btnValid2[isValid2 ? "removeClass" : "addClass"]("btn_disable");
                isPhonumberValid = $("#phoneNumber").data('valid')
                $("#getMsg2")[isPhonumberValid?'removeClass':'addClass']('btn_disable')
            });

            initEvent();
        }


    }
)
;

