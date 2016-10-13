/**
 * Created by giantliu on 15/10/14.
 */
define('register/login', ['common/base', 'common/config', 'ui/validation/validation', 'ui/modal/modal'], function (require, exports, module) {
    require('ui/validation/validation');
    var modal = require('ui/modal/modal');
    var config = require('common/config');
    document.domain = 'yingu.com';
    function initEvent() {

        $("#submit").on('click', submit);
        $("#userName").bind("focus", function () {
            $(this).css("background-position","3px -201px");
        }).bind("blur", function () {
            $(this).css("background-position"," 7px 2px");
        });
        $("#password").bind("focus", function () {
            $(this).css("background-position","3px -235px");
        }).bind("blur", function () {
            $(this).css("background-position","7px -34px");
        });

        $(".x").on('click', function () {

            var ipt = $(this).hide().prev();
            ipt.val("");
            ipt.trigger('validate');
        })

        if($.IsIE8()){
           $("#userName").addClass("input-box1");
            $("#password").addClass("input-box1");
        }
        //$("#userName").delegate("click",function(){
        //    $(".login_head").css("background","url(../image/register/login_head.png");
        //    //background: url(../image/register/login_icons.png)
        //})
    }

    function initValidator() {

        $("#loginForm").validate({
            submitHandler: function () {
                /* $.ajax({
                 url:config.api.login,
                 type:'post',
                 dataType:'json',
                 data:this.getFormData(),
                 success:function(res){
                 window.location.href  = res.data;
                 }
                 });
                 return false;*/
            },
            output: "../.et",
            enterSubmit: true,
            selectById: true,
            //lazyValidate:true,
            fields: {
                userName: {
                    required: true,
                    pattern: config.formPatterns.username,
                    minLength: 6,
                    maxLength: 20
                },
                password: {
                    required: true
                    //pattern:config.formPatterns.password
                }
            },
            errorMessage: {
                userName: {
                    required: "请输入用户名",
                    pattern: "用户名不存在",
                    minLength: "用户名不存在",
                    maxLength: "用户名不存在"
                },
                password: {
                    required: "请输入登录密码"
                    //pattern:"密码由8-16位字符构成"
                }
            }
        })

    }

    //记住用户名
    function save() {
        var username = $("#userName").val();
        var checked = $('#remember').attr('checked');

        if (checked) {
            $.utils.setCookie('userName', username, 0, undefined, 'yingu.com');
            //localStorage.setItem("name", username);
        } else {
            localStorage.removeItem("name");
            $.utils.delCookie('userName', undefined, 'yingu.com');
        }

    }


    function submit() {
        $("#loginForm").submit();
        save();
        /*$.ajax({
         url:config.api.login,
         type:'post',
         data:$("#loginForm").data('validator').getFormData(),
         success:function(res){
         window.location.href  = res.data;
         }
         })*/
    }

    function checkStatus() {
        if (__globalData.errorCode === 1) {
            $(".errorTip").html("<i class='icon_tips'></i><span>您输入的密码和用户名不匹配</span> <p>若24小时内同一用户名连续输错5次密码，将锁定该用户名4小时。您已输错1次。您可以找回登录密码。</p>");
        }
    }

    exports.run = function () {
        var localValue = $.utils.getCookie('userName');// localStorage.getItem("name");
        if (localValue) {
            $("#userName").val(localValue);
            $('#remember').prop('checked', true);
        }

        initEvent();

        initValidator();

        //adjust();

        checkStatus();
    };
    var step = 0, count = 4;
    var $inner = $("#inner");

    var autoTimer = window.setInterval(autoMove, 2000);

    function autoMove() {
        step++;
        if (step > count) {
            $inner.css("left", 0);
            step = 1;
        }
        $inner.stop().animate({left: -step * 475}, 1000);

    }

    //->左右切换
    $(".outer>a").click(function () {
        window.clearInterval(autoTimer);

        if ($(this).index() === 2) {
            step--;
            if (step < 0) {
                $inner.css("left", -count * 475);
                step = count - 1;
            }
            $inner.stop().animate({left: -step * 475}, 1000);
        } else {
            autoMove();
        }

        autoTimer = window.setInterval(autoMove, 2000);
    });
});