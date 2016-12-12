var ReactDOM = require('react-dom');
var Tree=require("../block/tree_react/tree.js");



var treeItems=[
    {
        text:"1第一级"
        ,child:[
          {
              text:"1-1第二级"
              ,child:[
                 {
                     text:"1-1-1第三级"
                 },
                  {
                      text:"1-1-2第三级"
                  }
              ]
          },
            {
                text:"1-2第二级",
                child:[
                    {
                        text:"1-2-1第三级"
                    }
                    ,{
                        text:"1-2-2第三级"
                    }
                ]
            }
        ]
    }
]
var options={
    itemClick:function(e){
        alert(909);
        $.ajax({
            type: "post",
            url: "http://172.24.132.49/get_data",
            data: {
                name:"pay-withdraw/pay-withdraw-2016-12-11.86.log"
                ,Remode:""
                ,Rows_count:"1"
                ,search_conditions:""
            },
            dataType: "json",
            success: function (data) {
                console.log(data);
            },
            error: function (data) {
               console.log(data);

            }

        });
    }
}

function iniTree(){

    $.ajax({
        type: "get",
        url: "http://qa01-logs.yingu.com/get_list",

        dataType: "json",
        success: function (data) {
            console.log(data);
        },
        error: function (data) {
            console.log(data);
        }
    });
};
iniTree();
ReactDOM.render(<Tree itemData={treeItems} options={options} ></Tree>, document.getElementById('tree'));








