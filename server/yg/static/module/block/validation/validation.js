/**
 * Created by Administrator on 2016/11/2.
 *
 */
var option={
    formId:"formId",
    submitHandler: function () {},
    errorHandler: function (errs) {},
    passedHandler: function () {},
    fields: [
                {    name:"username"
                   , validRule:[
                        { required: true},
                        {maxValue: 20000000}
                    ],
                    errorMsg:[
                    {   required: "<i class='icon_tips' ></i>投资金额为500的整数倍且不能为空"},
                    {  maxValue: "<i class='icon_tips' ></i>请输入有效金额不能大于"}
                  ],
                    output: "usernameerror",
                    validator : function(){
                  }

            }
],
    errorMessage: {
        money: {
            required: "<i class='icon_tips' ></i>投资金额为500的整数倍且不能为空",
            maxValue: "<i class='icon_tips' ></i>请输入有效金额不能大于"
            //pattern: "<i class='icon_tips' ></i>请输入有效金额"
        }
    }
}

var FormValidation={

    focusField:null
    ,option:null
    ,supportedValidateTypes:['required','minLength','maxLength','maxValue','minValue',"minChecked","maxChecked",'pattern']
    ,valid:function(option){
     var self=this;
        this.option=option;
          $(option.fields).each(function(index,item){

              $("#"+option.formId+" input[name='"+item.name+"']").data(item.name,item);
              $("#"+option.formId+" input[name='"+item.name+"']").on("blur",self.blur).on("focus",self.focus);
              //alert( $("#"+option.formId+" input[name='"+item.name+"']").data("mzg"));
          });
    }
    ,focus:function(evt){
        this.focusField=evt.target;
    }
    ,blur:function(){
        console.log(this.focusField);
        var focusName=this.focusField.name;
        console.log($(this.focusField).data(focusName).output);
        //alert($("#"+$(this.focusField).data(focusName).output).html());
        $("#"+$(this.focusField).data(focusName).output)["removeClass"]("hidden");

    }
    ,change:function(){

    }
    ,isRequired:function(){

    }

}

function isRequired(flag,value){
    var t=true;
    if(!flag)return true;
    value.trim()||(t=false);
    return t;
}

module.exports=FormValidation;