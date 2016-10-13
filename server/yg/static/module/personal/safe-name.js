define("personal/safe-name", [
    "ui/validation/validation",
        "ui/modal/modal",
        "common/config"
    ], function (require, exports, module) {

    var modal = require('ui/modal/modal');
    require('ui/validation/validation');
    var config = require('common/config');

    var btnValid = $("#submitMsg");

    function initEvent(){

        btnValid.on('click', function () {
            if (btnValid.hasClass("btn_disable")) {
                return;
            } else {

                $("#nameMsgForm").submit();
            }

        });

        $("input#idNum").keypress(idNum)

    }

    //限定输入框字符
    function idNum(event) {
        var code = event.which || event.charCode || event.keyCode;
        if(code == 8 || (code >= 48 && code <= 57) || code == 120 || code == 88 ){
            return true;
        }
        return false;
    }

    function initValidator(){
        //验证
        $("#nameMsgForm").validate({

            submitHandler: function () {
                var data = this.getFormData();
                doSubmit(data);
                return false;
            },
            errorHandler: function (errs) {
                btnValid["addClass"]("btn_disable");
            },
            passedHandler: function () {
                btnValid["removeClass"]("btn_disable");
            },
            selectById:true,
            lazyValidate:true,
            fields: {

                name: {
                    required: true,
                    pattern:config.formPatterns.fullName,
                    output: "#nameTip"
                },
                idNum: {
                    required: true,
                    pattern:config.formPatterns.idCode,
                    output: "#idNumTip"
                }


            },
            errorMessage: {

                name: {
                    required: "<i class='icon_tips' ></i>请输入姓名",
                    pattern: "<i class='icon_tips' ></i>请输入姓名"
                },
                idNum: {
                    required: "<i class='icon_tips' ></i>请输入身份证号",
                    pattern: "<i class='icon_tips' ></i>身份证号不正确"
                }


            }

        }, function (validator) {
            var isValid = validator.isValid;
            btnValid[isValid ? "removeClass" : "addClass"]("btn_disable");
        });
    }

    //提交
    function doSubmit(data){
        $.ajax({
            type: "post",
            dataType: "json",
            url: '/u/safeName',
            showLoading:true,
            data: $("#nameMsgForm").data('validator').getFormData(),
            success: function (res) {
                var referer = $.utils.getUrlParam('referer');
                location.href = "/user/safe-nameSuccess"+(referer ? ("?referer="+referer) : '');
            },
            exception:function(){

                $("#name").val("");
                $("#idNum").val("");
            }
        });
    }


    (function(){

        initEvent();

        initValidator();
    })();


    exports.run = function () {


    }

});

