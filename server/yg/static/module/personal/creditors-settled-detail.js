define("personal/creditors-settled-detail", ["ui/modal/modal",'personal/personal'], function (require, exports, module) {

    //产品详情依赖的模块
    var modal = require('ui/modal/modal');
    require('personal/personal').run();

    //提现信息确认弹窗
    exports.run = function () {
        //查看还款详情
        $("#seeDetail").on("click",function(){
            modal.show({
                title:$("#repayment").attr("title"),
                content: $("#repayment").html(),
                size:{width:900,height:580},
                showFoot: false,
                showClose: true,
                //buttons: [
                //    {
                //        name: "确定",
                //    },
                //    {
                //        name: "关闭"
                //    }
                //
                //]
            });

        });
        $("#Authorization").on('click', function () {
            modal.show({
                title: "出借咨询与服务协议",
                content: $("#agreement").html(),
                size:{width:750,height:590},
                showFoot: true,
                showClose: true,
                buttons: [
                    {
                        name: "确定"
                    },
                    {
                        name: "关闭"
                    }

                ]
            });

        });
        $("#Authorization2").on('click', function () {
            modal.show({
                title: "借款协议",
                content: $("#agreement2").html(),
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
            });

        });
        $("#Authorization3").on('click', function () {
            modal.show({
                title: "风险提示书",
                content: $("#agreement3").html(),
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
            });

        });
        $("#Authorization4").on('click', function () {
            modal.show({
                title: "债权转让及受让协议",
                content: $("#agreement4").html(),
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
            });

        });




    }

});

