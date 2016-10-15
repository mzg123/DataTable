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

                       option.success(option.res,rows);
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
                        connection.release();
                        lapp.datelogger.info("TransactionError:");
                        lapp.datelogger.trace(err);
                        option.error(option.res,err);
                    }else{
                        var flag=true;
                        sqlarr.forEach(function(item, index, arr) {
                             connection.query(item, function(err, result) {
                                if (err) {
                                    //connection.rollback(function () {
                                        connection.release();
                                        lapp.datelogger.info("TransactionError-rollback---"+index+":");
                                        lapp.datelogger.trace(err);
                                        flag=false;
                                    //});
                                }
                                 if(index==arr.length-1){
                                   console.log(lapp.index++);
                                     flag?connection.commit(function(err) {
                                         if (err) {
                                             connection.rollback(function() {
                                                 lapp.datelogger.info("LastTransactionError:");
                                                 option.error(option.res,{code:"-1"});
                                               connection.release();
                                             });
                                         }else{
                                           option.success(option.res,{code:"1"})
                                           connection.release();
                                         }

                                     }):connection.rollback(function () {
                                         lapp.datelogger.info("rollback--success!");
                                         option.error(option.res,{code:"-1"})
                                       connection.release();
                                     });

                                 }
                            });
                        });

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
        this.ldb.transaction(sqlarr,option);
    },
    ini:function(app){
        this.lapp=app;
        this.ldb=db.ini(app);
        return this;
    }
}
module.exports=mysqlhelper;
