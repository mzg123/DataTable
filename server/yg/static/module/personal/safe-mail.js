define("personal/safe-mail", ['ui/validation/validation', "ui/modal/modal","common/config"], function (require, exports, module) {
        var modal = require('ui/modal/modal');

        require('ui/validation/validation');
        var config = require('common/config');

        exports.run = function () {
			initEvent();

            if(typeof __globalData !== 'undefined' && __globalData.errorMsg){
                modal.alert(__globalData.errorMsg);
            }

            //短信获取验证码

            $("#getMsg").on("click", function () {
                if ($(this).hasClass("btn_disable")) {
                    return;
                }
                else {

                    $.ajax({
                        type: "post",
                        url: __globalData.sendVerifyCode,
                        data: {},
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


            //验证身份
            var btnValid = $("#users");
            btnValid.on('click', function () {
                if (btnValid.hasClass("btn_disable")) {
                    return;
                } else {
                    $("#usersForm").submit();
                }

            });

            function submitIdentify(data){
                $.ajax({
                    url:'/u/checkMailStatus',
                    type:'post',
                    data:data,
                    showLoading:true,
                    success:function(res){
                        window.location.href  = "/user/safe-mail";
                    }
                })
            }

            $("#usersForm").validate({
                submitHandler: function () {
                    submitIdentify($("#usersForm").data('validator').getFormData())
                    return false;
                },
                errorHandler: function (errs) {
                    btnValid["addClass"]("btn_disable");
                },
                passedHandler: function () {
                    btnValid["removeClass"]("btn_disable");
                },
                enterSubmit:false,
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
            },function(validator){
                var isValid = validator.isValid;
                btnValid[isValid ? "removeClass" : "addClass"]("btn_disable");
            });

            //设置邮箱
            function _ajax(data){
                $.ajax({
                    dataType:"json",
                    data:data,
                    url:"/u/safeMailAuth",
                    showLoading:true,
                    type:"post",
                    success:function(res){
                        $("#setMailSuccess").show();
						$("#setMailForm").hide();
						$("#setMail").hide();
                    }

                });
            }
            //重新发送
            $("#sendAgain").on('click', function () {
                $("#setMailForm").submit();
            });
            //发送
            var btnValid2 = $("#setMail");
            btnValid2.on('click', function () {
                var _value = $("#mailWrong").val();
                $(".mailValue").text(_value);
								$("#viewMail").attr('mail',_value);
                if (btnValid2.hasClass("btn_disable")) {
                    return;
                } else {
                    $("#setMailForm").submit();
                    //_ajax();

                }

            });
            //返回修改
            $("#returnModify").on("click",function(){
                $("#setMailSuccess").hide();
                $("#setMailForm").show();
							$("#setMail").show();
            });


            $("#setMailForm").validate({
                submitHandler: function () {
                    _ajax(this.getFormData());
                    return false;
                },
                errorHandler: function (errs) {
                    btnValid2["addClass"]("btn_disable");
                },
                passedHandler: function () {
                    btnValid2["removeClass"]("btn_disable");
                },
                enterSubmit:false,
                selectById:true,
                fields: {
                    mailWrong: {
                        required: true,
                        pattern: config.formPatterns.email,
                        output: "#mailWrongTip"
                    }

                },
                errorMessage: {
                    mailWrong: {
                        required: "<i class='icon_tips' ></i>请输入邮箱地址",
                        pattern: "<i class='icon_tips' ></i>邮箱格式不正确"
                    }

                }
            },function(validator){
                var isValid2 = validator.isValid;
                btnValid2[isValid2 ? "removeClass" : "addClass"]("btn_disable");
            });




        }

		function initEvent(){
			$("#viewMail").on('mousedown',viewMail)
		}

		var hash={
			'qq.com': 'http://mail.qq.com',
			'gmail.com': 'http://mail.google.com',
			'sina.com': 'http://mail.sina.com.cn',
			'163.com': 'http://mail.163.com',
			'126.com': 'http://mail.126.com',
			'yeah.net': 'http://www.yeah.net/',
			'sohu.com': 'http://mail.sohu.com/',
			'tom.com': 'http://mail.tom.com/',
			'sogou.com': 'http://mail.sogou.com/',
			'139.com': 'http://mail.10086.cn/',
			'hotmail.com': 'http://www.hotmail.com',
			'live.com': 'http://login.live.com/',
			'live.cn': 'http://login.live.cn/',
			'live.com.cn': 'http://login.live.com.cn',
			'189.com': 'http://webmail16.189.cn/webmail/',
			'yahoo.com.cn': 'http://mail.cn.yahoo.com/',
			'yahoo.cn': 'http://mail.cn.yahoo.com/',
			'eyou.com': 'http://www.eyou.com/',
			'21cn.com': 'http://mail.21cn.com/',
			'188.com': 'http://www.188.com/',
			'yingu.com':'http://mail.yingu.com/',
			'foxmail.com': 'http://www.foxmail.com'
		};

		function viewMail(){
			var self = $(this),
			email = $.trim(self.attr('mail'));//$.trim();
			if(!email) return;
            var mailSufix = email.split("@")[1].toLowerCase();
            var url = hash[mailSufix] || ('http://mail.'+mailSufix);
			self.attr('target','_blank')
                .attr('href',url);
		}
    }
)
;

