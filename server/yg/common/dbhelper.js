
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