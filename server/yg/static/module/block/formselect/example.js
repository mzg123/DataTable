
//require("../../../../common/css/base.css");
require("../js/base.js");
require("../css/home/home.css");
require("../block/formselect/formselect.css");
require("../block/table/table_1.css");
require("../css/base.css");

var  f=require("../block/formselect/formselect.js");
var t=require("../block/table/table_1.js");
var echarts = require('../block/echarts/echarts.js');


window.treasure={
    formselect:f,
    table_1:t
    ,echarts:echarts
}



var echartOption={
    conIds:[ "echart8","echart1","echart2","echart3","echart4","echart5","echart6","echart7"]
    ,echartDatas:[
        {   title:"2016年东城区成单数(人)",legendName:["1","2","3"],type:"bar",gridRight:'20%', barWidth: '30%',axisLabelRotate:90,gridBottom:'23%',legendOrient:'vertical',
            data:[
                {name:"1日",value:[20000,24000,19000]}
                ,{name:"第二季度",value:[24000,14000,39000]}
                ,{name:"第三季度",value:[10000,54000,11000]}
                ,{name:"第四季度",value:[30000,54000,19000]}
            ]
        }
        ,
        {   title:"2016年东城区成单数(人)",legendName:["西城区成"],type:"bar",gridRight:'20%', barWidth: '30%',axisLabelRotate:90,gridBottom:'23%',
            data:[
                {name:"第一季度",value:"20000"}
                ,{name:"第二季度",value:"24000"}
                ,{name:"第三季度",value:"25000"}
                ,{name:"第四季度",value:"22000"}
            ]
        }
        ,{     title:"2016年西城区成单数(人)",legendName:["西城区成"],type:"bar",gridRight:'20%', barWidth: '30%',
            data:[
                {name:"第一季度",value:"20000"}
                ,{name:"第二季度",value:"24000"}
                ,{name:"第三季度",value:"25000"}
                ,{name:"第四季度",value:"22000"}
            ]
        }
        ,{     title:"2016年西城区成单数(人)",legendName:["西城区成"],type:"bar",gridRight:'20%', barWidth: '30%',
            data:[
                {name:"第一季度",value:"20000"}
                ,{name:"第二季度",value:"24000"}
                ,{name:"第三季度",value:"25000"}
                ,{name:"第四季度",value:"22000"}
            ]
        }
        ,{     title:"2016年西城区成单数(人)",legendName:["西城区成"],type:"bar",gridRight:'20%', barWidth: '30%',
            data:[
                {name:"第一季度",value:"20000"}
                ,{name:"第二季度",value:"24000"}
                ,{name:"第三季度",value:"25000"}
                ,{name:"第四季度",value:"22000"}
            ]
        }
        ,{     title:"2016年西城区成单数(人)",legendName:["西城区成"],type:"bar",gridRight:'20%', barWidth: '30%',
            data:[
                {name:"第一季度",value:"20000"}
                ,{name:"第二季度",value:"24000"}
                ,{name:"第三季度",value:"25000"}
                ,{name:"第四季度",value:"22000"}
            ]
        }
        ,{     title:"2016年西城区成单数(人)",legendName:["西城区成"],type:"bar",gridRight:'20%', barWidth: '30%',
            data:[
                {name:"第一季度",value:"20000"}
                ,{name:"第二季度",value:"24000"}
                ,{name:"第三季度",value:"25000"}
                ,{name:"第四季度",value:"22000"}
            ]
        }
        ,{     title:"2016年西城区成单数(人)", legendName:["西城区成"],type:"bar",gridRight:'20%', barWidth: '30%',
            data:[
                {name:"第一季度",value:"20000"}
                ,{name:"第二季度",value:"24000"}
                ,{name:"第三季度",value:"25000"}
                ,{name:"第四季度",value:"22000"}
            ]
        }
    ]
};
echarts.createEcharts(echartOption);
var d={
    "data":[
        {"pm":"1","dq":"中区","dqjl":"xxx","cjds":"66665","cjje":"254564","xzkhs":"1245000","zcshze":"4511200","cbgm":"400000","yjgm":"10000","wcl":"23%"}
        ,{"pm":"2","dq":"东区","dqjl":"yyy","cjds":"66665","cjje":"254564","xzkhs":"1245000","zcshze":"4511200","cbgm":"400000","yjgm":"10000","wcl":"23%"}
        ,{"pm":"3","dq":"西区","dqjl":"zzz","cjds":"66665","cjje":"254564","xzkhs":"1245000","zcshze":"4511200","cbgm":"400000","yjgm":"10000","wcl":"23%"}

    ]
};
t.init();
t.fillData("table1", d.data);

