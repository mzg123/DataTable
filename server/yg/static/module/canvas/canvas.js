var mycanvas=require("../block/canvas/canvastool.js");
//var option= {
//   id:"mycanvas"
//    ,widthFull:true
//    ,designCanvasRect:{w:750,h:700}
//}
//mycanvas.init(option);

window.mycanvas=mycanvas;
var option= {
    from:{x:10,y:30}
    ,to:{x:130,y:960}
    ,fillStyle:"red"
    ,strokeStyle:"red"
    ,lineWidth:1
    ,id:"mycanvas"
}
document.getElementById("line").onclick=function(){

    var option= {
        from:{x:10,y:30}
        ,to:{x:130,y:960}
        ,fillStyle:"red"
        ,strokeStyle:"red"
        ,lineWidth:1
        ,id:"mycanvas"
    }
    mycanvas.drawLine(option);
}


document.getElementById("Pline").onclick=function(){
    var option= {
        points:[
            {x:23,y:41}
            ,{x:107,y:49}
            ,{x:196,y:34}
            ,{x:257,y:53}
            ,{x:300,y:21}
            ,{x:361,y:15}
            ,{x:400,y:46}
            ,{x:454,y:26}
            ,{x:532,y:7}
            ,{x:612,y:35}
            ,{x:696,y:25}
            ,{x:719,y:98}
            ,{x:698,y:228}
            ,{x:726,y:394}
            ,{x:716,y:540}
            ,{x:728,y:659}
            ,{x:652,y:653}
            ,{x:437,y:653}
            ,{x:325,y:671}
            ,{x:170,y:660}
            ,{x:51,y:682}
            ,{x:7,y:659}
            ,{x:31,y:466}
            ,{x:14,y:341}
            ,{x:42,y:141}

        ]
        ,lineJoin:"miter"
        ,fillStyle:"red"
        ,strokeStyle:"#ffde94"
        ,lineWidth:10
        ,isClosed:true
        ,id:"mycanvas"
    }
    mycanvas.drawPLine(option);
}
document.getElementById("Ploy").onclick=function(){

    var option= {
        points:[
            {x:23,y:391}
            ,{x:107,y:399}
            ,{x:196,y:384}

        ]
        ,lineJoin:"miter"
        ,fillStyle:"red"
        ,strokeStyle:"red"
        ,lineWidth:10
        ,isClosed:true
        ,id:"mycanvas"
    }
    mycanvas.drawPloy(option);
}
document.getElementById("doshline").onclick=function(){

    var option= {
        from:{x:110,y:130}
        ,to:{x:130,y:760}
        ,fillStyle:"red"
        ,strokeStyle:"blue"
        ,lineWidth:1
        ,dashLength:5
        ,id:"mycanvas"
    }
    mycanvas.drawDoshLine(option);
}
document.getElementById("arc").onclick=function(){

    var option= {
        point:{x:100,y:175}
        ,radis:50
        ,sAngle:0
        ,eAngle:1.2
        ,counterclockwise:false
        ,fillStyle:"red"
        ,strokeStyle:"blue"
        ,lineWidth:1
        ,dashLength:5
        ,id:"mycanvas"
    }
    mycanvas.drawArc(option);
}
document.getElementById("arcdosh").onclick=function(){

    var option= {
        point:{x:100,y:175}
        ,radis:50
        ,sAngle:0
        ,eAngle:1.2
        ,counterclockwise:false
        ,fillStyle:"red"
        ,strokeStyle:"blue"
        ,lineWidth:1
        ,dashLength:0.05
        ,id:"mycanvas"
    }
    mycanvas.drawDoshArc(option);
}
document.getElementById("text").onclick=function(){

    var option={
        point:{x:30,y:40}
        ,font:"20px Georgia"
        ,text:"text"
        ,id:"mycanvas"
    }
    mycanvas.drawText(option);
}



