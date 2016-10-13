/**
 * Created by liujiangtao on 2016/3/22 0022.
 */

define("about/monitor_report", ["ui/pager/pager"], function (require, exports, module) {
    var Pager = require('ui/pager/pager');

    function initPager(){
        var pg = $("#pager");

        var p = new Pager({
            containerId : "pager",
            showPage : parseInt(pg.attr('show-page')) || 5,
            totalNum : parseInt(pg.attr('total-num')) || 10,
            currentPage:  1,
            onChange : function(pageNum){
                //var path = location.pathname;
                //path = path.replace(/(.*?)((\/\d+)|(\/))?$/,"$1"+"/"+pageNum)
                //location.href = path+location.search+location.hash;

                var params = $.utils.setUrlParam('page',pageNum);
                location.href = location.pathname+params+location.hash;
            }
        })

        p.goTo(parseInt(pg.attr('current-page')));
    }


    function init() {

        initPager();
    }

    init();


});