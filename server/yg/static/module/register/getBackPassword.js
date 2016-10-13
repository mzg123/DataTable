/**
 * Created by liujiangtao on 2015/12/8 0008.
 */
define('register/getBackPassword',['ui/validation/validation','ui/modal/modal','common/config'],function(require,exports,module){

    require('ui/validation/validation');
    var modal = require('ui/modal/modal'),
        config = require('common/config'),
        validator1,validator2,validator3,curStepIndex = 0,curPhoneNumber,curCaptcha;

    var steps = ['verify1','verify2','set-pwd'],
        stepsMap = {
            verify1:{
                url:config.api.getBackPassword,
                form:"#verifyForm1",
                data:function(vd){
                    var formData = vd.getFormData();
                    var data = {
                        userName:formData.username,
                        phoneNumber:formData.phoneNumber,
                        securityCode:formData.verifyCode
                    }
                    return data;
                },
                done:function(){
                    $(".form-panel.verify1").hide();
                    $(".form-panel.verify2").show();
                    setTimeout(function(){
                        $("#sendVerifyCodeMsg").trigger('click');
                    },30)
                    curStepIndex = 1;
                }
            },
            verify2:{
                url:config.api.verifyIdentity4fp,
                form:"#verifyForm2",
                type:'post',
                data:function(vd){
                    var formData = vd.getFormData();
                    var data = {
                        securityCode:formData.verifyCodeMsg
                    }
                    return data;
                },
                done:function(){
                    $(".form-panel.verify2").hide();
                    $(".form-panel.set-pwd").show();
                    curStepIndex = 2;
                }
            },
            'set-pwd':{
                url:config.api.setPassword,
                form:"#setPwd",
                data:function(vd){
                    var formData = vd.getFormData();
                    var data = {
                        phoneNumber:curPhoneNumber,
                        password:formData.password,
                        rePassword:formData.passwordConfirm
                    }
                    return data;
                },
                done:function(){
                    $(".form-panel.set-pwd").hide();
                    $(".form-panel.success").show();
                    curStepIndex = 3;
                }
            }
        },
        ec2id = {
            1000:"#phoneNumber",
            1002:'#username',
            1004:"#passwordConfirm",
            1006:"#phoneNumber",
            1015:"#verifyCode",
            1016:"#verifyCodeMsg",
            1023:"#password",
            1024:"#password"
        },
        focusTips = {
            phoneNumber:'请输入中国大陆手机号',
            username:'字母开头，6-20位字母、数字组合，字母不区分大小写。用户注册后不可修改',
            verifyCode:'请输入图片中的字符，字母不区分大小写',
            password:'8-16位字符，可包含字母（区分大小写）、数字、常用符号，不可为纯数字'
        };

    function initEvent(){

        $("#refreshVC").on('click',refreshVerifyCode);
        $("#vcImg").on('click',refreshVerifyCode);

        $(".btn-wrapper .btn").on('click',function(){
            var self = $(this);
            if(self.hasClass('btn_disable')) return;
            var form = self.parents('.form-panel').find('form');
            form.submit();
        })

        $("#password").on('keyup change',function(){

            var level = evaluatePwd();

            $('.pwd-level span').each(function(i,v){
                $(v)[i == level-1 ? "addClass" : "removeClass" ]('on');
            })

        }).on('change',function(){
            var pc =  $("#passwordConfirm"),
                pcv = pc.val();
            pcv && pc.trigger('validate');
        })

        $("#sendVerifyCodeMsg").click(sendVerifyCode);

        $("#phoneNumber").on('keyup blur change',function(){
            var val = $(this).val();
            curPhoneNumber = val;
            $('.phone-number').html(val.replace(/^(\d{3})\d{4}(\d{4})$/,"$1****$2"));
        })
		 $("#verifyCode").on('keyup',function(){
            curCaptcha = $(this).val();
        });

    }

    function checkUserNameSync(val){
        var isUsed;

        $.ajax({
            url:config.api.checkUserExist,
            type:'post',
            dataType:"json",
            async:false,
            data:{
                userName:val
            },
            success:function(){
                //self.parents('.field').find('.error-tip').html("");
                //self.trigger('validate');
                isUsed = "<i class='icon_tips' ></i><span class='gray'> 该用户名未被注册，请先</span> <a href='/join' class='red'>注册</a> ";
            },
            exception:function(){
                //isUsed = "<i class='icon_close' ></i>用户名已被注册";
                //self.parents('.field').find('.error-tip').html("<i class='icon_close' ></i>用户名已被注册");
                return false;
            }
        })

        return isUsed;
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


    var intvId;
    function vrColdDown(){
        var st = Date.now();
        var count = 60;
        intvId && clearInterval(intvId);
        intvId = setInterval(function(){
            var nw = Math.round((Date.now()-st)/1000);
            var left = count - nw;
            if(left <= 0){
                $("#sendVerifyCodeMsg").removeClass('btn_disable');
                $("#cdTip").hide();
                clearInterval(intvId);
                intvId = null;
            }
            else{
                $("#cdTip").show().find('.cd').text(left+"秒后重新获取");
            }

        },1000);
        $("#sendVerifyCodeMsg").addClass('btn_disable');
    }

    function sendVerifyCode(){

        if($(this).hasClass('btn_disable')){
            return;
        }

        $.ajax({
            url:config.api.verifyCodeMsg + "/resetloginpwd",
            type:'post',
            dataType:"json",
            data:{
                phoneNumber:curPhoneNumber,
				captcha:curCaptcha
            },
            success:function(res){
                vrColdDown();
                modal.alert('短信验证码已发送至您的手机，请输入短信中的验证码。');
            }
        })
    }

    function verify(stepIndex){
        var step = steps[stepIndex];
        var sto = stepsMap[step];
        var validator = $(sto.form).data('validator');
        var data = sto.data(validator);//.getFormData();
        $.ajax({
            url:sto.url,
            type:'post',
            data:data,
            dataType:"json",
            showLoading:true,
            success:sto.done,
            exception:function(res){
                if(stepIndex == 0){
                    refreshVerifyCode();
                }
                $(ec2id[res.code]).parents('.field').find('.error-tip').html(res.message);
            }
        })
    }

    function initValidation(){

        $("#verifyForm1").validate({
            submitHandler:function(){
                verify(0);
                return false;
            },
            errorHandler:function(errs){
                $("#submit1").addClass('btn_disable')
            },
            passedHandler:function(){
                $("#submit1").removeClass('btn_disable');
            },
            output:"..{.field}/.error-tip",
            enterSubmit:false,
            lazyValidate:true,
            fields:{
                verifyCode:{
                    required:true,
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
                    }
                },
                username:{
                    required:true,
                    pattern:config.formPatterns.usernameOnly,
                    minLength:6,
                    maxLength:20,
                    validator:function(){
                        var val = $(this).val();
                        if(!val){
                            return "<i class='icon_close' ></i>请输入用户名";
                        } else if(!config.formPatterns.usernameOnly.test(val)){
                            return "<i class='icon_close' ></i>用户名格式不正确";
                        } else if(val.length<6 || val.length > 20){
                            return "<i class='icon_close' ></i>用户名必须为6~20位字符";
                        }else{
                            return checkUserNameSync(val);
                        }
                    }
                },
                phoneNumber:{
                    required:true,
                    pattern:config.formPatterns.phoneNumber,
                    output:function(err){
                        var p = $(this).parents('.field');
                        if(err && err.type){
                            p.find('.error-tip').html(err.msg).show();
                            p.find('.info-text').hide();
                        }
                        else{
                            p.find('.info-text').show();
                            p.find('.error-tip').hide();
                        }

                    }
                }
            },
            errorMessage:{
                verifyCode:{
                    required:"<i class='icon_close' ></i>请输入验证码",
                    pattern:"<i class='icon_close' ></i>验证码错误"
                },
                username:{
                    required:"<i class='icon_close' ></i>请输入用户名",
                    pattern:"<i class='icon_close' ></i>用户名不存在",
                    minLength:"<i class='icon_close' ></i>用户名不存在",
                    maxLength:"<i class='icon_close' ></i>用户名不存在"
                    //pattern:"<i class='icon_tips' ></i><span class='gray'> 该用户名未被注册，请先</span> <a href='/join' class='red'>注册</a> "
                },
                phoneNumber:{
                    required:"<i class='icon_close' ></i>请输入手机号",
                    pattern:"<i class='icon_close' ></i>手机号不正确"
                },
            },
            okMessage:{
                //username:"<i class='icon_ok' ></i>",
                //password:"<i class='icon_ok' ></i>",
                //phoneNumber:"<i class='icon_ok' ></i>",
                //verifyCodeMsg:"<i class='icon_ok' ></i>",
                //inviteCode:"<i class='icon_ok' ></i>",
                verifyCode:"<i class='icon_ok' ></i>"
            }
        },function(validator){

            $("#submit1")[validator.isValid ? 'removeClass':"addClass"]('btn_disable');

            validator1 = validator;
        });

        $("#verifyForm2").validate({
            submitHandler:function(){
                verify(1);
                return false;
            },
            errorHandler:function(errs){
                //console.log(errs);
                $("#submit2").addClass('btn_disable')
            },
            passedHandler:function(){
                $("#submit2").removeClass('btn_disable');
            },
            output:"..{.field}/.error-tip",
            enterSubmit:false,
            fields:{
                verifyCodeMsg:{
                    required:true,
                    pattern:config.formPatterns.verifyCodeMsg
                }
            },
            errorMessage:{
                verifyCodeMsg:{
                    required:"<i class='icon_close' ></i>请输入验证码",
                    pattern:"<i class='icon_close' ></i>验证码错误"
                }
            }
        },function(validator){

            $("#submit2")[validator.isValid ? 'removeClass':"addClass"]('btn_disable');

            validator2 = validator;
        });

        $("#setPwd").validate({
            submitHandler:function(){
                verify(2);
                return false;
            },
            errorHandler:function(errs){
                $("#doSetPwd").addClass('btn_disable')
            },
            passedHandler:function(){
                $("#doSetPwd").removeClass('btn_disable');
            },
            output:"..{.field}/.error-tip",
            enterSubmit:false,
            fields:{
                password:{
                    required:true,
                    pattern:config.formPatterns.password,
                    minLength:8,
                    maxLength:16,
                    validator:function(){
                        var val = this.val();
                        if(!val){
                            return "<i class='icon_close' ></i>请输入登录密码";
                        }
                        else if(val.length < 8 || val.length > 16){
                            return "<i class='icon_close' ></i>登录密码由8-16位字符组成"
                        }
                        else if(!config.formPatterns.password.test(val) || /^\d+$/.test(val)){
                            return "<i class='icon_close' ></i>登录密码由8-16位字符组成"
                        }

                    }
                },
                passwordConfirm:{
                    required:true,
                    validator:function(){
                        var self = $(this),
                            val = self.val();
                        var pwd = $("#password").val();
                        if(pwd != val){
                            return "<i class='icon_close' ></i>两次输入密码不一致";
                        }
                        if(!val) return "<i class='icon_close' ></i>请确认新密码";
                    }
                }
            },
            errorMessage:{
                password:{
                    required:"<i class='icon_close' ></i>请输入密码",
                    pattern:"<i class='icon_close' ></i>密码应为8~20位非空字符"
                }
            }
        },function(validator){

            $("#doSetPwd")[validator.isValid ? 'removeClass':"addClass"]('btn_disable');

            validator3 = validator;
        })

    }

    function evaluatePwd(){

        var pwd = $("#password");
        var val = pwd.val(),level = -1;
        var levelMap = {0:0,1:1, 2:2, 3:3, 4:2, 6:3, 9:3}
        if(!config.formPatterns.password.test(val)) return level;
        if(/\d/.test(val)) level++;
        if(/[a-z]/.test(val)) level++;
        if(/[A-Z]/.test(val)) level++;
        if(/[~!@#$%^&*()]/.test(val)) level++;
        if(level == 0 && !/^\d+$/.test(val)) level = 1;
        if(val.length>=8 && val.length<10){
            level *= 1;
        }else if(val.length>=10 && val.length < 12){
            level *= 2;
        }else{
            level *= 3;
        }


        return levelMap[level];
    }

    function refreshVerifyCode(){

        $("#vcImg").attr("src",config.api.verifyCodeImg+"?_t="+Math.random());
        $("#verifyCode").val("");
    }

    function run(){

        initEvent();

        initValidation();

    }

    run();

});