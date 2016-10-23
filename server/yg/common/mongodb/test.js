var User = require("./mongodbinit.js");

/**
 * 插入
 */
function insert() {

    var user = new User.User({
        username : 'Tracy McGrady',                 //用户账号
        userpwd: 'abcd',                            //密码
        userage: 137,                                //年龄
        logindate : new Date()                      //最近登录时间
    });

    user.save(function (err, res) {

        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }

    });
}

function update(){
    var wherestr = {'title' : 'mongodb'};
    var updatestr = {'title': 'mzg'};

    User.update(wherestr, updatestr, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}
insert();
//update();