

var table_1={
    tempConfig:{
        parentCon:"table1",//容器id
        scrollX:false,
        fieldsHeight:40,
        header:{text:"123",css:"background:red;color:blue;"},
        fields:[
            {
                name:"pm",
                text:"排名",
                click:{c:"click",fn:null},
                width:30,
                backgroud:"white",
                color:null,
                type:"tag",
                fontsize:"16px"
            },
            {
                name:"dq",
                text:"大区",
                click:{c:"delete",fn:null},
                width:60,
                backgroud:"white",
                color:null,
                type:"tag",
                fontsize:"16px"
            },
            {
                name:"dqjl",
                text:"大区总经理",
                click:{c:"detail",fn:null},
                width:80,
                backgroud:"white",
                color:null,
                type:"tag",
                fontsize:"16px"
            }
            ,
            {
                name:"cjds",
                text:"成交单数",
                click:{c:"detail",fn:null},
                width:80,
                backgroud:"white",
                color:null,
                type:"tag",
                fontsize:"16px"
            }
            ,
            {
                name:"cjje",
                text:"职出借金额业",
                click:{c:"detail",fn:null},
                width:80,
                backgroud:"white",
                color:null,
                type:"tag",
                fontsize:"16px"
            }
            ,
            {
                name:"xzkhs",
                text:"新增客户数（人）/客户总量（人）",
                click:{c:"detail",fn:null},
                width:140,
                backgroud:"white",
                color:null,
                type:"tag",
                fontsize:"16px"
            }
            ,
            {
                name:"zcshze",
                text:"正常赎回总额（万元）",
                click:{c:"detail",fn:null},
                width:80,
                backgroud:"white",
                color:null,
                type:"tag",
                fontsize:"16px"
            }
            ,
            {
                name:"cbgm",
                text:"折标规模（万元）",
                click:{c:"detail",fn:null},
                width:140,
                backgroud:"white",
                color:null,
                type:"tag",
                fontsize:"16px"
            }
            ,
            {
                name:"yjgm",
                text:"业绩规模（万元）",
                click:{c:"detail",fn:null},
                width:60,
                backgroud:"white",
                color:null,
                type:"tag",
                fontsize:"16px"
            }
            ,
            {
                name:"wcl",
                text:"完成率",
                click:{c:"detail",fn:null},
                width:60,
                backgroud:"white",
                color:null,
                type:"tag",
                fontsize:"16px"
            }

        ],
        dataSource:null,
        dataSource1:[{name:"121"},{name:"123"},{name:"123"},{name:"123"},{name:"123"},{name:"123"},{name:"123"},{name:"123"},{name:"123"},{name:"123"},{name:"123"},{name:"123"}
            ,{name:"123"},{name:"123"},{name:"123"},{name:"122"},{name:"123"},{name:"122"},{name:"123"},{name:"123"},{name:"123"}],
        headerShow:true,
        footerShow:true,
        currentPage:1,
        totalPages:3,
        totalRecoreds:0,
        prePage:0,
        nextPage:0,
        scroll:false,
        width:"auto",
        pageCount:10,
        table:{},
        cache:{}
    }
    ,template:'<div class="mtable"   >'+
                    '<div class="header" ></div>'+
                        '<div class="tbody" >'+
                            '<div class="fields " ></div>'+
                            '<div class="dataSource" ></div>'+
                             '<div class="tfooter"></div>'+
                         '</div>'+
                  '</div>'
   ,init:function(option){
       var self=this;
       self.options = $.extend({},self.tempConfig,option);
        $("#"+self.options.parentCon).append(self.template);
        $("#"+self.options.parentCon+" .mtable").addClass("m_min_width");
        self.options.headerShow&&($("#"+self.options.parentCon+" .header").html(self.options.header.text).addClass("hidden"));
        self.options.headerShow||($("#"+self.options.parentCon+" .header").addClass("hidden"));
        $("#"+self.options.parentCon+" .fields").html(initFields(self.options.fields));
   }
    ,fillData:function(parentCon,data){
        var self=this;
        var conid=parentCon?parentCon:self.options.parentCon;
        $("#"+self.options.parentCon+" .dataSource").html(fillData(data,self.options.fields));
}
}
function fillData(data,fields){
    var result="";

    $(data).each(function(index,item){
        result=result+'<div class="datarow" >';
        $(fields).each(function(indexchr,itemchr){
            var css="";
            itemchr.width&&(css=css+"width:"+itemchr.width+"px;");
            css&&(css="style="+css);
            result=result+'<div '+css+'  class="col_'+(indexchr+1)+' display_ilb">'+item[itemchr.name]+'</div>';
        })
        result=result+'</div>';
    })
    return result;
}
function initFields(fields){
    var result="";
   $(fields).each(function(index,item){
       var css="";
       item.width&&(css=css+"width:"+item.width+"px;");
       css&&(css="style="+css);
         result=result+'<div '+css+' class="col_1 display_ilb ">'+item.text+'</div>';
   })
    return result;
}
module.exports=table_1
