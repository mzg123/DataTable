var datepicker=require("../datepicker/datepicker.js");
require("../datepicker/datepicker.css");
var formselect={
    tempConfig:{
        parentCon:"",//容器id
        fields:[
            [
                {
                    id:"year",name:"year",label:"选择年份",type:"select",data:{"1":"2","11":"21","111":"2","1111":"2","11111":"2"},selectedHandle:null,linkAgeIds:["day"],width:100,class:"margin_left_30"
                },
                {
                    id:"quarter",name:"quarter",label:"选择季度",type:"select",data:{"1":"2","11":"21","111":"2","1111":"2","11111":"2"},selectedHandle:null,linkAgeIds:["day"],width:100,class:"margin_left_30"

                }
            ],
            [
                {
                    id:"mouth",name:"mouth",label:"选择月份",type:"select",data:{},selectedHandle:null,linkAgeIds:["day"],width:100,class:"margin_left_30"
                },
                {
                    id:"day",name:"day",label:"选择日期",type:"select",data:{"1":"2","11":"21","111":"2","1111":"2","11111":"2"},selectedHandle:null,linkAgeIds:["day"],width:100,class:"margin_left_30"
                }
            ]
        ]


        ,submitBtn:{
            html:'<button type="button"   class="btn btn-primary submitBtn position_a">搜索</button>'
            ,submitBtnCls:"echartSubmitBtn"
            ,submitBtnId:"echartSubmitBtn"
        }
        ,submitHandle: $.noop//提交表达处理函数
        ,preFailFn:$.noop
        ,valityFormHandle:function(){return true;}
        ,selectLingAges:[]//联动原数据
        ,ajaxSelectLingAges:[]//通过ajax获取数据后的联动关系数组
        ,otherBtnsClickEvents:[]
        ,otherComments:[]//使用其它组件
        ,formId:"queryForm"
    }
    ,init:function(option){
        var self=this;
        self.options = $.extend({},self.tempConfig,option);
        $("#"+self.options.parentCon).append(initField( self.options));

        console.log(self.otherComments);
        $(self.options.otherComments).each(function(index,item){
            var option={
                parentCon:item.id
                ,type:item.datepickerType
                ,name:item.name
                ,selectCallBack: $.noop
            }
            console.log(option);
            datepicker().init(option);
        });
        $("#"+self.options.formId).addClass("m_min_width");
        $("#"+self.options.parentCon+" .submitBtn").attr('id',self.options.submitBtn.submitBtnId).addClass(option.submitBtn.submitBtnCls);
        this.initEvent();
        return this;
    },
    initEvent:function(){
        var self=this;
        initClick({id:self.options.submitBtn.submitBtnId,preFn:self.options.valityFormHandle,sucFn:self.options.submitHandle,preFailFn:self.options.preFailFn,data:self.options.formId});

        $(self.options.selectLingAges).each(function(index,item){

            $("#"+item.id).change(function(evt){
                item.option.evt=evt;
                item.option.id=item.id;
                item.handle(item.option);
            });
        })
        $(self.options.otherBtnsClickEvents).each(function(index,item){
            $("#"+item.btnId).on("click",function(evt){
                item.option.evt=evt;
                item.click(item.option);
            });
        })

    }
    ,initAjaxData:function(data,ajaxSelectLingAges){
        var self=this;

        var ajaxd=ajaxSelectLingAges?ajaxSelectLingAges:self.options.ajaxSelectLingAges;
        $(ajaxd).each(function(index,item){
            var temp=item.ajaxDataKey;
            var d=temp=="children"?data[0]:data[temp];
            if(d){
                $("#"+item.id).attr("child",JSON.stringify(d).replace(/"/g, "'"));
                $("#"+item.id).change(function(evt){
                    item.option.evt=evt;
                    //item.option.ajaxData=d;//data[temp];
                    item.option.id=item.id;

                    item.handle(item.option);
                });
                $("#"+item.id).trigger("change");
                var children=$.isArray(d)?(d[0]?d[0].children:null): d.children;
                var temparr=[];
                var relust=self._getFieldFromOption(item.option.linkAge[0]);
                temparr.push({id:item.option.linkAge[0],handle:relust.handle,option:{linkAge:relust.linkage},ajaxDataKey:"children"});
                children&&self.initAjaxData(children,temparr);
            }
        })
    }
    ,_getFieldFromOption:function(id){
        var self=this;

        var relust='';
        $(self.options.fields).each(function(index,item){
            $(item).each(function(indexchr,itemchr){
                itemchr.name==id&&(relust={linkage:itemchr.linkAgeIds,handle:itemchr.selectedHandle});
            })
        })

        return relust;
    }
}



function initField(options){
    var result='<form id="'+options.formId+'"  class="position_r"> <div class="vs_h_1"></div><div class="vs_h_2"></div><div class="vs_r_1"></div><div class="vs_r_2"></div>';
    var fields=options.fields;

    $(fields).each(function(index,item){
        var formrow=' <div class="form-row">';
        $(item).each(function(indexchr,itemchr){

            itemchr.class?( formrow=formrow+' <label class="display_ilb '+ itemchr.class+'">'+itemchr.label+'</label>'):(formrow=formrow+' <label class="display_ilb">'+itemchr.label+'</label>');
            itemchr.type=="select"&&(formrow=formrow+' <select class="display_ilb" name="'+itemchr.name+'" style="width:'+itemchr.width+'px" id="'+itemchr.id+'">'+initSelect(itemchr)+'</select>');
            itemchr.type=="label"&&(formrow=formrow+' <input class="display_ilb" readonly  value="'+initLabel(itemchr).value+'" style="width:'+itemchr.width+'px" />');
            itemchr.type=="text"&&(formrow=formrow+' <input class="display_ilb" type="text"   name="'+itemchr.name+'"  placeholder="'+itemchr.placeHolder+'" style="width:'+itemchr.width+'px" />');
            //itemchr.type=="date"&&(formrow=formrow+' <input class="display_ilb"  type="date" id="'+itemchr.id+'"  name="'+itemchr.name+'"  placeholder="'+itemchr.placeHolder+'" style="width:'+itemchr.width+'px" />');
           if(itemchr.type=="datepicker"){
               formrow=formrow+' <div class="display_ilb"   id="'+itemchr.id+'"  name="'+itemchr.name+'"   style="width:'+itemchr.width+'px" ></div>'
               options.otherComments.push({id:itemchr.id,type:"date",datepickerType:itemchr.datepickerType});
           }
            itemchr.type=="button"&&(formrow=formrow+' <button class="display_ilb '+itemchr.btnClass+'"  type="button" id="'+itemchr.id+'"    name="'+itemchr.name+'"  style="width:'+itemchr.width+'px" >'+itemchr.tag+'<\/button>');
            ( itemchr.type=="button"&& itemchr.clickHandle)&&(options.otherBtnsClickEvents.push({btnId:itemchr.id,click:itemchr.clickHandle,option:{formId:options.formId}}));
            (itemchr.selectedHandle&&itemchr.isStaticData)&&(options.selectLingAges.push({id:itemchr.id,handle:itemchr.selectedHandle,option:{linkAge:itemchr.linkAgeIds}}));
            itemchr.ajaxDataKey&&(options.ajaxSelectLingAges.push({id:itemchr.id,handle:itemchr.selectedHandle,option:{linkAge:itemchr.linkAgeIds},ajaxDataKey:itemchr.ajaxDataKey}));
        })
        formrow=formrow+'</div>';
        result=result+formrow;
    })

    result=result+options.submitBtn.html+'</form>'
    return result;
}
function initLabel(itemchr){
    var item={};
    $.each(itemchr.data,function(name,value) {
        item.name=name;
        item.value=value;
    });
    return item;
}
function initSelect(itemchr){
    var items="";
    if(itemchr.name=="year"){
        var currentyear=$.getCurrentYear();
        for(var i=0;i<itemchr.pre;i++){
            items=items+' <option value="'+(currentyear-i)+'">'+(currentyear-i)+'年</option>';
        }

    } else{
        $.each(itemchr.data,function(name,value) {
            items=items+' <option value="'+value+'">'+name+'</option>';
        });
    }
    return items;
}
function initajaxData(){

}

function initClick(option){
    $("#"+option.id).on("click",function(){
        var t=true;
        option.preFn&&(t=option.preFn());
        t?option.sucFn(option.data):option.preFailFn();
    });


}
function getNewOb(){
    var newObject = $.extend(true, {}, formselect);
    return  newObject;
}
module.exports=getNewOb;







