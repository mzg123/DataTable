define("personal/creditors-cancel-msg", [], function (require, exports, module) {

        //产品详情依赖的模块'


        exports.run = function () {
            $("#btnOk").on("click",function(){

                $("#productMsgForm").submit();
            });




        };




        exports.run();


    }

)
;

