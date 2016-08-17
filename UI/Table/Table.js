/**
 * Created by Administrator on 2016/8/9.
 */
var tempFields=[
    {
        name:"name",
        text:"姓名",
        click:{c:"click",fn:null},
        width:"auto",
        backgroud:"white",
        color:"",
        fontsize:"16px"
    },
    {
        name:"name",
        text:"性别",
        click:{c:"delete",fn:null},
        width:"auto",
        backgroud:"white",
        color:"",
        fontsize:"16px"
    },
    {
        name:"name",
        text:"职业",
        click:{c:"detail",fn:null},
        width:"auto",
        backgroud:"white",
        color:"",
        fontsize:"16px"
    }

];
    var tmpConfig={
    tableId:"",
    scrollX:false,
    header:{},
    fields:null,
    dataSource:[],
    headerShow:true,
    footerShow:true,
    currentPage:1,
    totalPages:3,
    totalRecoreds:0,
    prePage:0,
    nextPage:0,
    width:"600",
        rowHeight:30,
        coloumWidth:200,
    pageCount:10,
         table:{},
    cache:{}
};
var templates='<div class="table">'+
               ' <div class="header"></div>'+
                '<div class="tbody">'+
                '<div class="fields"></div>'+
                '<div class="dataSource"></div>'
                +'</div>'+
                ' <div class="tfooter"></div>'+
                '</div>';
