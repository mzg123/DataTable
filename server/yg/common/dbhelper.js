
//var mysql   = require('mysql');
//var connection = mysql.createConnection({
//    host   : 'localhost',
//    user   : 'me',
//    password : 'secret',
//    database : 'my_db'
///////pool.escape()
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

var mysql = require('mysql');
var db={
    lapp:null,
    getConn:function (){
       return this.connPool.getConnection(function(err, connection) {
           if(err){
               this.lapp.datelogger.info("ConnectedMySqlError:");
               this.lapp.datelogger.trace(err);
               return null;
           }else{
               return connection;
           }
        });
    },
    connPool:null,
    ini:function(app){
        this.lapp=app;
        this.connPool  = mysql.createPool({
            connectionLimit : 10,
            host            : app.config.dbconfig.host,
            user            : app.config.dbconfig.user,
            password        : app.config.dbconfig.pw,
            database        : app.config.dbconfig.database
        });
        return this;
    }
}

var dbhelper={
    ldb:null,
    lapp:null,
    execSql:function(sql){
        var relust=null;
        var conn=this.ldb.getConn();
        conn.query(sql, function(err, rows) {
             if(err){
                 this.lapp.datelogger.info("ConnectedMySqlError:");
                 this.lapp.datelogger.trace(err);
             }
             else{
                 relust=rows;
             }
            conn.release();
         });
        return relust;
    },

    transaction:function(sqlarr){

    },
    ini:function(app){
        this.lapp=app;
        ldb=db.ini(app);
    }
}
module.exports=dbhelper;