var formselect=f();
var formselect2=f();
var formselect3=f();
var formselect4=f();

var option3={
    parentCon:"query3"
    ,submitHandle:subquery
    ,fields:[
        [
            {
                id:"year3",name:"year",label:"选择年份",type:"select",data:{"1":"1","11":"2","111":"3","1111":"4"},selectedHandle:$.getMouthByQuarter,isStaticData:true,width:100,pre:3,class:"margin_left_30"
            },
            {
                id:"quarter3",name:"quarter",label:"选择季度",type:"select",data:{"第一季度":"1","第二季度":"2","第三季度":"3","第四季度":"4"},isStaticData:true,selectedHandle:$.getMouthByQuarter,linkAgeIds:["mouth3"],width:100,class:"margin_left_30"
            }
            ,{
            id:"mouth3",name:"mouth",label:"选择月份",type:"select",data:{"1月":"1","2月":"2","3月":"3"},selectedHandle:$.getDayByMouth,linkAgeIds:["day3"],isStaticData:true,width:100,class:"margin_left_30"
        },
            {
                id:"day3",name:"day",label:"选择日期",type:"select",data:{"1日":"1","2日":"2","3日":"3","4日":"4","5日":"5","6日":"6","7日":"7","8日":"8","9日":"9","10日":"10"
                ,"11日":"11","12日":"12","13日":"13","14日":"14","15日":"15","16日":"16","17日":"17","18日":"18","19日":"19","20日":"20","21日":"21","22日":"22","23日":"23","24日":"24","25日":"25","26日":"26","27日":"27"
                ,"28日":"28","29日":"29","30日":"30","31日":"31"},isStaticData:true,width:100,class:"margin_left_30"
            }
            ,{
            id:"echarttypeselect",name:"",label:"图表类型",type:"select",data:{"柱状图":"1","折线图":"2","饼状图":"3"},isStaticData:true,selectedHandle:echartTypeChange,linkAgeIds:[],width:100,class:"margin_left_30"
        }
        ]

    ]
    ,submitBtn:{
        html:'<button type="button"   class="btn btn-primary submitBtn position_a">搜索</button>'
        ,submitBtnCls:"echartSubmitBtn"
        ,submitBtnId:"echartSubmitBtn"
    }
    ,formId:"queryForm3"
}
formselect3.init(option3);

function echartTypeChange(option){

    if($(option.evt.target).val()=="1"){
        $(echartOption.echartDatas).each(function(index,item){
            item.type="bar";
        })
        echarts.createEcharts(echartOption);
    }
    else  if($(option.evt.target).val()=="2"){
        $(echartOption.echartDatas).each(function(index,item){
            item.type="line";
        })
        echarts.createEcharts(echartOption);
    }
    else  if($(option.evt.target).val()=="3"){
        $(echartOption.echartDatas).each(function(index,item){
            item.type="pie";
        })
        echarts.createEcharts(echartOption);
    }
}