/*<div class="table" id="table"  >
<div class="header" id="header"></div>
<div class="tbody" id="tbody">
<div id="container" class="container">
<div class="fields" id="fields"></div>
<div class="dataSource" id="dataSource"></div>
</div>
</div>
<div class="tfooter" id="tfooter"></div>
</div>*/
var DTable=function(options){
    var self=this;
    self.options=$.extend({},tmpConfig,options);

    //self.options.fields=tempFields;
    self.options.tableId?self.options.table=$(self.options.tableId):$(templates);

}
function SetHeader(t){
    var self=t;

    var header="<div>"+self.options.header.text+"</div>";

    self.options.table.find(".header").html(header);
}
function SetFieldWidth(self) {

    var fieldsWidth = 0;
    var realWidth = "auto";
    var scroll=false;
    $(self.options.fields).each(function (i) {
        self.options.fields[i].width == "auto" ? "" : fieldsWidth = fieldsWidth + self.options.fields[i].width;
    });

    fieldsWidth>0?fieldsWidth > self.options.width ? realWidth = fieldsWidth : realWidth = self.options.width / $(self.options.fields).length:"";
    fieldsWidth > self.options.width ? scroll=true:"";
    alert(fieldsWidth);
    return {fieldWidth:realWidth=="auto"? self.options.width / $(self.options.fields).length:realWidth,scroll:scroll};
}
function SetFields(t){
    var self=t;
    var fields="";
    self.options.scroll=SetFieldWidth(self).scroll;
    self.options.fieldWidth=SetFieldWidth(self).fieldWidth;
    $(self.options.fields).each(function(i){
        fields=fields+ "<div style='width:"+self.options.fields[i].width+"px'>"+ self.options.fields[i].text+"</div>";
    });
    self.options.table.find(".tbody").css("height", self.options.pageCount*self.options.rowHeight+"px").find(".fields").html(fields);
    self.options.table.find(".tbody").find(".container").css("width",self.options.fieldWidth);
    self.options.table.css("width",self.options.width);
    self.options.table.find(".tbody").css("width",self.options.width);
    console.log(self.options.scroll);
    self.options.scroll?self.options.table.find(".tbody").css({"overflow-x":"scroll","overflow-y":"hidden"}):"";
}
function FillDataFromAjax(dataSource){
    $(dataSource).each(function(i,v){
            var dataS="<div class='row'>";
            $(self.options.fields).each(function(fi,fv){
                if(fv.click.fn){
                    dataS=dataS+ "<div value='' class='click "+fv.click.c+"' style='height:"+self.options.rowHeight+"px; width:"+self.options.coloumWidth+"px'>"+ v[fv.name]+"</div>";
                }else{
                    dataS=dataS+ "<div style='height:"+self.options.rowHeight+"px;width:"+self.options.coloumWidth+"px'>"+ v[fv.name]+"</div>";
                }
            })
            dataS=dataS+"</div>";
            dataSA=dataSA+dataS;

    });
    self.options.table.find(".tbody").find(".dataSource").html(dataSA);
}
function FillData(t,page){
    var self=t;
    var dataSA="";
    var from= 0,to=10;
    from=(page-1)*self.options.pageCount;
    self.options.currentPage=page;
    to=page*self.options.pageCount-1;
   if(typeof self.options.dataSource == 'function'){
       self.options.dataSource(from,to,FillDataFromAjax,t);
   }else{
       $(self.options.dataSource).each(function(i,v){
           if(i>=from && i<=to){
               var dataS="<div class='row'>";
               $(self.options.fields).each(function(fi,fv){
                   if(fv.click.fn){
                       dataS=dataS+ "<div value='' class='click "+fv.click.c+"' style='height:"+self.options.rowHeight+"px;width:"+self.options.coloumWidth+"px'>"+ v[fv.name]+"</div>";
                   }else{
                       dataS=dataS+ "<div style='height:"+self.options.rowHeight+"px;width:"+self.options.coloumWidth+"px'>"+ v[fv.name]+"</div>";
                   }
               })
               dataS=dataS+"</div>";
               dataSA=dataSA+dataS;
           }
           else if(i>to){
               return false;
           }
       });
       self.options.table.find(".tbody").find(".dataSource").html(dataSA);
   }


    $(self.options.fields).each(function(fi,fv){
        if(fv.click.fn){
            $("."+fv.click.c).click(function(){
                fv.click.fn.call(this)
            });
        }
    });
    RefreshFooter.call(t);
}
function RefreshFooter(){
    var self=this;

    //第一页 首页和上一页按钮不可用
    if(self.options.currentPage==1){
        $("#prePage").attr("disabled","disabled");
        $("#firstPage").attr("disabled","disabled");
    }else{
        $("#prePage").removeAttr("disabled");
        $("#firstPage").removeAttr("disabled");
    }
    //最后一页 尾页和下一页不可用
    if(self.options.totalPages<=self.options.currentPage){
        $("#lastPage").attr("disabled","disabled");
        $("#nextPage").attr("disabled","disabled");
    }else{
        $("#lastPage").removeAttr("disabled");
        $("#nextPage").removeAttr("disabled");
    }
    $("#pageInfo").html(self.options.currentPage+"/"+self.options.totalPages+"页");
}
function SetFooter(t){
    var self=t;
    var footer="<div class='footer'>"+"<button id='firstPage'    >首页</button>"+"<button id='prePage'>上一页</button>"+"<button id='nextPage'>下一页</button>"+"<button id='lastPage'>尾页</button>"+"<div id='pageInfo'>4/9页</div>"+"<div >转到</div>"+"<input type='text' id='tP'  />"+"<div>页</div>"+"<button id='toPage'>GO</button>"+"</div>";
    self.options.table.find(".tfooter").html(footer);
}
function IniEvents(){
    var self=this;
    $("#firstPage").click(function(){
        FillData(self,1);
    });
    $("#prePage").click(function(){
        FillData(self,self.options.currentPage-1);
    });
    $("#nextPage").click(function(){
        FillData(self,self.options.currentPage+1);
    });
    $("#lastPage").click(function(){
        FillData(self,self.options.totalPages);
    });
    $("#toPage").click(function(){
        $("#tP").val()? FillData(self,$("#tP").val()):"";
    });
}
$.extend(DTable.prototype,{
    init:function(){
     //设置header
      SetHeader(this);
     //设置fields
        SetFields(this);
        //设置数据源
        FillData(this,2);
     //设置footer
        SetFooter(this);
        //初始化事件
        IniEvents.call(this);
    },
    setData:function(data){

    }
});


