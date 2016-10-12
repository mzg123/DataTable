
//var mysql   = require('mysql');
//var connection = mysql.createConnection({
//    host   : 'localhost',
//    user   : 'me',
//    password : 'secret',
//    database : 'my_db'
//});
//
//connection.connect();
//
//// 增加记录
//client.query('insert into test (username ,password) values ("lupeng" , "123456")');
//
//// 删除记录
//client.query('delete from test where username = "lupeng"');
//
//// 修改记录
//client.query('update test set username = "pengloo53" where username = "lupeng"');
//
//// 查询记录
//client.query("select * from test" , function selectTable(err, rows, fields){
//    if (err){
//        throw err;
//    }
//    if (rows){
//        for(var i = 0 ; i < rows.length ; i++){
//            console.log("%d\t%s\t%s", rows[i].id,rows[i].username,rows[i].password);
//        }
//    }
//});
//
//connection.end();


var db={
    getConn:function (){

    },
    connPool:[],
    ini:function(app){

    }
}

var dbhelper={
    query:function(sql){

    },
    insert:function(sql){

    },
    update:function(sql){

    },
    delete:function(sql){

    },
    transaction:function(sqlarr){

    },
    ini:function(app){
        db.ini(app);
    }
}
module.exports=dbhelper;