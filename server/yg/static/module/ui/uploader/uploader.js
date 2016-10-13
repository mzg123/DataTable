/**
 * Created by giantliu on 15/11/27.
 */

define('ui/uploader/uploader',function(require,exports,module){

    var st = Date.now();

    function id(){
        return ++st;
    }

    function sizeTransform(val){
        var vals = (val+"").match(/([\d.]*)([a-zA-Z]*)/);
        if(!vals) return val;
        val = parseFloat(vals[1]);
        var unit = vals[2];

        var uMap = {K:10,KB:10,M:20,MB:20,G:30,GB:30,T:40,TB:40,P:50,PB:50}

        if(!(unit in uMap)) return val;

        return val*Math.pow(2,uMap[unit]);
    }


    function Uploader(options){

        this.containerId = 'container'+id();
        this.formId = "uploadForm"+id();
        this.frameId = 'frame'+id();
        this.inputId = 'fileUpload'+id();
        var self = this;
        options = $.extend({
            uploadUrl:'/api/uploadFile',
            fieldName:'file',
            dataType:"json",
            hasIETip:true,
            maxCount:1,
            maxSize:'',
            accept:[],
            uploadTimeout:900000
        },options)

        this.options = options;

        options.targetElement.bind('click',function(){
            $("#"+self.inputId).trigger('click');
        })

        this.targetElement = options.targetElement;

        init.call(this,options);
    }

    function init(options){

        var self = this;

        var tag = self.targetElement;

        var formStr = "<form  id='"+self.formId+"' method='post' action='"+options.uploadUrl+"' method='post' enctype='multipart/form-data' target='"+this.frameId+"' >" +
            "<input type='file' name='"+options.fieldName+"' accept='"+options.accept.join(",")+"'  id='"+this.inputId+"'  />" +
            "</form>"

        var frameStr = '<iframe height="0" width="0" frameborder="0" id="'+self.frameId+'" name="'+self.frameId+'"  ></iframe>'

        var form = $(formStr)

        tag.after(form).parent().css('position','relative');

        if($.browser.msie && options.hasIETip){
            tag.prepend("<span>双击</span>");
        }

        var tagPos = tag.position(),tagW = tag.outerWidth(),tagH = tag.outerHeight();

        var fileField = form.css({
            position:"absolute",
            overflow:'hidden',
            opacity:'0',
            filter:'alpha(opacity=0)\\9',
            width:tagW,
            height:tagH,
            top:tagPos.top,
            left:tagPos.left
        }).find('input[type=file]').css({
            width:tagW,
            height:tagH,
            cursor:'pointer'
        });

        if($.browser.msie){
            fileField.css({
                //paddingLeft:tagW,
                width:tagW*2
            })
        }

        var containerStr = '<div id="'+self.containerId+'" >' + frameStr+
            '</div>';

        var el = $(containerStr).css({
            width:0,
            height:0,
            'overflow':'hidden'
        })

        $("body").append(el);

        $("#"+self.inputId).on('change',function(){
            if(!$(this).val()) return;
            //文件大小和扩展名，文件数量的限定

            if(!_check.call(self,this)) return;

            _upload.call(self);

        })

        var ifrInited = !$.browser.msie && !$.browser.mozilla;

        $("#"+self.frameId).on('load',function(){

            var ifr = $(this);

            if(!ifrInited){
                ifrInited = true;
                return;
            }

            if(self.isTimeout) return;

            try{
                var content;
                if(options.dataType == 'json'){
                    content = eval("(" + $(ifr[0].contentDocument).find('body').text() +")");
                }
                else{
                    content =  $(ifr[0].contentDocument).find('body').text();
                }
                _done.call(self,content);
            }
            catch(err){
                _error.call(self,err);
            }

        })

    }

    function _check(input){

        var self = this,options = self.options;
        var files = input.files || [],
            accept = options.accept.slice(0),
            maxCount = options.maxCount,
            maxSize = sizeTransform(options.maxSize);
        accept.forEach ? accept.forEach(function(v,i,a){
            a[i] = v.toUpperCase();
        }) : (accept = []) ;

        if(files.length > maxCount){
            _error.call(self,"文件数量不能超过"+maxCount+"个");
            return false;
        }

        var fileSize = 0,fte = false;

        $.each(files,function(i,v){
            fileSize += v.size;
            var ft = "." + v.type.split('/')[1].toUpperCase();
            if(!fte && accept.length){
                fte = accept.indexOf(ft) < 0 ;
            }
        })

        if(fte){
            _error.call(self,"文件类型有误,只能是"+accept.join(',')+"这几种类型");
            return false;
        }

        if(maxSize && fileSize > maxSize){
            tag.trigger('error',new Error("文件大小不能超过"+options.maxSize))
            _error.call(self,"文件大小不能超过"+options.maxSize)
            return false;
        }

        self.fileSize = fileSize;
        return true;
    }

    function _upload(){

        var self = this,
            options = self.options,
            updateInterval = 100,
            fileSize = self.fileSize || 500000,
            uploadSpeed = 120000/(1000/updateInterval),
            uploaded = 0;

        self.isUploading = true;
        self.isTimeout = false;

        if(self.timeoutId){
            clearTimeout(self.timeoutId);
            self.timeoutId = null;
        }

        self.timeoutId = setTimeout(function(){
            self.isTimeout = true;
            self.isUploading = false;
            self.timeoutId = null;
            clearInterval(self.uploadIntvId);
            _error.call(self,'上传超时');
        },options.uploadTimeout);

        if(self.uploadIntvId){
            clearInterval(self.uploadIntvId);
            self.uploadIntvId = null;
        }

        self.uploadIntvId = setInterval(function(){
            uploaded += uploadSpeed;
            var pro = uploaded/fileSize;
            if(pro>=1){
                pro = .99;
            }
            self.trigger('uploading',{
                progress:pro
            });
        },updateInterval);
        self.trigger('startUploading')
        $("#"+self.formId).submit();
    }

    function _error(err){
        var self = this;
        err = typeof err == 'string' ?  new Error(err) : err;
        self.trigger('error',err)
    }

    function _done(content){
        var self = this;
        self.isTimeout = false;
        self.isUploading = false;
        clearTimeout(self.timeoutId);
        self.timeoutId = null;
        clearInterval(self.uploadIntvId);
        self.uploadIntvId = null;
        self.trigger('uploaded',content);
    }

    function proxyMethod(name){
        return function(){

            var tag = this.targetElement;

            tag[name].apply(tag,arguments);
            return this;
        }
    }

    var extMethods = ['on','off','trigger'];

    $.extend(Uploader.prototype,{
        destroy:function(){
            $("#"+this.containerId).remove();
            $("#"+this.formId).remove();
            this.targetElement.data('uploader',null);
        }
    })

    extMethods.forEach(function(v){
        Uploader.prototype[v] = proxyMethod(v);
    })

    $.fn.uploader = function(options,returnAll){

        var instances = [];
        this.each(function(){
            var tmp = $(this);
            var instance = tmp.data('uploader')

            if(!instance){
                tmp.data("uploader",instance = new Uploader($.extend({targetElement:tmp},options)));
            }

            instances.push(instance);
        })

        return returnAll ? instances : instances[0];
    }

    module.exports = Uploader

});