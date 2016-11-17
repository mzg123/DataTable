require("../block/formselect/formselect.css");
var  formselect=require("../block/formselect/formselect.js");

var option={
    parentCon:"query"
    ,submitHandle:subquery
}
formselect.init(option);

function subquery(){
    alert(1);
}






