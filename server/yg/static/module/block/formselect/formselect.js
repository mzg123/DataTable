
var formselect={
    tempConfig:{
        parentCon:"",//容器id
        fields:[
            [
                {
                    id:"name",name:"name",type:"select",data:{},selectedHandle:$.noop,width:100
                },
                {
                    id:"age",name:"age",type:"select",data:{},selectedHandle:$.noop,width:100
                }
            ],
                [
                {
                    id:"name",name:"mail",type:"select",data:{},selectedHandle:$.noop,width:100
                },
                {
                    id:"age",name:"id",type:"select",data:{},selectedHandle:$.noop,width:100
                }
                ]
        ]
        ,submitBtn:'<button type="button" id="subquery" class="btn btn-primary position_a">搜索</button>'
        ,submitHandle: $.noop//提交表达处理函数
        ,preFailFn:$.noop
        ,valityFormHandle:function(){return true;}

    },
    form:{}
    ,init:function(option){
        var self=this;
        self.options = $.extend({},self.tempConfig,option);

        ;
        $("#"+self.options.parentCon).append(initField( self.options));

        this.initEvent();
        return this;
    },
    initEvent:function(){
        var self=this;
        initClick({id:"subquery",preFn:self.options.valityFormHandle,sucFn:self.options.submitHandle,preFailFn:self.options.preFailFn,data:self.form});
    }
}

function initField(options){
    var result='<form  class="position_r">';
    var fields=options.fields;
  $(fields).each(function(index,item){
      var formrow=' <div class="form-row">';
      $(item).each(function(indexchr,itemchr){
          formrow=formrow+' <label class="display_ilb">'+itemchr.name+'</label>';
          itemchr.type=="select"&&(formrow=formrow+' <select class="display_ilb" style="width:'+itemchr.width+'px" id="ep1">'+initSelect(itemchr)+'</select>')
      })
      formrow=formrow+'</div>';
      result=result+formrow;
  })
    result=result+options.submitBtn+'</form>'
    options.form=$(result);
    return result;
}
function initSelect(itemchr){
    var items="";
    $.each(itemchr.data,function(name,value) {
        items=items+' <option value="'+value+'">'+name+'</option>';
    });
    return items;
}
function initajaxData(){

}
function initClick(option){
    $("#"+option.id).on("click",function(){alert(3);
        var t=true;
        option.preFn&&(t=option.preFn());
        t?option.sucFn(option.data):option.preFailFn();
    });
}

module.exports=formselect;







