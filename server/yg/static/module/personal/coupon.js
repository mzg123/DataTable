define("personal/coupon", ["ui/datepicker/js/foundation-datepicker",
    "ui/pager/pager",
    'personal/personal', 'ui/tabs/tabs',
    "ui/validation/validation",
    "ui/modal/modal"], function (require, exports, module) {
    var modal = require('ui/modal/modal');

    require('ui/pager/pager');
    require('ui/validation/validation');
    var Tabs = require('ui/tabs/tabs');
    var Pager = require('ui/pager/pager');
    require('personal/personal').run();

    var couponType = "",
        couponStatus = "";

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

    function initTab(){
        var tabIndex = 1;
        $(".process_tab").each(function(i,v){
            if($(v).hasClass('hover')){
                tabIndex = i+1;
                couponType = $(v).attr('type');
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
        $(".status_tab").each(function(i,v){
            if($(v).hasClass('hover')){
                sti = i+1;
                couponStatus = $(v).attr('type');
                $(v).find('input').prop('checked',true);
            }
        });
        new Tabs({
            tabsContainerId: "status_tabs",
            tabClass: "status_tab",
            selectedClass: "hover",
            contentContainerId: "status_content_container",
            contentClass: "status_content",
            eventType: 'click',
            defaultSelect:sti
        });

        $("#process_tabs").on('click','.process_tab',function(evt){
            couponType = $(this).attr('type');
            reloadList();
        });

        $("#status_tabs").on('click','.status_tab',function(evt){
            couponStatus = $(this).attr('type');
            $(this).find('input').prop('checked',true);
            reloadList();
        })
    }

    function initEvent(){

        $(".addCouponBtn").on("click", showAddCouponModal);
    }

    function reloadList(){
        var params = $.utils.setUrlParam({
            couponType:couponType,
            couponStatus:couponStatus
        });
        location.href = location.pathname+ params+location.hash;
    }

    function createValidator() {

        return $("#addCouponForm").validate({
            //submitHandler: function () {
            //
            //},
            //errorHandler: function (errs) {
            //
            //},
            //passedHandler: function () {
            //
            //},
            selectById:true,
            fields: {
                couponNumber: {
                    required: true,
                    output: "#couponNumberTip"
                },
                couponPassWord: {
                    required: true,
                    pattern:'',
                    output: "#couponPassWordTip"
                }

            },
            errorMessage: {
                couponNumber: {
                    required: "必填"
                },
                couponPassWord: {
                    required: "必填"
                }

            }
        }).data('validator');

    }

    function showAddCouponModal(){
        modal.show({
            title: "添加优惠券",
            content: $(" #addCouponTemplate").html(),
            size: {width: 650, height: 300},
            showFoot: true,
            showClose: false,
            buttons: [
                {
                    name: "确定",
                    clicked: function () {

                        if(vd.isValid){
                            doAddCoupon(vd.getFormData());
                            return;
                        }
                        return false;
                    }
                },
                {
                    name: "取消"

                }

            ]

        });

        var vd = createValidator();
    }

    function doAddCoupon(data){
        $.ajax({
            type: "post",
            url: "/u/activationCode",
            data: data,
            dataType: "json",
            success: function (data) {
				location.reload();
				//setTimeout(function(){
				//	modal.show({
                //    title: "添加优惠卷",
                //    content: $("#addCouponSuccess").html(),
                //    size: {width: 650, height: 250},
                //    showFoot: true,
                //    showClose: false,
                //    buttons: [
                //        {
                //            name: "完成",
                //            clicked: function () {
                //                //reloadList();
				//				
                //            }
                //        }
                //    ]
                //});
				//},0)
                
            },
            error: function (data) {
            }
        });

    }


    //var listCreateStatus = {
    //    deductibleYes: false,
    //    deductibleLose: false,
    //    redCouponTab: false,
    //    valueCouponTab: false,
    //    cashCouponTab: false,
    //    redCouponYes: false,
    //    redCouponLose: false,
    //    valueCouponYes: false,
    //    valueCouponLose: false,
    //    cashCouponYes: false,
    //    cashCouponLose: false
    //};


    //function checkbox() {
    //
    //    $(".coupon_tabs").on('click', 'li', function () {
    //        var self = $(this);
    //        self.parent().children().find('input').attr('checked', false);
    //        self.find('input').attr('checked', true);
    //    });
    //
    //
    //}
    //
    ////添加抵扣优惠卷


    //
    ////红包兑换
    $("#redCouponList").on('click',".redBtn", function () {

        var self = $(this);
        var parent = self.parents('li');
        var msgCount = $("#newMsgCount");
        modal.show({
            title: "红包兑换",
            content: $.MT("redSuccess",$("#redPacketsTemplate").html(),{effect:self.parents('li').find('.left h3 span').text()}),
            size: {width: 640, height: 220},
            showFoot: true,
            showClose: true,
            buttons: [
                {
                    name: "确定",
                    clicked: function () {
                        $.ajax({
                            type: "post",
                            url: "/u/cashBonus",
                            data: {couponId:parent.attr('coupon-id')},
                            dataType: "json",
                            success: function (data) {
                                parent.remove();
                                if(msgCount[0]){
                                    var msgCountVal = parseInt( msgCount.attr('data'))+1;
                                    msgCount.attr('data',msgCountVal).html('('+msgCountVal+')');
                                }

                                modal.show({
                                    title: "红包兑换",
                                    content: $("#redSuccess").html(),
                                    size: {width: 650, height: 300},
                                    showFoot: true,
                                    showClose: false,
                                    buttons: [
                                        {
                                            name: "完成"

                                        }

                                    ]

                                });
                            }

                        });

                    }


                },
                {
                    name: "取消"


                }
            ]

        });

    });
    //
    //
    //function initTab() {
    //
    //    new Tabs({
    //        tabsContainerId: "process_tabs",
    //        tabClass: "process_tab",
    //        selectedClass: "hover",
    //        contentContainerId: "process_content_container",
    //        contentClass: "process_content",
    //        eventType: 'click'
    //        //defaultSelect: 2 	//默认选中第几个tab
    //    });
    //
    //
    //}
    //
    //function couponTab() {
    //
    //    new Tabs({
    //        tabsContainerId: "coupon_tabs",
    //        tabClass: "coupon_tab",
    //        selectedClass: "hover",
    //        contentContainerId: "coupon_content_container",
    //        contentClass: "coupon_content",
    //        eventType: 'click'
    //    });
    //
    //}
    //
    ////function serviceTab() {
    ////
    ////    new Tabs({
    ////        tabsContainerId: "service_tabs",
    ////        tabClass: "service_tab",
    ////        selectedClass: "hover",
    ////        contentContainerId: "service_content_container",
    ////        contentClass: "service_content",
    ////        eventType: 'click'
    ////    });
    ////
    ////}
    //
    //function cashTab() {
    //
    //    new Tabs({
    //        tabsContainerId: "cash_tabs",
    //        tabClass: "cash_tab",
    //        selectedClass: "hover",
    //        contentContainerId: "cash_content_container",
    //        contentClass: "cash_content",
    //        eventType: 'click'
    //    });
    //
    //}
    //
    //function addTab() {
    //
    //    new Tabs({
    //        tabsContainerId: "add_tabs",
    //        tabClass: "add_tab",
    //        selectedClass: "hover",
    //        contentContainerId: "add_content_container",
    //        contentClass: "add_content",
    //        eventType: 'click'
    //    });
    //
    //}
    //
    //function redTab() {
    //
    //    new Tabs({
    //        tabsContainerId: "red_tabs",
    //        tabClass: "red_tab",
    //        selectedClass: "hover",
    //        contentContainerId: "red_content_container",
    //        contentClass: "red_content",
    //        eventType: 'click'
    //    });
    //
    //}
    //
    ////抵扣劵已使用
    //$("#deductibleYes").on("click", function () {
    //
    //    var id = $(this).attr('id');
    //    if (listCreateStatus[id]) return;
    //
    //    lp = new ListPage({
    //        list: {
    //            root: "#deductibleTable tbody",
    //            listItem: "tr",
    //            pageSize: 10,
    //            itemTemplate: $("#deductibleTableTemplate").html(),
    //            dataSource: {
    //                url: config.api.getCouponList,
    //                type: 'get',
    //                data: function (tmp) {
    //                    return {
    //                        'page.size': tmp.pageSize,
    //                        'page.current': tmp.currentPage,
    //                        couponType: 5,
    //                        status: 2
    //                    }
    //                },
    //                beforeApply: function (res) {
    //                    res = res.data;
    //
    //                    return {
    //                        totalRecords: res.page.totalRows,
    //                        currentPage: res.page.currentPage,
    //                        pageSize: res.page.pageSize,
    //                        dataList: res.dataList
    //                    }
    //                }
    //            }
    //        },
    //        pager: {
    //            containerId: "deductiblePager",
    //            showPage: 5,
    //            onChange: function () {
    //            }
    //        },
    //        onReady: function () {
    //            var list = lp.getListInstance();
    //            listCreateStatus[id] = true;
    //            if (!list.count()) {
    //                $("#deductibleTableNull").show();
    //            }
    //        }
    //    });
    //
    //
    //});
    ////抵扣劵已失效
    //$("#deductibleLose").on("click", function () {
    //    var id = $(this).attr('id');
    //    if (listCreateStatus[id]) return;
    //    lp2 = new ListPage({
    //        list: {
    //            root: "#deductibleTable2 tbody",
    //            listItem: "tr",
    //            pageSize: 10,
    //            itemTemplate: $("#deductibleTableTemplate2").html(),
    //            dataSource: {
    //                url: config.api.getCouponList,
    //                type: 'get',
    //                data: function (tmp) {
    //                    return {
    //                        'page.size': tmp.pageSize,
    //                        'page.current': tmp.currentPage,
    //                        couponType: 5,
    //                        status: 3
    //                    }
    //                },
    //                beforeApply: function (res) {
    //                    res = res.data;
    //
    //                    return {
    //                        totalRecords: res.page.totalRows,
    //                        currentPage: res.page.currentPage,
    //                        pageSize: res.page.pageSize,
    //                        dataList: res.dataList
    //                    }
    //                }
    //            }
    //        },
    //        pager: {
    //            containerId: "deductibleTablePager2",
    //            showPage: 5,
    //            onChange: function () {
    //            }
    //        },
    //        onReady: function () {
    //            var list = lp2.getListInstance();
    //
    //            if (!list.count()) {
    //                $("#deductibleTableNull2").show();
    //            }
    //        }
    //    });
    //
    //});
    ////红包已使用
    //$("#redCouponYes").on("click", function () {
    //    var id = $(this).attr('id');
    //    if (listCreateStatus[id]) return;
    //    lp9 = new ListPage({
    //        list: {
    //            root: "#redTable tbody",
    //            listItem: "tr",
    //            pageSize: 10,
    //            itemTemplate: $("#redTableTemplate").html(),
    //            dataSource: {
    //                url: config.api.getCouponList,
    //                type: 'get',
    //                data: function (tmp) {
    //                    return {
    //                        'page.size': tmp.pageSize,
    //                        'page.current': tmp.currentPage,
    //                        couponType: 2,
    //                        status: 2
    //                    }
    //                },
    //                beforeApply: function (res) {
    //                    res = res.data;
    //
    //                    return {
    //                        totalRecords: res.page.totalRows,
    //                        currentPage: res.page.currentPage,
    //                        pageSize: res.page.pageSize,
    //                        dataList: res.dataList
    //                    }
    //                }
    //            }
    //        },
    //        pager: {
    //            containerId: "redPager",
    //            showPage: 5,
    //            onChange: function () {
    //            }
    //        },
    //        onReady: function () {
    //            var list = lp9.getListInstance();
    //
    //            if (!list.count()) {
    //                $("#redTableNull").show();
    //            }
    //        }
    //    });
    //
    //});
    ////红包已失效
    //$("#redCouponLose").on("click", function () {
    //    var id = $(this).attr('id');
    //    if (listCreateStatus[id]) return;
    //    lp10 = new ListPage({
    //        list: {
    //            root: "#redTable2 tbody",
    //            listItem: "tr",
    //            pageSize: 10,
    //            itemTemplate: $("#redTableTemplate2").html(),
    //            dataSource: {
    //                url: config.api.getCouponList,
    //                type: 'get',
    //                data: function (tmp) {
    //                    return {
    //                        'page.size': tmp.pageSize,
    //                        'page.current': tmp.currentPage,
    //                        couponType: 2,
    //                        status: 3
    //                    }
    //                },
    //                beforeApply: function (res) {
    //                    res = res.data;
    //
    //                    return {
    //                        totalRecords: res.page.totalRows,
    //                        currentPage: res.page.currentPage,
    //                        pageSize: res.page.pageSize,
    //                        dataList: res.dataList
    //                    }
    //                }
    //            }
    //        },
    //        pager: {
    //            containerId: "redPager2",
    //            showPage: 5,
    //            onChange: function () {
    //            }
    //        },
    //        onReady: function () {
    //            var list = lp10.getListInstance();
    //
    //            if (!list.count()) {
    //                $("#redTableNull2").show();
    //            }
    //        }
    //    });
    //
    //});
    ////增值劵已使用
    //$("#valueCouponYes").on("click", function () {
    //    var id = $(this).attr('id');
    //    if (listCreateStatus[id]) return;
    //    lp7 = new ListPage({
    //        list: {
    //            root: "#addTable tbody",
    //            listItem: "tr",
    //            pageSize: 10,
    //            itemTemplate: $("#addTableTemplate").html(),
    //            dataSource: {
    //                url: config.api.getCouponList,
    //                type: 'get',
    //                data: function (tmp) {
    //                    return {
    //                        'page.size': tmp.pageSize,
    //                        'page.current': tmp.currentPage,
    //                        couponType: 1,
    //                        status: 2
    //                    }
    //                },
    //                beforeApply: function (res) {
    //                    res = res.data;
    //
    //                    return {
    //                        totalRecords: res.page.totalRows,
    //                        currentPage: res.page.currentPage,
    //                        pageSize: res.page.pageSize,
    //                        dataList: res.dataList
    //                    }
    //                }
    //            }
    //        },
    //        pager: {
    //            containerId: "addPager",
    //            showPage: 5,
    //            onChange: function () {
    //            }
    //        },
    //        onReady: function () {
    //            var list = lp7.getListInstance();
    //
    //            if (!list.count()) {
    //                $("#addTableNull").show();
    //            }
    //        }
    //    });
    //});
    ////增值劵已失效
    //$("#valueCouponLose").on("click", function () {
    //    var id = $(this).attr('id');
    //    if (listCreateStatus[id]) return;
    //    lp8 = new ListPage({
    //        list: {
    //            root: "#addTable2 tbody",
    //            listItem: "tr",
    //            pageSize: 10,
    //            itemTemplate: $("#addTableTemplate2").html(),
    //            dataSource: {
    //                url: config.api.getCouponList,
    //                type: 'get',
    //                data: function (tmp) {
    //                    return {
    //                        'page.size': tmp.pageSize,
    //                        'page.current': tmp.currentPage,
    //                        couponType: 1,
    //                        status: 3
    //                    }
    //                },
    //                beforeApply: function (res) {
    //                    res = res.data;
    //
    //                    return {
    //                        totalRecords: res.page.totalRows,
    //                        currentPage: res.page.currentPage,
    //                        pageSize: res.page.pageSize,
    //                        dataList: res.dataList
    //                    }
    //                }
    //            }
    //        },
    //        pager: {
    //            containerId: "addPager2",
    //            showPage: 5,
    //            onChange: function () {
    //            }
    //        },
    //        onReady: function () {
    //            var list = lp8.getListInstance();
    //
    //            if (!list.count()) {
    //                $("#addTableNull2").show();
    //            }
    //        }
    //    });
    //});
    ////提现劵已使用
    //$("#cashCouponYes").on("click", function () {
    //    var id = $(this).attr('id');
    //    if (listCreateStatus[id]) return;
    //    lp5 = new ListPage({
    //        list: {
    //            root: "#cashTable tbody",
    //            listItem: "tr",
    //            pageSize: 10,
    //            itemTemplate: $("#cashTableTemplate").html(),
    //            dataSource: {
    //                url: config.api.getCouponList,
    //                type: 'get',
    //                data: function (tmp) {
    //                    return {
    //                        'page.size': tmp.pageSize,
    //                        'page.current': tmp.currentPage,
    //                        couponType: 3,
    //                        status: 2
    //                    }
    //                },
    //                beforeApply: function (res) {
    //                    res = res.data;
    //
    //                    return {
    //                        totalRecords: res.page.totalRows,
    //                        currentPage: res.page.currentPage,
    //                        pageSize: res.page.pageSize,
    //                        dataList: res.dataList
    //                    }
    //                }
    //            }
    //        },
    //        pager: {
    //            containerId: "cashTablePager",
    //            showPage: 5,
    //            onChange: function () {
    //            }
    //        },
    //        onReady: function () {
    //            var list = lp5.getListInstance();
    //
    //            if (!list.count()) {
    //                $("#cashTableNull").show();
    //            }
    //        }
    //    });
    //});
    ////提现劵已失效
    //$("#cashCouponLose").on("click", function () {
    //    var id = $(this).attr('id');
    //    if (listCreateStatus[id]) return;
    //    lp6 = new ListPage({
    //        list: {
    //            root: "#cashTable2 tbody",
    //            listItem: "tr",
    //            pageSize: 10,
    //            itemTemplate: $("#cashTableTemplate2").html(),
    //            dataSource: {
    //                url: config.api.getCouponList,
    //                type: 'get',
    //                data: function (tmp) {
    //                    return {
    //                        'page.size': tmp.pageSize,
    //                        'page.current': tmp.currentPage,
    //                        couponType: 3,
    //                        status: 3
    //                    }
    //                },
    //                beforeApply: function (res) {
    //                    res = res.data;
    //
    //                    return {
    //                        totalRecords: res.page.totalRows,
    //                        currentPage: res.page.currentPage,
    //                        pageSize: res.page.pageSize,
    //                        dataList: res.dataList
    //                    }
    //                }
    //            }
    //        },
    //        pager: {
    //            containerId: "cashPager2",
    //            showPage: 5,
    //            onChange: function () {
    //            }
    //        },
    //        onReady: function () {
    //            var list = lp6.getListInstance();
    //            if (!list.count()) {
    //                $("#cashTableNull2").show();
    //            }
    //        }
    //    });
    //});
    //
    //
    //function initProductList() {
    //
    //
    //    //服务费tab
    //    //lp3 = new ListPage({
    //    //    list: {
    //    //        root: "#serviceTable tbody",
    //    //        listItem: "tr",
    //    //        pageSize: 10,
    //    //        itemTemplate: $("#serviceTableTemplate").html(),
    //    //        dataSource: {
    //    //            url: config.api.getWealthOrderList,
    //    //            type: 'get',
    //    //            data: function (tmp) {
    //    //                return {
    //    //                    'page.size': tmp.pageSize,
    //    //                    'page.current': tmp.currentPage,
    //    //                    // 'orderStatus':$("#invest_filter a.on").attr('type'),
    //    //                    // 'beginTime':$("#startDate").val(),
    //    //                    // 'endTime':$("#endDate").val()
    //    //                }
    //    //            },
    //    //            beforeApply: function (res) {
    //    //                res = res.data;
    //    //
    //    //                return {
    //    //                    totalRecords: res.page.totalRows,
    //    //                    currentPage: res.page.currentPage,
    //    //                    pageSize: res.page.pageSize,
    //    //                    dataList: res.dataList
    //    //                }
    //    //            }
    //    //        }
    //    //    },
    //    //    pager: {
    //    //        containerId: "servicePager",
    //    //        showPage: 5,
    //    //        onChange: function () {
    //    //        }
    //    //    },
    //    //    onReady: function () {
    //    //        var list = lp3.getListInstance();
    //    //
    //    //        if (!list.count()) {
    //    //            $("#serviceTableNull").show();
    //    //        }
    //    //    }
    //    //});
    //    //lp4 = new ListPage({
    //    //    list: {
    //    //        root: "#serviceTable2 tbody",
    //    //        listItem: "tr",
    //    //        pageSize: 10,
    //    //        itemTemplate: $("#serviceTableTemplate2").html(),
    //    //        dataSource: {
    //    //            url: config.api.getWealthOrderList,
    //    //            type: 'get',
    //    //            data: function (tmp) {
    //    //                return {
    //    //                    'page.size': tmp.pageSize,
    //    //                    'page.current': tmp.currentPage,
    //    //                    // 'orderStatus':$("#invest_filter a.on").attr('type'),
    //    //                    // 'beginTime':$("#startDate").val(),
    //    //                    // 'endTime':$("#endDate").val()
    //    //                }
    //    //            },
    //    //            beforeApply: function (res) {
    //    //                res = res.data;
    //    //
    //    //                return {
    //    //                    totalRecords: res.page.totalRows,
    //    //                    currentPage: res.page.currentPage,
    //    //                    pageSize: res.page.pageSize,
    //    //                    dataList: res.dataList
    //    //                }
    //    //            }
    //    //        }
    //    //    },
    //    //    pager: {
    //    //        containerId: "servicePager2",
    //    //        showPage: 5,
    //    //        onChange: function () {
    //    //        }
    //    //    },
    //    //    onReady: function () {
    //    //        var list = lp4.getListInstance();
    //    //
    //    //        if (!list.count()) {
    //    //            $("#serviceTableNull2").show();
    //    //        }
    //    //    }
    //    //});
    //
    //
    //}

    function init() {
        initTab();
        initEvent();
        initPager();
        //couponTab();
        ////serviceTab();
        //cashTab();
        //addTab();
        //redTab();
        //checkbox();
        //initProductList();

        //抵扣劵未使用
        //$(".deductibleTab").on("click",function(){
        //    $(".addCouponBtn").show();
        //
        //});
        //$.ajax({
        //    type: "get",
        //    dataType: "json",
        //    data: {couponType: 5, status: 1},
        //    url: config.api.getCouponList,
        //    success: function (res) {
        //        var list = res.data.dataList;
        //        var couponHtml = "";
        //        for (i = 0; i < list.length; i++) {
        //            var dt = list[i];
        //            couponHtml += '<li><div class="left"> <h3><span>' + dt.effect + '</span>元</h3> <p>使用条件：' + dt.useCondition + '</p><p>适用项目： ' + dt.applyItem + '</p> <p>来源： ' + dt.triggerTypeCN + '</p></div> <div class="right"> <h4>抵扣券</h4> <p><span>有效时间：</span></p> <p>' + dt.createTime + '-</p> <p>' + dt.expireTime + '</p> </div> </li>';
        //        }
        //        $("#deductibleList").html(couponHtml);
        //
        //    },
        //    exception: function () {
        //
        //    }
        //
        //});
        ////红包未使用
        //$(".redCouponTab").on("click", function () {
        //    var id = $(this).attr('class');
        //    if (listCreateStatus[id]) return;
        //    $(".addCouponBtn").hide();
        //    $.ajax({
        //        type: "get",
        //        dataType: "json",
        //        data: {couponType: 2, status: 1},
        //        url: config.api.getCouponList,
        //        success: function (res) {
        //            var list = res.data.dataList;
        //            var couponHtml = "";
        //            for (i = 0; i < list.length; i++) {
        //                var dt = list[i];
        //                couponHtml += '<li> <div class="left"> <h3><span>' + dt.effect + '</span>元</h3> <p>使用条件： ' + dt.useCondition + '</p> <p>适用项目： ' + dt.applyItem + '</p> <p>来源：' + dt.triggerTypeCN + '</p> </div> <div class="right"> <h4>红包</h4> <br/><br/><p><span>有效时间：</span><br/>' + dt.createTime + '</p> </div> <div class="coupon_hover"> <a class="btn_yellow redBtn">&nbsp;&nbsp;&nbsp;&nbsp;兑换&nbsp;&nbsp;&nbsp;&nbsp;</a> </div> </li>';
        //            }
        //            $("#redCouponList").html(couponHtml);
        //
        //        },
        //        exception: function () {
        //
        //        }
        //
        //    });
        //
        //});
        ////增值劵未使用
        //$(".valueCouponTab").on("click", function () {
        //    var id = $(this).attr('class');
        //    if (listCreateStatus[id]) return;
        //    $(".addCouponBtn").show();
        //    $.ajax({
        //        type: "get",
        //        dataType: "json",
        //        data: {couponType: 1, status: 1},
        //        url: config.api.getCouponList,
        //        success: function (res) {
        //            var list = res.data.dataList;
        //            var couponHtml = "";
        //            for (i = 0; i < list.length; i++) {
        //                var dt = list[i];
        //                couponHtml += '<li><div class="left"> <h3><span>' + dt.effect + '</span>%</h3> <p>使用条件：' + dt.useCondition + '</p><p>适用项目： ' + dt.applyItem + '</p> <p>来源： ' + dt.triggerTypeCN + '</p></div> <div class="right"> <h4>增值券</h4> <p><span>有效时间：</span></p> <p>' + dt.createTime + '-</p> <p>' + dt.expireTime + '</p> </div> </li>';
        //            }
        //            $("#valueCouponList").html(couponHtml);
        //
        //        },
        //        exception: function () {
        //
        //        }
        //
        //    });
        //});
        ////提现劵未使用
        //$(".cashCouponTab").on("click", function () {
        //    var id = $(this).attr('class');
        //    if (listCreateStatus[id]) return;
        //    $(".addCouponBtn").show();
        //    $.ajax({
        //        type: "get",
        //        dataType: "json",
        //        data: {couponType: 1, status: 1},
        //        url: config.api.getCouponList,
        //        success: function (res) {
        //            var list = res.data.dataList;
        //            var couponHtml = "";
        //            for (i = 0; i < list.length; i++) {
        //                var dt = list[i];
        //                couponHtml += '<li><div class="left"> <h3><span>' + dt.effect + '</span>元</h3> <p>使用条件：' + dt.useCondition + '</p><p>适用项目： ' + dt.applyItem + '</p> <p>来源： ' + dt.triggerTypeCN + '</p></div> <div class="right"> <h4>提现券</h4> <p><span>有效时间：</span></p> <p>' + dt.createTime + '-</p> <p>' + dt.expireTime + '</p> </div> </li>';
        //            }
        //            $("#cashCouponList").html(couponHtml);
        //
        //        },
        //        exception: function () {
        //
        //        }
        //
        //    });
        //});


    }

    init();


    exports.run = function () {


    }


});

