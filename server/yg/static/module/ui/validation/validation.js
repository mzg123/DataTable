/**
 * Created by liujiangtao on 2015/11/20 0020.
 */
define('ui/validation/validation',function(require,exports,module){

    var tmpOptions = {
        submitHandler: $.noop,
        errorHandler: $.noop,
        passedHandler: $.noop,
        form:"",
        lazyValidate:true,
        enterSubmit:true,
        selectById:false,
        //output:"../.wrong" || function(){}
        //fields:{
        //    username:{
        //        required:true,
        //        pattern:"",
        //        minLength:"",
        //        maxLength:"",
        //        maxValue:"",
        //        minValue:"",
        //        minChecked:"",
        //        maxChecked:"",
        //        output: string / $.noop,
        //        validator:$.noop
        //    }
        //},
        //errorMessage:{
        //      username:{
        //        required:"",
        //        pattern:"",
        //        minLength:"",
        //        maxLength:"",
        //        maxValue:"",
        //        minValue:"",
        //      }
        // }
        //okMessage:{
        //      username:"",
        //      password:""
        // }
    };

    $.extend(tmpOptions, $.validationSettings || {});

    var supportedValidateTypes = ['required','minLength','maxLength','maxValue','minValue',"minChecked","maxChecked",'pattern'];

    function lengthInByte(str){
        if(!str) return 0;
        var i = str.length,len = 0;
        while(i--){
            len += (str.charCodeAt(i)>>8) ? 2 : 1
        }
        return len;
    }

    var validateExpressions = {
        minLength:function(v,vv){
            return vv === undefined || lengthInByte(v) >= vv;
        },
        maxLength:function(v,vv){
            return vv === undefined || lengthInByte(v) <= vv;
        },
        maxValue:function(v,vv){
            v = parseFloat(v);
            return vv === undefined || v <= vv;
        },
        minValue:function(v,vv){
            v = parseFloat(v);
            return vv === undefined || v >= vv;
        },
        minChecked:function(v,vv){
            var vs = v.split(',');
            return vv === undefined || vs.length >= vv;
        },
        maxChecked:function(v,vv){
            var vs = v.split(',');
            return vv === undefined || vs.length <= vv;
        },
        required:function(v,vv){
            return vv !== true || !!v;
        },
        pattern:function(v,vv){
            if(!vv) return true;
            return (vv.test && vv.test(v)) || ( new RegExp(vv)).test(v);
        }
    }

    var valMethodMap = {
        radio:function(field){
            var val;
            field.filter(function(i,v){
                v.checked && (val = v.value);
            });
            return val;
        },
        checkbox:function(field){
            var val = [];
            field.filter(function(i,v){
                v.checked && val.push(v.value);
            })
            return val.join(",");
        }
    }

    function getFieldValidateProp(field,obj){
        var res = {};
        $.each(supportedValidateTypes,function(i,v){
            res[v] = field.attr(v.replace(/([A-Z])/g,"-$1"));
            if(obj[v] !== undefined){
                res[v] = obj[v];
            }
        })
        return res;
    }
    var formId = (function(){
        var id = 1;
        return function(){
            return "formId_"+(id++);
        }
    })();
    function Validator(options){
        options = $.extend({},tmpOptions,options);
        var self = this;
        self.isValid = true;
        self.formId = formId();
        self.options = options;

        var form = self.form = $(options.form);

        form.attr('onsubmit','return $.validation.checkForm(event,"'+self.formId+'")')
            .attr('valid-form',self.formId);


        $('body').on('keyup',function(evt){
            if(evt.keyCode == 13 && options.enterSubmit){
                if(focusedField){
                    focusedField.trigger('change');
                }
                form.submit();
            }
        }).on('keypress',function(evt){
            var code = evt.keyCode || evt.which;
            if(focusedField && code == 13){
                return false;
            }
        })

        var focusedField = null;
        function _check(evt){
            var _self = $(this);
            if(evt.type == 'blur'){
                focusedField = null;
            }
            var vf = _self.data('fieldValidator');
            var tmp = vf(_self);

            var eh = self.options.errorHandler;
            if(tmp && tmp.type && eh){
                eh.call(form,[tmp]);
            }
            checkAllFieldStatus.call(self);
        }

        function _focus(evt){
            var _self = $(this);
            focusedField = _self;
        }

        function _validateEvents(field,lazy){
            var events = ['validate'];
            var tagName = field[0].tagName.toUpperCase();
            var type = field.attr('type');
            type && (type = type.toLowerCase());
            if(tagName == "INPUT" && 'checkbox|radio'.indexOf(type) > -1){
                events.push('change');
            }else if(tagName == 'INPUT' || tagName == 'TEXTAREA'){
                events.push('blur');
            }else{
                events.push('change');
            }
            if(lazy === false){
                if($.browser.msie && $.browser.version == '8.0'){
                    events.push('keyup');
                }else{
                    events.push('input');
                }
            }
            return events.join(' ');
        }

        function createValidators(){
            var fields = options.fields;
            var errorMessage = options.errorMessage;
            var okMessage = options.okMessage || {}
            var fdoms = self.fields = {};
            var valid = true;
            for(var p in fields){
                var field;
                if(options.selectById){
                    field = form.find("#"+p);
                    var fieldName = field.attr('name');
                    field = form.find('[name='+fieldName+']');
                }
                else{
                    field = form.find('[name='+p+']');
                }
                if(!field[0]){
                    console.error('can not find field "'+p+'" in given form---from validator');
                    continue;
                }
                var fconfig = fields[p];
                fdoms[p] = field;
                field.data('fieldValidator',validateField);
                field.data('validateTypes',getFieldValidateProp(field,fconfig));
                field.data('errorMessage',errorMessage[p]);
                field.data('okMessage',okMessage[p]);
                field.data('output',fconfig.output || options.output);
                field.data('customValidator',fconfig.validator);
                var finalTriggerEvent = _validateEvents(field,options.lazyValidate);
                field.on(finalTriggerEvent,_check);
                /*if("INPUT|TEXTAREA".indexOf(field[0].tagName.toUpperCase()) > -1) {
                    finalTriggerEvent = 'change blur';
                }else{
                    finalTriggerEvent = 'change blur';
                }
                if(options.lazyValidate){
                    field.on(finalTriggerEvent,_check)
                }
                else{
                    var evts = [finalTriggerEvent,'validate'];
                    if($.browser.msie && $.browser.version == '8.0'){
                        evts.push('keyup');
                    }else{
                        evts.push('input');
                    }
                    field.on(evts.join(' '),_check)
                }*/
                field.on('focus',_focus);
                var tmp = validateField(field,true);
                if(tmp && tmp.type) valid = false;
            }

            self.isValid = valid;
        }
        if(form.length){
            createValidators();
        }
    }

    function isFieldValid(field){
        var isValid = false;
        field.each(function(i,v){
            if(!isValid)
                isValid = $(v).data('valid')
        })
        return isValid;
    }

    function checkAllFieldStatus(){
        var self = this;
        var passedHandler = self.options.passedHandler;
        var fields = self.fields;
        var valid = true;
        for(var p in fields){
            if( isFieldValid(fields[p]) == false){
                valid = false;
                break;
            }
        }
        self.isValid = valid;
        (valid && passedHandler) && passedHandler.call(self.form);
    }

    function getFieldVal(field){
        var type =$(field).attr('type');
        if(valMethodMap[type]){
            return valMethodMap[type](field);
        }
        else{
            return $.trim(field.val());
        }
    }

    function _output(cur,tag,text,okText){
        //..{}/sdfa/sdfasd/asd
        if(!tag) return;
        if(tag.indexOf("..") < 0){
            cur = $('body');
        }
        var tags = tag.split('/');
        tags.forEach(function(v){
            var res = v.match(/(\.\.)(\{(.*?)\})?/);
            if(res){
                cur = cur[res[3] ? 'parents':'parent'](res[3]);
            }
            else{
                cur = cur.find(v);
            }
        });
        if(text){
            cur.html(text).addClass('error').removeClass('passed');
        }else{
            cur.removeClass('error').addClass('passed').html(okText);
        }
    }

    function validateField(field,justCheck){

        var validates = field.data('validateTypes'),
            output = field.data('output'),
            fieldMsg = field.data('errorMessage') || {},
            okMsg = field.data('okMessage') || "",
            customValidator = field.data('customValidator'),
            outpufFn = function(err,ok){
                if(typeof output == 'function'){
                    output.call(field,err,ok);
                }
                else if(typeof output == 'string'){
                    _output(field,output,err && err.msg || "",ok || "");
                    //$(output).text(err && err.msg || "");
                }
            };

        var err;
        var val = getFieldVal(field);
        if(typeof customValidator == 'function') {
            var msg = customValidator.call(field);
            if(msg === false || typeof msg == 'string'){
                err = {
                    type:"customValidator",
                    msg:msg || "错误",
                    field:field
                }
            }
        }
        else{

            for(var p in validates){
                if(!validateExpressions[p](val,validates[p])){
                    err = {
                        type:p,
                        msg:fieldMsg[p] || '错误',
                        field:field
                    }
                    break;
                }
            }
        }

        if((validates.required === true && err)||               //required and got err
            (validates.required !== true && err && val)){       // not required and got err and got input value
            if(!justCheck){
                field.addClass('field-invalid');
                outpufFn(err)
            }
            field.data('valid',false);
            return err;
        }
        else{
            field.removeClass('field-invalid')
                .data('valid',true);
            if(!justCheck && val){
                outpufFn(null, okMsg);
            }else{
                outpufFn();
            }

        }

    }

    $.extend(Validator.prototype,{

        validate:function(){

            var self = this;

            var fields = self.fields,options = self.options;
            var errorMsgs = [];
            for(var p in fields){
                var tmp =  fields[p].data('fieldValidator').call(self,fields[p]);
                if(tmp) {
                    this.isValid = false;
                    typeof tmp == 'object' && errorMsgs.push(tmp);
                }
            }

            if(!this.isValid){
                errorMsgs.length && options.errorHandler.call(self,errorMsgs);
                return false;
            }
            else{
                this.isValid = true;
                return options.submitHandler ? options.submitHandler.call(self) !== false : !options.submitHandler;
            }

        },

        getField:function(name){
            return this.fields[name];
        },

        getFieldVal:function(field){
            return getFieldVal(this.fields[field]);
        },
        configFieldRules:function(field,config){

            var self = this;

            var fdom = self.fields[field];

            var vtypes = fdom.data('validateTypes');

            vtypes = $.extend(vtypes,config);

            fdom.data('validateTypes',vtypes);
        },


        getFormData:function(){
            var fields = this.fields,res = {};
            for(var p in fields){
                var tmp = fields[p],
                    name = tmp.attr('name') || p;
                res[name] = getFieldVal(fields[p]);
            }
            return res;
        },

        enableEnterSubmit:function(enable){
            this.options.enterSubmit = enable !== false;
        }

    })

    $.validation = {
        checkForm:function(evt,fid){
            var self = $('form[valid-form="'+fid+'"]');
            //var self = $(evt.target || evt.currentTarget || evt.srcElement);
            var validator = self.data('validator');
            return validator.validate();
        },
        regValidateType:function(type,expression){
            if(!validateExpressions[type]){
                validateExpressions[type] = expression;
            }
            if(supportedValidateTypes.indexOf(type) < 0){
                supportedValidateTypes.push(type);
            }
        },
        unRegValidateType:function(type,expression){
            if(validateExpressions[type]){
                validateExpressions[type] = undefined;
            }
            var index;
            if((index = supportedValidateTypes.indexOf(type)) < 0){
                supportedValidateTypes.splice(index,1);
            }
        }
    }

    $.fn.validate = function(options,cb){
        var self = $(this);

        self.each(function(i,v){
            var cur = $(v);
            var validator = cur.data('validator');

            if(!validator){
                cur.data('validator',validator = new Validator($.extend({},options,{form:cur})));
            }
            cb && cb.call(v,validator);
        })

        return this;
    }

    module.exports = Validator;
});