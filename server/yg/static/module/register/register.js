/**
 * Created by liujiangtao on 2015/12/8 0008.
 */
define('register/register',['ui/validation/validation','ui/modal/modal','common/config'],function(require,exports,module){

    require('ui/validation/validation');
    var modal = require('ui/modal/modal'),
        config = require('common/config'),
        formValidator,
        validator2,
        curStepIndex,
        curPhoneNumber,
        VMCD = 'reg_vmcd';

    var steps = ['register','verify2'],
        stepsMap = {
            register:{
                url:config.api.doRegister,
                form:"#registerForm",
                data:function(vd){
                    var formData = vd.getFormData();
                    var data = {
                        userName:formData.username,
                        mobile:formData.phoneNumber,
                        securityCode:formData.verifyCode,
                        password:formData.password,
                        inviteCode:formData.inviteCode,
                        smsCode:formData.verifyCodeMsg
                        // rePassword:formData.passwordConfirm
                    }
                    return data;
                },
                done:function(){
                    $(".form-panel.register").hide();
                    $(".form-panel.success").show();
                    curStepIndex = 1;
                }
            },
            verify2:{
                url:config.api.verifyIdentity,
                form:"#verifyForm2",
                data:function(vd){
                    var formData = vd.getFormData();
                    var data = {
                        code:formData.verifyCodeMsg,
                    }
                    return data;
                },
                done:function(){
                    $(".form-panel.verify2").hide();
                    $(".form-panel.success").show();
                    curStepIndex = 2;
                }
            }
        },
        ec2id = {
            1000:"#phoneNumber",
            1002:'#username',
            //1004:"#passwordConfirm",
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

        $("#openProtocol").on('click',showProtocol);
        $("#protocol").attr('checked','true').trigger('change');

        $("#refreshVC").on('click',refreshVerifyCode);
        $("#vcImg").on('click',refreshVerifyCode);

        $("#username,#password,#verifyCode,#phoneNumber").focus(function(){
            var self = $(this);
            var val = self.val();
            //if(val) return;
            //if(self.data('valid')) return;
            self.parents('.field').find('.error-tip').html("<i class='icon_tips' ></i>"+focusTips[self.attr('id')]);
        });

        $(".btn-wrapper .btn").on('click',function(){
            var self = $(this);
            if(self.hasClass('disabled')) return;
            var form = self.parents('.form-panel').find('form');
            form.submit();
        });

        $("#password").on('keyup change',function(){

            var level = evaluatePwd();

            $('.pwd-level span').each(function(i,v){
                $(v)[i == level-1 ? "addClass" : "removeClass" ]('on');
            })

        });

        $("#sendVerifyCodeMsg").click(sendVerifyCode);

        $("#verifyCode, #phoneNumber").on('change blur',function(){
            var val = $("#phoneNumber").val();
            curPhoneNumber = val;
            //$('.phone-number').html(val.replace(/^(\d{3})\d{5}(\d{3})$/,"$1*****$2"));
            var reg = /^1[3578]\d{9}$/;
            var verifyCode = $("#verifyCode").val();
            var img = /^\w{4}$/;
            if(reg.test(curPhoneNumber) && intvId !== null && img.test(verifyCode)){
                $("#sendVerifyCodeMsg").removeClass('btn_disable')
            }
            else if(!reg.test(curPhoneNumber) || !img.test(verifyCode)){
                $("#sendVerifyCodeMsg").addClass('btn_disable');
            }


        });


        //$("#protocol").on("click",function(){
        //    formValidator.configFieldRules('inviteCode',{
        //        required:true
        //    });
        //});
        //有无邀请码

        $("#inviteYes").on("click",function(){

            $("#inviteCode").show();
            $("#doRegister").addClass('disabled');
            formValidator.configFieldRules('inviteCode',{
                required:true
            });
            $("#inviteTip").show();
            if(!$("#inviteCode").is(":focus"))
                ( $("#inviteCode").val().indexOf("6位")<0)&&SetPlaceholerForIE($("#inviteCode"));
        });
        $("#inviteNo").on("click",function(){
            formValidator.configFieldRules('inviteCode',{
                required:false
            });
            $("#inviteCode").hide().val('').trigger('validate');
            $("#inviteTip").hide();

        });

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
            },
            exception:function(){
                isUsed = "<i class='icon_close' ></i>用户名已被注册";
                //self.parents('.field').find('.error-tip').html("<i class='icon_close' ></i>用户名已被注册");
                return false;
            }
        })

        return isUsed;
    }

    function checkPhoneNumberSync(val){

        var isUsed;
        $.ajax({
            url:config.api.phoneNumberBounded,
            type:'post',
            dataType:"json",
            async:false,
            data:{
                phoneNumber:val
            },
            success:function(){},
            exception:function(res){
                isUsed = "<i class='icon_close' ></i>";
                if(res.data){
                    isUsed += res.data;

                }else{
                    isUsed += "此手机号已被注册";
                }

                return false;
            }
        });
        return isUsed;
    }

    function checkinviteCodeSync(val){

        var isValid;
        $.ajax({
            url:config.api.verifyInviteCode,
            type:'post',
            dataType:"json",
            async:false,
            data:{
                inviteCode:val
            },
            success:function(d){console.log(d);},
            exception:function(res){
                isValid = "<i class='icon_close' ></i>";
                if(res.data){
                    isValid += res.data;

                }else{
                    isValid += "此邀请码无效";
                }

                return false;
            }
        });

        return isValid;
    }

    var intvId;
    function vrColdDown(cd){
        var st = Date.now();
        var count = cd || 60;
        if(!cd){
            $.utils.setCD(VMCD,60);
        }
        intvId && clearInterval(intvId);
        intvId = setInterval(function(){
            var nw = Math.round((Date.now()-st)/1000);
            var left = count - nw;
            if(left <= 0){
                $("#sendVerifyCodeMsg").removeClass('btn_disable').html('获取验证码');
                //$("#cdTip").hide();

                clearInterval(intvId);
                intvId = null;
            }
            else{
                $("#sendVerifyCodeMsg").html('重新获取('+left+'s)');
                //$("#cdTip").show().find('.cd').text(left+"秒后重新获取");
            }

        },1000);
        $("#sendVerifyCodeMsg").addClass('btn_disable');
    }

    function sendVerifyCode(){

        if($(this).hasClass('btn_disable')){
            return;
        }

        $.ajax({
            url:config.api.verifyCodeMsg + "/join",
            type:'post',
            dataType:'json',
            data:{
                phonenumber:curPhoneNumber,
                captcha:$("#verifyCode").val()
            },
            success:function(res){
                vrColdDown();
                modal.alert('短信验证码已发送至您的手机，请输入短信中的验证码。')
            },
            exception:function(res){
                //if(res.code == 200){
                refreshVerifyCode();
                //}
            }
        })
    }

    function step(stepIndex){
        var step = steps[stepIndex];
        var sto = stepsMap[step];
        var validator = $(sto.form).data('validator');
        var data = sto.data(validator);
        $.ajax({
            url:sto.url,
            type:'post',
            data:data,
            dataType:"json",
            showLoading:true,
            success:sto.done,
            exception:function(res){
                $(ec2id[res.code]).parents('.field').find('.error-tip').html(res.message);
            }
        })
    }

    function initValidation(){

        $("#registerForm").validate({
            submitHandler:function(){
                step(0);
                return false;
            },
            errorHandler:function(errs){
                $("#doRegister").addClass('disabled')
            },
            passedHandler:function(){
                if( $("#inviteYes input").prop('checked'))
                    ( $("#inviteCode").val().length==6||$("#inviteCode").val().length==18)&&  $("#doRegister").removeClass('disabled');
                else
                    $("#doRegister").removeClass('disabled');
            },
            output:"..{.field}/.error-tip",
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
                            return "<i class='icon_close' ></i>登录密码必须为8~16位字符"
                        }
                        else if(!config.formPatterns.password.test(val) || /^\d+$/.test(val)){
                            return "<i class='icon_close' ></i>登录密码格式不正确"
                        }
                    }
                },
                phoneNumber:{
                    required:true,
                    pattern:config.formPatterns.phoneNumber,
                    validator:function(){
                        var val = $(this).val();
                        if(!val){
                            return "<i class='icon_close' ></i>请输入手机号";
                        } else if(!config.formPatterns.phoneNumber.test(val)){
                            return "<i class='icon_close' ></i>手机号格式不正确";
                        } else{
                            return checkPhoneNumberSync(val);
                        }
                    }
                },
                protocol:{
                    required:true
                },
                verifyCodeMsg:{
                    required:true,
                    pattern:config.formPatterns.verifyCodeMsg_n
                },
                inviteCode:{
                    //required:true,
                    //minLength:6,
                    pattern:config.formPatterns.idFatom,
                    pattern:config.formPatterns.inviteCode,
                    validator:function(){
                        var val = $(this).val();
                        if(!val){

                            return "<i class='icon_close' ></i>请输入邀请码";
                        }
                        else {
                            var _length=val.length;
                            if(_length!=6&&_length!=15&&_length!=18){//先提示需求a
                                return "<i class='icon_close' ></i>邀请码必须为6位数字、15位或18位身份证号";
                            }else{//再提示需求b
                                if(!config.formPatterns.idFatom.test(val)&&!config.formPatterns.inviteCode.test(val)){
                                    return "<i class='icon_close' ></i>邀请码无效，请输入正确的邀请码";
                                }else{
                                    return undefined;//checkinviteCodeSync(val);
                                }
                            }
                        }

                    }/**/
                }
            },
            okMessage:{
                username:"<i class='icon_ok' ></i>",
                password:"<i class='icon_ok' ></i>",
                phoneNumber:"<i class='icon_ok' ></i>",
                verifyCodeMsg:"<i class='icon_ok' ></i>",
                inviteCode:"<i class='icon_ok' ></i>",
                verifyCode:"<i class='icon_ok' ></i>"
            },
            errorMessage:{
                verifyCode:{
                    required:" ",//"<i class='icon_close' ></i>请输入验证码",
                    pattern:" "//"<i class='icon_close' ></i>验证码错误"
                },

                username:{
                    required:"<i class='icon_close' ></i>请输入用户名",
                    pattern:"<i class='icon_close' ></i>用户名格式不正确",
                    minLength:"<i class='icon_close' ></i>用户名必须为6~20位字符",
                    maxLength:"<i class='icon_close' ></i>用户名必须为6~20位字符"
                },
                password:{
                    required:"<i class='icon_close' ></i>请填写密码",
                    pattern:"<i class='icon_close' ></i>密码格式不正确(大小写字母，数字，特殊字符两种以上)",
                    minLength:"<i class='icon_close' ></i>密码必须为8~16位字符",
                    maxLength:"<i class='icon_close' ></i>密码必须为8~16位字符"
                },
                phoneNumber:{
                    required:"<i class='icon_close' ></i>请输入手机号",
                    pattern:"<i class='icon_close' ></i>手机号格式不正确"
                },
                verifyCodeMsg:{
                    required:"<i class='icon_close' ></i>请输入短信验证码",
                    pattern:"<i class='icon_close' ></i>短信验证码错误"
                },
                protocol:{
                    required:"<i class='icon_close' ></i>请接受注册协议"

                },
                //invite:{
                //    required:"<i class='icon_close' ></i>请选择邀请码",
                //},
                inviteCode:{
                    required:"<i class='icon_close' ></i>请输入邀请码",
                    pattern:"<i class='icon_close'></i>邀请码无效，请输入正确的邀请码",
                    pattern:"<i class='icon_close'></i>邀请码必须为6位数字、15位或18位身份证号"
                    //  minLength:"<i class='icon_close' ></i>邀请码必须为6位数字或18位身份证号"
                }
            }
        },function(validator){

            $("#doRegister")[validator.isValid ? 'removeClass':"addClass"]('disabled');

            formValidator = validator;
        });

    }


    function refreshVerifyCode(){

        $("#vcImg").attr("src",config.api.verifyCodeImg+"?_t="+Math.random());

    }

    function showProtocol(){

        modal.show({
            title:$("#protocolTemplate").attr("title"),
            content:$("#protocolTemplate").html(),
            size:{
                width:800,
                height:600
            },
            buttons:[
                {
                    name:"同意",
                    clicked:function(){
                        $("#protocol").attr('checked','true').trigger('change');
                    }
                }
            ]
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

    function handleIE8(){
        if($.IsIE8()){
            $("#doRegister").removeClass("ie-css3").removeClass("btn_red").addClass("btn_redie8");
        }
    }


    function SetPlaceholerForIE(input,placeholder){
        var text = input.attr('placeholder'),
            defaultValue = input.defaultValue;
        placeholder&&(text=placeholder);

        if(!defaultValue){
            input.val(text).addClass("phcolor");
        }
        input.focus(function(){
            if(input.val() == text){
                $(this).val("");
            }
        });
        input.blur(function(){

            if(input.val() == ""){
                $(this).val(text).addClass("phcolor");
            }
        });
        //输入的字符不为灰色
        input.keydown(function(){
            $(this).removeClass("phcolor");
        });
    };
    function SetPlaceholerForIE_PW(input,placeholder){
        var text = input.attr('placeholder'),
            defaultValue = input.defaultValue;
        placeholder&&(text=placeholder);
        if(!defaultValue){
            if(!$("#passwordt")[0]){
                $("#password").before('<input class="input-box" type="text" name="passwordt" id="passwordt" value="请输入登录密码">');
                $("#password").hide();
                $("#passwordt").focus(function(){
                    $("#passwordt").hide();
                    $("#password").show();
                    $("#password").focus();
                })
                    .blur(function(){
                    });
            }

            //input.val(text).addClass("phcolor");
        }
        input.focus(function(){

            if(input.val() == text){
                $(this).val("");
            }
        });
        input.blur(function(){

            if(input.val() == ""){
                $("#passwordt").show();
                $(this).hide();
                //$(this).val(text).addClass("phcolor");
            }
        });
        //输入的字符不为灰色
        input.keydown(function(){
            $(this).removeClass("phcolor");
        });
    };
    function GetPlaceholerForIE(){
        //判断浏览器是否支持placeholder属性
        var  supportPlaceholder='placeholder'in document.createElement('input');
        var   placeholder=function(input){
            var text = input.attr('placeholder'),
                defaultValue = input.defaultValue;

            if(!defaultValue){
                input.val(text).addClass("phcolor");
            }
            input.focus(function(){
                if(input.val() == text){
                    $(this).val("");
                }
            });
            input.blur(function(){
                if(input.val() == ""){
                    $(this).val(text).addClass("phcolor");
                }
            });
            //输入的字符不为灰色
            input.keydown(function(){
                $(this).removeClass("phcolor");
            });
        };
        //当浏览器不支持placeholder属性时，调用placeholder函数
        if(!supportPlaceholder){
            $('input').each(function(){
                var   text = $(this).attr("placeholder");
                if($(this).attr("type") == "text"&&$(this).attr("id")!="inviteCode"){
                   placeholder($(this));
                }
                $(this).attr("type") == "password"&&SetPlaceholerForIE_PW($(this),"请输入登录密码");
            });
        }
    }
    function run(){
        if(_isPC()) {
            initEvent();
            initValidation();
            $("#inviteYes input").prop('checked') && $("#inviteCode").show();
            var vmcd = $.utils.getCD(VMCD, 60);
            if (vmcd) {
                vrColdDown(vmcd);
            }
            handleIE8();
            GetPlaceholerForIE();
        }
        else{
            /*跳转到h5页面*/
        }
    }

    ///判断是PC端还是移动设备
    function _isPC(){
        //平台、设备和操作系统
        var system ={
            win : false,
            mac : false,
            xll : false
        };
        //检测平台
        var p = navigator.platform;
        system.win = p.indexOf("Win") == 0;
        system.mac = p.indexOf("Mac") == 0;
        system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
        if(system.win||system.mac||system.xll){
            return true;/*是pc端*/
        }else{
            return false;
        }
    }

    run();

});