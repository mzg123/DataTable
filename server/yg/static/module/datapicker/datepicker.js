
require("../block/datepicker/datepicker.css");
var  datepicker=require("../block/datepicker/datepicker.js");

var option={
    parentCon:"date_pic_con"
    ,type:"1"
    ,name:"dt1"
    ,selectCallBack:cb1
}
datepicker().init(option);


var option1={
    parentCon:"date_pic_con1"
    ,type:"2"
    ,name:"dt2"
    ,selectCallBack:cb1
}
datepicker().init(option1);

var option2={
    parentCon:"date_pic_con2"
    ,type:"2"
    ,name:"dt3"
    ,selectCallBack:cb1
}
datepicker().init(option2);

function cb1(op){
    console.log(op);
}

//
//function subquery(){
//    alert(1);
//}



