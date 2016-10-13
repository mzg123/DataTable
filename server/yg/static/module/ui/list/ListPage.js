/**
 * Created by liujiangtao on 2015/12/14 0014.
 */
define('ui/list/ListPage',['ui/list/list','ui/pager/pager'],function(require,exports,module){
    var List = require('ui/list/list'),
        Pager = require('ui/pager/pager');

    function ListPage(options){
        var self =this;
        var listOptions = options.list;

        var listReady = listOptions.onReady || $.noop;
        listOptions.onReady = function(lm){

            var pagerOptions = $.extend({
                totalNum:lm.totalPage,
                currentPage:lm.currentPage
            },options.pager);
            var _pagerChange = pagerOptions.onChange;
            function pagerChange(num){
                lm.toPage(parseInt(num) || 1);
                _pagerChange && _pagerChange();
            }
            pagerOptions.onChange = pagerChange;

            lm.on('pageCountChange',function(){
                pagerOptions.totalNum = lm.totalPage;
                pagerOptions.currentPage = lm.currentPage;
                var p = new Pager(pagerOptions);
                p.goTo(lm.currentPage);
            })
            if(lm.count()){
                new Pager(pagerOptions);
            }

            listReady && listReady(lm)

            options.onReady && options.onReady(self);
        }
        var lm = new List(listOptions),
            pager;



        this.getListInstance =function(){
            return lm;
        };

        this.getPagerInstance =function(){
            return pager;
        }

        this.refresh = function(){
            lm.refresh();
        }

    }

    module.exports = ListPage;
});