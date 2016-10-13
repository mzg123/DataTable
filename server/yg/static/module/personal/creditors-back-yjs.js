define("personal/creditors-back-yjs", ["ui/datepicker/js/foundation-datepicker","ui/pager/pager", 'personal/personal','ui/tabs/tabs'], function (require, exports, module) {

    require('ui/pager/pager');
    var Tabs = require('ui/tabs/tabs');
    require('personal/personal').run();
    var Pager = require('ui/pager/pager');
    var startDate = $("#startDate").val(), endDate = $("#endDate").val();
    var quickSearch = $("#invest_filter a.on").attr('type');
    var creditStatus,backStatus;


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
        var sti = 1;
        $(".processTab_tab").each(function(i,v){
            if($(v).hasClass('hover')){
                sti = i+1;
                backStatus = $(v).attr('type');
            }
        });
        new Tabs({
            tabsContainerId: "processTab_tabs",
            tabClass: "processTab_tab",
            selectedClass: "hover",
            contentContainerId: "processTab_content_container",
            contentClass: "processTab_content",
            eventType: 'click',
            defaultSelect:sti
        });

    }



    function initEvent() {

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
        $("#processTab_tabs").on('click','.processTab_tab',function(evt){
            backStatus = $(this).attr('type');
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
            creditStatus:creditStatus,
            backStatus:backStatus
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
        initPager();
        initTab();
        initEvent();

    }

    init();


    exports.run = function () {



    }


});

