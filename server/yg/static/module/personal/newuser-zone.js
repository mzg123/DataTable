define("personal/newuser-zone", ["ui/modal/modal",'personal/personal',"ui/pager/pager"], function (require, exports, module) {

    //产品详情依赖的模块
    var modal = require('ui/modal/modal');
    require('personal/personal').run();
    var Pager = require('ui/pager/pager');

    //提现信息确认弹窗
    exports.run = function () {

        $("#viewTemplate").on('click', function () {
            modal.show({
                title: $("#viewProtocol").attr("title"),
                content: $("#viewProtocol").html(),
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
        $("#viewTemplate2").on('click', function () {
            modal.show({
                title: $("#viewProtocol2").attr("title"),
                content: $("#viewProtocol2").html(),
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
        $("#viewTemplate3").on('click', function () {
            modal.show({
                title: $("#viewProtocol3").attr("title"),
                content: $("#viewProtocol3").html(),
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
        $("#viewTemplate4").on('click', function () {
            modal.show({
                title: $("#viewProtocol4").attr("title"),
                content: $("#viewProtocol4").html(),
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

        function getListItemTemp(data){
            var temp = "";
            var currentTabIndex = this.productTabs.getCurrentNum();
            var prefix = "";

            for (var i = 0; i < data.length; i++) {
                //tr
                var tr = "<tr>";
                if((i + 1) % 2 == 0) {
                    tr = '<tr class="bg">';
                }
                temp += tr;
                //中间部分
                var mid =  '<td>'+ data[i].planId +'</td>' +
                    '<td>'+ data[i].joinNum +'</td>' +
                    '<td>'+ data[i].joinNum +'</td>' +
                    '<td>'+ data[i].joinNum +'</td>' +
                    '<td class="font_cf4473b">'+ data[i].joinNum +'</td>' +
                    '<td class="font_cf4473b">'+ data[i].joinNum +'</td>' +
                    '<td>'+ data[i].joinNum +'</td>' +
                    '<td>'+ data[i].joinNum +'</td>' +
                    '<td>'+ data[i].revenue +'</td>';
                temp += mid;
                //尾部

                temp += "</tr>";
            }

            return temp;

        }

        function reloadList(pageNum){
            $.POST("/monthPlanList",{"subPlanType":period,"currentPage" : pageNum},function(r){

                if(r.code == 0){
                    var temp = getListItemTemp(r.data);

                    $("#mycapitaldata").find("tbody").html(temp);
                }

            },"json");


        }

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

