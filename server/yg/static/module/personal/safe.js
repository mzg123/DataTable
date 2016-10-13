define("personal/safe", ["ui/modal/modal", 'personal/personal'], function (require, exports, module) {
    var modal = require('ui/modal/modal');
    require('personal/personal').run();

    exports.run = function () {
        //更换银行卡
        $("#changeBank").on("click", function () {
            modal.show({
                title: "提示",
                content: $("#changeBankTip").html(),
                size: {width: 650, height: 200},
                showFoot: true,
                showClose: true,
                buttons: [
                    {
                        name: "确认",
                        clicked: function () {
                            window.location.href = "account-safe-changecard.html";

                        }
                    },
                    {
                        name: "取消"

                    }

                ]
            })

        });

        $("#getBackPayPwd").on('click',function(){

            if(typeof __globalData != "undefined"  &&  !__globalData.authed){

                modal.show({
                title: "提示",
                content: $("#authTip").html(),
                size: {width: 650, height: 200},
                showFoot: true,
                showClose: true,
                buttons: [
                    {
                        name: "取消"
                    }

                ]
            })

            }

        })


    }


});

