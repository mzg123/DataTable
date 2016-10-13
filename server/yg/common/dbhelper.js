var mysql = require('mysqlhelper');
var mongo = require('mongohelper');

var dbhelper={
    db:null,
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
        switch(dbtype){
            case 1 :
               return mysqlini(this.lapp,dbtype).execSql(sql,dbtype);
                break;
            case 2 :
                return mongoini(this.lapp,dbtype).execSql(sql,dbtype);
                break;
            default:
                return mysqlini(this.lapp,dbtype).execSql(sql,dbtype);
                break;
        }
    },

    transaction:function(sqlarr,dbtype){
        switch(dbtype){
            case 1 :
                return mysql.ini(this.lapp,dbtype).transaction(sql,dbtype);
                break;
            case 2 :
                return mongo.ini(this.lapp,dbtype).transaction(sql,dbtype);
                break;
            default:
                return mysqlini(this.lapp,dbtype).transaction(sql,dbtype);
                break;
        }
    },
    ini:function(app,dbtype){
        this.lapp=app;
    }
}
module.exports=dbhelper;