/**
 * Created by Administrator on 2016/8/9.
 */
var tempFields=[
    {
        name:"name",
        text:"姓名",
        click:"",
        width:"auto",
        backgroud:"white",
        color:"",
        fontsize:"16px"
    },
    {
        name:"name",
        text:"姓名",
        click:"",
        width:"auto",
        backgroud:"white",
        color:"",
        fontsize:"16px"
    },
    {
        name:"name",
        text:"姓名",
        click:"",
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
    currentPage:0,
    totalPages:0,
    totalRecoreds:0,
    prePage:0,
    nextPage:0,
    width:"600px",
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
var DTable=function(options){
    var self=this;
    self.options=$.extend({},tmpConfig,options);
    self.options.fields=tempFields;
    self.options.tableId?self.options.table=$(self.options.tableId):$(templates);
    ///
}
function SetHeader(){
    var self=this;
    var header="<div>"+self.options.header.text+"</div>";
    self.options.table.find("header").html(header);
}
function SetFields(){
    var self=this;
    var fields="";
    self.options.fields.each(function(i,v){
        fields=fields+ "<div>"+ v.text+"</div>";
    });
    self.options.table.find("tbody").find("fields").html(fields);
}
function FillData(){
    var self=this;
    var dataSA="";
    self.options.dataSource.each(function(i,v){
        var dataS="<div class='row'>";
        self.options.fields.each(function(fi,fv){
            dataS=dataS+ "<div>"+ v[fv.name]+"</div>";
        })
        dataS=dataS+"</div>";
        dataSA=dataSA+dataS;
    });
    self.options.table.find("tbody").find("dataSource").html(dataSA);
}
function SetFooter(){
    var self=this;
    var footer="<div>"+"<div>首页</div>"+"<div>上一页</div>"+"<div>下一页</div>"+"<div>尾页</div>"+"<div>4/9页</div>"+"<div>转到</div>"+"<input type='text'  />"+"<div>页</div>"+"</div>";
    self.options.table.find("tfooter").html(footer);
}
$.extend(DTable.prototype,{
    _init:function(){
     //设置header
      SetHeader();
     //设置fields
        SetFields();
        //设置数据源
        FillData();
     //设置footer
    },
    setData:function(data){

    },
    firstPage:function(){

    },
    lastPage:function(){

    },
    nextPage:function(){

    },
    pageTo:function(index){

    },
    _refreshData:function(){

    }
});