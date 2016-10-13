/**
 * Created by liujiangtao on 2015/11/16 0016.
 */
define('investment/purchase',['ui/verifyInput/VerifyInput','ui/validation/validation','ui/modal/modal','common/config','ui/notify/jquery.noty.packaged'],function(require,exports,module){

    var VerifyInput = require("ui/verifyInput/VerifyInput");
    require('ui/validation/validation');
    var modal = require('ui/modal/modal'),
        config = require('common/config'),
        formValidator;
    function init(){

        initEvent();

        var vp = new VerifyInput({input:"#payPwd"})

        $("#inputForm").validate({
            submitHandler:function(){
                var formData = this.getFormData();
                $.ajax({
                    url:config.api.orderPay,
                    type:"post",
                    data:{
                        payPwd:formData.payPwd,
                        orderId:$("input[name='orderId']").val()
                    },
                    success:function(res){
                        location.href = res.data;
                    }
                })

                return false;
            },
            errorHandler:function(errs){
                //console.log(errs);
                $("#submitPay").addClass('disabled')
            },
            passedHandler:function(){
                $("#submitPay").removeClass('disabled');
            },
            selectById:true,
            fields:{
                payType:{
                    required:true,
                    output:function(err){
                        if(err){
                            modal.alert('',err.msg);
                        }
                    }
                },
                payPwd:{
                    required:true,
                    pattern:/^\w{6}$/,
                    output:function(err){
                        if(err){
                            $(this).parent().find(".verify-field").addClass('field-invalid');
                        }
                        else{
                            $(this).parent().find(".verify-field").removeClass('field-invalid');
                        }
                    }
                }
            },
            errorMessage:{
                payType:{
                    required:"请选择一种支付方式",
                },
                payPwd:{
                    required:'请输入支付密码',
                    pattern:"支付密码由6位数字和字母组成"
                }
            }
        },function(validator){
            formValidator = validator;
            $("#submitPay")[validator.isValid ? "removeClass" : "addClass"]('disabled');
        });


    }

    function initEvent(){

        $("#protocolCheck").on('click',function(){
            var checked = $(this).prop('checked');
            if(checked){
                $("#btnNext").removeClass('disabled');
            }
            else{
                $("#btnNext").addClass('disabled');
            }
        })

        $("#paymentForm .pay-type").on('click',function(){
            var self = $(this);
            $("#paymentForm .pay-type").removeClass('active');
            self.addClass('active');
            self.find('input[type=radio]').prop('checked',true);
        })

        $("#refreshVCodeBtn a").on('click',refreshVCode)

        $("#submitPay").on('click',function(){

            if($(this).hasClass('disabled')) return;

            $("#inputForm").submit();

        })
    }

    function submitPaymentInfo(){

        var data = formValidator.getFormData();
        //channel=FUIOU&money=1&bankCode=001
        $.ajax({
            url:"/gtsrv/api/user/bankRecharge",
            type:'post',
            dataType:'json',
            async:false,
            data:{
                channel:"FUIOU",
                money:data.money,
                bankCode:data.payType
            },
            success:function(res){

                var data = res.data,
                    params = eval("("+data.paramJson+")"),
                    form = $("#paymentForm"),
                    form = form.length ? form : $('<form target="_blank" id="paymentForm" method="post" ></form>').appendTo($("body")),
                    formEl = form[0];

                form.attr('action',data.payUrl);

                for(var p in params){
                    if(!formEl[p]){
                        form.append('<input type="text" value="'+params[p]+'" />');
                    }
                    else{
                        form.find(p).val(params[p]);
                    }
                }

                form.submit();
            }
        })

    }

    function refreshVCode(){

        $("#verifyCodeImg").attr("src",config.api.verifyCodeImg+"?_t="+Math.random());

    }

    init();
})