
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
    getConn:function (dbtype){
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
    ini:function(app,dbtype){
        this.lapp=app;
        this.connPool||(this.connPool  = mysql.createPool({
            connectionLimit : 10,
            host            : app.config.dbconfig.host,
            user            : app.config.dbconfig.user,
            password        : app.config.dbconfig.pw,
            database        : app.config.dbconfig.database
        }));
        return this;
    }
}

var dbhelper={
    ldb:null,
    lapp:null,
    assist:{
        escape:function(sql){
            var conn=this.ldb.getConn(),result;
            result= conn.escape(sql);
            conn.release();
            return result;
        }
    },
    execSql:function(sql,dbtype){
        var relust=null;
        var conn=this.ldb.getConn(dbtype);
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

    transaction:function(sqlarr,dbtype){
        var mldb=this.ldb;
        var connection=this.ldb.getConn(dbtype);
        connection.beginTransaction(function(err) {
            if (err) {
                mldb.datelogger.info("TransactionError:");
                mldb.datelogger.trace(err);
                return false;
            }else{
                return sqlarr.every(function(item, index, arr) {
                    connection.query(item, function(err, result) {
                        if (err) {
                             connection.rollback(function () {
                                mldb.datelogger.info("TransactionError:");
                                mldb.datelogger.trace(err);
                            });
                            return false;
                        }
                        if(index==arr.length-1){
                            connection.commit(function(err) {
                                if (err) {
                                     connection.rollback(function() {
                                         mldb.datelogger.info("LastTransactionError:");
                                         mldb.datelogger.trace(err);
                                    });
                                    return false;
                                }
                                 return true;
                            });
                        }
                    });
                    return true;
                });
            }
        });
    },
    ini:function(app,dbtype){
        this.lapp=app;
        ldb=db.ini(app,dbtype);
    }
}
module.exports=dbhelper;