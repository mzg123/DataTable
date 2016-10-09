var express = require('express')
    , serverapp = express();
var fs=require('fs');
var https=require('https');
function startHttps(serverapp,app){
    var privatekey = fs.readFileSync('./common/https/server.key', 'utf8');
    var certificate = fs.readFileSync('./common/https/server.crt', 'utf8');
    var options={key:privatekey, cert:certificate};
    var server = https.createServer(options, serverapp);
    server.listen(app.config.serverSsl,app.config.serverIp);
}
function startTestServer(app){
    serverapp.listen(app.config.serverPort,app.config.serverIp);
    startHttps(serverapp,app);
    serverapp.get('/', function(req, res, next) {
        res.send("hello");
    })
    serverapp.get('/user', function(req, res, next) {
        var result={ 'what': 'best','who': 'me', muppets: [ 'Kermit1111', 'Fozzie2222', 'Gonzo3333' ]  };
        res.write(JSON.stringify(result));
        res.end();
    });
}
module.exports=startTestServer;

