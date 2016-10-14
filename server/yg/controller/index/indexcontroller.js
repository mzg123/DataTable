var dbhelper = require('../../common/dbhelper');
dbhelper.ini(1);
var  indexcontroller={
   getData:function(option){
     //dbhelper.execSql("select * from user",option);
       var sqls=[
           "update  user set name='123' where id='1'",
           "insert into user (id,name,age) VALUES('1','99','87')"
       ];
     dbhelper.transaction(sqls,option);

   }
}

module.exports=indexcontroller;