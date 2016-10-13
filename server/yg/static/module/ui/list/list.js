/**
 * Created by giantliu on 15/12/12.
 */

//(function(){

//})
define('ui/list/list',function(require,exports,module){

    var tmpOptions = {
        //root:"",
        listItem:"",
        //itemTemplate:"",
        //dataSource:"",
        pageSize:10,
        currentPage:1,
        onReady: $.noop
    }

    function List(options){

        var self = this;
        self.id = $.utils.id();
        $.extend(self,tmpOptions,options);

        self.root = $(self.root);

        self.itemTemplate = _getItemTemplate.call(self);
        self.pageSize = self.pageSize > 0 ? self.pageSize : 10;

        _parseData.call(self,function(data){

            self.originalData = data;

            self.dataList = data.dataList;

            //_buildList.call(self);

            //self.toPage(self.currentPage);

            //_loadCurrentPageData.call(self);

            var indexes = getIndexes(self.pageSize,self.currentPage);
            _buildList.call(self,self.dataList.slice.apply(self.dataList,indexes));

            options.onReady && options.onReady(self);
            //_show.apply(self,self.curIndexes = getIndexes(self.pageSize,self.currentPage));
        })

    }

    function _loadCurrentPageData(cb){
        var self = this;
        if(self.remote){
            _getRemoteData.call(self,function(data){
                self.originalData = data;

                self.dataList = data.dataList;

                _buildList.call(self,self.dataList);

                cb && cb();
            })
        }
        else{
            var indexes = getIndexes(self.pageSize,self.currentPage);
            _buildList.call(self,self.dataList.slice.apply(self.dataList,indexes));
            cb && cb()
        }
    }

    function _parseData(cb){
        var self = this,
            ds = self.dataSource;
        if(ds instanceof Array){
            self.totalPage = Math.ceil( ds.length/self.pageSize);
            cb && cb({
                totalRecords:ds.length,
                currentPage:self.currentPage,
                pageSize:self.pageSize,
                dataList:ds.slice(0)
            })
        }
        else if(ds && ds instanceof Object){
            self.remote = true;
            _getRemoteData.call(self,cb);
        }
        else{
            var root = self.root,
                list = root.find(self.listItem),
                dataList = [];
            list.each(function(i,v){
                dataList.push(v.outerHTML);
            })
            //list.remove();
            root.empty();
            self.totalPage = Math.ceil( dataList.length/self.pageSize);
            cb && cb({
                totalRecords:dataList.length,
                currentPage:self.currentPage,
                pageSize:self.pageSize,
                dataList:dataList
            });
        }
    }

    function _getRemoteData(cb){
        var self = this,
            ds = self.dataSource;

        var tempData = {
            pageSize:self.pageSize,
            currentPage:self.currentPage
        }
        $.ajax({
            url:ds.url,
            type:ds.type || "get",
            dataType:"json",
            data:typeof ds.data == 'function' ? ds.data(tempData) : $.extend(tempData,ds.data),
            success:function(res){
                ds.beforeApply && (res = ds.beforeApply(res));
                self.totalPage = Math.ceil( res.totalRecords/self.pageSize );
                _curPageNumber.call(self);
                cb && cb(res);
                ds.complete && ds.complete.call(this,res);
            }
        })
    }

    function _getItemTemplate(){
        var self = this,
            root = self.root,
            templateId = "listItemTemplate"+ self.id,
            itemTemplate = self.itemTemplate;
        if(typeof itemTemplate == 'function'){
            return itemTemplate
        }
        else if(itemTemplate && typeof itemTemplate == 'string'){
            return $.MT(templateId,self.itemTemplate)
        }
        else if(!itemTemplate){
            //var wrp = $("<div></div>");
            //var tmp = root.find(self.listItem).eq(0).clone();
            return function(data){
                return data;
                //tmp.html(data).appendTo(wrp);
                //return wrp.html();
            }
        }
    }


    function _buildList(dataList){
        var self = this,
            root = self.root,
            itemTemplate = self.itemTemplate,
            list,
            dl = dataList.length;

        var listHtml = "";
        dataList.forEach(function(v,i){
            listHtml += itemTemplate(v);
        })
        list = self.list = root.html(listHtml).children();
        root.hide();
        list.each(function(i,tmp){
            var tc = [];
            i == 0 && tc.push("first");//tmp.addClass('first');
            i == dl -1 && tc.push('last');//tmp.addClass('last');
            i%2 && tc.push('even');// tmp.addClass('even');
            !(i%2) && tc.push('odd');// tmp.addClass('odd');
            $(tmp).addClass(tc.join(" "));
        })
        root.show();
    }


    function _show(start,end){
        var self = this;
        for(var i = start;i<end;i++){
            if(i >= start && i < end){
                var tmp = self.list.eq(i);

                i == start && tmp.addClass('first');
                i == end -1 && tmp.addClass('last');
                i%2 && tmp.addClass('even');
                !(i%2) && tmp.addClass('odd');

                tmp.show();
            }
        }
    }

    function _hide(start,end){

        var self = this;

        for(var i = start;i<end;i++){
            if(i >= start && i < end){
                self.list.eq(i).hide().removeClass('first last odd even');
            }
        }
    }

    function getIndexes(size,page){

        var start = size*(page-1);

        return [start,start+size];
    }

    function _curPageNumber(){
        var self = this,
            totalPage = self.totalPage,
            curPage = self.currentPage,
            curPage = curPage > 0 ? (curPage <= totalPage ? curPage : totalPage) : 1;

        return self.currentPage = curPage;
    }

    $.extend(List.prototype,{

        show:function(pageNumber){
            var self = this;
            if(!arguments.length) return self;
            var cp = self.currentPage;
            self.currentPage = pageNumber;
            _curPageNumber.call(self);
            if(cp != self.currentPage){
                _loadCurrentPageData.call(self);
            }
            return self;
        },

        toPage:function(pageNumber){

            this.show(pageNumber);
        },

        add:function(el,index){
            //_hide.apply(this,this.curIndexes);
            if(this.remote) return this;
            var list = this.dataList;
            if(!(el instanceof Array)){
                el = [el];
            }
            switch (index){
                case "first":
                    index = 0;
                    break;
                case "last":
                    index = list.length
                    break;
                case "bottom":
                    index = this.currentPage*this.pageSize-1;
                    index = index > this.list.length-1 ? this.list.length-1 : index;
                    //list.splice(index,0,el);
                    break;
                case undefined:
                case "top":
                    index = (this.currentPage-1)*this.pageSize;
                    break;
                default :
                    index = index || 0;
                    break;
            }

            el.splice(0,0,index,0);

            list.splice.apply(list,el);

            return this.refresh();
        },

        del:function(index){

            if(this.remote) return this;
            var dl = this.dataList;
            if(typeof index == 'function'){
                for(var i=0,d;(d = dl[i]);i++){
                    index(d) === true && dl.splice(i--,1)
                }
            }
            else{

                if(!(index instanceof Array)) index = [index];
                index.forEach(function(i,v){
                    dl.splice(i,1);
                })
            }

            return this.refresh();
        },

        refresh:function(){
            var tpOld = this.totalPage,self = this;
            _loadCurrentPageData.call(self,function(){
                self.root.trigger('refresh',self);
                if(tpOld != self.totalPage){
                    self.root.trigger('pageCountChange',self);
                }
            });

            return this;
        },

        setPageSize:function(pageSize){
            var self = this;
            self.pageSize = parseInt(pageSize) || 10;

            _curPageNumber.call(self);

            return this.refresh();
        },

        nextPage:function(){

            return this.show(this.currentPage + 1);
        },

        prevPage:function(){

            return this.show(this.currentPage - 1);
        },

        count:function(){
            if(this.remote){
                return this.originalData && this.originalData.totalRecords
            }
            else{
                return this.dataList.length;
            }

        },

        getCurrentPageItems:function(){
            return this.list;
        },

        destroy:function(){
            select.root.data('listManager',null);
        },

        on:function(){

            this.root.on.apply(this.root,arguments);
            return this;
        },

        off:function(){

            this.root.off.apply(this.root,arguments);
            this;
        },

        trigger:function(){
            this.root.trigger.apply(this.root,arguments);
            this;
        }

    })


    $.fn.listManager = function(options){

        options = $.extend({
            root:this[0]
        },options);

        var self = this;

        var instance = self.data('listManager');

        if(!instance){
            instance = new List(options);
            self.data('listManager',instance);
        }

        return instance;
    }


    module.exports = List;
});
