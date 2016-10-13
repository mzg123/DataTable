define("product/product", ["ui/tabs/tabs", "ui/validation/validation", "ui/modal/modal", "ui/pager/pager",'common/config'], function (require, exports, module) {

    //产品详情依赖的模块'
    var Pager = require('ui/pager/pager');
    require('ui/validation/validation');
    var Tabs = require("ui/tabs/tabs");
    var modal = require('ui/modal/modal');
    var config = require('common/config');
    require('ui/list/list');

    var isLogin = !!$("#availableAccountBalances").length;

    var curAmount = $('#amountValue').val();

    var btnValid = $("#btnBuy");

    var changeable = true;

    var Index = {
        init: function () {
            this._addEventListener();
        },

        _addEventListener: function () {

            var that = this;

            var productTabs = new Tabs({
                tabsContainerId: "product_tabs",
                tabClass: "product_tab",
                selectedClass: "hover",
                contentContainerId: "product_content_container",
                contentClass: "product_content",
                eventType: 'click'
            });

        }
    };

    function calculateProfit(){

        var value = $("#amountValue").val();
        if(!/^\d+$/.test(value)) return;
        $.ajax({
            type: "post",
            url: "/calcincome",
            data: {
                money: value,
                creditId: $("#creditId").val()
            },
            dataType: "json",
            success: function (data) {
                var shouyi = data.data.expectedRevenue;
                var sf = data.data.serviceFee;
                var fd = $(".product_right .product_buy p span.red");
                fd.eq(0).text($.numberFormat(shouyi, 2) + "元");
                fd.eq(1).text($.numberFormat(sf, 2) + "元");
                //$(".product_right .product_buy p span.red").text($.numberFormat(shouyi) + "元")
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    function initEvent(){
        //输入框的值-计算预期收益
        $('#amountValue').bind('keyup', function (event) {
            var code = event.which || event.charCode || event.keyCode;
            if(code == 13){
                doLend();
                return;
            }
            var value = parseFloat( $(this).val()) || 0;
            if(value >= minValue){
                addBtn.removeClass('disabled');
                reduceBtn.removeClass('disabled');
            }else{
                addBtn.addClass('disabled');
                reduceBtn.addClass('disabled');
            }
            //var valid = $(this).data('valid');

            if (!/^\d+00$/.test(value+"")) {
                $(".product_right .product_buy p span.red").text('0.00元')
                return;
            }
            else {
                calculateProfit();
            }

        }.delay(200)).bind('keyup',function(evt){
            var value = parseFloat( $(this).val()) || 0;
            if(value >= maxValue){
                $(this).val(maxValue);
            }
        }).disablePaste();

        //余额显示和不显示切换
        $("#moneyValue").on("click", function () {
            $(this).toggleClass("icon-eye-gray");
            $(this).siblings("span").children().children("cite").toggle(function () {
                $(this).next("cite").toggleClass("hide");
            });


        });
        //以100递增
        var addBtn = $(".product_buy .icon_add"),
            reduceBtn = $(".product_buy .icon_reduce");
        if(!curAmount){
            addBtn.addClass('disabled');
            reduceBtn.addClass('disabled');
        }
        addBtn.on('click', function () {
            if($(this).hasClass('disabled')) return;
            var oldValue = parseInt($("#amountValue").val());
            if ($("#amountValue").val() == "") {
                $("#amountValue").val(minValue);

            } else {
                oldValue += stepLength;
                var remainder = (oldValue-minValue)%stepLength;
                if(remainder){
                    oldValue -= remainder;
                }
                if(oldValue >= maxValue) oldValue = maxValue;

                $("#amountValue").val(oldValue);

            }
            $("#amountValue").trigger("input").trigger('keyup').trigger('validate');
        });
        //以100递减
        reduceBtn.on('click', function () {
            if($(this).hasClass('disabled')) return;
            var oldValue = parseInt($("#amountValue").val());
            if ($("#amountValue").val() == "") {
                $("#amountValue").val(minValue);
            } else {
                if(oldValue-minValue>stepLength) {
                    oldValue -= stepLength;
                    if (oldValue <= minValue) {
                        oldValue = minValue;
                    } else {
                        var remainder = (oldValue - minValue) % stepLength;
                        if (remainder) {
                            oldValue = oldValue - remainder + stepLength;
                        }
                    }
                }
                else
                {
                    oldValue=minValue;
                }
                $("#amountValue").val(oldValue);
            }
            $("#amountValue").trigger("input").trigger('keyup').trigger('validate');
        });


        //立即出借
        btnValid.on('click', doLend);

        $("#amountValue").keypress(onlyNumber);
        $("#amountValue2").keypress(onlyNumber);

    }

    function showRisk() {
        modal.show({
            title: "重要提示",
            content: $("#tipsModel").html(),
            size: {width: 650, height: 320},
            showFoot: true,
            showClose: true,
            buttons: [
                {
                    name: "确定",
                    clicked: function () {

                        if (!$(".product_risk #agree").attr('checked'))
                            return false;

                        $("#amountValueForm").append('<input value="1" name="agree" type="hidden" style="height: 15px"/>')

                        $("#amountValueForm").submit();

                    },
                    btnClass: "btn-cancel risk_confirm"

                },
                {
                    name: "取消",
                    btnClass: 'btn-cancel risk_cancel'
                }
            ]

        });

        $(".product_risk #agree").on('change', function () {
            if ($(this).attr('checked')) {
                $(".risk_confirm").removeClass('btn-cancel').addClass('btn-ok');

            }
            else {
                $(".risk_confirm").addClass('btn-cancel').removeClass('btn-ok');
            }
        });

    }

    function doLend(){

        if (btnValid.hasClass("btn_disable")) {
            return;
        }
        else {
            //弹窗提示
            if (__globalData['new']) {
                modal.show({
                    title: "提示",
                    content: $("#newModel").html(),
                    size: {width: 650, height: 220},
                    showFoot: true,
                    showClose: true,
                    buttons: [
                        {
                            name: "取消",
                            btnClass:"btn_red"
                        }
                    ]

                });

            }else  if (__globalData.overdue) {
                modal.show({
                    title: "提示",
                    content: $("#overdueModel").html(),
                    size: {width: 650, height: 220},
                    showFoot: true,
                    showClose: true,
                    buttons: [
                        {
                            name: "取消"
                        }
                    ]

                });

            }else  if (__globalData.risk) {

                showRisk();

            } else {
                $("#amountValueForm").submit();

            }


        }
    }

    //输入框非负数
    function onlyNumber(event) {
        var code = event.which || event.charCode || event.keyCode;
        if(code == 8 || (code >= 48 && code <= 57) ){
            return true;
        }
        return false;
    }

    initEvent();

    //验证
    var minValue = __globalData.baseLine/100 || 100,
        maxValue = 10000000,
        stepLength = __globalData.stepLength/100 || 100,
        ala = $("#availableLendingAmount").text().replace(/,/g, '') || 0;
    if(ala <= minValue){
        changeable = false;
        minValue = ala;
    }
    //minValue = Math.min(minValue,parseFloat($("#availableLendingAmount").text().replace(/,/g, '') || 0));

    $("#amountValueForm").validate({

        submitHandler: function () {

        },
        errorHandler: function (errs) {
            btnValid["addClass"]("btn_disable");

        },
        passedHandler: function () {
            btnValid["removeClass"]("btn_disable");
        },
        enterSubmit:false,
        lazyValidate:true,
        fields: {
            amountValue: {
                required: true,
                pattern: /^[1-9]\d*00$/,
                minValue: minValue,
                output: "#amountValueTip",
                validator: function () {
                    var val = $(this).val();
                    var amount = parseFloat($("#availableLendingAmount").text().replace(/,/g, '') || 0);
                    var abalances = parseFloat($("#availableAccountBalances").text().replace(/,/g, '') || 0);
                    if(isLogin && parseFloat(val) == amount && abalances >= amount) return;

                    if(!val){
                        return "<i class='icon-close' ></i>请输入出借金额"
                    }
                    else if (!/^\d+$/.test(val) || (/^\d+$/.test(val) && (val-minValue)%stepLength) || parseFloat(val) < minValue) {
                        return "<i class='icon-close' ></i>出借金额必须等于'递增金额的整数倍+起始出借金额'"
                    }else {
                        val = parseFloat(val);
                        //if (val < minValue) {
                        //    return "<i class='icon-close' ></i>起投金额为" + minValue + "元"
                        //}
                        if (isLogin) {

                            var max = Math.min(amount, abalances);
                            var fText,sText, f,s;
                            if(amount > abalances){
                                f = amount;
                                s = abalances;
                                fText = "<i class='icon-close' ></i>金额超过剩余可出借金额，请重新输入";
                                sText = "<i class='icon-close' ></i>您的账户余额不足，请充值";
                            }else{
                                f = abalances;
                                s = amount;
                                fText = "<i class='icon-close' ></i>您的账户余额不足，请充值";
                                sText = "<i class='icon-close' ></i>金额超过剩余可出借金额，请重新输入";
                            }
                            if(val > f)
                                return fText;
                            else if(val > s)
                                return sText;
                        } else {
                            if (val > amount) {
                                return "<i class='icon-close' ></i>金额超过剩余可出借金额，请重新输入";
                            }
                        }
                    }
                }
            }
        },
        errorMessage: {
            amountValue: {
                required: "<i class='icon-close' ></i>请您输入投资金额",
                pattern: "<i class='icon-close' ></i>投资金额，必须是100的整数倍",
                minValue: "<i class='icon-close' ></i>起投金额为" + minValue + "元"

            }
        }
    }, function (validator) {
        var isValid = validator.isValid;
        btnValid[isValid ? "removeClass" : "addClass"]("btn_disable");
    });


    //var minValue2 = parseInt($("#amountValue2").attr('amount-value')) || 100;
    $("#amountValueForm2").validate({


        submitHandler: function () {

        },
        errorHandler: function (errs) {
            btnValid["addClass"]("btn_disable");

        },
        passedHandler: function () {
            btnValid["removeClass"]("btn_disable");
        },
        fields: {
            amountValue2: {
                required: true,
                pattern: /^[1-9]\d*00$/,
                minValue: 100,
                output: "#amountValueTip2"
            }

        },
        errorMessage: {
            amountValue2: {
                required: "<i class='icon_tips' ></i>请您输入投资金额",
                pattern: "<i class='icon_tips' ></i>投资金额，必须是100的整数倍",
                minValue: "<i class='icon_tips' ></i>起投金额为100元"
            }
        }
    }, function (validator) {
        var isValid = validator.isValid;
         //btnValid[isValid ? "removeClass" : "addClass"]("btn_disable");
    });

    function disableUserInput(){
        $("#amountValue").prop('readonly',true).on('keypress',function(){
            return false;
        });
        $("div.icon_reduce,div.icon_add").addClass('disabled');
    }


    $(function () {
        if(!changeable){
            disableUserInput();
        }
        Index.init();

        //if($("#amountValue").data('valid')){
        //    calculateProfit();
        //}
    });


});

