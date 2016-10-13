/**
 * Created by liujiangtao on 2015/10/30 0030.
 */
define("ui/verifyInput/VerifyInput",[],function(require,exports,module){

    var pf = 'yg';

    var styles = {
        "Verify-field":{
            'position':'absolute',
            'left':0,
            'top':0,
            width:"100%",
            'box-sizing':'border-box',
            'height':"100%"
        },
        "Verify-field_*":{
            'box-sizing':"border-box"
        },
        "Verify-cell":{
            'background':"transparent",
            'float':'left',
            'border-right-width':'0',
            'position':'relative !important',
            'text-align':'center',
            'text-indent':'0 !important',
            'padding-left':'0 !important',
            'padding-right':'0 !important',
            'height':"100% !important"
        },
        "Verify-cell:focus":{
            'border-right-width':"1px"
        },
        "Verify-cellLast":{
            'border-right-width':'1px'
        }
    };

    var browser = {
        name:(function(){
            var ua = navigator.userAgent;
            if(/metasr/i.test(ua)){
                return 'sougou';
            }else{
                return 'other';
            }
        })(),
        version:''
    };

    (function buildStyle(){
        var prefix = "."+pf;
        var rootClass = ".verify-field";
        var styleStr = "<style type='text/css' >";

        for(var p in styles){
            var tmp = styles[p];
            var slctr = p.replace(/[A-Z]/g,function(a){return "."+a.toLowerCase();}).replace(/_/g," ");
            var sp = "";
            slctr.indexOf(rootClass) != 0 && (sp = " ");
            slctr = prefix + sp + slctr + "{";
            for(var q in tmp){
                slctr += (q.replace(/[A-Z]/g,function(a){return "-"+ a.toLowerCase()})+":"+tmp[q]+";\n");
            }
            styleStr += (slctr+"}\n");
        }
        styleStr += "</style>";
        $('head').append(styleStr);
    })();

    function VerifyInput(options){
        var self = this;
        options = this.options = $.extend({
            input:"",
            inputCount:6,
            perLen:1,
            stylePrefix:pf
        },options);

        var input = this.input = $(options.input);

        input.css({'visibility':"hidden"});

        options.type = (browser.name == 'sougou') ? 'tel' : 'password';

        var verifyHtml = getVerifyInputHtml(options);

        var element = this.element = $(verifyHtml);

        element.addClass(options.stylePrefix);
        input.parent().css({position:"relative"}).append(element);
        updatePosition(input,element);
        //input.before(element)
        bindInput.call(self);
    }

    function updatePosition(input,ele){
        var pos = input.position(),width = input.outerWidth(),height = input.outerHeight();
        if(!pos) return;
        ele.css({
            left:pos.left,
            top:pos.top,
            width:width,
            height:height,
            lineHeight:height+"px"
        })
    }

    function bindInput(){
        var self = this;
        var options = this.options;
        var element = this.element;
        var pl = 1;//options.perLen;暂时不让设置每个单元中可输入的长度
        var totalLen = options.inputCount * pl;

        var inputEvt = "keypress";//($.browser.msie && $.browser.version == '8.0') ? 'keypress' : 'input';

        var inputs = element.find('input').bind(inputEvt,function(evt){
            var keyCode = evt.keyCode;
            var curInput = $(this),curVal = curInput.val(),kv = $.trim(String.fromCharCode(keyCode)),tmpVal = curVal+kv;

            var nxt = curInput.next();

            if(keyCode == 39){
                nxt.focus();
                return;
            }
            else if(keyCode == 37){
                curInput.prev().focus();
                return;
            }
            else if([38,40,9,8].indexOf(keyCode) > -1){
                return;
            }
            if(tmpVal.length >= pl && nxt.length){
                setTimeout(function(){
                    nxt.focus();
                },0)
            }else{
                setTimeout(function(){
                    curInput.blur();
                },0)
            }
            curInput.val("");
            self._maskInputValue(curInput);
            setTimeout(function(){
                self.input.val(getInputsVal(inputs));
                self.input.trigger('keyup');
            },0)


        }).bind('keyup',function(evt){

            var keyCode = evt.keyCode;

            var curInput = $(this),curVal = curInput.val();

            if(keyCode == 8){
                !curVal && (curInput.prev().focus().val(curInput.prev().val()),self._maskInputValue(curInput));
                self.input.val(getInputsVal(inputs));

                return;
            }
        }).bind('paste',function(evt){
            var vals = [],val,pl = 1;//options.perLen;
            var _self = $(this);
            var txt = getPasteData(evt);
            inputs.each(function(i,v){
                vals[i] = v == _self[0] ? txt :  v.value;
            });
            val = vals.join('').substr(0,totalLen);
            inputs.each(function(i,v){
                v.value = val.substr(i*pl,pl);
                self._maskInputValue($(v));
            });
            evt.originalEvent.returnValue = false;
            self.input.val(val);
            self.input.trigger('change');
        }).bind('blur',function(){
            self.input.val(getInputsVal(inputs));
            setTimeout(function(){
                var blured = true;
                inputs.each(function(i,v){
                    if(v == document.activeElement){
                        blured = false;
                    }
                })
                if(blured) self.input.trigger('blur');
            },0)
        });
    }

    function getInputsVal(inputs){
        var vals = [];
        inputs.each(function(i,v){
            //vals[i] = v.value;
            vals[i] = $(v).attr('pv') || v.value;
        });
        return vals.join('');
    }

    function getPasteData(evt){
        var pastedText ="";
        if (window.clipboardData && window.clipboardData.getData) { // IE
            pastedText = window.clipboardData.getData('Text');
        } else {
            pastedText = evt.originalEvent.clipboardData.getData('Text');//e.clipboardData.getData('text/plain');
        }
        return pastedText;
    }

    function getVerifyInputHtml(options){
        var count = options.inputCount;
        var type = options.type || 'text';
        var str = "<div class='verify-field clearfix' >";

        for(var i= 0;i<count;i++){
            str += '<input type="'+type+'" v-id="'+i+'" class="input-box verify-cell '+(i == count-1 ? 'last' : '')+'" style="ime-mode:disabled;width:'+Math.floor(10000/count)/100+'%" />'
        }

        str += '</div>';

        return str;
    }

    $.extend(VerifyInput.prototype,{

        on:function(){
            this.input.on.apply(this.input,arguments);
            return this;
        },

        _maskInputValue:function(field){
            var self = this;
            var securityChar = this.options.securityChar || "●";
            var tv;
            if(this.toi !== undefined){
                clearTimeout(this.toi);
                tv = this.curInput.val();
                this.curInput.attr('pv',tv);
                if(tv){
                    this.curInput.val(securityChar);
                }
                this.toi = undefined;
            }
            this.curInput = field;
            var element = this.element;
            var inputs = element.find('input');
            this.toi = setTimeout(function(){
                self.toi = undefined;
                tv = field.val();
                field.attr('pv',tv);
                if(tv){
                    field.val(securityChar);
                }
                self.input.val(getInputsVal(inputs));
            },200);

        }

    })

    $.fn.verifyInput = function(options){
        options = options || {}
        var self = $(this);
        if(!self.length) return;
        options.input = self;
        return new VerifyInput(options)
    }

    module.exports = VerifyInput;
});