var option={
    parentCon:"query"
    ,submitHandle:subquery
    ,fields:[
        [
            {
                id:"year",name:"year",label:"选择年份",type:"select",data:{"1":"1","11":"2","111":"3","1111":"4"},selectedHandle:$.getMouthByQuarter,isStaticData:true,width:100,pre:3,class:"margin_left_30"
            },
            {
                id:"quarter",name:"quarter",label:"选择季度",type:"select",data:{"第一季度":"1","第二季度":"2","第三季度":"3","第四季度":"4"},isStaticData:true,selectedHandle:$.getMouthByQuarter,linkAgeIds:["mouth"],width:100,class:"margin_left_30"
            }
            ,{
            id:"mouth",name:"mouth",label:"选择月份",type:"select",data:{"1月":"1","2月":"2","3月":"3"},selectedHandle:$.getDayByMouth,linkAgeIds:["day"],isStaticData:true,width:100,class:"margin_left_30"
        },
            {
                id:"day",name:"day",label:"选择日期",type:"select",data:{"1日":"1","2日":"2","3日":"3","4日":"4","5日":"5","6日":"6","7日":"7","8日":"8","9日":"9","10日":"10"
                ,"11日":"11","12日":"12","13日":"13","14日":"14","15日":"15","16日":"16","17日":"17","18日":"18","19日":"19","20日":"20","21日":"21","22日":"22","23日":"23","24日":"24","25日":"25","26日":"26","27日":"27"
                ,"28日":"28","29日":"29","30日":"30","31日":"31"},isStaticData:true,width:100,class:"margin_left_30"
            }
        ]
        , [
            {
                id:"dqau",name:"dqau",label:"选择大区",type:"select",data:{},selectedHandle:text1,linkAgeIds:["zhongxin"],ajaxDataKey:"yj",width:100,class:"margin_left_30"
            },
            {
                id:"zhongxin",name:"zhongxin",label:"选择中心",type:"select",data:{},selectedHandle:text1,linkAgeIds:["quyu"],ajaxDataKey:null,width:100,class:"margin_left_30"
            },
            {
                id:"quyu",name:"quyu",label:"选择区域",type:"select",data:{},selectedHandle:text1,linkAgeIds:["yingyebu"],ajaxDataKey:null,width:100,class:"margin_left_30"
            },
            {
                id:"yingyebu",name:"yingyebu",label:"选择营业部",type:"select",data:{},selectedHandle:text1,linkAgeIds:["tuandui"],ajaxDataKey:null,width:130,class:"margin_left_30"
            },
            {
                id:"tuandui",name:"tuandui",label:"选择团队",type:"select",data:{},selectedHandle:text1,linkAgeIds:["day"],ajaxDataKey:null,width:130,class:"margin_left_30"
            },
        ]
        , [
            {
                id:"dqau1",name:"dqau1",label:"选择大区",type:"select",data:{},selectedHandle:text1,linkAgeIds:["zhongxin1"],ajaxDataKey:"yj",width:100,class:"margin_left_30"
            },
            {
                id:"zhongxin1",name:"zhongxin1",label:"选择中心",type:"select",data:{},selectedHandle:text1,linkAgeIds:["quyu1"],ajaxDataKey:null,width:100,class:"margin_left_30"
            },
            {
                id:"quyu1",name:"quyu1",label:"选择区域",type:"select",data:{},selectedHandle:text1,linkAgeIds:["yingyebu1"],ajaxDataKey:null,width:100,class:"margin_left_30"
            },
            {
                id:"yingyebu1",name:"yingyebu1",label:"选择营业部",type:"select",data:{},selectedHandle:text1,linkAgeIds:["tuandui1"],ajaxDataKey:null,width:130,class:"margin_left_30"
            },
            {
                id:"tuandui1",name:"tuandui1",label:"选择团队",type:"select",data:{},selectedHandle:text1,linkAgeIds:["day1"],ajaxDataKey:null,width:130,class:"margin_left_30"
            },
        ]
    ]

    ,submitBtn:{
        html:'<button type="button" class="btn btn-primary submitBtn position_a">搜索</button>'
        ,submitBtnCls:"submitBtn"
        ,submitBtnId:"submitBtn"
    }
    ,formId:"queryForm"
}
formselect.init(option);


