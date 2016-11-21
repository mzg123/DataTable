/**
 * Created by mzg on 2016/11/17.
 */


var datepicker={
    tempConfig:{
        parentCon:"date_pic_con"
        ,type:"1"//1直接展示 2 input点击选择 3起始-结束时间
        ,sName:"sname"//时间name值
        ,selectCallBack:$.noop
    }
    ,template:'<input type="text" class="date_picker_text display_n"/><div class="date_picker hidden">'+
                    '<div class="date_picker_header align_c">'+
                        '<span class="pre_year"><<</span><span class="pre_mouth"><</span><span class="year_mouth"></span ><span class="next_mouth">></span><span class="next_year">>></span>'+
                   '</div>'+
                    '<div class="date_picker_week">'+
                         '<div class="date_item display_ilb">日</div><div class="date_item display_ilb">一</div><div class="date_item display_ilb">二</div><div class="date_item display_ilb">三</div><div class="date_item display_ilb">四</div><div class="date_item display_ilb">五</div><div class="date_item display_ilb">六</div>'+
                    ' </div>'+
                    '<div class="date_picker_body">'+
                     '</div>'+
                    '<div class="date_picker_footer hidden"></div>'+
                 '</div>'
    ,init:function(option){
        var self=this;
        self.options = $.extend({},self.tempConfig,option);
        $("#"+self.options.parentCon).append($(this.template));
        this._initDate()
        return this;

    }
    ,selectDT:{}
    ,showDatePicker:true
    ,_initDate:function(selectDT){

        var self=this;
        $("#"+self.options.parentCon).addClass("position_r");
        self.options.type=="1"&&($("#"+self.options.parentCon+" .date_picker").removeClass("hidden"));
        self.options.type=="2"&&($("#"+self.options.parentCon+" .date_picker_text").removeClass("display_n").attr("name",self.options.sName)&&$("#"+self.options.parentCon+" .date_picker").addClass("position_a"));

        var currentDT=this.getCurrentDateTime();
        if(selectDT){
            currentDT.currentYear=selectDT.selectYear;
            currentDT.currentMouth=selectDT.selectMouth;
            currentDT.currentDay=selectDT.selectDay;
        }else{
            self.selectDT.selectYear=currentDT.currentYear;
            self.selectDT.selectMouth=currentDT.currentMouth;
            self.selectDT.selectDay=currentDT.currentDay;
        }

        currentDT.currentMouth<10?$("#"+self.options.parentCon+" .year_mouth").html(self.selectDT.selectYear+"年0"+self.selectDT.selectMouth+"月"):
            $("#"+self.options.parentCon+" .year_mouth").html(self.selectDT.selectYear+"年"+self.selectDT.selectMouth+"月");
        //$("#"+self.options.parentCon+" .year_mouth").html(currentDT.currentYear+"年"+currentDT.currentMouth+"月");
        var lastMouthLastDay=new Date(currentDT.currentYear, currentDT.currentMouth-1, 0).getDate();
        currentDT.currentMouth==1&&(lastMouthLastDay=new Date(currentDT.currentYear-1, 12, 0).getDate());
        var currentMouthLastDay=new Date(currentDT.currentYear, currentDT.currentMouth, 0).getDate();
        var cuttentDay=currentDT.currentDay;
        var d=new Date(currentDT.currentYear,currentDT.currentMouth-1,currentDT.currentDay);
        d.setDate(1);
        var cuttentMouthFitstDay_Week=d.getDay();
        cuttentMouthFitstDay_Week==0?(lastMouthLastDay=lastMouthLastDay-7+1):(lastMouthLastDay=lastMouthLastDay-cuttentMouthFitstDay_Week+1);
        var currentMouthDay=1;
        var nextMouthDay=1;
        var datebody="";
        if(!selectDT){
            for(var i=1;i<=6;i++){
                var daterow='<div class="date_picker_row">';
                for(var j=0;j<=6;j++){
                    if(i==1&&cuttentMouthFitstDay_Week>0){
                        if(j<cuttentMouthFitstDay_Week){
                            daterow=daterow+'<div class="date_item display_ilb non_current_mouth_day">'+lastMouthLastDay+'</div>';
                            lastMouthLastDay++;
                        }else{
                            cuttentDay==currentMouthDay?(daterow=daterow+'<div class="date_item display_ilb current_day">'+currentMouthDay+'</div>'):
                                (daterow=daterow+'<div class="date_item display_ilb ">'+currentMouthDay+'</div>');
                            currentMouthDay++;
                        }
                    }
                    else if(i==1&&cuttentMouthFitstDay_Week==0){
                        daterow=daterow+'<div class="date_item display_ilb non_current_mouth_day">'+lastMouthLastDay+'</div>';
                        lastMouthLastDay++;
                    }
                    else{
                        if(currentMouthDay<=currentMouthLastDay){
                            cuttentDay==currentMouthDay?(daterow=daterow+'<div class="date_item display_ilb current_day">'+currentMouthDay+'</div>'):
                                (daterow=daterow+'<div class="date_item display_ilb ">'+currentMouthDay+'</div>');
                            currentMouthDay++;
                        }else{
                            daterow=daterow+'<div class="date_item display_ilb non_current_mouth_day">'+nextMouthDay+'</div>';
                            nextMouthDay++;
                        }
                    }
                }
                daterow=daterow+'</div>';
                datebody=datebody+daterow;
            }
            $("#"+self.options.parentCon+" .date_picker_body").html(datebody);
        }
        else {
            var rows = $("#" + self.options.parentCon + " .date_picker_body>div");
            $(rows).each(function (index, item) {
                $($(item).children()).each(function(indexchr,itemchr){
                    if(index+1==1&&cuttentMouthFitstDay_Week>0){
                        if(indexchr<cuttentMouthFitstDay_Week){
                            $(itemchr).html(lastMouthLastDay).addClass("non_current_mouth_day");
                            lastMouthLastDay++;
                        }else{
                            $(itemchr).html(currentMouthDay).removeClass("non_current_mouth_day");
                            currentMouthDay++;
                        }
                    }
                    else if(index+1==1&&cuttentMouthFitstDay_Week==0){
                        $(itemchr).html(lastMouthLastDay).addClass("non_current_mouth_day");;
                        lastMouthLastDay++;
                    }
                    else{
                        if(currentMouthDay<=currentMouthLastDay){
                            $(itemchr).html(currentMouthDay).removeClass("non_current_mouth_day");
                            currentMouthDay++;
                        }else{
                            $(itemchr).html(nextMouthDay).addClass("non_current_mouth_day");;
                            nextMouthDay++;
                        }
                    }
                })
            })
        }
        selectDT||this._initEvent();

    }
    ,_initEvent:function(){
        var self=this;

        self.options.type=="2"&&($("#"+self.options.parentCon+" .date_picker_text").on("focus",function(){
            var parentCom=self.options.parentCon;
            $("#"+parentCom+" .date_picker").removeClass(" hidden");
        }).on("blur",function(){
            var parentCom=self.options.parentCon;
           setTimeout(function(){
               self.showDatePicker||$("#"+parentCom+" .date_picker").addClass("position_a hidden");
               self.showDatePicker||$("#"+parentCom+" .date_picker_text").val(self.selectDT.selectYear+"-"+self.selectDT.selectMouth+"-"+self.selectDT.selectDay);
           },150);
        }));
        $("#"+self.options.parentCon+" .pre_year").on("click",function(evt){
            self.selectDT.selectYear--;
            var parentCom=self.options.parentCon
            $("#"+parentCom+" .year_mouth").html(self.selectDT.selectYear+"年"+self.selectDT.selectMouth+"月");
            self._initDate(self.selectDT);
            self.options.type=="2"&&(self.showDatePicker=true);

        });
        $("#"+self.options.parentCon+" .next_year").on("click",function(evt){
            self.selectDT.selectYear++;
            var parentCom=self.options.parentCon
            $("#"+parentCom+" .year_mouth").html(self.selectDT.selectYear+"年"+self.selectDT.selectMouth+"月");
            self._initDate(self.selectDT);
            self.options.type=="2"&&(self.showDatePicker=true);
        });
        $("#"+self.options.parentCon+" .pre_mouth").on("click",function(evt){
            self._preMouth(self);
            self.options.type=="2"&&(self.showDatePicker=true);
        });
        $("#"+self.options.parentCon+" .next_mouth").on("click",function(evt){
            self._nextMouth(self);
            self.options.type=="2"&&(self.showDatePicker=true);
        });
        $("#"+self.options.parentCon+" .date_item").on("click",function(evt){
            var currentday=$(evt.target).html();
            var parentCom=self.options.parentCon;
            if($(evt.target).hasClass("non_current_mouth_day")){
                $("#"+parentCom+" .current_day").removeClass("current_day");
                 if(currentday>20){
                     self._preMouth(self);
                 }else{
                     self._nextMouth(self);
                 }
                $( self.getDomByDay(self,currentday)).addClass("current_day");
                self.selectDT.selectDay=currentday;
            }
            else{
                if(!$(evt.target).parent().hasClass("date_picker_week")){
                    $("#"+parentCom+" .current_day").removeClass("current_day");
                    $(evt.target).addClass("current_day");
                    self.selectDT.selectDay=currentday;
                }
            }
            self.options.type=="2"&&(self.showDatePicker=false&$("#"+parentCom+" .date_picker_text").trigger("blur"));
            self.options.selectCallBack({selectDT:self.selectDT,id:self.options.parentCon});
            //self.options.type=="2"&&($("#"+self.options.parentCon+" .date_picker_text").trigger("blur"));
        })
    }
    ,getDomByDay:function(self,day){

        var rows = $("#" + self.options.parentCon + " .date_picker_body>div");
        var result=null;
        $(rows).each(function (index, item) {
            $($(item).children()).each(function(indexchr,itemchr){
                (day==$(itemchr).html()&&!$(itemchr).hasClass("non_current_mouth_day"))&&(result=itemchr);
            })
        })
        return result;
    }
    ,_nextMouth:function(self){
        if(self.selectDT.selectMouth==12){
            self.selectDT.selectMouth=1;
            self.selectDT.selectYear++;
        }else{
            self.selectDT.selectMouth++;
        }
        self.selectDT.selectMouth<10?$("#"+self.options.parentCon+" .year_mouth").html(self.selectDT.selectYear+"年0"+self.selectDT.selectMouth+"月"):
            $("#"+self.options.parentCon+" .year_mouth").html(self.selectDT.selectYear+"年"+self.selectDT.selectMouth+"月");
        self._initDate(self.selectDT);
    }
    ,_preMouth:function(self){
        if(self.selectDT.selectMouth==1){
            self.selectDT.selectMouth=12;
            self.selectDT.selectYear--;
        }else{
            self.selectDT.selectMouth--;
        }
        self.selectDT.selectMouth<10?$("#"+self.options.parentCon+" .year_mouth").html(self.selectDT.selectYear+"年0"+self.selectDT.selectMouth+"月"):
            $("#"+self.options.parentCon+" .year_mouth").html(self.selectDT.selectYear+"年"+self.selectDT.selectMouth+"月");
        self._initDate(self.selectDT);
    }
    ,getCurrentDateTime:function(){
        var myDate = new Date();
        return{
            currentYear:myDate.getFullYear(),   //获取完整的年份(4位,1970-????)
          currentMouth:myDate.getMonth()+1,       //获取当前月份(0-11,0代表1月)
          currentDay:myDate.getDate(),        //获取当前日(1-31)
          currentWeek:myDate.getDay(),         //获取当前星期X(0-6,0代表星期天)

          currentHour:myDate.getHours()+1,       //获取当前小时数(0-23)
          currentMin:myDate.getMinutes()+1,     //获取当前分钟数(0-59)
          currentSec:myDate.getSeconds()+1     //获取当前秒数(0-59)
        }
    }
}
function getNewOb(){
    var newObject = $.extend(true, {}, datepicker);
    return  newObject;
}
module.exports=getNewOb;
