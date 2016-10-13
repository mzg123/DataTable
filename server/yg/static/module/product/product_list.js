define("product/product_list", ["ui/pager/pager",'ui/list/list','ui/list/ListPage','common/config'], function (require, exports, module) {
    var Pager = require('ui/pager/pager');
    require('ui/list/list');
    var ListPage = require('ui/list/ListPage'),
        config = require('common/config');
    function initEvent() {


        $("#queryBtn").on('click',function(){
           /* $("#queryBtn input").attr("checked")? $(".product-filter .kinds a").each(function(i,v){
               // $(v).attr("href","https:www.baidu.com?show=1");
            }): $(".product-filter .kinds a").each(function(i,v){
              //  $(v).attr("href","https:www.baidu.com?show=0");
            });*/
            $("#queryBtn input").attr("checked")?  $.utils.setCookie('listIsShow',1,0,undefined,'yingu.com'):  $.utils.setCookie('listIsShow',0,0,undefined,'yingu.com');

            var link = $(this).attr('data-uri');
            location.href = link;
        })
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
        initEvent();
        initPager();

    }

    init();



});

