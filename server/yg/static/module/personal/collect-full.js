define("personal/collect-full", ["ui/datepicker/js/foundation-datepicker","ui/modal/modal","ui/pager/pager", 'personal/personal'], function (require, exports, module) {
    var modal = require('ui/modal/modal');
    var Pager = require('ui/pager/pager');
    require('personal/personal').run();

    //var curStatus,lp;

    var startDate = '', endDate = '';

    //未做实名认证弹窗
    function forceAuth(){

        if (!__globalData.auth) {
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

    }

    forceAuth();


    function initEvent() {

        $("#queryBtn").on('click',reloadList);
        //日期图标点击事件
        $(".icon_date").click(function(){
            $(this).next($("input")).trigger("focus");
        });

        $(".personal_content").on('click','.mask-el',forceAuth);
    }
    //function reloadList(){
    //    lp && lp.refresh();
    //}
    function reloadList(){
        var params = $.utils.setUrlParam({'startDate':$("#startDate").val(),'endDate':$("#endDate").val()});
        location.href = location.pathname+params+location.hash;
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


        initEvent();
        initPager();
        //initProductList();
        //curStatus = $("#invest_filter").val();

    }

    init();


    exports.run = function () {



    }


});

