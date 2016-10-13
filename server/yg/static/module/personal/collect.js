define("personal/collect", ["ui/datepicker/js/foundation-datepicker","ui/modal/modal","ui/pager/pager", 'personal/personal'], function (require, exports, module) {
    var modal = require('ui/modal/modal');
    var Pager = require('ui/pager/pager');

    require('personal/personal').run();

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

        //var dayLen = 24*3600*1000;
        //var now = new Date,
        //    ntime = now.getTime()-dayLen;
        //now = new Date(ntime);
        //var ofs = new Date(ntime-365*dayLen);
        //
        ////$("#startDate").val((new Date(ntime-90*dayLen)).format('yyyy-MM-dd'));
        ////$("#endDate").val(now.format('yyyy-MM-dd'));
        //
        //$('#startDate').fdatepicker({
        //    format: 'yyyy-mm-dd',
        //    language: 'zh-CN',
        //    startDate:ofs.format('yyyy-MM-dd'),
        //    endDate:now.format('yyyy-MM-dd')
        //});
        //
        ////.on('changeDate', reloadList)
        //$("#endDate").fdatepicker({
        //    format: 'yyyy-mm-dd',
        //    language: 'zh-CN',
        //    startDate:ofs.format('yyyy-MM-dd'),
        //    endDate:now.format('yyyy-MM-dd')
        //});

        $("#queryBtn").on('click',reloadList);
        //日期图标点击事件
        $(".icon_date").click(function(){
            $(this).next($("input")).trigger("focus");
        });

        $(".personal_content").on('click','.mask-el',forceAuth);
    }
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


    }

    init();



    exports.run = function () {




    }


});

