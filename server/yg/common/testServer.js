var express = require('express')
    , serverapp = express();
function startTestServer(app){
    serverapp.listen(app.config.serverPort,app.config.serverIp);
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

