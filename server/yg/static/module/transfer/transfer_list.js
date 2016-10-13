define("transfer/transfer_list", ["ui/pager/pager",'ui/list/list','ui/list/ListPage','common/config'], function (require, exports, module) {
    var Pager = require('ui/pager/pager');
    require('ui/list/list');
    var ListPage = require('ui/list/ListPage'),
        config = require('common/config');
    function initEvent() {


        $("#queryBtn").on('click',function(){
            var link = $(this).attr('data-uri');
            location.href = link;
        })
    }


    function initPager(){
        var pg = $("#pager");

        new Pager({
            containerId : "pager",
            showPage : parseInt(pg.attr('show-page')) || 5,
            totalNum : parseInt(pg.attr('total-num')) || 10,
            currentPage: parseInt(pg.attr('current-page')) || 1,
            onChange : function(pageNum){
                var params = $.utils.setUrlParam('page',pageNum);
                location.href = location.pathname+params;
            }
        })
    }

    function init(){
        initEvent();
        initPager();

    }

    init();



});

