//alert($("#submit").html());
var option= {
    parentCon: "login",
    missUserHandle: function () {
        alert("忘记用户名");
    }
    , missPSHandle: function () {
        alert("忘记密码");
    }
    , registerHandle: function () {
        alert("注册");
    }
    //, missUserUrl:"http://www.baidu.com"
    // , missPSUrl:"http://www.baidu.com"
    // , registerUrl:"http://www.baidu.com"
}
require("../block/login_1/login_1.css");
require("../block/login_1/login_1.js").init(option);


























