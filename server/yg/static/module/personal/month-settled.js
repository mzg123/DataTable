define("personal/month-settled", ["ui/datepicker/js/foundation-datepicker","ui/pager/pager", 'personal/personal','ui/tabs/tabs'], function (require, exports, module) {
    require('ui/pager/pager');
    var Tabs = require('ui/tabs/tabs');
    require('personal/personal').run();
    var Pager = require('ui/pager/pager');
    var startDate = $("#startDate").val(), endDate = $("#endDate").val();
    var quickSearch = $("#invest_filter a.on").attr('type');
    var creditStatus;
    function initTab(){
        var tabIndex = 1;
        $(".process_tab").each(function(i,v){
            if($(v).hasClass('hover')){
                tabIndex = i+1;
                creditStatus = $(v).attr('type');
            }
        });

        new Tabs({
            tabsContainerId: "process_tabs",
            tabClass: "process_tab",
            selectedClass: "hover",
            contentContainerId: "process_content_container",
            contentClass: "process_content",
            eventType: 'click',
            defaultSelect:tabIndex
        });

    }

    function initEvent() {
        //var dayLen = 24*3600*1000;
        //var now = new Date,
        //    ntime = now.getTime()-dayLen;
        //now = new Date(ntime);
        //var ofs = new Date(ntime-365*dayLen);
        ////$("#startDate").val((new Date(ntime - 90*365)).format('yyyy-MM-dd'));
        ////$("#endDate").val(now.format('yyyy-MM-dd'));
        //
        //$('#startDate').fdatepicker({
        //    format: 'yyyy-mm-dd',
        //    language: 'zh-CN',
        //    startDate:ofs.format('yyyy-MM-dd'),
        //    endDate:now.format('yyyy-MM-dd')
        //})
        ////.on('changeDate', reloadList)
        //$("#endDate").fdatepicker({
        //    format: 'yyyy-mm-dd',
        //    language: 'zh-CN',
        //    startDate:ofs.format('yyyy-MM-dd'),
        //    endDate:now.format('yyyy-MM-dd')
        //})
        //.on('changeDate', reloadList)
        $("#invest_filter").on('click','a',function(){
            $("#invest_filter a").removeClass('on');
            var type = $(this).addClass('on').attr('type');
            quickSearch = type;
            startDate = endDate = "";
            reloadList();
        });
        $("#queryBtn").on('click',function(){
            startDate = $("#startDate").val();
            endDate = $("#endDate").val();
            quickSearch = "";
            reloadList()
        });

        $("#process_tabs").on('click','.process_tab',function(evt){
            creditStatus = $(this).attr('type');
            reloadList();
        });
        //日期图标点击事件
        $(".icon_date").click(function(){
            $(this).next($("input")).trigger("focus");
        });
    }
    function reloadList(){
        var params = $.utils.getUrlParam();

        var obj = {
            creditStatus:creditStatus
        };

        if(quickSearch){
            $.extend(obj,{
                'searchType':quickSearch
            });
            delete params.startDate;
            delete params.endDate;
        }else if(startDate){
            $.extend(obj,{
                'startDate':startDate,
                'endDate':endDate
            });
            delete params.searchType;
        }

        location.href = location.pathname+"?"+ $.utils.json2query($.extend(params,obj))+location.hash;
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
        initTab();
        initEvent();
        initPager();

    }

    init();


    exports.run = function () {



    }


});

