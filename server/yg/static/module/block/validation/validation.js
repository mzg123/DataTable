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
                         minLength: 20000000,
                        maxValue: 20000000
                        },
                    errorMsg:{
                       required: "<i class='icon_tips' ></i>投资金额为500的整数倍且不能为空",
                        minLength: "<i class='icon_tips' ></i>请输入有效金额不能小于20000000",
                      maxValue: "<i class='icon_tips' ></i>请输入有效金额不能大于"
                    },
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

        valid(this.focusField);
    }
    ,change:function(){

    }
}
function valid(focusField){
    var focusName=focusField.name;
    var val=$(focusField).val();
    var validitem=$(focusField).data(focusName);
    isRequired(validitem.validRule.required,val,validitem.output,validitem.errorMsg.required)? (
        isMinValue(validitem.validRule.minValue,val,validitem.output,validitem.errorMsg.minValue)?(
            isMaxValue(validitem.validRule.maxValue,val,validitem.output,validitem.errorMsg.maxValue)?(
                isMinLength(validitem.validRule.minLength,val,validitem.output,validitem.errorMsg.minLength)?(
                    isMaxLength(validitem.validRule.maxLength,val,validitem.output,validitem.errorMsg.maxLength)
                ):""
            ):""
          ):""
        ):"";
}

//true 表示通过验证
function isRequired(flag,value,output,errorMsg){
    var t=true;
    if(!flag)return true;
    value.trim()||(t=false);
    showError(output,t,errorMsg);
    return t;
}
//true 表示通过验证
function isMinValue(flag,value,output,errorMsg){
     var t=true;
    if(!flag)return true;
    t=flag<=value;
    showError(output,t,errorMsg);
    return t;
}

//true 表示通过验证
function isMaxValue(flag,value,output,errorMsg){
    var t=true;
    if(!flag)return true;
    t=flag>=value;
    showError(output,t,errorMsg);
    return t;
}
//true 表示通过验证
function isMinLength(flag,value,output,errorMsg){
    var t=true;
    if(!flag)return true;
    t=flag<=value.length;
    showError(output,t,errorMsg);
    return t;
}
//true 表示通过验证
function isMaxLength(flag,value,output,errorMsg){
    var t=true;
    if(!flag)return true;
    t=flag>=value.length;
    showError(output,t,errorMsg);
    return t;
}
//true 表示通过验证
function isPattern(flag,value,output,errorMsg){
    var t=true;
    if(!flag)return true;
    t= flag.test(value) || ( new RegExp(flag)).test(value);
    showError(output,t,errorMsg);
    return t;
}
function showError(output,flag,errorMsg){
    flag?$("#"+output).text(""):$("#"+output).text(errorMsg);
    flag?$("#"+output)["addClass"]("hidden"):$("#"+output)["removeClass"]("hidden");
}
module.exports=FormValidation;