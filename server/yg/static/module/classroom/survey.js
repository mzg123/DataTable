/**
 * Created by liujiangtao on 2016/3/22 0022.
 */

define("classroom/survey", ["ui/pager/pager", "ui/modal/modal",'ui/list/list','ui/list/ListPage','common/config'], function (require, exports, module) {
    var Pager = require('ui/pager/pager');
    var modal = require('ui/modal/modal');
    var config = require('common/config');
    require('ui/list/list');
    var ListPage = require('ui/list/ListPage'),curLp;

    function initProductList(){

        var list;

        curLp = new ListPage({
            list:{
                root:".survey-list",
                listItem:"li",
                itemTemplate:$("#reportItem").html(),
                dataSource:{
                    url:config.api.about_monitor_report,
                    type:'get',
                    data:function(tmp){
                        var customQueryParams = __globalData.customQueryParams || {};
                        return $.extend({
                            'page.size':tmp.pageSize,
                            'page.current':tmp.currentPage
                        },customQueryParams)
                    },
                    beforeApply:function(res){

                        res = res.data;

                        return {
                            totalRecords:res.page.totalRows,
                            currentPage:res.page.currentPage,
                            pageSize:res.page.pageSize,
                            dataList:res.msgBoxList
                        }
                    }
                },
                pageSize:15
            },
            pager:{
                containerId:"pager",
                showPage:6,
                onChange:function(){

                }
            },
            onReady:function(lp){
                //list = lp.getListInstance();
                ////消息通知为0提示
                //if(!list.count()){
                //    $("#tableNull").show();
                //}
            }
        });


    }

    function init() {
        initProductList();

    }

    init();


});