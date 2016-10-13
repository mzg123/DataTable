define("personal/safe-risk", [
    "ui/validation/validation",
    "common/config"
], function (require, exports, module) {
    require('ui/validation/validation');
    var config = require('common/config');


    //提交问卷
    var btnValid = $("#btnAsk");
    btnValid.on('click', function () {
        if (btnValid.hasClass("btn_disable")) {
            return;
        } else {
            $("#safeRiskForm").submit();
        }

    });

    function submiRiskForm(data){
        $.ajax({
            type: "post",
            dataType: "json",
            url: '/u/riskEvaluate',
            data: data,
            showLoading:true,
            success: function (res) {
                var referer = $.utils.getUrlParam('referer');
                location.href = res.data +(referer ? ("?referer="+referer) : '');
            },
            exception: function () {

            }

        });
    }


    //验证
    $("#safeRiskForm").validate({

        submitHandler: function () {
            submiRiskForm(this.getFormData());
            return false;
        },
        errorHandler: function (errs) {
            btnValid["addClass"]("btn_disable");
        },
        passedHandler: function () {
            btnValid["removeClass"]("btn_disable");
        },
        //selectById:true,
        fields: {
            age: {
                required: true,
                output: "#ageTip"
            },
            year: {
                required: true,
                output: "#yearTip"
            },
            experience: {
                required: true,
                output: "#experienceTip"
            },
            important: {
                required: true,
                output: "#importantTip"
            },
            attitude: {
                required: true,
                output: "#attitudeTip"
            },
            how: {
                required: true,
                output: "#howTip"
            },
            money: {
                required: true,
                output: "#moneyTip"
            },
            objective: {
                required: true,
                output: "#objectiveTip"
            },
            choose: {
                required: true,
                output: "#chooseTip"
            },
            high: {
                required: true,
                output: "#highTip"
            },
            risk: {
                required: true,
                output: "#riskTip"
            },
            temptation: {
                required: true,
                output: "#temptationTip"
            }

        },
        errorMessage: {
            age: {
                required: "<i class='icon_tips' ></i>请选择一项"
            },
            year: {
                required: "<i class='icon_tips' ></i>请选择一项"
            },
            experience: {
                required: "<i class='icon_tips' ></i>请选择一项"
            },
            important: {
                required: "<i class='icon_tips' ></i>请选择一项"
            },
            attitude: {
                required: "<i class='icon_tips' ></i>请选择一项"
            },
            how: {
                required: "<i class='icon_tips' ></i>请选择一项"
            },
            money: {
                required: "<i class='icon_tips' ></i>请选择一项"
            },
            objective: {
                required: "<i class='icon_tips' ></i>请选择一项"
            },
            choose: {
                required: "<i class='icon_tips' ></i>请选择一项"
            },
            high: {
                required: "<i class='icon_tips' ></i>请选择一项"
            },
            risk: {
                required: "<i class='icon_tips' ></i>请选择一项"
            },
            temptation: {
                required: "<i class='icon_tips' ></i>请选择一项"
            }
        }

    }, function (validator) {
        var isValid = validator.isValid;
        btnValid[isValid ? "removeClass" : "addClass"]("btn_disable");
    });

    exports.run = function () {

    }

});

