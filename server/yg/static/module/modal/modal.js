var  option={
    btns:[
    {
        tag:"确定"
        ,btnClass:null
        ,click: $.noop
    }
    ,{
        tag:"取消"
        ,btnClass:null
        ,click: $.noop
    }
]
}

var  valid=require("../block/modal/modal.js").init(option);
valid.createOtherModal();





