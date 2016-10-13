define("about/about", function (require, exports, module) {

    //余额显示和不显示切换
    $("#moneyValue").on("click",function(){
        $(this).toggleClass("icon-eye-gray");
        $(this).siblings("span").children().children("cite").toggle(function(){
            $(this).next("cite").toggleClass("hide");
        });


    });

    exports.run = function () {


    }

});

