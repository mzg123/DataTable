define("personal/month-plan-detail", ["ui/modal/modal",'personal/personal',"ui/pager/pager"], function (require, exports, module) {

    //产品详情依赖的模块
    var modal = require('ui/modal/modal');
    require('personal/personal').run();
    var Pager = require('ui/pager/pager');

    //提现信息确认弹窗
    exports.run = function () {
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
                title: $("#agreement").attr("title"),
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
                title: $("#agreement2").attr("title"),
                content: $("#agreement2").html(),
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
        $("#Authorization3").on('click', function () {
            modal.show({
                title: $("#agreement3").attr("title"),
                content: $("#agreement3").html(),
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
        $("#Authorization4").on('click', function () {
            modal.show({
                title: $("#agreement4").attr("title"),
                content: $("#agreement4").html(),
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
        function initPager(){
            var pg = $("#pager");
            var cp = parseInt(pg.attr('current-page'));
            var p = new Pager({
                containerId : "pager",
                showPage : parseInt(pg.attr('show-page')) || 5,
                totalNum : parseInt(pg.attr('total-num')) || 10,
                currentPage:  1,
                onChange : function(pageNum){
                    var params = $.utils.setUrlParam('page',pageNum);
                    location.href = location.pathname+params+location.hash;
                }
            });

            p.goTo(cp);
        }
        function init(){
            initPager();

        }

        init();



    }

});

