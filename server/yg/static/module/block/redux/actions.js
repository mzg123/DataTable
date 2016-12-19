

module.exports={
    getAjaxLog:function(subreddit) {
        return function (dispatch) {
            dispatch({ type: "getdata"
                       ,param:subreddit
            })
            setInterval(function(){
                dispatch({ type: "getdata"
                    ,param:subreddit
                    ,data:new Date().getSeconds()
                })
            },10000);
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
                exception: function (data) {
                    alert(9009);
                    console.log(data);
                }

            });
        }
    }
}