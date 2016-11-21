//var echarts = require('echarts');
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
require('echarts/lib/chart/pie');
require('echarts/lib/chart/line');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');


var mychart={


   createEcharts:function(data){
       var self=this;
       $(data.echartDatas).each(function(index,item){
           var coption="";
           item.type=="bar"&&(coption=self.setSingleBarLineOption(item));
           item.type=="pie"&&(coption=self.setPieOption(item));
           item.type=="line"&&(coption=self.setSingleBarLineOption(item));
           var myChart = echarts.init($('#'+data.conIds[index])[0]).setOption(coption);
       })
    }

    ,setPieOption:function(op){
        var xData=[];
        $(op.data).each(function(index,item){
            xData.push(item.name);
        });
        var r={
            title: {
                text:op.title
                ,left:'center'
            },
            tooltip: {},
            legend:{
                left:'right',
                top:'center',
                orient:'vertical',
                data: xData
            },
            grid: {
                left: '3%',
                right: op.gridRight,
                bottom: '3%',
                containLabel: true
            },

            series: [{
                name:op.legendName[0],
                type: op.type,//bar pie line
                radius : '55%',
                center: ['50%', '60%'],
                data: op.data
            }
            ]
        }

        return r;
    }

    ,setSingleBarLineOption:function(op){
        var xData=[];
        var seriesData=[];
        var series=[];
        var legnedData=[];

        $(op.data).each(function(index,item){
            xData.push(item.name);
            seriesData.push(item.value);
        });
        $(op.legendName).each(function(index,item){
            legnedData.push({
                name:item,
                // 强制设置图形为圆。
                icon: 'roundRect',
                // 设置文本为红色
                textStyle: {
                    color: 'red'
                }
            });
        });
        if($.isArray(op.data[0].value)){
            var mseries= new Array(); ;
            var c=op.data[0].value.length;
            var cc=op.data.length;
            for(var i=0;i<c;i++){
                mseries[i]=new Array();
            }
            $(op.data).each(function(index,item){
                for(var i=0;i<c;i++){
                    mseries[i].push(item.value[i]);
                }
            });
            for(var i=0;i<c;i++){
                series.push({
                    name:op.legendName[i],
                    type: op.type,//bar pie line
                    barGap:"0",
                    label: {
                        normal: {
                            show: true
                            , position: 'top'
                        }
                    },
                    data: mseries[i]
                });
            }

        }
        else{
            $(op.legendName).each(function(index,item){
                series.push({
                    name:op.legendName[index],
                    type: op.type,//bar pie line
                    barWidth:op.barWidth,
                    label: {
                        normal: {
                            show: true
                            , position: 'top'
                        }
                    },
                    data: seriesData
                });
            });
        }

        var r={
            title: {
                text:op.title
                    ,left:'center'
            },
            tooltip: {},
            legend:{
                left:'right',
                    top:'center'

                    //data: [{
                    //            name:op.legendName[0],
                    //            // 强制设置图形为圆。
                    //            icon: 'roundRect',
                    //            // 设置文本为红色
                    //            textStyle: {
                    //                color: 'red'
                    //            }
                    //       }]
            },
            grid: {
                left: '3%',
                    right: op.gridRight,
                    bottom: op.gridBottom,
                    containLabel: true
            },
            xAxis: {
                data: xData,
                axisLabel:{
                    rotate:op.axisLabelRotate
                }
            },
            yAxis: {}
           //,series: [{
           //     name:op.legendName,
           //     type: op.type,//bar pie line
           //     barWidth:op.barWidth,
           //     label: {
           //         normal: {
           //             show: true
           //             , position: 'top'
           //         }
           //     },
           //     data: seriesData
           //}
           //]
        }
        r.series=series;
        r.legend.data=legnedData;
        op.legendOrient&&(r.legend.orient=op.legendOrient);
       return r;
    }
    ,createBars:function(data){

    }
    ,createPies:function(data){

    }
    ,createLines:function(data){

    }
}

module.exports=mychart;
