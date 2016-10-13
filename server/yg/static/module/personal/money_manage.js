define("personal/collect-flow", ["ui/datepicker/js/foundation-datepicker","ui/modal/modal","ui/pager/pager",'ui/list/list','ui/list/ListPage','common/config', 'personal/personal'], function (require, exports, module) {
    var modal = require('ui/modal/modal');
    require('ui/pager/pager');
    require('ui/list/list');
    var ListPage = require('ui/list/ListPage'),
        config = require('common/config');
    require('personal/personal').run();

    var curStatus,lp;

    var startDate = '', endDate = '';

    //未做实名认证弹窗
    if (!__globalData.auth) {
        modal.show({
            title: "提示",
            content: $("#authentication").html(),
            size: {width: 650, height: 200},
            showFoot: false,
            showClose: false,
            buttons: [
                {
                    name: "关闭"
                }
            ]

        });

    }

    function initProductList(){

        lp = new ListPage({
            list:{
                root:"#resultTable tbody",
                listItem:"tr",
                pageSize:10,
                itemTemplate:$("#rowTemplate").html(),
                dataSource:{
                    url:config.api.getWealthOrderList,
                    type:'get',
                    data:function(tmp){
                        return {
                            'page.size':tmp.pageSize,
                            'page.current':tmp.currentPage,
                            'orderStatus':$("#invest_filter a.on").attr('type'),
                            'beginTime':$("#startDate").val(),
                            'endTime':$("#endDate").val()
                        }
                    },
                    beforeApply:function(res){
                        res = res.data;

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


    }

    function initEvent() {
        var dayLen = 24*3600*1000;
        var now = new Date,
            ntime = now.getTime()-dayLen;
        now = new Date(ntime);
        var ofs = new Date(ntime-365*dayLen);
        //$("#startDate").val(ofs.format('yyyy-MM-dd'));
        //$("#endDate").val(now.format('yyyy-MM-dd'));

        $('#startDate').fdatepicker({
            format: 'yyyy-mm-dd',
            language: 'zh-CN',
            startDate:ofs.format('yyyy-MM-dd'),
            endDate:now.format('yyyy-MM-dd')
        })
        //.on('changeDate', reloadList)
        $("#endDate").fdatepicker({
            format: 'yyyy-mm-dd',
            language: 'zh-CN',
            startDate:ofs.format('yyyy-MM-dd'),
            endDate:now.format('yyyy-MM-dd')
        })
        //.on('changeDate', reloadList)
        $("#invest_filter").on('click','a',function(){
            $("#invest_filter a").removeClass('on');
            $(this).addClass('on');
            reloadList();
        })

        $("#queryBtn").on('click',reloadList)
    }
    function reloadList(){
        lp && lp.refresh();
    }

    function init(){


        initEvent();
        initProductList();
        curStatus = $("#invest_filter").val();

    }

    init();
    //日期图标点击事件
    $(".icon_date").click(function(){
        $(this).next($("input")).trigger("focus");
    });

    exports.run = function () {



    }


});

