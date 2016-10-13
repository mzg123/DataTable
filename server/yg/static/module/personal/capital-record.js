define("personal/capital-record", ["ui/datepicker/js/foundation-datepicker","ui/pager/pager",'common/config',
    "personal/personal",'ui/select/select','ui/pager/pager'], function (require, exports, module) {
    require('ui/pager/pager');
    require('personal/personal').run();
    require('ui/select/select');
    var Pager = require('ui/pager/pager');
    var config = require('common/config');
    var curStatus,lp,typeItem;

    var startDate = $("#startDate").val(), endDate = $("#endDate").val();
    var quickSearch = $("#invest_filter a.on").attr('type');
    var tradeType = '';


    function initEvent() {

        //var dayLen = 24*3600*1000;
        //var now = new Date,
        //    ntime = now.getTime()-dayLen;
        //now = new Date(ntime);
        //var ofs = new Date(ntime-365*dayLen);
        ////$("#startDate").val((new Date(ntime-90*dayLen)).format('yyyy-MM-dd'));
        ////$("#endDate").val(now.format('yyyy-MM-dd'));
        //
        //$('#startDate').fdatepicker({
        //    format: 'yyyy-mm-dd',
        //    language: 'zh-CN',
        //    startDate:ofs.format('yyyy-MM-dd'),
        //    endDate:now.format('yyyy-MM-dd')
        //});
        //    //.on('changeDate', reloadList)
        //$("#endDate").fdatepicker({
        //    format: 'yyyy-mm-dd',
        //    language: 'zh-CN',
        //    startDate:ofs.format('yyyy-MM-dd'),
        //    endDate:now.format('yyyy-MM-dd')
        //});
            //.on('changeDate', reloadList)
        $("#invest_filter").on('click','a',function(){
            $("#invest_filter a").removeClass('on');
            var type = $(this).addClass('on').attr('type');
            quickSearch = type;
            startDate = endDate = "";
            reloadList();
        });
        $('#typeItem').ygSelect({
            width:120,
            height:30
        }).on('change',function(){
            tradeType = $("#typeItem").val();
            reloadList();
        });

        $("#queryBtn").on('click',function(){
            startDate = $("#startDate").val();
            endDate = $("#endDate").val();
            quickSearch = "";
            reloadList()
        })
    }

    function reloadList(){

        var params = $.utils.getUrlParam();

        var obj = {
            feeSearchType:tradeType
        }

        if(quickSearch){
            $.extend(obj,{
                'searchType':quickSearch
            })
            delete params.startDate;
            delete params.endDate;
        }else if(startDate){
            $.extend(obj,{
                'startDate':startDate,
                'endDate':endDate
            })
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

    /*function initProductList(){

        lp = new ListPage({
            list:{
                root:"#resultTable tbody",
                listItem:"tr",
                pageSize:10,
                itemTemplate:$("#rowTemplate").html(),
                dataSource:{
                    url:config.api.getInvestRecord,
                    type:'get',
                    data:function(tmp){
                        return {
                            'page.size':tmp.pageSize,
                            'page.current':tmp.currentPage,
                            'logType':$("#invest_filter a.on").attr('type'),
                            'typeItem':$("#typeItem .selected").attr('type'),
                            'beginTime':$("#startDate").val(),
                            'endTime':$("#endDate").val()
                        }
                    },
                    beforeApply:function(res){

                        res = res.data;

                        //var unread = res.unreadMsgBox;
                        //
                        //$("#messageCount").html(res.page.totalRows);
                        //$("#unReadCount").html(unread);

                        return {
                            totalRecords:res.page.totalRows,
                            currentPage:res.page.currentPage,
                            pageSize:res.page.pageSize,
                            dataList:res.dataList
                        }
                    }
                }
            },
            pager:{
                containerId:"pager",
                showPage:5,
                onChange:function(){
                }
            },
            onReady:function(){
                var list = lp.getListInstance();

                if(!list.count()){
                    $("#tableNull").show();
                }
            }
        })


    }*/

    function init(){

        initEvent();

        initPager();
        //curStatus = $("#invest_filter").val();
        //typeItem = $("#typeItem").val();



    }

    init();
    //日期图标点击事件
    $(".icon_date").click(function(){
        $(this).next($("input")).trigger("focus");
    });


});