var option4={
    parentCon:"query4"
    ,submitHandle:subquery
    ,fields:[
        [
            {
                name:"szdq",label:"所在大区",type:"label",data:{"东区":"1"},isStaticData:true,width:100,class:"margin_left_30"
            },
            {
                name:"szzx",label:"所在中心",type:"label",data:{"东区一分":"11"},isStaticData:true,width:100,class:"margin_left_30"
            },
            {
                name:"szqy",label:"所在区域",type:"label",data:{"东区一分一区域":"111"},isStaticData:true,width:100,class:"margin_left_30"
            },
            {
                name:"szyyb",label:"所在营业部",type:"label",data:{"上海财富一部":"1111"},isStaticData:true,width:100,class:"margin_left_30"
            },
            {
                name:"khjl",label:"客户经理",type:"label",data:{"xxx":"11111"},isStaticData:true,width:100,class:"margin_left_30"
            }
            ,{
            name:"khxm",label:"客户姓名",type:"text",data:{},placeHolder:"元",width:100,class:"margin_left_30"
        }
        ]
        ,[
            {
                id:"myts",name:"myts",label:"每页条数",type:"select",data:{"10条":"10","20条":"20","30条":"30","50条":"50"},isStaticData:true,width:100,class:"margin_left_30"
            },
            {
                id:"jhxz",name:"jhxz",label:"计划选择",type:"select",data:{"银多利Y-1期":"Y-1","银多利Y-3期":"Y-2","银多利Y-6期":"Y-6","银多利Y-12期":"Y-12",
                "谷便利G-1期":"G-1","谷便利G-3期":"G-3","谷便利G-6期":"G-6","谷便利G-12期":"G-12","谷便利G-18期":"G-18","谷便利G-24期":"G-24" },isStaticData:true,width:100,class:"margin_left_30"
            },
            {
                id:"cjqx",name:"cjqx",label:"出借期限",type:"select",data:{"1个月":"1","3个月":"3","6个月":"6","12个月":"12","18个月":"18","24个月":"24"},isStaticData:true,width:100,class:"margin_left_30"
            }
            ,{
                name:"cjje",label:"出借金额",type:"text",data:{},placeHolder:"元",width:100,class:"margin_left_20"
            }
            ,{
                name:"dslx",label:"待收利息",type:"text",data:{},placeHolder:"元",width:100,class:"margin_left_30"
            }
            ,{
                name:"dsbj",label:"待收本金",type:"text",data:{},placeHolder:"元",width:100,class:"margin_left_30"
            }
            ,{
                name:"ysbx",label:"已收本息",type:"text",data:{},placeHolder:"元",width:100,class:"margin_left_30"
            }
        ]
        ,[
            {
                id:"cjsj", name:"cjsj",label:"出借时间",type:"datepicker",datepickerType:"2",data:{},width:150,class:"margin_left_30"
            }
            ,{
                id:"tcsj",name:"tcsj",label:"退出时间",type:"datepicker",datepickerType:"2",data:{},width:150,class:"margin_left_20"
            }
            ,{
                id:"rltx", name:"rltx",label:"日历提醒",type:"datepicker",datepickerType:"2",data:{},width:150,class:"margin_left_20"
            }
            ,{
                name:"cbyj",label:"折标业绩",type:"text",data:{},placeHolder:"元",width:100,class:"margin_left_20"
            }
            ,{
                name:"xtcs",label:"续投次数",type:"text",data:{},placeHolder:"元",width:100,class:"margin_left_20"
            }
            ,{
                name:"bfcs",label:"拜访次数",type:"text",data:{},placeHolder:"元",width:100,class:"margin_left_20"
            }
            ,{
                name:"hyd",label:"活跃度",type:"text",data:{},placeHolder:"元",width:100,class:"margin_left_20"
            }
        ]
        ,[
            {
                id:"dcdqbg", name:"dcdqbg",tag:"导出当前表格",type:"button",data:{},placeHolder:"元",width:100,class:"hidden",btnClass:"margin_left_20 btn btn-primary  position_r",clickHandle:clickHandle
            }
        ]

    ]
    ,submitBtn:{
        html:'<button type="button" class="btn btn-primary submitBtn position_a">搜索</button>'
        ,submitBtnCls:"position_1"
        ,submitBtnId:"submitBtn4"
    }
    ,formId:"queryForm4"
}
formselect4.init(option4);

