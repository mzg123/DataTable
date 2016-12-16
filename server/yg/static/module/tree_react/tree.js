var ReactDOM = require('react-dom');
var reactRedux = require('react-redux');
var Provider =reactRedux.Provider ;
var reduxStore=require('../block/redux/store.js');
var Tree=require("../block/tree_react/tree.js");
//var  App=require("../block/tree_react/reactredux.js");



var treeItems=[
    {
        text:"1第一级"

        ,child:[
          {
              text:"1-1第二级"
              ,child:[
                 {
                     text:"1-1-1第三级"
                     ,child:[
                     {text:"1-1-1-1第四级"}
                     ,{text:"1-1-1-2第四级"}
                 ]
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
        //alert(909);
        $.ajax({
            type: "post",
            url: "http://172.24.132.49:10280/get_data",
            data: {
                name:"/data/logs/tomcat/tomcat-web.log"
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
        url: "http://172.24.132.49:10280/get_list",

        dataType: "json",
        success: function (data) {
            console.log(data);
        },
        error: function (data) {
            console.log(data);
        }
    });
};
//iniTree();
//ReactDOM.render(<Tree itemData={treeItems} options={options} ></Tree>, document.getElementById('tree'));
//ReactDOM.render(<Tree itemData={treeItems} store={reduxStore} options={options} ></Tree>, document.getElementById('tree'));

//ReactDOM.render(
//    <App />,
//    document.getElementById('tree')
//);

ReactDOM.render( <Provider store={reduxStore}>
    <Tree></Tree>
</Provider>, document.body);








