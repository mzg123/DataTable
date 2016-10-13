/**
 * Created by liujiangtao on 2015/11/16 0016.
 */
define('investment/index',['ui/pager/pager','ui/list/list','ui/list/listPage'],function(require,exports,module){

    require('ui/pager/pager');
    require('ui/list/list');
    var ListPage = require('ui/list/listPage');

    function init(){

        initEvent();

        initProductList();
    }

    function initEvent(){

        $("#searchText").on('keydown',function(evt){
            if(evt.keyCode == 13){
                doSearch();
            }
        });

        $("#searchBtn").on('click',doSearch);

    }

    function doSearch(){
        var searchText = $("#searchText").val();

        location.href = $.utils.setUrlParam({'search':searchText});
    }

    function initProductList(){

        var lp = new ListPage({
            list:{
                root:".result-list tbody",
                listItem:"tr",
                pageSize:10
            },
            pager:{
                containerId:"pager",
                showPage:5,
                onChange:function(){

                }
            }
        })

        var list = lp.getListInstance();

        if(!list.count()){
            $(".empty-list").show();
        }
    }

    init();
})