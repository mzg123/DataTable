require("../block/modal/modal.css");
var  valid=require("../block/modal/modal.js");
var  option={
    width:200,

    height:150
    ,btns:[
    {
        tag:"确定"
        ,btnClass:null
        ,clickIsPre:true
        ,click: function(){
        location.href="http://www.baidu.com";
    }
    }
    ,{
        tag:"取消"
        ,btnClass:null
        ,click: function(){
                alert(4);
            }
    }
   ]
    ,content:'qwertyuiodfghjk'
}

var  option1={

    btns:[
        {
            tag:"确定"
            ,btnClass:null
            ,click: function(){

        }
        }
        ,{
            tag:"取消"
            ,btnClass:null
            ,click: function(){
                alert(4);
            }
        }
    ]
    ,content:'qwertyuiodfghjk'
}


$("#modal").on("click",function(){
    valid.createModal(option);
    //valid.alert("<p>1222222222222</p><p>222222222</p>");
});
function ceateothermodal(){
    valid.createOtherModal(option1);
}





