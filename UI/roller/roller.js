/**
 * Created by Administrator on 2016/8/24.
 */

var tempConfig={
    RollerId:"roller",
    DataSource:[
        {
            src:"https://cdn.yingu.com/upload/image/20160715/558bbcc7d3c3a140bb38492e8af23434.jpg"

        }
    ],
    Interval:2,//滚动间隔
    width:600,
    height:200,
    OnPicClick:null,
    OnTagClick:null,
    FooterTag:{},
    FooterShow:true,
    AutoPaly:true,
    Ele:null,
    CurrentIndex:1,
    Count:5
},
templates="<div id='roller' class='container'></div>";
var Roller=function(){
    var self=this;
    self.options= $.extend({},tmpConfig,options);

    self.options.RollerId?self.options.Ele=$(self.options.RollerId):(self.options.Ele=$(templates));
    self.options.RollerId||$(document.body).append(self.options.Ele);

    this.init();
}
function CreateRoller(data){
    var temp="";
    $(data).each(function(i,v){
        temp=temp+' <div class="rolleritem"><img src="'+ v.src+'"></div>';
    });
}

$.extend(Roller.prototype,{
    init:function(){
       var self=this;
        $(self.options.Ele).html(CreateRoller.call(self,self.options.DataSource));
    },
    setData:function(){

    }
});