function clickHandle(){
    alert(3);
}
var option1={
    parentCon:"query2"
    ,submitHandle:subquery
    ,fields:[
        [
            {
                id:"year2",name:"year2",label:"选择年份",type:"select",data:{"1":"1","11":"2","111":"3","1111":"4"},selectedHandle:$.getMouthByQuarter,isStaticData:true,width:100,pre:3,class:"margin_left_30"
            },
            {
                id:"quarter2",name:"quarter2",label:"选择季度",type:"select",data:{"第一季度":"1","第二季度":"2","第三季度":"3","第四季度":"4"},isStaticData:true,selectedHandle:$.getMouthByQuarter,linkAgeIds:["mouth2"],width:100,class:"margin_left_30"
            }
            ,{
            id:"mouth2",name:"mouth2",label:"选择月份",type:"select",data:{"1月":"1","2月":"2","3月":"3"},selectedHandle:$.getDayByMouth,linkAgeIds:["day2"],isStaticData:true,width:100,class:"margin_left_30"
        },
            {
                id:"day2",name:"day2",label:"选择日期",type:"select",data:{"1日":"1","2日":"2","3日":"3","4日":"4","5日":"5","6日":"6","7日":"7","8日":"8","9日":"9","10日":"10"
                ,"11日":"11","12日":"12","13日":"13","14日":"14","15日":"15","16日":"16","17日":"17","18日":"18","19日":"19","20日":"20","21日":"21","22日":"22","23日":"23","24日":"24","25日":"25","26日":"26","27日":"27"
                ,"28日":"28","29日":"29","30日":"30","31日":"31"},isStaticData:true,width:100,class:"margin_left_30"
            }
        ]
        , [
            {
                id:"dqau2",name:"dqau2",label:"选择大区",type:"select",data:{},selectedHandle:text1,linkAgeIds:["zhongxin2"],ajaxDataKey:"yj",width:100,class:"margin_left_30"
            },
            {
                id:"zhongxin2",name:"zhongxin2",label:"选择中心",type:"select",data:{},selectedHandle:text1,linkAgeIds:["quyu2"],ajaxDataKey:null,width:100,class:"margin_left_30"
            },
            {
                id:"quyu2",name:"quyu2",label:"选择区域",type:"select",data:{},selectedHandle:text1,linkAgeIds:["yingyebu2"],ajaxDataKey:null,width:100,class:"margin_left_30"
            },
            {
                id:"yingyebu2",name:"yingyebu2",label:"选择营业部",type:"select",data:{},selectedHandle:text1,linkAgeIds:["tuandui2"],ajaxDataKey:null,width:130,class:"margin_left_30"
            },
            {
                id:"tuandui2",name:"tuandui2",label:"选择团队",type:"select",data:{},selectedHandle:text1,linkAgeIds:["day"],ajaxDataKey:null,width:130,class:"margin_left_30"
            },
        ]
        , [
            {
                id:"dqau12",name:"dqau12",label:"选择大区",type:"select",data:{},selectedHandle:text1,linkAgeIds:["zhongxin12"],ajaxDataKey:"yj",width:100,class:"margin_left_30"
            },
            {
                id:"zhongxin12",name:"zhongxin12",label:"选择中心",type:"select",data:{},selectedHandle:text1,linkAgeIds:["quyu12"],ajaxDataKey:null,width:100,class:"margin_left_30"
            },
            {
                id:"quyu12",name:"quyu12",label:"选择区域",type:"select",data:{},selectedHandle:text1,linkAgeIds:["yingyebu12"],ajaxDataKey:null,width:100,class:"margin_left_30"
            },
            {
                id:"yingyebu12",name:"yingyebu12",label:"选择营业部",type:"select",data:{},selectedHandle:text1,linkAgeIds:["tuandui12"],ajaxDataKey:null,width:130,class:"margin_left_30"
            },
            {
                id:"tuandui12",name:"tuandui12",label:"选择团队",type:"select",data:{},selectedHandle:text1,linkAgeIds:["day"],ajaxDataKey:null,width:130,class:"margin_left_30"
            },
        ]
    ]

    ,submitBtn:{
        html:'<button type="button"  class="btn btn-primary submitBtn position_a">搜索</button>'
        ,submitBtnCls:"submitBtn"
        ,submitBtnId:"submitBtn2"
    }
    ,formId:"queryForm2"
}
formselect2.init(option1);

function subquery(formid){
    console.log($("#"+formid).serialize());
}

