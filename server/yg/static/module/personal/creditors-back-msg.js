define("personal/creditors-back-msg", ["ui/modal/modal", 'common/config', 'ui/select/select', "ui/validation/validation"], function (require, exports, module) {

        //产品详情依赖的模块'
        var modal = require('ui/modal/modal');
        var config = require('common/config');
        require('ui/select/select');
        require('ui/validation/validation');

        var couponSelectCreated = false;

        //出售协议
        $("#viewTemplate").on("click", function () {
            modal.show({
                title:  $("#viewProtocol").attr("title"),
                content: $("#viewProtocol").html(),
                size: {width: 750, height: 600},
                showFoot: false,
                showClose: true,
                buttons: [
                    {
                        name: "关闭"
                    }
                ]

            });
        });
        $("#viewTemplate2").on("click", function () {
            modal.show({
                title: $("#viewProtocol2").attr("title"),
                content: $("#viewProtocol2").html(),
                size: {width: 750, height: 600},
                showFoot: false,
                showClose: true,
                buttons: [
                    {
                        name: "关闭"
                    }
                ]

            });
        });


        var btnValid = $("#btnOk");

        //确认出借

        btnValid.on("click", function () {
            if ($(this).hasClass("btn_disable")){
                return;
            }else{
                var _val = parseFloat($("#wait4collectPrincipal").text().replace(/,/g,''));
                var amount2 = parseFloat($("#amount2").val());
                if(amount2<_val){
                    modal.show({
                        title: "重要提示",
                        content: $("#modalView").html(),
                        size: {width: 650, height: 200},
                        showFoot: true,
                        showClose: true,
                        buttons: [
                            {
                                name: "确认",
                                clicked: function () {
                                    $("#productMsgForm").submit();

                                }
                            },
                            {
                                name: "取消"

                            }
                        ]

                    });

                }else{
                    $("#productMsgForm").submit();
                    return false;


                }

                //$("#productMsgForm").submit();

            }


        });
        function initEvent() {

            $("#amount2").on('keyup', function () {
                var amount = $("#amount"),
                    price = $("#amount2"),
                    transferAmount = amount.val(),
                    transferPrice = price.val();
                if (price.data('valid')) {
                    calculate(transferAmount, transferPrice);
                }
            }.delay(0))

        }


        function createCouponSelect() {

            if (couponSelectCreated) return;
            couponSelectCreated = true;

            //选择优惠卷
            $("#productMsgForm #chooseMyCoupon").ygSelect({
                width: 300,
                height: 30
                //dataSource: function () {
                //    //url:config.api.getUserMessage,
                //    //    type:'post',
                //    //    data:function(tmp){
                //    //    return {
                //    //
                //    //    }
                //    //},
                //    //beforeApply:function(res){
                //    //
                //    //    res = res.data;
                //
                //    //    return {
                //    //
                //    //    }
                //    //},
                //
                //    return [
                //        {
                //            display: '请选择优惠卷 ',
                //            value: ''
                //        },
                //        {
                //            display: '<div class="couponMy"> <span class="gray">服务费券10元/失效日期2016/03/03</span></div> ',
                //            value: '本次可抵扣服务费10元'
                //        },
                //        {
                //            display: '<div class="couponMy"> <span class="gray">红包50元</span> </div> ',
                //            value: '本次可抵扣50元'
                //
                //        },
                //        {
                //            display: '<div class="couponMy" > <span class="gray">加息劵1%/失效日期2016/02/08</span></div> ',
                //            value: '本次可使用加息劵1%'
                //
                //        }
                //    ]
                //
                //
                //}


            }).on('change', function () {
                $("#couponResult").text($(this).val());
            });
        }


        var userCoupon = $("#userCoupon");

        userCoupon.on("click", function () {
            var choose = $(this).attr("checked");
            if (choose) {
                createCouponSelect();
                $(".chooseCoupon").show();

            } else {
                $(".chooseCoupon").hide();
                $("#couponResult").text("没有使用优惠卷");
            }

        });

        function calculate(amount, price) {

            $.ajax({
                url: "/u/calTransferFee",
                dataType: "json",
                type: 'post',
                data: {
                    creditValue: amount,
                    transferPrice: price,
                    lastDueDate: $("#lastDueDate").val(),
                },
                success: function (res) {
                    var data = res.data;

                    $("#calDiscount").text(data.calDiscount + "%");
                    $("#calAssigneeConsideration").text(data.calAssigneeConsideration + "%");
                    $("#calTransferInfoFee").text($.numberFormat(data.calTransferInfoFee / 100, 2) + "元");
                    $("#calTransferManagementFee").text($.numberFormat(data.calTransferManagementFee / 100, 2) + "元");
                }
            })

        }


        exports.run = function () {

            initEvent();
        };

        exports.run();
        function isOk() {
            var checked = userCoupon.attr('checked');
            if (checked && !$("#chooseMyCoupon").val()) {
                $("#couponResult").html("请选择优惠卷");
                return false;
            }
            return true;
        }

        function doSubmit(data) {

            $.extend(data, {
                lastDueDate: $("#lastDueDate").val() || "",
                creditId: $("#creditId").val() || "",
                lendingId: $("#lendingId").val() || "",
                creditValue: $("#amount").val() || "",
                couponId: $("#chooseMyCoupon").val() || ""
            });

            $.ajax({
                url: "/u/subTransferFee",
                dataType: "json",
                type: 'post',
                data: data,
                showLoading: true,
                success: function (res) {

                }
            })

        }

        function submitInfo(data) {

            //var wait4collectPrincipal = parseFloat($("#wait4collectPrincipal").text());
            //var transferPrice = parseFloat($("#amount2").val());
            //if (transferPrice < wait4collectPrincipal) {
            //
            //    modal.confirm('提示', '您输入的转出价格已低于待收本金，是否确定发布转出', {
            //        ok: {
            //            clicked: function () {
            //                doSubmit(data);
            //            }
            //        }
            //    })
            //
            //}
            //else {
                doSubmit(data);
            //}
        }

        //输入框非负数
        function onlyNumber(event) {
            var code = event.which || event.charCode || event.keyCode;
            if (code == 8 || (code >= 48 && code <= 57)) {
                return true;
            }
            return false;
        }


        $("#amount2").keypress(onlyNumber);

        var availableBalances = parseFloat($("#totalNum").text().replace(/,/g, '')) || 0;

        var minValue = 100;
        $("#productMsgForm").validate({

                submitHandler: function () {

                    var data = this.getFormData();
                    submitInfo(data);
                    return false;
                },
                errorHandler: function (errs) {
                    btnValid["addClass"]("btn_disable");

                },
                passedHandler: function () {
                    btnValid["removeClass"]("btn_disable");
                },
                selectById: true,
                fields: {
                    amount2: {
                        required: true,
                        output: "#amountTip2",
                        pattern: /^[1-9]\d*00$/,
                        minValue: minValue,
                        validator: function () {
                            var price = parseFloat($("#amount").val()/100);
                            var val = $(this).val();

                            if (!val || !/^\d+$/.test(val)) {
                                return "<i class='icon_tips' ></i>请输入转让价格"
                            }
                            else if (/^\d+$/.test(val) && !/^[1-9]\d*00$/.test(val)) {
                                return "<i class='icon_tips' ></i>转让价格，必须是100的整数倍";
                            }
                            else {
                                val = parseFloat(val);
                                if (val < minValue) {
                                    return "<i class='icon_tips' ></i>起转让价格为" + minValue + "元"
                                }
                                else {
                                    if (val > price) {
                                        return "<i class='icon_tips' ></i>转让价格不能大于转让金额";
                                    }
                                }

                            }
                        }

                        //maxValue: price
                    },
                    agree: {
                        required: true,
                        //minChecked: 1,
                        //output: "#agreeTip"
                    }

                },
                errorMessage: {
                    amount2: {
                        required: "<i class='icon_tips' ></i>请填写转让价格",
                        pattern: "<i class='icon_tips' ></i>转让价格，必须是100的整数倍",
                        minValue: "<i class='icon_tips' ></i>转让价格，必须是100的整数倍",

                        //maxValue: "<i class='icon_tips' ></i>转让价格不能大于转让金额"
                    }


                    //agree: {
                    //    minChecked: "<i class='icon_tips' ></i>请点击同意确认协议",
                    //    required: "<i class='icon_tips' ></i>请点击同意确认协议"
                    //}
                }
            }, function (validator) {
                var isValid = validator.isValid;
                btnValid[isValid ? "removeClass" : "addClass"]("btn_disable");
            }
        )
        ;

        exports.run();


    }
)
;

