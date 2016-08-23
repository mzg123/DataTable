/**
 * Created by mzg on 2016/8/22.
 */

var tmpConfig= {
    SelectId: "",
    Width: 120,
    Height: 20,
    Ele: null,
    DataSource: [
        {
            value:"1111",
            text:"2222"
        },{
            value:"1111",
            text:"2222"
        }
        ,{
            value:"aaaa",
            text:"dddd"
        }
    ],
    OnChange:null
}
var templates='<select id="select"></select>';

var Select=function(options){
    var self=this;
    self.options= $.extend({},tmpConfig,options);

    self.options.SelectId?self.options.Ele=$(self.options.SelectId):(self.options.Ele=$(templates));
    self.options.SelectId||$(document.body).append(self.options.Ele);
    this.init();
}

function CreateSelect(self){

    var temp="",self=self;
    $(self.options.DataSource).each(function(i,v){

        (typeof v.text == 'string') ? temp=temp+'<option value="'+ v.value+'">'+ v.text+'</option>':"";
    });
    $(self.options.Ele).html(temp);
}


$.extend(Select.prototype,{
     init:function(){
         var self=this;
       $(this.options.Ele).on("change",function(){

           self.options.OnChange();
       });

         CreateSelect.call(this,this);
     }

});