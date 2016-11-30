var ReactDOM = require('react-dom');
var Roller=require("../block/roller/roller.js");

var rollerItem=[
    {
        imgUrl:"http://cdn.yingu.com/upload/image/20160928/2b94e8d8f4d702d5331fccbd387169dc.jpg"
        ,width:1200
        ,href:"http://www.baidu.com"
    }
    , {
        imgUrl:"http://cdn.yingu.com/upload/image/20161125/2548b11109bbe48a442c3b8a0f023bc.jpg"
        ,width:1200
        ,href:"http://www.baidu.com"
    }
    , {
        imgUrl:"http://cdn.yingu.com/upload/image/20161029/ed9cd9aa1a6895560932461d8de834fa.jpg"
        ,width:1200
        ,href:"http://www.baidu.com"
    }
    , {
        imgUrl:"http://cdn.yingu.com/upload/image/20161125/2548b11109bbe48a442c3b8a0f023bc.jpg"
        ,width:1200
        ,href:"http://www.baidu.com"
    }
    , {
        imgUrl:"http://cdn.yingu.com/upload/image/20161029/ed9cd9aa1a6895560932461d8de834fa.jpg"
        ,width:1200
        ,href:"http://www.baidu.com"
    }
    , {
        imgUrl:"http://cdn.yingu.com/upload/image/20161125/2548b11109bbe48a442c3b8a0f023bc.jpg"
        ,width:1200
        ,href:"http://www.baidu.com"
    }
    , {
        imgUrl:"http://cdn.yingu.com/upload/image/20161029/ed9cd9aa1a6895560932461d8de834fa.jpg"
        ,width:1200
        ,href:"http://www.baidu.com"
    }
    , {
        imgUrl:"http://cdn.yingu.com/upload/image/20161125/2548b11109bbe48a442c3b8a0f023bc.jpg"
        ,width:1200
        ,href:"http://www.baidu.com"
    }
    , {
        imgUrl:"http://cdn.yingu.com/upload/image/20160928/2b94e8d8f4d702d5331fccbd387169dc.jpg"
        ,width:1200
        ,href:"http://www.baidu.com"
    }
]
var option={
    showFooter:true//是否显示底部小圆圈
    ,showClick:true//是否显示点击按钮
    ,rollerType:1//备用
    ,borderWidth:4//每个item左右边框的总宽度
    ,autoPlay:true//是否自动播放
    ,playInterver:3000//自动播放间隔
    ,itemCount:1//conWidth宽度下显示几个item 和数据的width配合
    ,conWidth:1200//容器宽度
    ,hasCurrentClass:true//是否添加当前item的当前类用于区别其它item
}

ReactDOM.render(<Roller items={rollerItem} option={option}  ></Roller>, document.getElementById('rollerCon'));








