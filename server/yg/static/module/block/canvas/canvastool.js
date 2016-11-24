var canvaltool={

    canvas2d:null
    ,fillStyle:null
    ,scaleXRatio:1
    ,scaleYRatio:1
    ,canvas:null
    ,_init:function(id){
        var c=document.getElementById(id);
        c&&(this.canvas2d=c.getContext("2d"));
    }
    ,_get2d:function (id){
        if(this.canvas2d){
            return this.canvas2d
        }
        else{
            var canvas= this.canvas=document.getElementById(id);
            return this.canvas2d=canvas.getContext("2d")
        }
    }
    ,init:function(option){
        if( option.widthFull){
            var pageResponse=1;
            option.pageResponse&&(pageResponse=option.pageResponse);
            var canvas=this.canvas=document.getElementById(option.id);
            var iw=parseInt(window.innerWidth )/pageResponse;
            canvas.width = iw;
            this.scaleXRatio=iw/option.designCanvasRect.w;
            canvas.height = iw*option.designCanvasRect.h/option.designCanvasRect.w;
            this.scaleYRatio=(iw)/(option.designCanvasRect.w);

        }

    }
    ,setCurrentCtx:function(option){
        var self=this;
        self.init(option);
    }
    ,drawLine:function(option){

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
        option.lineJoin&&(ctx.lineJoin=option.lineJoin);
        option.lineWidth?ctx.lineWidth=option.lineWidth:ctx.lineWidth=1;
        option.strokeStyle?ctx.strokeStyle=option.strokeStyle:ctx.strokeStyle="black";
        option.fillStyle&&(ctx.fillStyle=option.fillStyle);
        for(var i=0;i<option.points.length;i++){
             i==0&& ctx.moveTo(option.points[0].x*this.scaleXRatio,option.points[0].y*this.scaleYRatio);
            ctx.lineTo(option.points[i].x*this.scaleXRatio,option.points[i].y*this.scaleYRatio);
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
        option.isClosed&&ctx.closePath();
        option.isFill&&ctx.fill();

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
        var option={
            point:{x:0,y:0}
            ,width:100
            ,height:100
            ,id:"mycanvas"
        }
        var ctx=this._get2d(option.id);
        ctx.rect(option.point.x,option.point.y,option.width,option.height);
        ctx.stroke();
    }
    ,drawFillRect:function(option){
        var option={
            point:{x:0,y:0}
            ,width:100
            ,height:100
            ,id:"mycanvas"
        }
        var ctx=this._get2d(option.id);
        ctx.fillRect(option.point.x,option.point.y,option.width,option.height);
    }
    ,drawPloy:function(option){
        var ctx=this._get2d(option.id);
        ctx.beginPath();
        option.lineJoin&&(ctx.lineJoin=option.lineJoin);
        option.lineWidth?ctx.lineWidth=option.lineWidth:ctx.lineWidth=1;
        option.strokeStyle?ctx.strokeStyle=option.strokeStyle:ctx.strokeStyle="black";
        option.fillStyle&&(ctx.fillStyle=option.fillStyle);
        ctx.lineJoin="miter";//bevel round miter
        for(var i=0;i<option.points.length;i++){
            i==0&& ctx.moveTo(option.points[0].x,option.points[0].y);
            ctx.lineTo(option.points[i].x,option.points[i].y);
        }
        ctx.closePath();
        ctx.stroke(); // 进行绘制
        ctx.fill();//填充
    }
    ,clearRect:function(option){
        //var option={
        //    point:{x:0,y:0}
        //    ,width:w
        //    ,height:h
        //}
        var ctx=this._get2d(option.id);
        ctx.clearRect(option.point.x,option.point.h,option.width,option.height);
    }
    ,scale:function(option){
        //var option={
        //    id:"mycanvas"
        //    ,scalewidth:scalewidth
        //    ,scaleheight:scaleheight
        //}
        var ctx=this._get2d(option.id);
        ctx.scale(option.scalewidth,option.scaleheight);
    }
    ,translate:function(option){
        //var option={
        //    id:"mycanvas"
        //    ,x:x
        //    ,y:y
        //}
        var ctx=this._get2d(option.id);
        ctx.translate(option.x,option.y);
    }
    ,rotate:function(option){
        //var option={
        //    id:"mycanvas"
        //    ,angle:angle
        //}
        var ctx=this._get2d(option.id);
        ctx.rotate(option.angle);
    }
    //以canvas上指定的坐标点开始，按照图像的原始尺寸大小绘制整个图像。这里的image可以是Image对象，也可以是Canvas对象(下同)。
    ,drawImage:function( option){
        //var option={
        //    canvas:canvas
        //    ,x:x
        //    ,y:y
       // ,id:"mycanvas"
        //imageUrl:imageUrl
        //}
        var ctx=this._get2d(option.id);
        //创建新的图片对象
        var img = new Image();
        //指定图片的URL
        img.src = option.imageUrl;
        //浏览器加载图片完毕后再绘制图片
        img.onload = function(){
            //以Canvas画布上的坐标(10,10)为起始点，绘制图像
            ctx.drawImage(img, option.x, option.y);
        };
    }
    //以canvas上指定的坐标点开始，以指定的大小(width和height)绘制整个图像，图像将根据指定的尺寸自动进行相应的缩放。
    ,drawImageScale:function(option){
        //var option={
        //    canvas:canvas
        //    ,x:x
        //    ,y:y
        //    ,width:width
        //    ,height:height
        // ,id:"mycanvas"
        //,isFull:false
        //imageUrl:imageUrl
        //}
        var self=this;
        var ctx=this._get2d(option.id);
        //创建新的图片对象
        var img = new Image();
        //指定图片的URL
        img.src = option.imageUrl;
        //浏览器加载图片完毕后再绘制图片
        img.onload = function(){
            //以Canvas画布上的坐标(10,10)为起始点，绘制图像
            if(option.isFull){
                option.width=self.canvas.width;
                option.height=self.canvas.height;

            }
            ctx.drawImage(img, option.x, option.y, option.width, option.height);
        };
    }
    //将指定图像的局部图像(以(imageX, imageY)为左上角、宽度为imageWidth、高度为imageHeight的矩形部分)绘制到canvas中以(canvasX,canvasY)为左上角坐标、宽度为canvasWidth、高度为canvasHeight的矩形区域中
    ,drawImagePart:function(option){
        //var option={
        //    canvas:canvas
        //    ,imageX:imageX
        //    ,imageY:imageY
        //    ,imageWidth:imageWidth
        //    ,imageHeight:imageHeight
        //    ,canvasX:canvasX
        //    ,canvasY:canvasY
        //    ,canvasWidth:canvasWidth
        //    ,canvasHeight:canvasHeight
        // ,id:"mycanvas"
        //imageUrl:imageUrl
        //}
        var ctx=this._get2d(option.id);
        //创建新的图片对象
        var img = new Image();
        //指定图片的URL
        img.src = option.imageUrl;
        //浏览器加载图片完毕后再绘制图片
        img.onload = function(){
            //以Canvas画布上的坐标(10,10)为起始点，绘制图像
            ctx.drawImage(img, option.imageX, option.imageY, option.imageWidth, option.imageHeight, option.canvasX, option.canvasY, option.canvasWidth, option.canvasHeight);
        };
    }
    ,getImageData:function(option){
        //var option={
        //    canvas:canvas
        //    ,x:x
        //    ,y:y
        //    ,width:width
        //    ,height:height
        //,isFull:false
        // ,id:"mycanvas"
        //}
        var self=this;
        var ctx=this._get2d(option.id);
        if(option.isFull){
            option.width=self.canvas.width;
            option.height=self.canvas.height;
        }

       return ctx.getImageData(option.x,option.y,option.width,option.height);
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
    ,drawText:function(option){
        //var option={
        //   point:{x:30,y:40}
        //    ,font:"20px Georgia"
        //    ,text:"text"
        //    ,id:"mycanvas"
        //}
        var ctx=this._get2d(option.id);
        option.font&&(ctx.font=option.font);
        option.fillStyle&&(ctx.fillStyle=option.fillStyle);
        ctx.fillText(option.text,option.point.x,option.point.y);
    }
}

module.exports=canvaltool;