define("month/month_detail", ["ui/tabs/tabs", "ui/validation/validation", "ui/modal/modal", "ui/pager/pager", 'common/config'], function (require, exports, module) {

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

    var pageSize = 10,
        currentPage = 1,
        totalPage = 1,
        pager = null,
        pageInited = false;

    var changeable = true;

    function buildTableContent(dataList) {

        var html = "";
        for (var i = 0, id; (id = dataList[i]); i++) {
            id.amount = $.numberFormat(id.amount / 100, 2);
            /*var str = id.userName;
            var strlen = str.length;
            if(strlen <= 2)str = str.substr(0,1) + "*";
            else{
                str = str[0]+str.substr(1,strlen-2).replace(/./g,'*')+str[strlen-1];
            }
            id.userName = str;*/
            html += ("<tr>" +
            "<td>{serialNum}</td>" +
            "<td>{userName}</td>" +
            "<td>{amount}</td>" +
            "<td>{paymentDate}</td>" +
            "<td>成功</td>" +
            "</tr>").format(id);

        }


        $("#trList").html(html);
    }

    function changePage(num) {
        currentPage = num;
        var result = recordList.slice((currentPage - 1) * pageSize, currentPage * pageSize);
        buildTableContent(result);
    }

    function _formatTime(leftTime) {
        var minLen = 60,
            hrLen = 60 * minLen,
            dayLen = hrLen * 24;
        var vals = [];
        vals.push(Math.floor(leftTime / dayLen), '天');
        vals.push(Math.floor(leftTime % dayLen / hrLen), '时');
        vals.push(Math.floor(leftTime % dayLen % hrLen / minLen), '分');
        vals.push(Math.floor(leftTime % dayLen % hrLen % minLen), '秒');
        while (vals[0] === 0) {
            vals.splice(0, 2);
        }
        return vals.join('');
    }

    function timeCountDown() {
        var leftTime = parseFloat($("#leftTime").attr('time-left'));
        if (!leftTime || leftTime === 0) return;
        leftTime = Math.round(leftTime / 1000);
        if (leftTime === 0) return;
        var timeStr = _formatTime(leftTime);
        $("#leftTime").html('<i class="gray">剩余时间</i><br/>' + timeStr);
        setInterval(function () {
            if (--leftTime) {
                var timeStr = _formatTime(leftTime);
                $("#leftTime").html('<i class="gray">剩余时间</i><br/>' + timeStr);
            } else {
                location.reload();
            }
        }, 1000)
    }

    //出借服务与管理协议
    $("#viewTemplate").on("click", function () {


        //300112 是银月盈 300124是谷双丰
        var planType=$(this).attr("plantype");

        var protocol="#viewProtocol";
        if(planType=="300112")
            protocol="#viewProtocol";
        else if(planType=="300224")
            protocol="#viewProtocol_1";
        modal.show({
            title: $(protocol).attr("title"),
            content: $(protocol).html(),
            size: {width: 750, height: 600},
            showFoot: false,
            showClose: true,
            buttons: [
                {
                    name: "关闭"
                }
            ]
        });
    });

    function loadRecordList(){
        $.ajax({
            type: "get",
            url: "/getMonthPlanPaymentRecord",
            data: {
                planId: $("#planId").text(),
                'page.size':pageSize,
                'page.current':currentPage
            },
            dataType: "json",
            success: function (data) {
                data = data.data;
                var recordList = data.recordList;
                if (recordList == "undefine")return;
                if (!recordList.length) {
                    $("#tableNull").show();
                    return;
                }

                if(!pager){
                    totalPage = data.page.totalPages;
                    initPager();
                }

                buildTableContent(recordList);
            },
            error: function (err) {
                console.log(err);
            }

        });
    }

    //加入记录
    $("#getRecord").on("click", function(){
        if(!pager && __globalData.isLogin){
            loadRecordList();
        }
    });
    function initPager() {

        pager = new Pager({
            containerId: "pager",
            showPage: currentPage,
            totalNum: totalPage,
            currentPage: 1,
            onChange: function (pageNum) {
                currentPage = pageNum;
                loadRecordList();
            }
        });
    }

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
                //defaultSelect:3
            });

        }
    };

    function calculateProfit() {

        var value = $("#amountValue").val();
        if(!/^\d+$/.test(value)) return;
        $.ajax({
            type: "post",
            url: "/monthPlanFeeAndExpected",
            data: {
                money:value,
                planId: $("#planId").text()
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

    function initEvent() {
        //输入框的值-计算预期收益
        $('#amountValue').bind('keyup', function (event) {
            var code = event.which || event.charCode || event.keyCode;
            if (code == 13) {
                doLend();
                return;
            }
            var value = parseFloat($(this).val()) || 0;

            if (value >= minValue) {
                addBtn.removeClass('disabled');
                reduceBtn.removeClass('disabled');
            } else {
                addBtn.addClass('disabled');
                reduceBtn.addClass('disabled');
            }
            //var valid = $(this).data('valid');

            if (!/^\d+00$/.test(value + "")) {
                $(".product_right .product_buy p span.red").text('0.00元')
                return;
            }
            else {
                calculateProfit();
            }

        }.delay(200)).bind('keyup', function (evt) {
            var value = parseFloat($(this).val()) || 0;
            if (value >= maxValue) {
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
        if (!curAmount) {
            addBtn.addClass('disabled');
            reduceBtn.addClass('disabled');
        }
        addBtn.on('click', function () {
            if ($(this).hasClass('disabled')) return;
            var oldValue = parseInt($("#amountValue").val());
            if ($("#amountValue").val() == "") {
                $("#amountValue").val(minValue);

            } else {
                oldValue += stepLength;
                var remainder = (oldValue - minValue) % stepLength;
                if (remainder) {
                    oldValue -= remainder;
                }
                if (oldValue >= maxValue) oldValue = maxValue;

                $("#amountValue").val(oldValue);

            }
            $("#amountValue").trigger("input").trigger('keyup').trigger('validate');
        });
        //以100递减
        reduceBtn.on('click', function () {
            if ($(this).hasClass('disabled')) return;
            var oldValue = parseInt($("#amountValue").val());
            if ($("#amountValue").val() == "") {
                $("#amountValue").val(minValue);
            } else {
                if(oldValue-minValue>stepLength) {
                    oldValue -= stepLength;

                    var remainder = (oldValue - minValue) % stepLength;
                    if (remainder) {
                        oldValue = oldValue - remainder + stepLength;
                    }

                    if (oldValue <= minValue) {
                        oldValue = minValue;
                    }
                }
                else{
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


    function doLend() {

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
                            btnClass: "btn_red"
                        }
                    ]

                });

            } else if (__globalData.password) {
                modal.show({
                    title: "提示",
                    content: $("#passwordModel").html(),
                    size: {width: 650, height: 220},
                    showFoot: true,
                    showClose: true,
                    buttons: [
                        {
                            name: "取消"
                        }
                    ]

                });

            } else {
                $("#amountValueForm").submit();

            }


        }
    }

    //输入框非负数
    function onlyNumber(event) {
        var code = event.which || event.charCode || event.keyCode;
        if (code == 8 || (code >= 48 && code <= 57)) {
            return true;
        }
        return false;
    }

    initEvent();

    //验证
    var minValue = __globalData.baseLine / 100 || 100,
        maxValue = 10000000,
        stepLength = __globalData.stepLength / 100 || 100,
        ala = $("#availableLendingAmount").text().replace(/,/g, '') || 0;
    if(ala <= minValue){
        changeable = false;
        minValue = ala;
    }
    //minValue = Math.min(minValue, parseFloat($("#availableLendingAmount").text().replace(/,/g, '') || 0));


    $("#amountValueForm").validate({

        submitHandler: function () {

        },
        errorHandler: function (errs) {
            btnValid["addClass"]("btn_disable");

        },
        passedHandler: function () {
            btnValid["removeClass"]("btn_disable");
        },
        enterSubmit: false,
        lazyValidate: true,
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
                    if (isLogin && parseFloat(val) == amount && abalances >= amount) return;

                    if (!val) {
                        return "<i class='icon-close' ></i>请输入出借金额"
                    }
                    else if (!/^\d+$/.test(val) || (/^\d+$/.test(val) && (val - minValue) % stepLength) || parseFloat(val) < minValue) {
                        return "<i class='icon-close' ></i>出借金额必须等于'递增金额的整数倍+起始出借金额(元)'"
                    } else {
                        val = parseFloat(val);
                        //if (val < minValue) {
                        //    return "<i class='icon-close' ></i>起投金额为" + minValue + "元"
                        //}
                        if (isLogin) {

                            var max = Math.min(amount, abalances);
                            var fText, sText, f, s;
                            if (amount > abalances) {
                                f = amount;
                                s = abalances;
                                fText = "<i class='icon-close' ></i>金额超过剩余可出借金额，请重新输入";
                                sText = "<i class='icon-close' ></i>您的账户余额不足，请充值";
                            } else {
                                f = abalances;
                                s = amount;
                                fText = "<i class='icon-close' ></i>您的账户余额不足，请充值";
                                sText = "<i class='icon-close' ></i>金额超过剩余可出借金额，请重新输入";
                            }
                            if (val > f)
                                return fText;
                            else if (val > s)
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
        //btnValid[isValid ? "removeClass" : "addClass"]("btn_disable");
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
        // btnValid[isValid ? "removeClass" : "addClass"]("btn_disable");
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
        //if ($("#amountValue").data('valid')) {
        //    calculateProfit();
        //}
        timeCountDown();


    });

});

