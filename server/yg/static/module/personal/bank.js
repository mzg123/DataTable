define("personal/bank", ["ui/modal/modal","common/config", "personal/personal"], function (require, exports, module) {
    require('personal/personal').run();
    var modal = require('ui/modal/modal');
    var config = require('common/config');
    function initEvent() {
        //$(".personal_content").on('click', submit);
        $("#unbindcard a").on('click', submit);


    }

    function unbingcard(bankname,bankaccout,pw){

        $.ajax({
            url:config.api.unbindcard_model,
            type:'post',
            dataType:"json",
            async:false,
            data:{
                bankcardNum:bankaccout,
                bankpw:pw
            },
            success:function(data){
                 if(data.data.success){
                    modal.hide();
                    location.reload();
                }
                else{
                    modal.alert(data.data.fail);
                }
                //$("#unbinderror").show();
            },
            exception:function(err){
                modal.alert('解除绑定银行卡失败');
                console.log(err);
                return false;
            }
        })
    }
    function showForcePay(){
        var content;
        //  alert(__globalData.userState);
        switch (__globalData.userState){
            case 1:
                content = $("#setPassword").html();
                break;
            case 2:
                content = $("#authentication").html();
                break;
            case 3:
                content = $("#needBindCard").html();
                break;
            case 30:
                content = $("#needWaitforBinding").html();
                break;
            case 32:
                content = $("#needRebindCard").html();
                break;
            case 4:
                content = $("#resetPassword").html();
                break;
            case 5:
                content = $("#lockSetPassword").html();
                break;
        }
        modal.show({
            title: "提示",
            content: $("#setPassword").html(),
            size: {width: 650, height: 200},
            showFoot: false,
            showClose: true,
            buttons: [
                {
                    name: "关闭"
                }
            ]

        });
        $.utils.mask(".personal_content");
    }

    function submit(){

       if(__globalData.userState==1)
           showForcePay();
        else{
           $.ajax({
               url:config.api.unbindcard,
               type:'post',
               dataType:"json",
               async:true,
               data:{
                   name:"0"
               },
               success:function(data){
                   var bankname,bankaccout;

                   if(data.data.userBankcardDto){
                       modal.show({
                           title: "解除绑定银行卡",
                           content: function () {
                               var templateStr = $("#unbingcardmodel").html();
                               //var money = $("#bankMoney").val();
                               bankaccout=data.data.userBankcardDto.bankCardId;
                               bankname = data.data.userBankcardDto.bankName;
                               return $.MT('bankContent', templateStr, {
                                   bankname:bankname,// money,//金额
                                   bankaccout: bankaccout.substring(0,6)+"********"+bankaccout.substring(bankaccout.length-4)//$("#chooseOtherBank").children().children().attr("bank-name"),//银行名称
                               });
                           },
                           size: {width: 645, height: 400},
                           showFoot: true,
                           showClose: true,
                           buttons: [
                               {
                                   name: "确认",
                                   clicked: function () {
                                       unbingcard(bankname,bankaccout,$("#bankpw input").val());
                                       return false;
                                   }
                               },
                               {
                                   name: "取消",
                                   'btnClass':"btn_cancel_gray"
                               }
                           ]
                       });

                   }
                   else{
                       $("#unbinderror").show();
                   }

               },
               exception:function(err){
                   modal.alert('解除绑定银行卡失败');
                   console.log(err);
                   return false;
               }
           })
       }

    }

    exports.run = function () {

        initEvent();

        //$.ajax({
        //    url: "/u/getUserBank",
        //    type: "post",
        //    success: function (res) {
        //
        //        var data = res.data;
        //        if (!data||data.status == 2) {
        //            $("#empty").show();
        //        }
        //        //if(){
        //        //    $("#recard").show();
        //        //
        //        //}
        //        var str = data.bankCardId;
        //        //var secret = str.substr(0,str.length-4);
        //        //str = secret.replace(/(\d)/g,"*")+str.substr(str.length-4,4);
        //        str = "**** **** **** "+str.substr(str.length-4);
        //
        //        var _html = '<li> ' +
        //            '<div class="detail  '+ getBankClass() + '"> ' +
        //            '<div class="clearfix">' +
        //            '<img alt="" src="' + getBankUrl(data.bankName, data.rsVersion) + '" />' +
        //            '<h3>' + data.bankName + '</h3>' +
        //            '<span class="card">借记卡</span> ' +
        //            '</div>' +
        //            '<p>' + str + '</p> ' +
        //            '<div class="bt">' +
        //
        //            '</div> ' +
        //            '<div class="hover">' +
        //            (!data.status ? '认证中' : '已绑定') +
        //            '</div> ';
        //        _html += '</div></li>';
        //        $("#getBankMsg").html(_html);
        //
        //    }
        //})

    };

    //exports.run();


});

