/**
 * Created by giantliu on 15/10/26.
 */
define('ui/modal/modal',[],function(require,exports,module){

    var modalHtml = '<div class="modal-bg" >' +
        '<div class="modal-wrapper ie-css3" >' +
        '<div class="modal-title" >' +
        '<div class="title-txt" ></div><div class="modal-close" >关闭</div></div>' +
        '<div class="modal-content" >' +
        '<div class="display-content" ></div></div>' +
        '<div class="modal-foot" ></div>' +
        '</div>';

    var tmpOptions = {
        title:"title",
        content:"content",
        size:'small',
        showFoot:true,
        showClose:true,
        buttons:[
            {
                name:"确定",
                btnClass:'',
                click: function(){}
            }
        ]
    }

    var sizes = {
        small:{
            width:600,
            height:450
        },
        middle:{
            width:900,
            height:700
        },
        large:{
            width:1100,
            height:800
        }
    }

    var ns = "yg-modal";

    var modalInstance;
    var singleId = 'modal-single';

    function modal(id){

        id = id || singleId;

        var md = $("#"+id);
        if(!md.length){
            md = $(modalHtml);
            md.attr('id',id);
            $(document.body).append(md);
            md.addClass(ns);
            md.on('click','.modal-foot [modal-btn]',function(evt){
                var fn = $(this).data('click'),res;
                fn && (res = fn());
                res !== false && hide(md);
            }).on('click','.modal-close',function(){
                hide(md);
            })

            /*$(window).on('resize',function(){
                var size = md.data('size');
                if(size == 'adjust'){
                    setSize('adjust');
                }
            });*/
        }

        return md;
    }

    var mdId = 1;
    function modalId(){
        return "modal"+(mdId++);
    }

    function setContent(options,md){

        var md = md || modalInstance;

        md.data({size:options.size});

        md.find('.title-txt').html(options.title);

        md.find('.display-content').html(typeof options.content == 'function' ? options.content() : options.content);

        var foot = md.find('.modal-foot').empty()[options.showFoot ? 'show':'hide']();
        md.find('.modal-close')[options.showClose?'show':'hide']();

        $.each(options.buttons,function(i,v){

            var baseClass = 'btn ie-css3';

            var btn = $("<span class='"+baseClass+" btn-ok' modal-btn >"+ v.name +"</span>");

            if(v.btnClass){
                btn.attr('class', baseClass +" " + v.btnClass);
            }

            btn.data({
                click: v.clicked
            });

            foot.append(btn);
        })

    }

    function setSize(options,md){
        var size = options.size;
        var md = md || modalInstance;

        if(size == 'adjust'){
            size = {
                width:$(window).width() * .75,
                height:$(window).height() * .75
            }
        }
        else{
            size = sizes[size] || (typeof size == 'object' && size) || sizes.middle;
        }

        md.find('.modal-wrapper').css({
            width:size.width,
            height:size.height,
            marginTop:-size.height/2,
            marginLeft:-size.width/2
        })
        var headerHeight = md.find('.modal-title').outerHeight();
        var footerHeight = options.showFoot ? md.find('.modal-foot').outerHeight() : 0;
        md.find('.modal-content').css({
            height:size.height-headerHeight - footerHeight
        });

    }

    function getInstance(){
        if(!modalInstance){
            return modalInstance = modal();
        }
        return modalInstance;
    }

    function show(options){

        var md = getInstance();

        options = $.extend({},tmpOptions,options)

        setContent(options);

        md.show();

        setSize(options);

        md.trigger('modal-show');

        IsIE8()|| md.animate({opacity:1});

        md.find(".modal-wrapper").animate({top:'50%'});


        return this;
    }
    function IsIE8(){
        var browser=navigator.appName
        var b_version=navigator.appVersion;
        var trim_Version;
        var version=b_version.split(";");
        version[1]&&(trim_Version=version[1].replace(/[ ]/g,"")) ;
        if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE8.0")
        {
           return true;
        }
        return false;
    }
    function create(options){

        options = $.extend({},tmpOptions,options)

        var md = modal(modalId());

        setContent(options,md);

        md.show();

        setSize(options,md);

        md.trigger('modal-show');
        IsIE8()|| md.animate({opacity:1});
        md.find(".modal-wrapper").animate({top:'50%'})

        md.close = function(){
            hide(md);
        }

        return md;
    }

    function hide(md){

        var md = md || getInstance();

        var id = md.attr('id');

        IsIE8()||md.animate({opacity:0});
        md.find(".modal-wrapper").animate({top:'-50%'},500,function(){
            md.hide();
            md.trigger('modal-hide');
            if(id != singleId){
                md.remove();
            }
        })

        return this;
    }

    function close(md){

        hide(md,function(){
            md.remove();
        })
    }

    module.exports = {
        show:show,
        hide:hide,
        create:create,
        alert:function(title,content,callback){
            if(!content) {
                content = title;
                title = "提示"
            }

            return this.create({
                title:title,
                size:{
                    width:300,
                    height:200
                },
                content:"<p class='alert' >"+content+"</p>",
                buttons:[
                    {
                        name:"确定",
                        btnClass:"btn-ok",
                        clicked:callback || $.noop
                    }
                ]
            })
        },
        confirm:function(title,content,btns){
            var okBtn = $.extend({
                    name: '确定',
                    btnClass: "btn-ok",
                    clicked: $.noop
                }, btns && btns.ok),
                cancelBtn = $.extend({
                    name: '取消',
                    btnClass: 'btn-cancel',
                    clicked: $.noop
                }, btns && btns.cancel);
            return this.create({
                title: title,
                content: content,
                size: {
                    width: 300,
                    height: 200
                },
                buttons: [
                    okBtn,
                    cancelBtn
                ]
            })
        },
        on:function(){
            var md = getInstance();
            md.on.apply(md,arguments);
            return this;
        },
        off:function(){
            var md = getInstance();
            md.off.apply(md,arguments);
            return this;
        }
    }

    window.ygModal = module.exports;

});