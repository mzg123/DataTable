/**
 * Created by liujiangtao on 2015/12/16 0016.
 */
define('ui/searchBox/searchBox',function(require,exports,module){

    var tmpConfig = {
        dropdownMaxHeight:300,
        empty:"无",
        searchDelay:200,
        dataSource:null //
    }

    var templates = '<div class="search-wrapper" >' +
        '<div class="search-dropdown ie-css3" ><input class="search-input input-box" /><ul>' +
            //<li class='select-item' ></li>
        '</ul></div></div>';

    function SearchBox(options){
        var self = this;
        options = $.extend({},tmpConfig,options);
        self.options = options;
        self.focused = false;
        var inputEl = self.inputEl = $(options.input);
        inputEl.attr('autocomplete','off').attr('unselectable','on').attr('readonly','readonly');
        //inputEl.hide();

        var element = self.element = $(templates);

        inputEl.after(element);

        var searchInput = self.sInput = element.find(".search-input");

        function _slideUp(){
            self.focused = false;
            $('body').off('click',_slideUp);
            self.slideUp();
        }
        var highlightIndex;
        function _toChoose(evt){
            var keyCode = evt.keyCode;

            if([13,38,40].indexOf(keyCode) < 0) return;
            var items = element.find(".search-item").removeClass('to-choose');
            //down
            if(keyCode == 40){
                highlightIndex++;
            }
            //up
            else if(keyCode == 38){
                highlightIndex--;
            }
            else if(keyCode == 13){
                self.select(highlightIndex);
                _slideUp();
                evt.stopPropagation();
            }
            items.eq(highlightIndex%items.length).addClass('to-choose');
        }
        var curInputVal="";
        inputEl.on('click',function(evt){
            self.focused = true;
            evt.stopPropagation();
            if(self.isDropDown) return;
            highlightIndex = -1;
            self.dropDown();
            searchInput.focus();
            $('body')
                .off('click',_slideUp)
                .on('click',_slideUp);

        });
        searchInput.on('keyup',function(){
            var val = $(this).val();
            if(curInputVal != $.trim(val)){
                _search(curInputVal = val);
            }

        }.delay(options.searchDelay))
            .on('keyup',_toChoose)
            .on('click',function(evt){
                evt.stopPropagation();
            });

        element.find('.search-dropdown').on('click','.search-item',function(evt){
            self.select($(this).attr('index'));
            //evt.stopPropagation();
        })



        setSize.call(self);

        function _search(val){

            self.searchData(val,function(data){
                if(!self.isReady){
                    self.isReady = true;
                    self.trigger('ready');
                }
                self.applyData(data);
            })
        }

        _search("");

    }

    function parseData(data){
        var html = "";

        $.each(data,function(i,v){
            html += '<li class="search-item '+(v.selected ? "selected" : "")+'" value="'+ v.value+'" index="'+i+'" >'+ v.display+'</li>';
        })

        return {
            'html':html,
        };
    }

    function setSize(){

        var self = this,
            element = self.element,
            options = self.options,
            inputEl = self.inputEl,
            w = options.width || inputEl.outerWidth(),
            h = options.height || inputEl.height(),
            oh = options.height || inputEl.outerHeight();

        element.css({
            width:w,
            height:0,
            'lineHeight':h+"px",
            top:oh+"px"
        }).find(".search-dropdown").css({
            top:0,
            maxHeight:options.dropdownMaxHeight+"px",
            'lineHeight':h+'px',
            width:w
        }).find('ul').css({
            maxHeight:options.dropdownMaxHeight-h+"px"
        })

    }

    $.extend(SearchBox.prototype,{

        applyData:function(data){

            this.dataSource = data;

            var res = parseData(data);
            this.element.find('.search-dropdown ul').html(res.html);
            this.inputEl.html(res.options);
        },

        searchData:function(val,cb){

            var options = this.options;
            var ds = options.dataSource;

            if(ds && ds instanceof Object && !(ds instanceof Array)){

                $.ajax({
                    url:ds.url,
                    data:typeof ds.data == 'function' ? ds.data({search:val}) : (ds.data || {search:val}),
                    method:ds.method || "get",
                    dataType:"json",
                    success:function(res){
                        ds.beforeApply && (res = ds.beforeApply(res))
                        cb(res.length && res || [{display:options.empty,value:""}]);
                    }
                })
            }
            else if(ds instanceof Array){

                if(!this.originalData){
                    this.originalData = ds;
                }

                ds = this.originalData.filter(function(v){
                    return v.display.indexOf(val) > -1;
                })

                cb(ds.length && ds || (ds = [{display:options.empty,value:""}]));

            }

        },

        dropDown:function(){

            var element = this.element,inputEl = this.inputEl,self = this;
            if(self.isDropDown) return;
            element.addClass('active');
            if($.browser.msie && $.browser.version <= "8.0"){
                var os = inputEl.offset();
                element.find(".search-dropdown").appendTo($('body')).css({
                    top:os.top+inputEl.outerHeight(),
                    left:os.left,
                    zIndex:999
                }).addClass('current').show();
            }
            else{
                element.find(".search-dropdown").slideDown();
            }
            self.isDropDown = true;
        },

        slideUp:function(){

            var element = this.element,self = this;
            if(!self.isDropDown) return;
            if($.browser.msie && $.browser.version <= "8.0"){
                element.find('.search-dropdown').hide();
                $('body').find(".search-dropdown.current")
                    .hide()
                    .removeClass('current')
                    .appendTo(element);
            }
            else{
                element.find('.search-dropdown').slideUp(function(){
                    element.removeClass('active')
                });
            }

            self.isDropDown = false;
        },

        select:function(index){
            var self = this,el = self.element;

            var ns = self.dataSource[index];

            if(self.selected == ns){
                self.slideUp();
                return;
            }

            el.find('.search-item')
                .removeClass('selected')
                .eq(index)
                .addClass('selected')

            self.selected = ns;
            self.sInput.val(self.selected.display);
            self.inputEl.val(self.selected.value);
            //self.inputEl.find('option').eq(index).prop('selected',true);
            self.inputEl.trigger('change',{
                value:ns.value,
                display:ns.display
            });
            //self.slideUp();
        },

        on:function(){
            this.inputEl.on.apply(this.inputEl,arguments);
        },
        off:function(){
            this.inputEl.off.apply(this.inputEl,arguments);
        },
        trigger:function(){
            this.inputEl.trigger.apply(this.inputEl,arguments);
        }

    })

    $.fn.ygSearch = function(options,cb){
        var self = $(this);

        var instances = [];

        self.each(function(i,v){
            var tmp = $(v);
            var instance = tmp.data('searchBox');
            if(!instance){
                instance = new SearchBox($.extend({
                    input:tmp
                },options));
                tmp.data('searchBox',instance);
            }
            instances.push(instance);
            cb && cb.call(v,instance);
        })

        return this;
    }

    module.exports = SearchBox;

});