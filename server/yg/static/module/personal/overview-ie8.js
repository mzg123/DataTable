define("personal/overview-ie8",
    [
        "personal/personal",
        'lib/jqplot/jquery.jqplot.min',
        'lib/jqplot/jqplot.donutRenderer',
        //'lib/jqplot/jqplot.cursor',
        'lib/jqplot/jqplot.highlighter',
        'lib/excanvas',
        'ui/tabs/tabs'
    ],
function (require, exports, module) {
    require('personal/personal').run();
    require('lib/excanvas');
    var Tabs = require('ui/tabs/tabs');
    //var Chart = require('lib/Chart.min');
   //msg tip
    var rate = 1000;
    var msg = $("#msgHover dd");
    msg.hover(function(){
        $(this).children(".hover").show();
        msg.css("zIndex","1");
        $(this).css("zIndex","2");
    },function(){
        $(this).children(".hover").hide();
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

    function tooltipContentEditor(str, seriesIndex, pointIndex, plot) {
        // 显示series_label, x-axis_tick, y-axis 数据
        //return plot.series[seriesIndex]["label"] + ", " + plot.data[seriesIndex][pointIndex];
        //console.log(str,seriesIndex,pointIndex,plot.data[seriesIndex][pointIndex]);
        var point = plot.data[seriesIndex][pointIndex];
        return '<span style="color:white;font-size: 14px;z-index: 9999;background-color: #999;padding:2px 4px;position: absolute;">'+$.numberFormat(point[1],2)+'元</span>';

    }

    function initChart(){

        $(".process_content").each(function(i,v){

            var cnt = $(v),
                chartDom = cnt.find('.personal_chart div').css({
                    width:350
                });

                var data = [];
                cnt.find('.list:gt(0)').each(function(ii,vv){
                    var item = $(vv),sps = item.find('span');
                    var v1 = sps[0].innerText.replace(/:|：/g,'');
                    var v2 = parseFloat(sps[1].innerText.replace(/,/g,''));

                    var obj = [
                            "&nbsp;"+v1,
                            v2
                        ];
                    data.push(obj);
                })
            if(data[0][1]==0&&data[1][1]==0)
                data[1][1]=data[0][1]=0.001;
            if(data[0][1]/data[1][1] >= rate){
                data[1][1] = data[0][1]/rate;
            }else if(data[0][1]/data[1][1] <= 1/rate){
                data[0][1] = data[1][1]/rate;
            }

            $.jqplot(chartDom.attr('id'), [data], {
                seriesColors:["#f8585b","#4fc1e9"],
                seriesDefaults: {
                    // make this a donut chart.
                    renderer:$.jqplot.DonutRenderer,
                    rendererOptions:{
                        sliceMargin: 0,
                        startAngle: -90,
                        showDataLabels: false,

                        totalLabel: false
                    },
                    shadow: false
                },
                grid:{
                    shadow:false,
                    background:'white',
                    borderWidth:0
                },
                fontSize:14,
                legend:{
                    show:true,
                    location: 'nw',
                    border:"none",
                    fontSize:'12px'
                },
                highlighter: {
                    show: true,
                    useAxesFormatters:false,
                    tooltipAxes: 'y',
                    sizeAdjust: 5,
                    lineWidthAdjust:1,
                    tooltipContentEditor:tooltipContentEditor,
                    tooltipLocation: 'se',
                    tooltipOffset: 20,
                    fadeTooltip: false,
                    showTooltip: true,
                    tooltipFadeSpeed: "slow",
                    showMarker:false,
                    bringSeriesToFront:false
                }
            });
        })

    }

    initChart();
    initTab();



    exports.run = function () {


    }

});