function text1(option){
    setValue(option);
}
function setValue(option){
    var r="",rr="";
    var d=JSON.parse($("#" +option.id).attr("child").replace(/'/g, "\""));
    $(d).each(function(index,item){
        var childid= $.newGuid(),
            option= '<option child="'+(item.children&&JSON.stringify(item.children).replace(/"/g, "'"))+'" value="'+item.code+'">'+item.name+'</option>';
        r=r+option;
    })
    $("#" +option.id).html()||$("#" +option.id).html(r).get(0);
    var t=$("#" +option.id).find("option:selected").attr("child");
    if(t&&"undefined"!=t){
        var children=JSON.parse(t.replace(/'/g, "\"") );
        $(children).each(function(indexchr,itemchr){
            rr=rr+'<option child="'+(itemchr.children&&JSON.stringify(itemchr.children).replace(/"/g, "'"))+'" value="'+itemchr.code+'">'+itemchr.name+'</option>';
        })
        $("#" +option.linkAge[0]).html(rr).trigger("change").get(0);
    }

}
function getdata(){
    var data={
        "yj":[
            {
                "code":"1_1"
                ,"name":"a_1"
                ,"type":"1"
                ,"children":[
                {
                    "code":"1_1_2"
                    ,"name":"a_1_2"
                    ,"type":"1"
                    ,"children":[
                    {
                        "code":"1_1_2_3"
                        ,"name":"a_1_2_3"
                        ,"type":"1"
                        ,"children":[
                        {
                            "code":"1_1_2_3_4"
                            ,"name":"a_1_2_3_4"
                            ,"type":"1"
                            ,"children":[
                            {
                                "code":"1_1_2_3_4_5"
                                ,"name":"a_1_2_3_4_5"
                            }
                            , {
                                "code":"1_1_2_3_4_52"
                                ,"name":"a_1_2_3_4_52"
                            }
                        ]
                        }
                        ,{
                            "code":"1_1_2_3_42"
                            ,"name":"a_1_2_3_42"
                            ,"children":[
                                {
                                    "code":"1_1_2_3_42_5"
                                    ,"name":"a_1_2_3_42_5"
                                }
                                , {
                                    "code":"1_1_2_3_42_52"
                                    ,"name":"a_1_2_3_42_52"
                                }
                            ]
                        }
                    ]
                    }
                    ,{
                        "code":"1_1_2_32"
                        ,"name":"a_1_2_32"
                        ,"children":[
                            {
                                "code":"1_1_2_32_4"
                                ,"name":"a_1_2_32_4"
                                ,"children":[
                                {
                                    "code":"1_1_2_32_4_5"
                                    ,"name":"a_1_2_32_4_5"
                                }
                                , {
                                    "code":"1_1_2_32_4_52"
                                    ,"name":"a_1_2_32_4_52"
                                }
                            ]
                            }
                            ,{
                                "code":"1_1_2_32_42"
                                ,"name":"a_1_2_32_42"
                                ,"children":[
                                    {
                                        "code":"1_1_2_32_42_5"
                                        ,"name":"a_1_2_32_42_5"
                                    }
                                    , {
                                        "code":"1_1_2_32_42_52"
                                        ,"name":"a_1_2_32_42_52"
                                    }
                                ]
                            }
                        ]
                    }
                ]
                }
                ,{
                    "code":"1_1_22"
                    ,"name":"a_1_22"
                    ,"children":[
                        {
                            "code":"1_1_22_3"
                            ,"name":"a_1_22_3"
                            ,"children":[
                            {
                                "code":"1_1_22_3_4"
                                ,"name":"a_1_22_3_4"
                                ,"children":[
                                {
                                    "code":"1_1_22_3_4_5"
                                    ,"name":"a_1_22_3_4_5"
                                }
                                , {
                                    "code":"1_1_22_3_4_52"
                                    ,"name":"a_1_22_3_4_52"
                                }
                            ]
                            }
                            ,{
                                "code":"1_1_22_3_42"
                                ,"name":"a_1_22_3_42"
                                ,"children":[
                                    {
                                        "code":"1_1_22_3_42_5"
                                        ,"name":"a_1_22_3_42_5"
                                    }
                                    , {
                                        "code":"1_1_22_3_42_52"
                                        ,"name":"a_1_22_3_42_52"
                                    }
                                ]
                            }
                        ]
                        }
                        ,{
                            "code":"1_1_22_32"
                            ,"name":"a_1_22_32"
                            ,"children":[
                                {
                                    "code":"1_1_22_32_4"
                                    ,"name":"a_1_22_32_4"
                                    ,"children":[
                                    {
                                        "code":"1_1_22_32_4_5"
                                        ,"name":"a_1_22_32_4_5"
                                    }
                                    , {
                                        "code":"1_1_22_32_4_52"
                                        ,"name":"a_1_22_32_4_52"
                                    }
                                ]
                                }
                                ,{
                                    "code":"1_1_22_32_42"
                                    ,"name":"a_1_22_32_42"
                                    ,"children":[
                                        {
                                            "code":"1_1_22_32_42_5"
                                            ,"name":"a_1_22_32_42_5"
                                        }
                                        , {
                                            "code":"1_1_22_32_42_52"
                                            ,"name":"a_1_22_32_42_52"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
            }
            , {
                "code":"1_12"
                ,"name":"a_12"
                ,"children":[
                    {
                        "code":"1_12_2"
                        ,"name":"a_12_2"
                        ,"children":[
                        {
                            "code":"1_12_2_3"
                            ,"name":"a_12_2_3"
                            ,"children":[
                            {
                                "code":"1_12_2_3_4"
                                ,"name":"a_12_2_3_4"
                                ,"children":[
                                {
                                    "code":"1_12_2_3_4_5"
                                    ,"name":"a_12_2_3_4_5"
                                }
                                , {
                                    "code":"1_12_2_3_4_52"
                                    ,"name":"a_12_2_3_4_52"
                                }
                            ]
                            }
                            ,{
                                "code":"1_12_2_3_42"
                                ,"name":"a_12_2_3_42"
                                ,"children":[
                                    {
                                        "code":"1_12_2_3_42_5"
                                        ,"name":"a_12_2_3_42_5"
                                    }
                                    , {
                                        "code":"1_12_2_3_42_52"
                                        ,"name":"a_12_2_3_42_52"
                                    }
                                ]
                            }
                        ]
                        }
                        ,{
                            "code":"1_12_2_32"
                            ,"name":"a_12_2_32"
                            ,"children":[
                                {
                                    "code":"1_12_2_32_4"
                                    ,"name":"a_12_2_32_4"
                                    ,"children":[
                                    {
                                        "code":"1_12_2_32_4_5"
                                        ,"name":"a_12_2_32_4_5"
                                    }
                                    , {
                                        "code":"1_12_2_32_4_52"
                                        ,"name":"a_12_2_32_4_52"
                                    }
                                ]
                                }
                                ,{
                                    "code":"1_12_2_32_42"
                                    ,"name":"a_12_2_32_42"
                                    ,"children":[
                                        {
                                            "code":"1_12_2_32_42_5"
                                            ,"name":"a_12_2_32_42_5"
                                        }
                                        , {
                                            "code":"1_12_2_32_42_52"
                                            ,"name":"a_12_2_32_42_52"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                    }
                    ,{
                        "code":"1_12_22"
                        ,"name":"a_12_22"
                        ,"children":[
                            {
                                "code":"1_12_22_3"
                                ,"name":"a_12_22_3"
                                ,"children":[
                                {
                                    "code":"1_12_22_3_4"
                                    ,"name":"a_12_22_3_4"
                                    ,"children":[
                                    {
                                        "code":"1_12_22_3_4_5"
                                        ,"name":"a_12_22_3_4_5"
                                    }
                                    , {
                                        "code":"1_12_22_3_4_52"
                                        ,"name":"a_12_22_3_4_52"
                                    }
                                ]
                                }
                                ,{
                                    "code":"1_12_22_3_42"
                                    ,"name":"a_12_22_3_42"
                                    ,"children":[
                                        {
                                            "code":"1_12_22_3_42_5"
                                            ,"name":"a_12_22_3_42_5"
                                        }
                                        , {
                                            "code":"1_12_22_3_42_52"
                                            ,"name":"a_12_22_3_42_52"
                                        }
                                    ]
                                }
                            ]
                            }
                            ,{
                                "code":"1_12_22_32"
                                ,"name":"a_12_22_32"
                                ,"children":[
                                    {
                                        "code":"1_12_22_32_4"
                                        ,"name":"a_12_22_32_4"
                                        ,"children":[
                                        {
                                            "code":"1_12_22_32_4_5"
                                            ,"name":"a_12_22_32_4_5"
                                        }
                                        , {
                                            "code":"1_12_22_32_4_52"
                                            ,"name":"a_12_22_32_4_52"
                                        }
                                    ]
                                    }
                                    ,{
                                        "code":"1_12_22_32_42"
                                        ,"name":"a_12_22_32_42"
                                        ,"children":[
                                            {
                                                "code":"1_12_22_32_42_5"
                                                ,"name":"a_12_22_32_42_5"
                                            }
                                            , {
                                                "code":"1_12_22_32_42_52"
                                                ,"name":"a_12_22_32_42_52"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };
    formselect.initAjaxData(data);
    formselect2.initAjaxData(data);
}

getdata();

