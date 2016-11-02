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
        { money: {
                validRule:[
                    { required: true},
                    {maxValue: 20000000}
                ],
            errorMsg:[
                {   required: "<i class='icon_tips' ></i>投资金额为500的整数倍且不能为空"},
                {  maxValue: "<i class='icon_tips' ></i>请输入有效金额不能大于"+  $.numberFormat(20000000)}
            ],
                output: "#moneyTip",
                validator : function(){
              }
            }
        }
],
    errorMessage: {
        money: {
            required: "<i class='icon_tips' ></i>投资金额为500的整数倍且不能为空",
            maxValue: "<i class='icon_tips' ></i>请输入有效金额不能大于"+  $.numberFormat(20000000)
            //pattern: "<i class='icon_tips' ></i>请输入有效金额"
        }
    }
}

var FormValidation={
    supportedValidateTypes:['required','minLength','maxLength','maxValue','minValue',"minChecked","maxChecked",'pattern']
    ,valid:function(option){

    }
    ,focus:function(){

    }
    ,blur:function(){

    }
}

module.exports=FormValidation;