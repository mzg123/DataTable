var config=require('./config');
var mysql = require('mysql');

var db={
    lapp:null,
    getConn:function (sql,option){
        var lapp=this.lapp;
        this.connPool.getConnection(function(err, connection) {
           if(err){
               lapp.datelogger.info("GetConnectedMySqlError:");
               lapp.datelogger.trace(err);
               v.error(option.res,err);
           }else{
               connection.query(sql, function(err, rows) {
                   if(err){
                       lapp.datelogger.info("ConnectedMySqlError:");
                       lapp.datelogger.trace(err);
                       option.error(option.res,err);
                   }
                   else{
                       connection.release();
                       option.success(option.res,err,rows);
                   }

               });
           }
        });

    },
    connPool:null,
    ini:function(app){
        this.lapp=app;

        this.connPool||(this.connPool  = mysql.createPool({
            connectionLimit : 10,
            host: config.dbconfig.mysql.host,
            user : config.dbconfig.mysql.user,
            password: config.dbconfig.mysql.pw,
            database: config.dbconfig.mysql.database
        }));
        return this;
    }
}

var mysqlhelper={
    ldb:null,
    lapp:null,
    assist:{
        escape:function(sql){
            //var conn=this.ldb.getConn(),result;
            //result= conn.escape(sql);
            //conn.release();
            //return result;
        }
    },
    execSql:function(sql,option){
        this.ldb.getConn(sql,option);
    },

    transaction:function(sqlarr){
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
    ini:function(app){
        this.lapp=app;
        this.ldb=db.ini(app);
        return this;
    }
}
module.exports=mysqlhelper;