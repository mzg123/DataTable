var canvaltool={

    canvas2d:null
    ,fillStyle:null
    ,_init:function(id){
        var c=document.getElementById(id);
        c&&(this.canvas2d=c.getContext("2d"));
    }
    ,_get2d:function (id){
        if(this.canvas2d){
            return this.canvas2d
        }
        else{
            return this.canvas2d=document.getElementById(id).getContext("2d")
        }
    }
    ,drawLine:function(option){
       //var option= {
       //     from:{x:10,y:30}
       //     ,to:{x:30,y:60}
       //     ,fillStyle:"red"
       //    ,strokeStyle:"red"
       //    ,lineWidth:1
       //    ,id:"mycanvas"
       // }
        var ctx=this._get2d(option.id);
        ctx.beginPath();
        option.lineWidth?ctx.lineWidth=option.lineWidth:ctx.lineWidth=1;
        option.strokeStyle?ctx.strokeStyle=option.strokeStyle:ctx.strokeStyle="black";
        ctx.moveTo(option.from.x,option.from.y);
        ctx.lineTo(option.to.x,option.to.y);
        ctx.stroke(); // 进行绘制
    }
    ,drawDoshLine:function(option){
        var ctx=this._get2d(option.id);
        ctx.beginPath();
        var dashLen = option.dashLength===undefined ? 5 : option.dashLength,
            xpos =option.to.x - option.from.x, //得到横向的宽度;
            ypos = option.to.y - option.from.y, //得到纵向的高度;
            x1=option.from.x,
            y1=option.from.y,
            numDashes = Math.floor(Math.sqrt(xpos * xpos + ypos * ypos) / dashLen);
        //利用正切获取斜边的长度除以虚线长度，得到要分为多少段;
        for(var i=0; i<numDashes; i++){
            if(i % 2 === 0){
                ctx.moveTo(x1 + (xpos/numDashes) * i, y1 + (ypos/numDashes) * i);
                //有了横向宽度和多少段，得出每一段是多长，起点 + 每段长度 * i = 要绘制的起点；
            }else{
                ctx.lineTo(x1 + (xpos/numDashes) * i, y1 + (ypos/numDashes) * i);
            }
        }
        option.lineWidth?ctx.lineWidth=option.lineWidth:ctx.lineWidth=1;
        option.strokeStyle?ctx.strokeStyle=option.strokeStyle:ctx.strokeStyle="black";
        ctx.stroke(); // 进行绘制
    }
    ,drawPLine:function(option){
        var ctx=this._get2d(option.id);
        ctx.beginPath();
        option.lineWidth?ctx.lineWidth=option.lineWidth:ctx.lineWidth=1;
        option.strokeStyle?ctx.strokeStyle=option.strokeStyle:ctx.strokeStyle="black";
        option.fillStyle&&(ctx.fillStyle=option.fillStyle);
        for(var i=0;i<option.points.length;i++){
             i==0&& ctx.moveTo(option.points[0].x,option.points[0].y);
            ctx.lineTo(option.points[i].x,option.points[i].y);
        }
        option.isClosed&&ctx.closePath();
        ctx.stroke(); // 进行绘制
    }
    ,drawArc:function(option){
        //x,y,r,sAngle,eAngle,counterclockwise
        var ctx=this._get2d(option.id);
        ctx.beginPath();
        option.lineWidth?ctx.lineWidth=option.lineWidth:ctx.lineWidth=1;
        option.strokeStyle?ctx.strokeStyle=option.strokeStyle:ctx.strokeStyle="black";
        option.fillStyle&&(ctx.fillStyle=option.fillStyle);
        ctx.arc(option.point.x,option.point.y,option.radis,option.sAngle,option.eAngle*Math.PI);

        ctx.stroke();


    }
    ,drawDoshArc:function(option){
        //var option= {
        //    point:{x:100,y:175}
        //    ,radis:50
        //    ,sAngle:0
        //    ,eAngle:1.2
        //    ,counterclockwise:false
        //    ,fillStyle:"red"
        //    ,strokeStyle:"blue"
        //    ,lineWidth:1
        //    ,dashLength:0.01
        //    ,id:"mycanvas"
        //
        //}
        var ctx=this._get2d(option.id);
        ctx.beginPath();
        option.lineWidth?ctx.lineWidth=option.lineWidth:ctx.lineWidth=1;
        option.strokeStyle?ctx.strokeStyle=option.strokeStyle:ctx.strokeStyle="black";
        option.fillStyle&&(ctx.fillStyle=option.fillStyle);

        var dashLen = option.dashLength===undefined ?0.2 : option.dashLength,
            diffangle =Math.abs(option.eAngle - option.sAngle),
            sAngle= Math.floor(option.sAngle),
            numDashes = Math.floor(diffangle/ dashLen);

        for(var i=0; i<numDashes; i++){
            if(i % 2 === 0){
                ctx.beginPath();
                ctx.arc(option.point.x,option.point.y,option.radis,(sAngle+i*dashLen)*Math.PI,(sAngle+(i+1)*dashLen)*Math.PI);
                ctx.stroke();
            }
        }
    }
    ,drawRect:function(option){

    }
    ,drawPloy:function(option){

    }
    ,clearRect:function(option){

    }
   ,createPattern:function(option){
        var option={
            img:img
            ,pattern:repeat//repeat|repeat-x|repeat-y|no-repeat
        }
        var ctx=this._get2d(option.id);
        return ctx.createPattern(option.img,option.pattern);
    }
    ,createLinearGradient:function(option){
           //var option={
           //    from:{x:0,y:0}
           //    ,to:{x:0,y:170}
           //    ,colorStop:[
           //       {key:0,value:"red"}
           //       ,{key:0.5,value:"green"}
           //       ,{key:1,value:"blue"}
           //   ]
           //    ,id:"mycanvas"
           //}
        var ctx=this._get2d(option.id);
        var gradient=ctx.createLinearGradient(option.from.x,option.from.y,option.to.x,option.to.y);
        var length=option.colorStop.length;
        for(var i=0;i<length;i++){
            gradient.addColorStop(option.colorStop[i].key,option.colorStop[i].value);
        }
       return gradient;
    }
    ,createRadialGradient:function(option){
        var option={
            sPoint:{x:0,y:0}
            ,sRadis:r1
            ,ePoint:{x:0,y:170}
            ,eRadis:r2
            ,colorStop:[
               {key:0,value:"red"}
               ,{key:1,value:"blue"}
           ]
            ,id:"mycanvas"
        }
        var ctx=this._get2d(option.id);
        var gradient=ctx.createRadialGradient(option.sPoint.x,option.sPoint.y,option.sRadis,option.ePoint.x,option.ePoint.y,option.eRadis);
        var length=option.colorStop.length;
        for(var i=0;i<length;i++){
            gradient.addColorStop(option.colorStop[i].key,option.colorStop[i].value);
        }
        return gradient;
    }

}

module.exports=canvaltool;