/**
 * Created by liujiangtao on 2015/12/8 0008.
 */
define('register/getBackUsername', ['ui/validation/validation', 'ui/modal/modal', 'common/config'], function (require, exports, module) {

    require('ui/validation/validation');
    var modal = require('ui/modal/modal'),
        config = require('common/config');

    function refreshVerifyCode() {

        $("#vcImg").attr("src", config.api.verifyCodeImg + "?_t=" + Math.random());
        $("#verifyCode").val("");
    }

    function initEvent() {

        //提交
        var btnValid = $("#submit");
        btnValid.on('click', function () {
            if ($(this).hasClass('btn_disable')) {
                return;
            } else {
                //$("#userNameForm").submit();
                $.ajax({
                    url: config.api.userNameFind,
                    type: 'post',
                    dataType: "json",
                    data: $("#userNameForm").data('validator').getFormData(),
                    success: function (res) {
                        $("#findUserName").hide();
                        $("#findUserSuccess").show();
                    },
                    exception:function(){
                        refreshVerifyCode();
                    }
                })
            }

        });
        //验证码
        $("#refreshVC").on('click', refreshVerifyCode);
        $("#vcImg").on('click', refreshVerifyCode);
    }

    function checkVerifyCodeSync(val){
        var isUsed;
        $.ajax({
            url:'/checkCaptcha',
            type:'get',
            dataType:"json",
            async:false,
            data:{
                securityCode:val
            },
            success:function(){},
            exception:function(){
                isUsed = "<i class='icon_close' ></i>验证码错误"
                return false;
            }
        });
        return isUsed;
    }

    function initValidation() {

        $("#userNameForm").validate({
                submitHandler: function () {
                    return false;
                },
                errorHandler: function (errs) {
                    $("#submit").addClass('btn_disable')
                },
                passedHandler: function () {
                    $("#submit").removeClass('btn_disable');
                },
                enterSubmit: false,
                selectById: true,
                lazyValidate:true,
                fields: {
                    phoneNumber: {
                        required: true,
                        pattern: config.formPatterns.phoneNumber,
                        output: "#telWrong"

                    },
                    id: {
                        required: true,
                        pattern: config.formPatterns.idCode,
                        output: "#idWrong"
                    },
                    verifyCode: {
                        required: true,
                        pattern:config.formPatterns.verifyCode,
                        validator:function(){
                            var val = $(this).val();
                            if(!val){
                                return "<i class='icon_close' ></i>请输入验证码";
                            } else if(!config.formPatterns.verifyCode.test(val)){
                                return "<i class='icon_close' ></i>验证码错误";
                            } else{
                                return checkVerifyCodeSync(val);
                            }
                        },
                        output: "#codeWrong"
                    }

                },
                okMessage: {
                    phoneNumber: "<i class='icon_ok' ></i>",
                    id: "<i class='icon_ok' ></i>",
                    verifyCode: "<i class='icon_ok' ></i>"

                },
                errorMessage: {
                    phoneNumber: {
                        required: "<i class='icon_close' ></i>请输入手机号",
                        pattern: "<i class='icon_close' ></i>手机号不正确"
                    },
                    id: {
                        required: "<i class='icon_close' ></i>请输入身份证号码",
                        pattern: "<i class='icon_close' ></i>身份证号码不正确"

                    },
                    verifyCode: {
                        required: "<i class='icon_close' ></i>请输入验证码",
                        pattern: "<i class='icon_close' ></i>验证码错误"
                    }

                }
            }, function (validator) {
                var isValid = validator.isValid;
                $("#submit")[isValid ? "removeClass" : "addClass"]("btn_disable");
            }
        );


    }


    function run() {

        initEvent();

        initValidation();

    }

    run();

});