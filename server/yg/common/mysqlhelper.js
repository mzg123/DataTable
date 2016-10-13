
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

var mysqlhelper={
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
        ldb=db.ini(app);
        return this;
    }
}
module.exports=mysqlhelper;