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
                   , validRule:{
                         required: true,
                        maxValue: 20000000
                        },
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
    ,init:function(option){
     var self=this;
        this.option=option;
          $(option.fields).each(function(index,item){

              $("#"+option.formId+" input[name='"+item.name+"']").data(item.name,item);
              $("#"+option.formId+" input[name='"+item.name+"']").on("blur",self.blur).on("focus",self.focus);
          });
    }
    ,focus:function(evt){
        this.focusField=evt.target;
    }
    ,blur:function(){
        var focusName=this.focusField.name;
        var validitem=$(this.focusField).data(focusName);
        //validRule:[
        //    { required: true},
        //    {maxValue: 20000000}
        //],
        valid(this.focusField);
    }
    ,change:function(){

    }

}
function valid(focusField){
    var focusName=focusField.name;
    var val=$(focusField).val();
    var validitem=$(focusField).data(focusName);
    isRequired(validitem.validRule.required,val,validitem.output);

}
function isRequired(flag,value,output){
    var t=true;
    if(!flag)return true;
    value.trim()||(t=false);
    showError(output,t);
    return t;
}

function showError(output,flag){
    
    flag?$("#"+output)["addClass"]("hidden"):$("#"+output)["removeClass"]("hidden");
}
module.exports=FormValidation;