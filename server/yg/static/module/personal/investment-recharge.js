define("personal/investment-recharge", ["ui/tabs/tabs", "ui/modal/modal", "ui/verifyInput/VerifyInput", 'ui/validation/validation', 'ui/select/select'], function (require, exports, module) {

        //产品详情依赖的模块

        var Tabs = require("ui/tabs/tabs");
        var modal = require('ui/modal/modal');
        var VerifyInput = require("ui/verifyInput/VerifyInput");
        require('ui/validation/validation');
        require('ui/select/select');


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
                showClose: false,
                buttons: [
                    {
                        name: "关闭"
                    }
                ]

            });
        }


        //充值信息确认弹窗
        exports.run = function () {
            //快捷支付
            //var btnValid = $("#btn_recharge");
            //btnValid.on('click', function () {
            //    if (btnValid.hasClass("btn_disable")) {
            //        return;
            //    } else {
            //        modal.show({
            //            title: "充值信息确认",
            //            content: function () {
            //                var templateStr = $("#rechargeContent").text();
            //                var money = $("#shortMoney").val();
            //                return $.MT('rechargeContent', templateStr, {
            //                    amount: money,
            //                    bankName: $("#bankName").val(),
            //                    amountUpperCase: $.numberUpperCase(money)
            //                })
            //            },
            //            size: {width: 650, height: 320},
            //            showFoot: true,
            //            showClose: true,
            //            buttons: [
            //                {
            //                    name: "确认",
            //                    clicked: function () {
            //                        $.ajax({
            //                            type: "post",
            //                            url: "",
            //                            data: {},
            //                            dataType: "json",
            //                            success: function (data) {
            //                                modal.show({
            //                                    title: "在线充值",
            //                                    content: function () {
            //                                        var templateStr2 = $("#rechargeSuccess").text();
            //                                        var money = $("#shortMoney").val();
            //                                        return $.MT('rechargeSuccess', templateStr2, {
            //                                            amountNum: money,
            //                                            bankBalance: money
            //
            //                                        })
            //                                    },
            //                                    size: {width: 650, height: 300},
            //                                    showFoot: true,
            //                                    showClose: false,
            //                                    buttons: [
            //                                        {
            //                                            name: "关闭",
            //                                        }
            //
            //                                    ]
            //
            //                                });
            //
            //                            },
            //                            error: function (data) {
            //                                modal.show({
            //                                    title: "在线充值",
            //                                    content: $("#rechargeWrong").html(),
            //                                    size: {width: 650, height: 200},
            //                                    showFoot: true,
            //                                    showClose: false,
            //                                    buttons: [
            //                                        {
            //                                            name: "关闭",
            //                                        }
            //
            //                                    ]
            //
            //                                });
            //
            //
            //                            }
            //
            //                        });
            //
            //                        return false;
            //
            //
            //                    }
            //                },
            //                {
            //                    name: "取消",
            //
            //                }
            //
            //            ]
            //        });
            //    }
            //
            //
            //});
            var chooseOtherBank = $("#chooseOtherBank");
            //使用新银行卡

            $("#chooseNewBankBtn").on("click", function () {
                $("#chooseNewBank").hide();
                $("#backMyBank").show();

            });
            //返回我的银行卡
            $("#backMyBankBtn").on("click", function () {
                $("#chooseNewBank").show();
                $("#backMyBank").hide();
                $("#bank").val("");

            });
            //选择其他银行
            $("#chooseOtherBankBtn").on("click", function () {
                $("#backMyBank").show();
                chooseOtherBank.hide();
            });
            //更多银行
            $("#moreBankBtn").on("click", function () {
                $(this).hide();
                $("#moreBank").show();
            });

            Index.init();
            //网银支付使用新银行卡
            var bankChoose = $("#bankChoose .choose");
            bankChoose.click(function () {
                var self = $(this);
                bankChoose.removeClass("on");
                self.addClass("on");
                $("#bank").val(self.attr('bank-code')).trigger('change');
                $("#backMyBank").hide();
                chooseOtherBank.show();

                var imgSrc = $("#bankChoose .choose.on").children("img").attr("src");
                var bankNameValue = $("#backMyBank .choose.on").attr("bank-name");
                var bankCodeValue = $("#backMyBank .choose.on").attr("bank-code");
                chooseOtherBank.children().children().children("img").attr("src", imgSrc);
                chooseOtherBank.children().children().attr("bank-name", bankNameValue);
                chooseOtherBank.children().children().attr("bank-code", bankCodeValue);
                return false;
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
                    if (!$("#bank").val()) {
                        //btnValid2.addClass("btn_disable");
                        return;
                    }
                    else {
                        modal.show({
                            title: "充值信息确认",
                            content: function () {
                                var templateStr = $("#bankContent").text();
                                var money = $("#bankMoney").val();
                                return $.MT('bankContent', templateStr, {
                                    amountBank: money,//金额
                                    bankName: $("#chooseOtherBank").children().children().attr("bank-name"),//银行名称
                                    amountUpperCaseBank: $.numberUpperCase(money)//金额大写
                                });

                            },
                            size: {width: 650, height: 280},
                            showFoot: true,
                            showClose: true,
                            buttons: [
                                {
                                    name: "确认",
                                    clicked: function () {
                                        $("#wangyinForm").submit();
                                        return false;

                                    }
                                },
                                {
                                    name: "取消",

                                }

                            ]
                        });

                    }


                }

            });


            //密码框
            modal.on('modal-show', function () {
                var vp = new VerifyInput({input: "#vrCode"})
            })
            //验证
            //$("#kuaijieForm").validate({
            //     submitHandler: function () {
            //
            //     },
            //     errorHandler: function (errs) {
            //         btnValid["addClass"]("btn_disable");
            //     },
            //     passedHandler: function () {
            //         btnValid["removeClass"]("btn_disable");
            //     },
            //     fields: {
            //         shortMoney: {
            //             required: true,
            //             pattern: /^[\d\.]+$/,
            //             minValue: 1,
            //             maxValue: 99999999999999,
            //             output: "#shortMoneyTip"
            //         }
            //
            //     },
            //     errorMessage: {
            //         shortMoney: {
            //             required: "<i class='icon_tips' ></i>请输入金额",
            //             maxValue: "<i class='icon_tips' ></i>超出最大金额",
            //             minValue: "<i class='icon_tips' ></i>请输入金额"
            //         }
            //     }
            // },function(validator){
            //    var isValid = validator.isValid;
            //    btnValid[isValid ? "removeClass" : "addClass"]("btn_disable");
            //});
            $("#wangyinForm").validate({
                submitHandler: function () {
                    function a() {
                    modal.on('click', '#payment', function () {
                        //刷新当前页面
                       // location.href="/user/bankRechargeResult";
                        //modal.show({
                        //    title: "充值",
                        //    content: function () {
                        //        var templateStr = $("#paySuccess").text();
                        //        var money = $("#bankMoney").val();
                        //        return $.MT('paySuccess', templateStr, {
                        //            amountPay: money,
                        //            surplus: $("#surplus").val()
                        //        });
                        //
                        //    },
                        //    size: {width: 650, height: 280},
                        //    showFoot: false,
                        //    showClose: true,
                        //    buttons: [
                        //        {
                        //            name: "关闭",
                        //        }
                        //    ]
                        //
                        //});
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
                },
                errorHandler: function (errs) {
                    btnValid2["addClass"]("btn_disable");
                },
                passedHandler: function () {
                    btnValid2["removeClass"]("btn_disable");
                },
                selectById:true,
                fields: {
                    money: {
                        required: true,
                        pattern: /^[\d\.]+$/,
                        minValue: 1,
                        //maxValue: 99999999999999,
                        output: "#bankMoneyTip"
                    },
                    bankCode: {
                        required: true
                    }
                },
                errorMessage: {
                    money: {
                        required: "<i class='icon_tips' ></i>请输入金额",
                        //maxValue: "<i class='icon_tips' ></i>超出最大金额",
                        minValue: "<i class='icon_tips' ></i>请输入金额"
                    },
                    bankCode: {
                        required: "<i class='icon_tips' ></i>请选择银行"
                    }
                }
            }, function (validator) {
                var isValid2 = validator.isValid;
                btnValid2[isValid2 ? "removeClass" : "addClass"]("btn_disable");
            });

        }

        return exports;


    }
)
;

