define("personal/overview",["personal/personal",'lib/echarts.common.min','ui/tabs/tabs'], function (require, exports, module) {
    require('personal/personal').run();
    var Tabs = require('ui/tabs/tabs');
   //msg tip
    var msg = $("#msgHover dd");
    var hideTimeout,toHide;
    msg.hover(function(){
        if(toHide){
            toHide.hide();
            clearTimeout(hideTimeout);
            toHide = null;
        }
        $(this).children(".hover").show();
        msg.css("zIndex","1");
        $(this).css("zIndex","2");
    },function(){
        toHide = $(this).children(".hover");
        hideTimeout = setTimeout(function(){
            toHide.hide();
        },300);
        //$(this).children(".hover").hide();
    });

    //环形进度条
    $('.circle').each(function(index, el) {
        var num = $(this).find('span').text() * 3.6;
        if (num<=180) {
            $(this).find('.right').css('transform', "rotate(" + num + "deg)");
        } else {
            $(this).find('.right').css('transform', "rotate(180deg)");
            $(this).find('.left').css('transform', "rotate(" + (num - 180) + "deg)");
        }
    });

    //tab
    function initTab(){

        new Tabs({
            tabsContainerId: "process_tabs",
            tabClass: "process_tab",
            selectedClass: "hover",
            contentContainerId: "process_content_container",
            contentClass: "process_content",
            eventType: 'click'
        });

    }

    function _getSpanValue(t,v){
        var temp="";
        $(".process_content").find("span").each(function(i,v){

            if( $(v).text().indexOf(t))
                temp= $(v).next().text();
        });
        return temp;
    }
    function initChart(){

        $(".process_content").each(function(i,v){

            var cnt = $(v),
                chartDom = cnt.find('.personal_chart div'),
                mChart = echarts.init(chartDom[0]);
            var chartOption = {
                tooltip: {
                    trigger: 'item',
                    //formatter: "{c}元",
                    formatter: function (params,ticket,callback) {
                        //_getSpanValue(params.name,params.value);
                        var res = '';
                        res += $.numberFormat(params.value) + '元<br/>';
                        //res +=  _getSpanValue(params.name,params.value)+ '<br/>';
                        return res;
                    }
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    y:"top",
                    //data:['账户余额','债权资产']
                    data:null
                },
                color:["#f8585b","#4fc1e9"],
                series: [
                    {
                        name:'统计',
                        type:'pie',
                        radius: ['45%', '75%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '16',
                                    fontWeight: 'normal'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:null/*[
                            {value:'3350.00', name:'账户余额'},
                            {value:'3100.00', name:'债权资产'},
                        ]*/
                    }
                ]
            };
            var data = [],ld = [];

            cnt.find('.list:gt(0)').each(function(ii,vv){

                var item = $(vv),sps = item.find('span'),
                    obj = {
                        //name:sps[0].innerText.replace(/:|：/g,''),
                        //value:parseFloat(sps[1].innerText.replace(/,/g,''))
                        name:sps[0].innerHTML.replace(/:|：/g,''),
                        value:parseFloat(sps[1].innerHTML.replace(/,/g,''))
                    };
                data.push(obj);
                ld.push(obj.name);
            });


            chartOption.series[0].data = data;
            chartOption.legend.data = ld;

            mChart.setOption(chartOption,true);
        })

    }

    //function init(){
    //    var myChart = echarts.init($('#personalChart')[0]);
    //    var option = {
    //        tooltip: {
    //            trigger: 'item',
    //            formatter: "{c}元"
    //        },
    //        legend: {
    //            orient: 'vertical',
    //            x: 'left',
    //            y:"top",
    //            data:['账户余额','债权资产']
    //        },
    //        color:["#f8585b","#4fc1e9"],
    //        series: [
    //            {
    //                name:'统计',
    //                type:'pie',
    //                radius: ['45%', '75%'],
    //                avoidLabelOverlap: false,
    //                label: {
    //                    normal: {
    //                        show: false,
    //                        position: 'center'
    //                    },
    //                    emphasis: {
    //                        show: true,
    //                        textStyle: {
    //                            fontSize: '16',
    //                            fontWeight: 'normal'
    //                        }
    //                    }
    //                },
    //                labelLine: {
    //                    normal: {
    //                        show: false
    //                    }
    //                },
    //                data:[
    //                    {value:'3350.00', name:'账户余额'},
    //                    {value:'3100.00', name:'债权资产'},
    //                ]
    //            }
    //        ]
    //    };
    //    myChart.setOption(option);
    //
    //    var myChart2 = echarts.init($('#personalChart2')[0]);
    //    var option2 = {
    //        tooltip: {
    //            trigger: 'item',
    //            formatter: "{c}元"
    //        },
    //        legend: {
    //            orient: 'vertical',
    //            x: 'left',
    //            y:"top",
    //            data:['待收收益','待收本金']
    //        },
    //        color:["#f8585b","#4fc1e9"],
    //        series: [
    //            {
    //                name:'统计',
    //                type:'pie',
    //                radius: ['45%', '75%'],
    //                avoidLabelOverlap: false,
    //                label: {
    //                    normal: {
    //                        show: false,
    //                        position: 'center'
    //                    },
    //                    emphasis: {
    //                        show: true,
    //                        textStyle: {
    //                            fontSize: '16',
    //                            fontWeight: 'normal'
    //                        }
    //                    }
    //                },
    //                labelLine: {
    //                    normal: {
    //                        show: false
    //                    }
    //                },
    //                data:[
    //                    {value:'3350.00', name:'待收收益'},
    //                    {value:'3100.00', name:'待收本金'},
    //                ]
    //            }
    //        ]
    //    };
    //    myChart2.setOption(option2);
    //
    //    var myChart3 = echarts.init($('#personalChart3')[0]);
    //    var option3 = {
    //        tooltip: {
    //            trigger: 'item',
    //            formatter: "{c}元"
    //        },
    //        legend: {
    //            orient: 'vertical',
    //            x: 'left',
    //            y:"top",
    //            data:['可用余额','冻结金额']
    //        },
    //        color:["#f8585b","#4fc1e9"],
    //        series: [
    //            {
    //                name:'统计',
    //                type:'pie',
    //                radius: ['45%', '75%'],
    //                avoidLabelOverlap: false,
    //                label: {
    //                    normal: {
    //                        show: false,
    //                        position: 'center'
    //                    },
    //                    emphasis: {
    //                        show: true,
    //                        textStyle: {
    //                            fontSize: '16',
    //                            fontWeight: 'normal'
    //                        }
    //                    }
    //                },
    //                labelLine: {
    //                    normal: {
    //                        show: false
    //                    }
    //                },
    //                data:[
    //                    {value:'3350.00', name:'可用余额'},
    //                    {value:'3100.00', name:'冻结金额'},
    //                ]
    //            }
    //        ]
    //    };
    //    myChart3.setOption(option3);
    //
    //
    //}


    //init();
    initChart();
    initTab();



    exports.run = function () {


    }

});

