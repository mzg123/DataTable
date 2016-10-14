var dbhelper = require('../../common/dbhelper');
dbhelper.ini(1);
var  indexcontroller={
   getData:function(option){
     dbhelper.execSql("select * from user",option);
   }
}

module.exports=indexcontroller;