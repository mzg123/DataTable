/**
 * Created by mzg on 2016/8/18 0025.
 */
define('ui/clock/clock',function(require,exports,module){

    var tmpConfig = {
        width:150,
        height:34,
        timesize:16,
        tagsize:16,
        pretag:"剩余时间",
        format:1,// 内部heml结构
        bordercolor:"blue",
        timecolor:"blue",
        tagcolur:"#939393",
        pretagcolur:"#333333",
        pretagPosition:"left",
        type:1,//1为月月盈 2为双月丰
        id:"block"
    }

    var templates = //'<div class="clock">'+
                        ' <span class="pretext"></span>'+
                        ' <span class="hour">00</span>'+
                        ' <span class="hourtext">时</span>'+
                        '<span class="minute">00</span>'+
                        '<span class="minutetext">分</span>'+
                        '<span class="sec">00</span>'+
                        '<span class="sectext">秒</span>';
                       // '</div>';


    var Clock=function (options){
        var self = this;
        options = $.extend({},tmpConfig,options);
        self.options = options;
        self.selectEl = $("#"+self.options.id);

        self.selectEl.html(templates);

        self.options.state=$(self.selectEl).attr('colorstatus');//colorStatus 蓝 1，红 2，灰3
        self.options.state=="1" && (self.options.bordercolor=self.options.timecolor="#0768ca");//蓝色
        self.options.state=="2" && (self.options.bordercolor=self.options.timecolor="#f45146");//红色
        self.options.state=="3" && (self.options.bordercolor=self.options.timecolor="gray");//灰色

        self.selectEl.find(".hour").css({color:self.options.timecolor,border:"1px solid "+self.options.bordercolor,'font-size':self.options.tagsize+"px"});
        self.selectEl.find(".minute").css({color:self.options.timecolor,border:"1px solid "+self.options.bordercolor,'font-size':self.options.tagsize+"px"});
        self.selectEl.find(".sec").css({color:self.options.timecolor,border:"1px solid "+self.options.bordercolor,'font-size':self.options.tagsize+"px"});


        self.selectEl.find(".hourtext").css({color:self.options.tagcolur});
        self.selectEl.find(".minutetext").css({color:self.options.tagcolur});
        self.selectEl.find(".sectext").css({color:self.options.tagcolur});
        if(self.options.pretagPosition=="down"){
            self.selectEl.find(".pretext").remove();
            self.selectEl.find(".sectext").after( '<span class="pretext down"  ></span>');
        }

        var tagType=$(self.selectEl).attr('tagtype');//tagtype1为剩余时间 2为倒计时
        tagType=="1"&& (self.options.pretag="剩余时间");
        tagType=="2"&& (self.options.pretag="倒计时");
        tagType=="1"&& (self.selectEl.find(".pretext").css({color:self.options.tagcolur,'font-size':self.options.tagsize+"px"}));
        tagType=="2"&& (self.selectEl.find(".pretext").css({color:self.options.pretagcolur,'font-size':self.options.tagsize+"px"}));
        self.selectEl.find(".pretext").html(self.options.pretag);


        if($(self.selectEl).attr('time-left'))
            this.getDate();
        else{//置0
            self.selectEl.find(".hour").css({color:"#cfcfcf",border:"1px solid #cfcfcf",'font-size':self.options.tagsize+"px"});
            self.selectEl.find(".minute").css({color:"#cfcfcf",border:"1px solid #cfcfcf",'font-size':self.options.tagsize+"px"});
            self.selectEl.find(".sec").css({color:"#cfcfcf",border:"1px solid #cfcfcf",'font-size':self.options.tagsize+"px"});
        }

    }

    function startDate(date,ele){
        getNewDate(date,ele);
        setInterval(function(){
            getNewDate(date,ele)
        },1000);
    }
    function getNewDate(date,ele){

        var endTime=new Date();
        var nowDateTime=new Date("2016-08-11");
        var seconds = endTime.getTime() - nowDateTime.getTime();
        var hour = Math.floor(seconds / 1000 / 60 / 60 % 24);
        var minute = Math.floor(seconds / 1000 / 60 % 60);
        var second = Math.floor(seconds / 1000 % 60);

        $(ele).find(".hour").html(hour.toString().length==1?"0"+hour.toString():hour);
        $(ele).find(".minute").html(minute.toString().length==1?"0"+minute.toString():minute);
        $(ele).find(".sec").html(second.toString().length==1?"0"+second.toString():second)
    }
    function startDate_2(date,ele,format){

        var leftTime = parseFloat($(ele).attr('time-left'));
        if (!leftTime || leftTime === 0) return;
        leftTime = Math.round(leftTime / 1000);
        if (leftTime === 0) return;
        var timeStr = _formatTime(leftTime,format);
        if(format==1){
            timeStr.day>0?$(ele).find(".hour").html(timeStr.hour+timeStr.day*24):
                $(ele).find(".hour").html(timeStr.hour.toString().length==1?"0"+timeStr.hour.toString():timeStr.hour);

            $(ele).find(".minute").html(timeStr.minute.toString().length==1?"0"+timeStr.minute.toString():timeStr.minute);
            $(ele).find(".sec").html(timeStr.sec.toString().length==1?"0"+timeStr.sec.toString():timeStr.sec);

            setInterval(function () {
                if (--leftTime) {
                    var timeStr = _formatTime(leftTime,format);
                    timeStr.day>0?$(ele).find(".hour").html(timeStr.hour+timeStr.day*24):
                        $(ele).find(".hour").html(timeStr.hour.toString().length==1?"0"+timeStr.hour.toString():timeStr.hour);
                    $(ele).find(".minute").html(timeStr.minute.toString().length==1?"0"+timeStr.minute.toString():timeStr.minute);
                    $(ele).find(".sec").html(timeStr.sec.toString().length==1?"0"+timeStr.sec.toString():timeStr.sec)
                } else {
                    location.reload();
                }
            }, 1000)
        }
        else if(format==2){

            $(ele).find(".minute").remove();
            $(ele).find(".sec").remove();
            $(ele).find(".hourtext").remove();
            $(ele).find(".minutetext").remove();
            $(ele).find(".sectext").remove();
            $(ele).find(".hour").css("border","none");
            $(ele).find(".hour").html(timeStr);
            setInterval(function () {
                if (--leftTime) {
                    var timeStr = _formatTime(leftTime,format);
                    $(ele).find(".hour").html(timeStr);

                } else {
                    location.reload();
                }
            }, 1000)
        }



    }
    function _formatTime(leftTime,format) {
        var minLen = 60,
            hrLen = 60 * minLen,
            dayLen = hrLen * 24;
        if(format==1){
            var vals = {};
            vals.day=Math.floor(leftTime / dayLen);
            vals.hour=Math.floor(leftTime % dayLen / hrLen);
            vals.minute=Math.floor(leftTime % dayLen % hrLen / minLen);
            vals.sec=Math.floor(leftTime % dayLen % hrLen % minLen);
            return vals;
        }
       else if(format==2){
            var vals =[];
           // vals.push(Math.floor(leftTime / dayLen), '天');
            vals.push(Math.floor(leftTime % dayLen / hrLen)+Math.floor(leftTime / dayLen)*24, '时');
            vals.push(Math.floor(leftTime % dayLen % hrLen / minLen), '分');
            vals.push(Math.floor(leftTime % dayLen % hrLen % minLen), '秒');
            while (vals[0] === 0) {
                vals.splice(0, 2);
            }
            return vals.join('');
        }

    }

    function timeCountDown(lefttime) {
        var leftTime = parseFloat($("#leftTime").attr('time-left'));
        if (!leftTime || leftTime === 0) return;
        leftTime = Math.round(leftTime / 1000);
        if (leftTime === 0) return;
        var timeStr = _formatTime(leftTime);
        $("#leftTime").html('<i class="gray">剩余时间</i><br/>' + timeStr);
        setInterval(function () {
            if (--leftTime) {
                var timeStr = _formatTime(leftTime);
                $("#leftTime").html('<i class="gray">剩余时间</i><br/>' + timeStr);
            } else {
                location.reload();
            }
        }, 1000)
    }

    $.extend(Clock.prototype,{

        getDate:function(){

            startDate_2("",this.selectEl,this.options.format);
            //$.ajax({
            //    url:ds.url,
            //    method: "get",
            //    dataType:"json",
            //    success:function(res){
            //        startDate(res);
            //    }
            //})
        }

    })
      return  Clock;
});