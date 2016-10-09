var fs=require('fs');
var https=require('https');

function httpslisten(app){
    var privatekey = fs.readFileSync('./common/https/server.key', 'utf8');
    var certificate = fs.readFileSync('./common/https/server.crt', 'utf8');
    var options={key:privatekey, cert:certificate};
    var server = https.createServer(options, app);
    server.listen(app.config.ssl,app.config.ip);
}
module.exports=httpslisten;