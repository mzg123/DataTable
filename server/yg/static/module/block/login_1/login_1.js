
var Login_1={
    tempConfig:{
        parentCon:"",//容器id
       missUserHandle: $.noop,//忘记用户名处理函数（未设置missUserUrl值）
       missUserUrl: null,//如果设置此值，missUserHandle处理函数失效
        missPSUrl: null,//如果设置此值，missPSHandle
        missPSHandle: $.noop,//忘记密码处理函数（missPSUrl）
        registerUrl: null,//如果设置此值，registerHandle
        registerHandle: $.noop,//忘记密码处理函数（registerUrl）
        valityFormHandle: $.noop,//验证表单处理函数
        submitHandle: $.noop//提交表达处理函数
    },
    template:' <form class="position_r login_1">'+
                  '<div class="position_r margin_lr_c ">'+
                      '<input id="username" class="user" type="text" placeholder="用户名" /><span><a id="missuser" class="miss_user" herf="">&nbsp;&nbsp;忘记用户名</a></span>'+
                      '<br/><span id="usernameerror" class="position_r hidden  error">请输入用户名</span>'+
                   '</div>'+
                    '<div class=" margin_lr_c position_r ">'+
                         '<input id="password" class="pass_word " type="password" placeholder="密码" /><span><a id="missps"  class="miss_ps" herf="">&nbsp;&nbsp;忘记密码&nbsp;&nbsp;&nbsp;</a>'+
                        '<br/><span id="passworderror" class="position_r hidden error">请输入用户名</span>'+
                    '</div>'+
                    '<div id="submit" class="submit position_r border_radius_5 margin_top_20 margin_lr_c ">'+
                            '登录'+
                    '</div>'+
                    '<div class="position_r margin_top_10"><a herf="" id="register" class="register position_r padding_left_250 ">注册</a></div>'+
                   '</form>',
    init:function(option){
        var self=this;
        self.options = $.extend({},self.tempConfig,option);
        $("#"+self.options.parentCon).append(this.template);
        this.initEvent();
        return this;
    },
    initEvent:function(){

        var self=this;
        self.options.missUserUrl?setHerf("missuser",self.options.missUserUrl):
        initClick("missuser",null,self.options.missUserHandle,null);

        self.options.missPSUrl?setHerf("missps",self.options.missPSUrl):
        initClick("missps",null,self.options.missPSHandle,null);

        self.options.missPSUrl?setHerf("register",self.options.missPSUrl):
            initClick("register",null,self.options.registerHandle,null);
        initClick("submit",self.options.valityFormHandle,self.options.submitHandle,null);
    }
}

function initClick(id,preFn,sucFn,failFn){
     $("#"+id).click(function(){
         var t=true;
         preFn&&(t=preFn());
         t?sucFn():failFn();
     });
}
function setHerf(id,url){
    $("#"+id).attr('href',url);
}
module.exports=Login_1;







