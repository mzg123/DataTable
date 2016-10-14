var config=require('./config');
var mysql = require('mysql');

var db={
    lapp:null,
    execSql:function (sql,option){
        var lapp=this.lapp;
        this.connPool.getConnection(function(err, connection) {
           if(err){
               lapp.datelogger.info("GetConnectedMySqlError:");
               lapp.datelogger.trace(err);
               option.error(option.res,err);
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
    transaction:function(sqlarr,option){
        var lapp=this.lapp;
        this.connPool.getConnection(function(err, connection) {
            if(err){
                lapp.datelogger.info("GetConnectedMySqlError-transaction:");
                lapp.datelogger.trace(err);
                option.error(option.res,err);
            }else{
                connection.beginTransaction(function(err) {
                    if (err) {
                        lapp.datelogger.info("TransactionError:");
                        lapp.datelogger.trace(err);
                        option.error(option.res,err);
                    }else{
                       var flag= sqlarr.every(function(item, index, arr) {
                           return connection.query(item, function(err, result) {
                                if (err) {
                                    connection.rollback(function () {
                                        lapp.datelogger.info("TransactionError-rollback:");
                                        lapp.datelogger.trace(err);
                                        option.error(option.res,err);
                                    });
                                    return false;
                                }else{
                                    if(index==arr.length-1){
                                        connection.commit(function(err) {
                                            if (err) {
                                                connection.rollback(function() {
                                                    lapp.datelogger.info("LastTransactionError:");
                                                    lapp.datelogger.trace(err);
                                                });
                                                return false;
                                            }
                                            return true;
                                        });
                                    }
                                    return true;
                                }

                            });
                        });
                        flag?(option.success(option.res,'1')):( option.error(option.res,"-1"));
                    }
                });
            }
        });
    },
    connPool:null,
    ini:function(app){
        this.lapp=app;

        this.connPool||(this.connPool  = mysql.createPool({
            connectionLimit : config.dbconfig.mysql.poolcount,
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
        this.ldb.execSql(sql,option);
    },

    transaction:function(sqlarr,option){
        var mldb=this.ldb;
        var connection=this.ldb.getConn(dbtype);

    },
    ini:function(app){
        this.lapp=app;
        this.ldb=db.ini(app);
        return this;
    }
}
module.exports=mysqlhelper;