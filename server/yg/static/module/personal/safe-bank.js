define("personal/safe-bank", [
    "ui/validation/validation",
        "ui/modal/modal",
        "ui/searchBox/searchBox",
        'ui/select/select',
        "common/config",
        "common/bankInfo"
    ], function (require, exports, module) {

    var modal = require('ui/modal/modal');
    require('ui/validation/validation');
    var config = require('common/config');
    require('ui/select/select');
    require('ui/searchBox/searchBox');
    var bankInfo = require('common/bankInfo'),
        bankMap = {},bankList = [];
    bankInfo.forEach(function(v,i){
        var bn = v.bn,cn = v.cn;
        if(!bankMap[bn]){
            bankList.push(bankMap[bn] = {
                display:bn,
                value:bn,
                rv:cn
            })
        }
    });

    function initSelect(){

        //$("#bankName").ygSearch({
        //    width:274,
        //    height:32,
        //    dataSource:bankList.slice(0)
        //}).on('change',function(evt,arg){
        //    var val = $(this).val();
        //    var bi = bankMap[val];
        //    if(bi){
        //        $("#bankFullName").val(bi.rv).trigger('change');
        //    }
        //})

        $("#bankName").attr('readonly',true);

    }

    initSelect();

    //提交
    var btnValid = $("#submitMsg");
    btnValid.on('click', function () {
        if (btnValid.hasClass("btn_disable")) {
            return;
        } else {
            $("#bankMsgForm").submit();
        }

    });

    function submitBankMsgForm(data){
        data.bankName = $("#bankFullName").val();
        $.ajax({
            url:'/u/bindingBankcard',
            type:'post',
            data:data,
            showLoading:true,
            success:function(res){
				var referer = $.utils.getUrlParam('referer');
                window.location.href  = res.data+(referer ? ("?referer="+referer) : '');
            }
        })
    }

    var fields = {
        bankNum: {
            required: true,
            output: "#bankNumTip"
        },
        bankName: {
            required: true,
            output: "#bankNameTip"
        },
        telNum: {
            required: true,
            pattern:config.formPatterns.phoneNumber,
            output: "#telNumTip"
        }
    };
    var errorMessage = {
        bankNum: {
            required: "<i class='icon_tips' ></i>请输入银行卡号",
            pattern: "<i class='icon_tips' ></i>银行卡号不正确"
        },
        bankName: {
            required: "<i class='icon_tips' ></i>无法识别卡号所属银行，请查阅下方支持绑卡银行"
            //pattern: "<i class='icon_tips' ></i>无法识别卡号所属银行，请查阅下方支持绑卡银行"
        },
        telNum: {
            required: "<i class='icon_tips' ></i>请输入银行预留手机号",
            pattern: "<i class='icon_tips' ></i>手机号不正确"
        }
    }

    var realName = $("#realName");

    if(realName.length){
        $.extend(fields,{
            realName: {
                required: true,
                pattern:config.formPatterns.fullName,
                output: "#realNameTip"
            },
            idCode: {
                required: true,
                pattern:config.formPatterns.idCode,
                output: "#idCodeTip"
            }
        });

        $.extend(errorMessage,{
            realName: {
                required: "<i class='icon_tips' ></i>请填您的姓名",
                pattern: "<i class='icon_tips' ></i>请填写真实的姓名"
            },
            idCode: {
                required: "<i class='icon_tips' ></i>请填写身份证号",
                pattern: "<i class='icon_tips' ></i>请填写有效的身份证号"
            }
        })
    }


    //验证
    $("#bankMsgForm").validate({

        submitHandler: function () {
            submitBankMsgForm(this.getFormData());
            return false;
        },
        errorHandler: function (errs) {
            btnValid["addClass"]("btn_disable");
        },
        passedHandler: function () {
            btnValid["removeClass"]("btn_disable");
        },
        selectById:true,
        fields: fields,
        errorMessage: errorMessage

    }, function (validator) {
        var isValid = validator.isValid;
        btnValid[isValid ? "removeClass" : "addClass"]("btn_disable");
    });

    function initEvent(){
        $("#bankNum").on('change',function(evt){
            var self = $(this);
                self.val(self.val().trim());
             var   val = self.val().trim();
            var bn,cn ;
            for(var i= 0,ib;(ib = bankInfo[i]);i++){
                if(ib.l == val.length && val.indexOf(ib.v) == 0){
                    bn = ib.bn;
                    cn = ib.cn;
                    break;
                }/*else if(val.indexOf(ib.v) == 0){
                    bn = ib.bn;
                    cn = ib.cn;
                }*/
            }
            if(bn){
                $("#bankName").val(bn).trigger('validate');
                $("#bankFullName").val(cn);
            }else{
                $("#bankName").val('').trigger('validate');
                $("#bankFullName").val('');
            }
        })
    }


    function init(){

        initEvent();
    }

    init();


    exports.run = function () {}

});

