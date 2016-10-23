var mysql = require('./mysqlhelper');
var log4js = require("log4js");
var lapp={
  index:0,
    datelogger:log4js.getLogger('log_date')
};

var dbhelper={
    db:null,
    ldb:null,
    lapp:lapp,
    dbtype:1,
    assist:{
        escape:function(sql){
            var conn=this.ldb.getConn(),result;
            result= conn.escape(sql);
            conn.release();
            return result;
        }
    },
    execSql:function(sql,option){

        switch(this.dbtype){
            case 1 :
               return mysql.ini(this.lapp,this.dbtype).execSql(sql,option);
                break;
            case 2 :
                return mysql.ini(this.lapp,this.dbtype).execSql(sql);
                break;
            default:
                return mysql.ini(this.lapp,this.dbtype).execSql(sql,option);
                break;
        }
    },

    transaction:function(sqlarr,option){

        switch(this.dbtype){
            case 1 :
                return mysql.ini(this.lapp,this.dbtype).transaction(sqlarr,option);
                break;
            case 2 :
                return mongo.ini(this.lapp,this.dbtype).transaction(sqlarr,option);
                break;
            default:
                return mysql(this.lapp,this.dbtype).transaction(sqlarr,option);
                break;
        }
    },
    ini:function(dbtype){
        this.dbtype=dbtype;
    }
}

module.exports=dbhelper;
