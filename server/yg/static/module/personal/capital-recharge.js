define("personal/capital-recharge", ["ui/tabs/tabs", "ui/modal/modal", "ui/verifyInput/VerifyInput", 'ui/validation/validation', 'ui/select/select',
        "personal/personal", 'ui/list/list', 'ui/list/ListPage', 'common/bankInfo', 'common/config'], function (require, exports, module) {

        //产品详情依赖的模块

        var Tabs = require("ui/tabs/tabs");
        var modal = require('ui/modal/modal');
        var bankMap = require('common/bankInfo');

        var VerifyInput = require("ui/verifyInput/VerifyInput");
        var config = require('common/config');
        require('ui/validation/validation');
        require('ui/select/select');
        require('personal/personal').run();
        require('ui/list/list');

        var ListPage = require('ui/list/ListPage');
        var curLp, maxRechargeAmount = 2000000;


        //选择银行select
        $("#wangyinForm #chooseMyBank").ygSelect({
            width: 500,
            height: 36,
            dataSource: function () {
                return [
                    {
                        display: '<div class="chooseMy"><span class="pic"><img src="http://img3.yingu.com/image/personal/bank_china.png" alt=""/></span> <b>储蓄卡</b><span class="black card"> 尾号 **8232</span><span class="gray"> | 单笔限额1万，单日限额5万</span><i class="icon-right"></i></div> ',
                        value: '中国银行'
                    },
                    {
                        display: '<div class="chooseMy"><span class="pic"><img src="http://img3.yingu.com/image/personal/bank_jianshe.png" alt=""/></span> <b>储蓄卡</b><span class="black card"> 尾号 **8232</span><span class="gray"> | 单笔限额2万，单日限额10万</span><i class="icon-right"></i></div> ',
                        value: '中国建设银行'
                    }
                ]
            }
        });
        //tabs
        var Index = {

            init: function () {
                this._addEventListener();
            },
            _addEventListener: function () {
                var that = this;
                var personalTabs = new Tabs({
                    tabsContainerId: "personal_tabs",
                    tabClass: "personal_tab",
                    selectedClass: "hover",
                    contentContainerId: "personal_content_container",
                    contentClass: "personal_content",
                    eventType: 'click'
                });

                $(".personal_content").on('click', '.mask-el', function () {
                    $.utils.unmask('.personal_content');
                    showForceAuth();
                });
            }
        };
        //未做实名认证弹窗
        if (!__globalData.auth) {
            showForceAuth();
        }

        function showForceAuth() {
            modal.show({
                title: "提示",
                content: $("#authentication").html(),
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


        //充值信息确认弹窗
        exports.run = function () {
            //快捷支付

            $("#bankMoney").on('keypress', function (evt) {
                var code = evt.which || evt.charCode || evt.keyCode;
                if (code == 8 || (code >= 48 && code <= 57)) {
                    return true;
                }
                return false;
            });

            var chooseOtherBank = $("#chooseOtherBank");

            //选择其他银行
            $("#chooseOtherBankBtn").on("click", function () {
                $("#backMyBank").show();
                chooseOtherBank.hide();
            });

            //更多银行
            var moreBtn = $("#moreBankBtn");
            $("#bankChoose").children("a").slice(6).hide();
            moreBtn.on("click", function () {
                $(this).hide();
                $(this).siblings("a").show();
            });

            $("#openProtocol").on('click', _showProtocol);
            var vp = new VerifyInput({input: "#vrCode"});

            Index.init();

            //充值后金额
            $("#bankMoney,#bankMoneyQuick").bind("keyup", function () {
                var val = $(this).val();
                var _money = parseInt(val) || 0;
                if (_money > maxRechargeAmount) {
                    _money = maxRechargeAmount;
                    $(this).val(_money);
                }
                var CurrentBank = parseFloat($("#CurrentBank").attr("data"));
                var afterBank = parseFloat($("#afterBank").attr("data"));
                var afterBankAdd = CurrentBank + _money;
                $("#afterBank").html($.numberFormat(afterBankAdd, 2) + "<i>元</i>");
            }).disablePaste();

            //网银支付使用新银行卡
            var bankChoose = $("#bankChoose .choose");
            bankChoose.click(function () {

                var self = $(this);
                bankChoose.removeClass("on");
                self.addClass("on");
                $("#bank").val(self.attr('bank-code')).trigger('validate');
                $("#backMyBank").hide();
                chooseOtherBank.show();

                var imgSrc = $("#bankChoose .choose.on").children("img").attr("src");
                var bankNameValue = $("#backMyBank .choose.on").attr("bank-name");
                var bankCodeValue = $("#backMyBank .choose.on").attr("bank-code");
                chooseOtherBank.children().children().children().children("img").attr("src", imgSrc);
                chooseOtherBank.children().children().children().attr("bank-name", bankNameValue);
                chooseOtherBank.children().children().children().attr("bank-code", bankCodeValue);
                _showBankFee(bankNameValue,"bank-fee");
                $("#payment-bank").show();
            });

            //网银支付
            var btnValid2 = $("#bankRecharge");
            btnValid2.on('click', function () {
                    if (!__globalData.auth) {
                        showForceAuth();
                        return;
                    }
                    if (btnValid2.hasClass("btn_disable")) {
                        return;
                    }
                    else {
                        if ((!$("#bank").val()) && (!$("#bankQuick").val())) {
                            //btnValid2.addClass("btn_disable");
                            return;
                        }
                        else {
                            if ($($("div.payment-mode.payment-mode-checked input[type=radio]").get(0)).val() == "1") {
                                var money = $.trim($("#bankMoneyQuick").val()),
                                    msgCode = $.trim($("#code").val()),
                                    payPwd = $.trim($("#vrCode").val());
                                if (!money || !msgCode || !payPwd) return false;
                                var data = {
                                    money: $.trim($("#bankMoneyQuick").val()),
                                    msgCode: $.trim($("#code").val()),
                                    payPwd: $.trim($("#vrCode").val())
                                };
                                $.ajax({
                                    type: "post",
                                    url: '/u/doRechargeRapid',
                                    data: data,
                                    dataType: "json",
                                    showLoading: true,
                                    success: function (data) {
                                        location.href = data.data;
                                    }
                                });
                            }
                            else {
                                rechargeConfirm();
                            }
                        }
                    }

                }
            );

            function rechargeConfirm() {
                var money = $("#bankMoney").val(),
                    bankName = $("#payment-bank").children().children().attr("bank-name");

                modal.show({
                    title: "充值信息确认",
                    content: function () {
                        var templateStr = $("#bankContent").html();
                        return $.MT('bankContent', templateStr, {
                            amountBank: money,//金额
                            bankName: bankName,//银行名称
                            amountUpperCaseBank: $.numberUpperCase(money)//金额大写
                        });
                    },
                    size: {width: 650, height: 250},
                    showFoot: true,
                    showClose: true,
                    buttons: [
                        {
                            name: "确认",
                            clicked: function () {
                                $("#wangyinForm01").submit();
                                return false;
                            }
                        },
                        {
                            name: "取消",
                            'class': "btn_disable"

                        }

                    ]
                });

            }

            ////密码框
            //modal.on('modal-show', function () {
            //
            //});

            /*发送短信验证码*/
            $("#getMsg").on("click", function () {
                if ($(this).hasClass("btn_disable")) {
                    return;
                }
                else {
                    $.ajax({
                        type: "post",
                        url: config.api.verifyCodeMsg + "/quickrecharge",
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

            /*添加form验证*/
            var validateOptions = {
                submitHandler: function () {
                    function a() {
                        modal.on('click', '#payment', function () {

                        })
                    }

                    function b() {
                        modal.off('modal-show', a);
                        modal.off('modal-hide', b);
                    }

                    modal.on('modal-show', a);
                    modal.on('modal-hide', b);
                    modal.show({
                        title: "登录网上银行支付",
                        content: $("#bankSuccess").html(),
                        size: {width: 650, height: 280},
                        showFoot: false,
                        showClose: true,
                        buttons: [
                            {
                                name: "关闭"
                            }
                        ]

                    });
                    $("#chooseOthersBankBtn").on("click", function () {
                        modal.hide();

                    });

                },
                errorHandler: function (errs) {
                    btnValid2["addClass"]("btn_disable");
                },
                passedHandler: function () {
                    btnValid2["removeClass"]("btn_disable");
                },
                selectById: true
            };
            var validateOptions_quick = $.extend({}, validateOptions);
            validateOptions.fields = {
                bankMoney: {
                    required: true,
                    pattern: /^[1-9]\d*$/,
                    minValue: 1,
                    maxValue: maxRechargeAmount,
                    output: "#bankMoneyTip"
                },
                bank: {
                    required: true,
                    output: '#rechargeBankTip'
                }
            };
            validateOptions.errorMessage = {
                bankMoney: {
                    required: "<i class='icon_tips' ></i>请输入金额",
                    pattern: "<i class='icon_tips' ></i>请输入正确的充值金额",
                    maxValue: "<i class='icon_tips' ></i>请输入正确的充值金额，必须为不大于" + $.numberFormat(maxRechargeAmount) + "的数字",
                    minValue: "<i class='icon_tips' ></i>请输入正确的充值金额，必须为大于0的数字"
                },
                bank: {
                    required: "<i class='icon_tips' ></i>请选择充值银行"
                }
            };

            $("#wangyinForm01").validate(validateOptions, function (validator) {
                var isValid2 = validator.isValid;
                btnValid2[isValid2 ? "removeClass" : "addClass"]("btn_disable");
            });
            validateOptions_quick.fields = {
                bankMoneyQuick: {
                    required: true,
                    pattern: /^[1-9]\d*$/,
                    minValue: 1,
                    maxValue: maxRechargeAmount,
                    output: "#bankMoneyQuickTip"
                },
                bankQuick: {
                    required: true,
                    output: '#QuickBankTip'
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
                },
                protocol: {
                    required: true
                }
            }
            ;
            validateOptions_quick.errorMessage = {
                bankMoneyQuick: {
                    required: "<i class='icon_tips' ></i>请输入金额",
                    pattern: "<i class='icon_tips' ></i>请输入正确的充值金额",
                    maxValue: "<i class='icon_tips' ></i>请输入正确的充值金额，必须为不大于" + $.numberFormat(maxRechargeAmount) + "的数字",
                    minValue: "<i class='icon_tips' ></i>请输入正确的充值金额，必须为大于0的数字"
                },
                bankQuick: {
                    required: "<i class='icon_tips' ></i>请选择充值银行"
                },
                code: {
                    required: "<i class='icon_tips' ></i>请输入短信验证码",
                    pattern: "<i class='icon_tips' ></i>请输入正确的短信验证码"
                },
                vrCode: {
                    required: "<i class='icon_tips' ></i>请输入支付密码",
                    pattern: "<i class='icon_tips' ></i>请输入正确的交易密码&nbsp;(若24小时内同一账户名连续输错5次密码，将锁定该账户名4小时)"
                },
                protocol: {
                    required: "<i class='icon_tips' ></i>请接受快捷支付协议"
                }
            };
            $("#wangyinForm02").validate(validateOptions_quick);


            ///选择支付方式
            $("div.payment-mode").on("click", function () {
                $(this).addClass("payment-mode-checked").siblings().removeClass("payment-mode-checked");
                var allPayment = $(this).find("input[type=radio]");
                if (allPayment.length > 0) {
                    $(allPayment.get(0)).attr("checked", true);
                    switch ($(allPayment.get(0)).val()) {
                        case "1":/*快捷支付:隐藏网银支付相关操作*/
                            $("#wangyinForm01").hide();
                            $("#wangyinForm02").show();
                            $("#bankType-content").text("出借任意项目并持有15天以后，进行一笔成功提现，即可开通快捷支付");
                            _initPaymentQuick();
                            break;
                        case "0":/*网银支付:隐藏快捷支付相关操作*/
                            $("#wangyinForm02").hide();
                            $("#wangyinForm01").show();
                            var bankName = $("#payment-bank .choose.on").attr("bank-name");
                            if (bankName == undefined) {
                                $("#backMyBank").show();
                            }
                            else {
                                $("#chooseOtherBank").show();
                            }
                            $("#bankType-content").html("出借任意项目并持有15天以后，进行一笔成功提现，即可开通快捷支付");
                            _showBankFee(bankName,"bank-fee");
                            break;
                    }
                }
                $("#bankMoneyQuick").val("");
                $("#bankMoney").val("");
                $("#afterBank").text($("#CurrentBank").text());
                btnValid2.addClass("btn_disable");
            });
            if (__globalData.quickPay) {/*已开通快捷支付*/
                $("input[name=payment][type=radio][value='1']").trigger("click");
            }
            else {/*未开通快捷支付*/
                $("input[name=payment][type=radio][value='1']").parent().off("click");
                $(".payment-mode-gray").show();
                //$("input[name=payment][type=radio][value='1']").parent().addClass('payment-mode-gray');
                $("input[name=payment][type=radio][value='0']").trigger("click");
            }
        }

        ///初始化快捷支付状态
        function _initPaymentQuick() {
            var bankNameValue = $("#payment-quick .choose.on").attr("bank-name");
            var tBank, tBankArray = bankMap.filter(function (item) {
                if (item["cn"] == bankNameValue) return true;
            });
            if (tBankArray.length > 0)  tBank = tBankArray[0]["bn"];
            if (bankNameValue != undefined) {
                var myBank = $("#bankChoose").find("a[bank-name*=" + tBank + "]");
                if (myBank) {
                    var imgSrc = myBank.children("img").attr("src");
                    var bankCodeValue = myBank.attr("bank-code");
                    $("#payment-quick").children().children().children("img").attr("src", imgSrc);
                    $("#payment-quick").children().children().attr("bank-code", bankCodeValue);
                    $("#bankQuick").val(bankCodeValue).trigger("validate");
                    _showBankFee(tBank,"bank-fee2");
                }
            }
        }

        /*显示所选银行的费率信息*/
        function _showBankFee() {
            var bankNameValue = arguments[0];
            var idBankFeeContainer = arguments[1];
            $("#" + idBankFeeContainer + " .personal_table").hide().each(function (i, v) {
                var tmp = $(v);
                if (tmp.attr('bank-value') == bankNameValue) {
                    $("#" + idBankFeeContainer).show();
                    tmp.show();
                }
            });
        }

        function _showProtocol() {

            modal.show({
                title: $("#protocolTemplate").attr("title"),
                content: $("#protocolTemplate").html(),
                size: {
                    width: 800,
                    height: 600
                },
                buttons: [
                    {
                        name: "同意",
                        clicked: function () {
                            $("#protocol").attr('checked', 'true').trigger('change');
                        }
                    }
                ]
            })
        }

        return exports;


    }
)