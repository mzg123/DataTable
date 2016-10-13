define("personal/recommender", ["ui/modal/modal", "ui/pager/pager", 'ui/zclip/zclip', 'personal/personal'], function (require, exports, module) {

    var modal = require('ui/modal/modal');
    require('ui/pager/pager');
    require('personal/personal').run();
    var Pager = require('ui/pager/pager');
    var ZClip = require('ui/zclip/zclip');
    var startDate = $("#startDate").val(), endDate = $("#endDate").val();
    var quickSearch = $("#invest_filter a.on").attr('type');
    var creditStatus;

    function initEvent() {
        /*分享相关*/
        $("#copyText").val(__globalData.shareUrl);
        $(".share .qq a").attr("href", "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + encodeURIComponent(__globalData.shareUrl) + "&title=注册有红包&pics=" + encodeURIComponent("http://www.myfund.com/product/images/jlq60322_z07.gif"));
        $(".share .sina a").attr("href", "http://service.weibo.com/share/share.php?url=" + encodeURIComponent(__globalData.shareUrl) + "&title=【银谷在线】是东方银谷集团旗下互联网金融平台，中国社科院A级评级，100元起投，期限灵活，0充值费，0收益管理费，现在新用户还送200元新手壕礼，专享高达年华15%收益，你也赶快来投资吧，别让钱在银行里继续缩水了！&appkey=2924220432&pic=" + encodeURIComponent("http://www.myfund.com/product/images/jlq60322_z07.gif"));
        $(".weixin").hover(function () {
            $(".share_erweima").toggle();
        });

        /*查看详情*/
        $("#resultTable").on("click", ".see", function () {
            var tid = $(this).attr("data-id");
            modal.on("modal-show", function () {
                loadDetails({pageNum: 1});
                var pg = $("#pager2");
                var cp = parseInt(pg.attr('current-page'));
                var p = null;

                /*ajax获取数据并展示*/
                function loadDetails(params) {
                    var pageNum = params["pageNum"],
                        data = {
                            recommenId: tid,
                            'page.current': pageNum,
                            'page.size': 10
                        };
                    $.ajax({
                        type: "post",
                        url: "/u/recommenDetail",
                        data: data,
                        dataType: 'json',
                        showLoading: true,
                        success: function (data) {
                            data = data.data;
                            var recordList = data.recordList;
                            if (recordList == "undefine")return;
                            if (!recordList.length) {
                                $("#tableNullDetails").show();
                                $("#pager2").attr('current-page', 0).attr('total-num', 0).attr('show-page', 0).hide();
                                return;
                            }
                            else {
                                $("#tableNullDetails").hide();
                                data2Html(recordList);
                                var showPage = (Math.min(parseInt(data.page.totalPages), parseInt(pg.attr('show-page')))),
                                    totalNum = parseInt(data.page.totalPages);

                                if (p == null) p = new Pager({
                                    containerId: "pager2",
                                    showPage: showPage,
                                    totalNum: totalNum,
                                    currentPage: 1,
                                    onChange: function (pageNum) {
                                        loadDetails({pageNum: pageNum});
                                    }
                                });
                                $("#pager2").attr('current-page', pageNum).attr('total-num', totalNum).attr('show-page', showPage).show();
                            }
                            p.goTo(pageNum);
                        }
                    });
                    //$("#pager2").show();

                    /*把数据展示在前台页面*/
                    function data2Html(data) {
                        $("#resultTableDetails .personal_table tbody").html("");
                        data.forEach(function (v, i, arr) {
                            var iHtml = "<tr>" +
                                "<td>" + (v.proName == undefined ? "&nbsp;" : v.proName) + "</td>" +
                                "<td><span class='red'>" + (v.principal == undefined ? "&nbsp;" : (parseFloat(v.principal) / 100).toFixed(2)) + "</span></td>" +
                                "<td>" + (v.payTime == undefined ? "&nbsp;" : v.payTime) + "</td>" +
                                "<td>" + (v.proTerm == undefined ? "&nbsp;" : v.proTerm) + "</td>" +
                                "<td>" + (v.expireAt == undefined ? "&nbsp;" : v.expireAt) + "</td>" +
                                "</tr>";
                            $("#resultTableDetails .personal_table tbody").append(iHtml);
                        })
                    }
                }
            });
            modal.show({
                    title: $("#detailsTemplate").attr("title"),
                    content: $("#detailsTemplate").html(),
                    size: {width: 1010, height: 760},
                    //size: {width: 1010, height: 704},
                    showFoot: false,
                    showClose: true
                }
            )

        });
    }

    function reloadList() {
        var params = $.utils.getUrlParam();

        var obj = {
            creditStatus: creditStatus
        };

        if (quickSearch) {
            $.extend(obj, {
                'searchType': quickSearch
            });
            delete params.startDate;
            delete params.endDate;
        } else if (startDate) {
            $.extend(obj, {
                'startDate': startDate,
                'endDate': endDate
            });
            delete params.searchType;
        }

        location.href = location.pathname + "?" + $.utils.json2query($.extend(params, obj)) + location.hash;
    }

    function initPager() {
        var pg = $("#pager");
        var cp = parseInt(pg.attr('current-page'));
        var p = new Pager({
            containerId: "pager",
            showPage: parseInt(pg.attr('show-page')) || 5,
            totalNum: parseInt(pg.attr('total-num')) || 10,
            currentPage: 1,
            onChange: function (pageNum) {
                var params = $.utils.setUrlParam('page', pageNum);
                location.href = location.pathname + params + location.hash;
            }
        });

        p.goTo(cp);
    }

    function initZClip() {
        $("#copyButton").on("click", function () {
            modal.on("modal-show", function () {
                var tModal = this;
                new ZClip({
                    clipButton: $(tModal).find(".btn-ok")[0],
                    copyTextID: "copyText"
                });
            });
            modal.show({
                    title: "复制链接成功",
                    content: "<div style='text-align: center;line-height: 110px'>复制链接" + $("#copyText").val() + "</div>",
                    size: {width: 600, height: 260},
                    showFoot: true,
                    showClose: true
                }
            )
        });
    }

    function init() {
        initEvent();
        initPager();
        initZClip();
    }

    init();


    exports.run = function () {

    }


});

