define("personal/capital-cash", ["ui/verifyInput/VerifyInput",  "ui/modal/modal", 'ui/validation/validation', "common/config",
    "personal/personal"], function (require, exports, module) {

    //产品详情依赖的模块

    var VerifyInput = require("ui/verifyInput/VerifyInput");
    var modal = require('ui/modal/modal');
    require('ui/validation/validation');
    var config = require('common/config');
    //require('ui/select/select');
    require('personal/personal').run();


    //选择银行select
    //$("#tixianForm #chooseMyBank").ygSelect({
    //    width: 500,
    //    height: 36,
    //    dataSource: function () {
    //
    //        var fragment = $($("#bankTemplate").html().trim()),
    //            result  =[];
    //
    //        fragment.each(function(i,v){
    //            var tmp = $(v);
    //            if(tmp.hasClass('chooseMy')){
    //                result.push({
    //                    value: tmp.attr("value"),
    //                    display: v.outerHTML
    //                })
    //            }
    //        });
    //
    //        return result;
    //    }l
    //});

    function initEvent(){

        $("#cashNum").bind('change',function(){
            var val = $(this).val();
            if(!val){
                $("#serviceFee").text("0.00");
               //$("#actualCashAmount").text('0.00');
            }else{
                $("#serviceFee").text($.numberFormat(__globalData.cashServiceFee/100,2));
               // $("#actualCashAmount").text($.numberFormat(val,2))
            }

        }).on('keypress', function (evt) {
            var code = evt.which || evt.charCode || evt.keyCode;
            if (code == 8 || code == 46 || (code >= 48 && code <= 57)) {
                return true;
            }
            return false;
        });

        $(".personal_content").on('click','.mask-el',showForcePay);

    }

    function showForcePay(){
        var content;
      //  alert(__globalData.userState);
        switch (__globalData.userState){
            case 1:
                content = $("#setPassword").html();
                break;
            case 2:
                content = $("#authentication").html();
                break;
            case 3:
                content = $("#needBindCard").html();
                break;
            case 30:
                content = $("#needWaitforBinding").html();
                break;
            case 32:
                content = $("#needRebindCard").html();
                break;
            case 4:
                content = $("#resetPassword").html();
                break;
            case 5:
                content = $("#lockSetPassword").html();
                break;
        }
        modal.show({
            title: "提示",
            content: content,
            size: {width: 650, height: 200},
            showFoot: false,
            showClose: true,
            buttons: [
                {
                    name: "关闭"
                }
            ]

        });
        $.utils.mask(".personal_content");
    }

    //提现信息确认弹窗
    exports.run = function () {

        //5个弹窗
        if (__globalData.userState) {
            showForcePay();
        }

        initEvent();
        //var chooseOtherBank = $("#chooseOtherBank");
        //使用新银行卡

        //$("#chooseNewBankBtn").on("click", function () {
        //    $("#chooseNewBank").hide();
        //    $("#backMyBank").show();
        //
        //});
        ////返回我的银行卡
        //$("#backMyBankBtn").on("click", function () {
        //    $("#chooseNewBank").show();
        //    $("#backMyBank").hide();
        //    $("#bank").val("");
        //
        //});
        ////选择其他银行
        //$("#chooseOtherBankBtn").on("click", function () {
        //    $("#backMyBank").show();
        //    chooseOtherBank.hide();
        //});
        ////更多银行
        //$("#moreBankBtn").on("click",function(){
        //    $(this).hide();
        //    $("#moreBank").show();
        //});

        //网银支付使用新银行卡
        //var bankChoose = $("#bankChoose .choose");
        //bankChoose.click(function () {
        //    var self = $(this);
        //    bankChoose.removeClass("on");
        //    self.addClass("on");
        //    $("#bank").val(self.attr('bank-code')).trigger('change');
        //    $("#backMyBank").hide();
        //    chooseOtherBank.show();
        //
        //    var imgSrc = $("#bankChoose .choose.on").children("img").attr("src");
        //    var bankNameValue = $("#backMyBank .choose.on").attr("bank-name");
        //    var bankCodeValue = $("#backMyBank .choose.on").attr("bank-code");
        //    chooseOtherBank.children().children().children("img").attr("src", imgSrc);
        //    chooseOtherBank.children().children().attr("bank-name", bankNameValue);
        //    chooseOtherBank.children().children().attr("bank-code", bankCodeValue);
        //    return false;
        //});
        //短信获取验证码
        $("#getMsg").on("click", function () {

            if ($(this).hasClass("btn_disable")) {
                return;
            }
            else {
                $.ajax({
                    type: "post",
                    url: config.api.verifyCodeMsg + "/cash",
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
        //提现
        var btnValid = $("#submitCash");
        btnValid.on('click', function () {
            if(__globalData.userState){
                showForcePay();
                return;
            }
            if (btnValid.hasClass("btn_disable")) {
                return;
            } else {
                if ($("#bank").val()) {
                    btnValid.attr("href", "http://www.baidu.com");

                } else {
                    //$("#tixianForm").submit();
                    doWidthdrawals($("#tixianForm").data('validator').getFormData());

                }

            }
        });

        function doWidthdrawals(data){
            $.ajax({
                type: "post",
                url: config.api.withdrawals,
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

                }
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

        var vp = new VerifyInput({input: "#vrCode"});
        var availableBalances = parseFloat($("#totalNum").text().replace(/,/g,'')) || 0;
        $("#tixianForm").validate({
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
            selectById:true,
            fields: {
                //chooseMyBank:{
                //    required:true,
                //    output:'#chooseMyBankTip'
                //},
                cashNum: {
                    required: true,
                    pattern: /^\d+(\.\d{1,2})?$/,
                    minValue: 0.01,
                    maxValue: availableBalances,
                    output: "#cashNumTip"
                },
                code: {
                    required: true,
                    pattern: /^\d{6}$/,
                    output: "#codeWrongTip"
                },
                vrCode: {
                    required: true,
                    pattern: /^\d{6}$/,
                    output: "#passWordTip"
                }
            },
            errorMessage: {
                //chooseMyBank:{
                //    required:"<i class='icon_tips' ></i>请选择一张绑定的银行卡"
                //},
                cashNum: {
                    required: "<i class='icon_tips' ></i>请输入提现金额",
                    maxValue: "<i class='icon_tips' ></i>提现金额不可超过账户可用余额",
                    pattern: "<i class='icon_tips' ></i>请输入正确的提现金额，最多至小数点后两位",
                    minValue: "<i class='icon_tips' ></i>请输入正确的提现金额，必须为大于0的数字"
                },
                code: {
                    required: "<i class='icon_tips' ></i>请输入短信验证码",
                    pattern: "<i class='icon_tips' ></i>短信验证码不正确"
                },
                vrCode: {
                    required: "<i class='icon_tips' ></i>请输入支付密码",
                    pattern: "<i class='icon_tips' ></i>支付密码不正确"
                }
            }
        }, function (validator) {
            var isValid = validator.isValid;
            btnValid[isValid ? "removeClass" : "addClass"]("btn_disable");
        });


    }

});

