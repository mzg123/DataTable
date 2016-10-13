define("transfer/transfer", ["ui/tabs/tabs", "ui/validation/validation", "ui/modal/modal", "ui/pager/pager", 'common/config'], function (require, exports, module) {

    //产品详情依赖的模块'
    var Pager = require('ui/pager/pager');
    require('ui/validation/validation');
    var Tabs = require("ui/tabs/tabs");
    var modal = require('ui/modal/modal');
    var config = require('common/config');
    require('ui/list/list');

    var btnValid = $("#btnBuy");
    var balance = parseFloat($("#availableAccountBalances").val()),
        _value = parseFloat($("#amountValue").val());

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
    function doLend(){

        if (btnValid.hasClass("btn_disable")) {
            return;
        }
        else {

            if(balance < _value){
                modal.show({
                    title: "提示",
                    content: $("#rechargeTip").html(),
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
                return;
            }

            //弹窗提示
            if (__globalData.sold) {
                modal.show({
                    title: "提示",
                    content: $("#soldModel").html(),
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

            }else  if (__globalData.settled) {
                modal.show({
                    title: "提示",
                    content: $("#settledModel").html(),
                    size: {width: 650, height: 220},
                    showFoot: true,
                    showClose: true,
                    buttons: [
                        {
                            name: "取消"
                        }
                    ]

                });

            }else {

                $("#amountValueForm").submit();

            }


        }
    }
    function initEvent(){

        //余额显示和不显示切换
        $("#moneyValue").on("click", function () {
            $(this).toggleClass("icon-eye-gray");
            $(this).siblings("span").children().children("cite").toggle(function () {
                $(this).next("cite").toggleClass("hide");
            });

        });

        //if(balance < _value){
        //    btnValid.addClass("btn_disable");
        //}


        //立即出借
        btnValid.on('click', doLend);

    }


    initEvent();

    $(function () {

        Index.init();

    });

});

