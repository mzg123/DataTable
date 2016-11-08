var mycanvas=require("../block/canvas/canvastool.js");

var option= {
    from:{x:10,y:30}
    ,to:{x:130,y:960}
    ,fillStyle:"red"
    ,strokeStyle:"red"
    ,lineWidth:1
    ,id:"mycanvas"
}
$("#line").on("click",function(){
    var option= {
        from:{x:10,y:30}
        ,to:{x:130,y:960}
        ,fillStyle:"red"
        ,strokeStyle:"red"
        ,lineWidth:1
        ,id:"mycanvas"
    }
    mycanvas.drawLine(option);
});
$("#Pline").on("click",function(){
    var option= {
        points:[
            {x:20,y:20}
            ,{x:20,y:100}
            ,{x:70,y:100}

        ]
        ,fillStyle:"red"
        ,strokeStyle:"red"
        ,lineWidth:1
        ,isClosed:true
        ,id:"mycanvas"
    }
    mycanvas.drawPLine(option);
});
$("#Ploy").on("click",function(){
    var option= {
        points:[
            {x:20,y:20}
            ,{x:20,y:100}
            ,{x:70,y:100}

        ]
        ,fillStyle:"red"
        ,strokeStyle:"red"
        ,lineWidth:1
        ,isClosed:true
        ,id:"mycanvas"
    }
    mycanvas.drawPloy(option);
});
$("#doshline").on("click",function(){
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
});
$("#arc").on("click",function(){
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


});

$("#arcdosh").on("click",function(){
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
});
$("#text").on("click",function(){
    var option={
        point:{x:30,y:40}
        ,font:"20px Georgia"
        ,text:"text"
        ,id:"mycanvas"
    }
    mycanvas.drawText(option);
});

