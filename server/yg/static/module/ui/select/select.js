/**
 * Created by liujiangtao on 2015/11/25 0025.
 */
define('ui/select/select',function(require,exports,module){

    var tmpConfig = {
        width:150,
        height:34,
        dropdownMaxHeight:300,
        empty:"无",
        enabled:true,
        /**
         * false|
         * string:a selector |
         * object:htmlDOM or JQ object
         */
        depends:"",
        /**
         * null:
         * func:function(){}
         * obj1:[
         *          {
         *              display:"xxx",
         *              value:"xxx",
         *              selected:bool
         *          }
         *      ]
         * obj2:{
         *          url:'xxxx',
         *          data:"", function(){}
         *          method:""
         *      }
         *
         */
        dataSource:null //
    }

    var templates = '<div class="select-wrapper" >' +
        '<div class="select-display ie-css3" ></div>' +
        '<i class="icon-arrow" ></i>' +
        '<ul class="select-dropdown ie-css3" >' +
        //<li class='select-item' ></li>
        '</ul></div>';

    function getDataFromSelect(select){
        var res = [],selected;
        select.find("option").each(function(i,v){
            var tmp = $(v);
            var s = tmp.prop('selected');
            var item = {
                display:tmp.text(),
                value:tmp.val(),
                selected:s
            }
            res.push(item)
        })
        return res;
    }

    function Select(options){
        var self = this;
        options = $.extend({},tmpConfig,options);
        self.options = options;
        self.selectId = "select_"+ $.utils.id();
        var selectEl = self.selectEl = options.select;
        selectEl.hide();

        var element = self.element = $(templates);

        selectEl.after(element);

        function _slideUp(evt){
            self.slideUp();
            $('body').off('click',_slideUp);
        }

        element.on('click','.select-display',function(evt){

            if(!options.enabled) return;

            if(self.isDropDown){
                evt.stopPropagation();
                return;
            }

            self.dropDown();

            setTimeout(function(){
                $('body').on('click',_slideUp);
            },0)

        }).on('click','.icon-arrow',function(){
            element.find('.select-display').trigger('click');
        }).find('.select-dropdown').on('click','.select-item',function(evt){
            self.select($(this).attr('index'));
            $('body').off('click',_slideUp);
        }).attr('from',self.selectId);

        setSize.call(self);

        function _load(){
            self.getData(function(data){
                self.setData(data);
                if(!self.isReady){
                    self.isReady = true;
                    self.trigger('ready');
                }
            })
        }

        depends.call(self,_load);
    }

    function _dep(v,cb){
        var dp = $(v);
        if(dp.length && dp.val()){
            cb && cb()
        }
        else{
            dp.on('ready',cb)
        }
        dp.on('change',cb);
    }

    function depends(cb){

        var options = this.options,
            dp = options.depends,
            self = this;

        if(typeof dp == 'array'){
            dp.forEach(function(v,i){
                _dep(v,cb);
            })
        }
        else if(dp){
            _dep(dp,cb);
        }
        else{
            cb();
        }

    }

    function parseData(data){
        var html = "",options = "",selectedIndex = 0;

        $.each(data,function(i,v){
            html += '<li class="select-item '+(v.selected ? "selected" : "")+'" value="'+ v.value+'" index="'+i+'" >'+ v.display+'</li>';
            options += '<option value="'+ v.value+'" '+(v.selected ? "selected" : "")+' >'+ v.display+'</option>'
            if(v.selected) selectedIndex = i;
        })

        return {
            'html':html,
            'options':options,
            'selectedIndex':selectedIndex
        };
    }

    function setSize(){

        var self = this,
            element = self.element,
            options = self.options;

        element.css({
            width:options.width,
            height:options.height,
            'lineHeight':options.height+"px"
        }).find(".select-dropdown").css({
            top:options.height,
            maxHeight:options.dropdownMaxHeight+"px",
            'lineHeight':options.height+'px',
            width:options.width
        });

        self._height = options.height;
        self._totalHeight = element.find(".select-label").height()+element.find(".select-dropdown").height();

    }

    $.extend(Select.prototype,{

        setData:function(data){

            this.dataSource = data;

            var res = parseData(data),
                options = this.options;
            this.element
                .find('.select-dropdown')
                .html(res.html)
                .find('.select-item')
                .css({
                    height:options.height,
                    lineHeight:options.height+'px'
                });
            this.selectEl.html(res.options);
            this.select(res.selectedIndex || 0);
        },
        getData:function(cb){
            var options = this.options;
            var ds = options.dataSource;
            if(typeof ds == 'function'){
                ds = ds();
            }
            else if(ds && ds instanceof Object && !(ds instanceof Array)){
                return $.ajax({
                    url:ds.url,
                    data:typeof ds.data == 'function' ? ds.data() : ds.data,
                    method:ds.method || "get",
                    dataType:"json",
                    cache:!!ds.cache,
                    success:function(res){
                        ds.beforeApply && (res = ds.beforeApply(res))
                        cb(res.length && res || [{display:options.empty,value:""}]);
                    }
                })
            }
            else if(!ds){
                ds = getDataFromSelect(this.selectEl);
            }
            cb(ds.length && ds || (ds = [{display:options.empty,value:""}]));
        },

        dropDown:function(){

            var element = this.element,self = this;
            if(self.isDropDown) return;
            element.addClass('active');
            if($.browser.msie && parseFloat($.browser.version) <= 8){
                var os = element.find(".select-display").offset();
                element.find(".select-dropdown").appendTo($('body')).css({
                    top:os.top+element.find(".select-display").height(),
                    left:os.left,
                    zIndex:999
                }).addClass('current').show();
            }
            else{
                element.find(".select-dropdown").slideDown();
            }

            element.find('.icon-arrow').addClass('on')
            self.isDropDown = true;
        },

        slideUp:function(){

            var element = this.element,self = this;
            if(!self.isDropDown) return;
            if($.browser.msie && parseFloat($.browser.version) <= 8){
                element.find('.select-dropdown').hide();
                $('body').find(".select-dropdown[from='"+self.selectId+"']")
                    .hide()
                    .removeClass('current')
                    .appendTo(element);
            }
            else{
                element.find('.select-dropdown').hide();
                element.removeClass('active');
                //element.find('.select-dropdown').slideUp(function(){
                //    element.removeClass('active')
                //});
            }

            element.find('.icon-arrow').removeClass('on');
            self.isDropDown = false;
        },

        select:function(index){
            var self = this,el = self.element;

            var ns = self.dataSource[index];

            if(self.selected == ns){
                self.slideUp();
                return;
            }

            el.find('.select-item')
                .removeClass('selected')
                .eq(index)
                .addClass('selected')

            self.selected = ns;
            self.element.find(".select-display").html(self.selected.display);
            var ov = self.selectEl.val();
            self.selectEl.find('option').eq(index).prop('selected',true);
            var nv = self.selectEl.val();
            if(ov != nv){
                self.selectEl.trigger('change');
            }
            self.slideUp();
        },

        on:function(){
            this.selectEl.on.apply(this.selectEl,arguments);
        },

        off:function(){
            this.selectEl.off.apply(this.selectEl,arguments);
        },

        trigger:function(){
            this.selectEl.trigger.apply(this.selectEl,arguments);
        },

        enabled:function(bool){
            if(arguments.length){
                this.element[bool ? 'removeClass' : 'addClass']('disable');
                this.options.enabled = bool;
            }
            else{
                return this.options.enabled;
            }

        }

    })

    $.ygSelection = {

    }

    $.fn.ygSelect = function(options,cb){
        var self = $(this);

        var instances = [];

        self.each(function(i,v){
            var tmp = $(v);
            var instance = tmp.data('select');
            if(!instance){
                instance = new Select($.extend({
                    select:tmp
                },options));
                tmp.data('select',instance);
            }
            instances.push(instance);
            cb && cb.call(v,instance);
        })

        return this;
    }

    module.exports = Select;

});