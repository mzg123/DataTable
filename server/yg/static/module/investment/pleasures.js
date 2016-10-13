define("investment/pleasures", ["ui/tabs/tabs", "ui/pager/pager",'ui/list/list','ui/list/ListPage','common/config','ui/notify/jquery.noty.packaged'], function (require, exports, module) {

    //产品详情依赖的模块

    var Tabs = require("ui/tabs/tabs");
    require('ui/pager/pager');
    require('ui/list/list');
    var ListPage = require('ui/list/ListPage'),
        config = require('common/config');
//table
//    function checkRecords() {
//        $(".result-table").each(function () {
//            if ($(this).children("tbody").children("tr").length) {
//                $(this).siblings(".tableNull").hide();
//                $(this).siblings(".pager-container").show();
//            } else {
//                $(this).siblings(".tableNull").show();
//                $(this).siblings(".pager-container").hide();
//            }
//        });
//
//
//    }

//page

    function initProductList1(){

        var lp = new ListPage({
            list:{
                root:"#resultTable1 tbody",
                listItem:"tr",
                itemTemplate:$("#rowTemplate1").html(),
                dataSource:{
                    url:config.api.productPurchaseRecords,
                    type:'get',
                    data:function(tmp){
                        return {
                            'type':$(".tab_link.hover").attr('product-type'),
                            'page.size':tmp.pageSize,
                            'page.current':tmp.currentPage
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
                },
                pageSize:5
            },

            pager:{
                containerId:"pager1",
                showPage:5,
                onChange:function(){

                }
            },

            onReady:function(){
                var list = lp.getListInstance();
                if(!list.count()){
                    $(".tableNull1").show();
                }
            }
        });


    }
    function initProductList2(){

        var lp = new ListPage({
            list:{
                root:"#resultTable2 tbody",
                listItem:"tr",
                itemTemplate:$("#rowTemplate1").html(),
                dataSource:{
                    url:config.api.productPurchaseRecords,
                    type:'get',
                    data:function(tmp){
                        return {
                            'page.size':tmp.pageSize,
                            'page.current':tmp.currentPage
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
                },
                pageSize:5
            },

            pager:{
                containerId:"pager2",
                showPage:5,
                onChange:function(){

                }
            },

            onReady:function(){
                var list = lp.getListInstance();
                if(!list.count()){
                    $(".tableNull2").show();
                }
            }
        });


    }
    function initProductList3(){

        var lp = new ListPage({
            list:{
                root:"#resultTable3 tbody",
                listItem:"tr",
                itemTemplate:$("#rowTemplate1").html(),
                dataSource:{
                    url:config.api.productPurchaseRecords,
                    type:'get',
                    data:function(tmp){
                        return {
                            'page.size':tmp.pageSize,
                            'page.current':tmp.currentPage
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
                },
                pageSize:5
            },

            pager:{
                containerId:"pager3",
                showPage:5,
                onChange:function(){

                }
            },

            onReady:function(){
                var list = lp.getListInstance();
                if(!list.count()){
                    $(".tableNull3").show();
                }
            }
        });


    }


    function init() {
        initProductList1();
        initProductList2();
        initProductList3();


    }

    init();


    var Index = {

        init: function () {
            this._addEventListener();
        },
        _addEventListener: function () {
            var that = this;
            var productTabs = new Tabs({
                tabsContainerId: "product_tabs",
                tabClass: "product_tab",
                selectedClass: "hover",
                contentContainerId: "product_content_container",
                contentClass: "product_content",
                eventType: 'click'
            });

        }
    };

    $(function () {

        Index.init();
       // checkRecords();

    });

});

