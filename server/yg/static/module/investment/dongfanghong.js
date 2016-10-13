define("investment/dongfanghong", ["ui/tabs/tabs", "ui/pager/pager",'ui/list/list','ui/list/ListPage','ui/modal/modal'], function (require, exports, module) {

    //产品详情依赖的模块

    var Tabs = require("ui/tabs/tabs");
    require('ui/pager/pager');
    require('ui/list/list');
    var ListPage = require('ui/list/ListPage');
//table
    function checkRecords() {
        $(".result-table").each(function () {
            if ($(this).children("tbody").children("tr").length) {
                $(this).siblings(".tableNull").hide();
                $(this).siblings(".pager-container").show();
            } else {
                $(this).siblings(".tableNull").show();
                $(this).siblings(".pager-container").hide();
            }
        });


    }

//page
    function fixStyle(lm){
        var tmp = lm.getCurrentPageItems();
        tmp.each(function(i,v){
            $(v).removeClass('last');
            if(i == tmp.length-1){
                $(v).addClass('last');
            }
        })
    }
    function initProductList1(){

        var lp = new ListPage({
            list:{
                root:"#resultTable1 tbody",
                listItem:"tr",
                pageSize:5
            },
            pager:{
                containerId:"pager1",
                showPage:5,
                onChange:function(){
                    fixStyle(lp.getListInstance());
                }
            }
        });

        var list = lp.getListInstance();
        fixStyle(lp.getListInstance());

        if(!list.count()){
            $("#tableNull").show();
        }
    }
    function initProductList2(){

        var lp = new ListPage({
            list:{
                root:"#resultTable2 tbody",
                listItem:"tr",
                pageSize:5
            },
            pager:{
                containerId:"pager2",
                showPage:5,
                onChange:function(){
                    fixStyle(lp.getListInstance());
                }
            }
        });

        var list = lp.getListInstance();
        fixStyle(lp.getListInstance());

        if(!list.count()){
            $("#tableNull").show();
        }
    }

    function init() {
        initProductList1();
        initProductList2();



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
        checkRecords();

    });

});

