var Modal={
    tempConfig:{
        showHeader:true,
        showFooter:true,
        width:600,
        height:350
        ,btns:[
            {
               tag:"确定"
                ,btnClass:null
                ,click: $.noop
            }

        ]
    }
    ,template:'<div class="modal_con position_f">'+
                    '<div class="modal position_f">'+
                        '<div class="modal_header position_r">'+
                          '<span class="title">我的标题</span>'+
                          '<span class="close position_a btn">关闭</span>'+
                        '</div>'+
                        '<div class="modal_body align_c position_r">'+
                             '我的提示内容'+
                        '</div>'+
                        '<div class="modal_footer position_a align_c">'+

                         '</div>'+
                     '</div>'+
                  '</div>'
    ,init:function(option){
        var self=this;
        self.options = $.extend({},self.tempConfig,option);
        var unqueid=new Date().getTime();
        $(document.body).append($(this.template).attr("id",unqueid));
        this.modalArray.push( this.currentModal=$("#"+unqueid+" .modal"));
        //this.currentModal=$("#"+unqueid+" .modal");
        this._initConfig();
        this._initEvent();

        return this;
    }
    ,currentModal:null
    ,modalArray:[]
    ,createModal:function(option){
        var self=this;
        self.options = $.extend({},self.tempConfig,option);
        var unqueid=new Date().getTime();
        $(document.body).append($(this.template).attr("id",unqueid));
        this.modalArray.push( this.currentModal=$("#"+unqueid+" .modal"));
        //this.currentModal=$("#"+unqueid+" .modal");
        this._initConfig();
        this._initEvent();
        return this;
    }
    ,createOtherModal:function(option){
        var self=this;
        self.options = $.extend({},self.tempConfig,option);
        var unqueid=new Date().getTime();
        $(document.body).append($(this.template).attr("id",unqueid));
        this.modalArray.push( this.currentModal=$("#"+unqueid+" .modal"));
        //this.currentModal=$("#"+unqueid+" .modal");
        this._initConfig();
        this._initEvent();
        return this;
    }
    ,_destoryModal:function(){
        $( this.modalArray).each(function(index,item){
              item.parent().remove();
        })
    }

    ,_initEvent:function(){
        var t=this.currentModal;
        var hide=this._hide;
        this.currentModal.find(".close").on("click",function(evt){
            hide(t);
        });

        //footer下的按钮事件
        $(this.options.btns).each(function(index,item){
            var tb=  '<span class="modal_btn btn_sure btn">'+item.tag+'</span>';
            item.btnClass&& (tb=  '<span class="modal_btn btn btn_sure '+item.btnClass+' ">'+item.tag+'</span>');
                //'<span class="modal_btn btn_cancel">取消</span>'+

            var $tb=$(tb);
            $tb.on("click",function(evt){
                item.click();
                hide(t);
            });
            t.find(".modal_footer").append($tb);
        });

        //this.currentModal.find(".btn_cancel").on("click",function(evt){
        //    hide(t);
        //});
        //this.currentModal.find(".btn_sure").on("click",function(evt){
        //    hide(t);
        //});

    }
    ,_hide:function(md){

        IsIE8()||md.animate({opacity:0});
        md.parent().animate({top:'-150%'},500,function(){
            md.parent().remove();
        })

        return this;
    }
    ,_initConfig:function(){
        this.currentModal.width(this.options.width+"px").height(this.options.height+"px");
        this.currentModal.css("margin-left",-this.options.width/2+"px");
        this.options.showFooter?$(".modal_con .modal_footer").show():$(".modal_con .modal_footer").hide();
        this.options.showHeader?$(".modal_con .modal_header").show():$(".modal_con .modal_header").hide();
    }
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



module.exports=Modal;