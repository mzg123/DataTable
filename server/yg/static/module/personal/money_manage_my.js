define("personal/money_manage_my", ["ui/modal/modal"], function (require, exports, module) {

    //产品详情依赖的模块

    var modal = require('ui/modal/modal');


    //提现信息确认弹窗
    exports.run = function () {
        $("#Authorization").on('click', function () {
            modal.show({
                title: "委托扣款授权书",
                content: $("#moneyModel").html(),
                size:{width:750,height:590},
                showFoot: true,
                showClose: true,
                buttons: [
                    {
                        name: "确定",
                    },
                    {
                        name: "关闭",
                    }

                ]
            })

        });
        $("#seeProfit").on('click', function () {
            modal.show({
                title: "月月盈-收益计划",
                content: $("#profitModel").html(),
                size:{width:750,height:590},
                showFoot: true,
                showClose: true,
                buttons: [
                    {
                        name: "确定",
                    },
                    {
                        name: "关闭",
                    }

                ]
            })

        });


    }

});

