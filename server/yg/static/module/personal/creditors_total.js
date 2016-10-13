define("personal/creditors_total", ['common/config', 'personal/personal',"lib/echarts"], function (require, exports, module) {

    var config = require('common/config');
    require('personal/personal').run();

    function init(){
        var myChart = echarts.init($('#main')[0]);
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: "{c}元"
            },
            legend: {
                orient: 'vertical',
                x: 'right',
                y:"top",
                data:['散标','优计划']
            },
            color:["#f8585b","#4fc1e9"],
            series: [
                {
                    name:'统计',
                    type:'pie',
                    radius: ['55%', '85%'],
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
                    data:[
                        {value:'3350.00', name:'散标'},
                        {value:'3100.00', name:'优计划'},
                    ]
                }
            ]
        };
        myChart.setOption(option);


    }

    init();

    exports.run = function () {



    }


});

