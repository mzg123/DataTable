var express = require('express')
    , engine = require('ejs-locals')
    , app = express();

// use ejs-locals for all ejs templates:
app.engine('ejs', engine);

app.set('views',__dirname + '\\views\\ejs');
app.set('view engine', 'ejs'); // so you can render('index')

var routes = require('./routes/index');
var users = require('./routes/users');
// render 'index' into 'boilerplate':
app.use('/', routes);
app.use('/users', users);
//app.get('/',function(req,res,next){
//    res.render('index', { what: 'best', who: 'me' });
//});

app.listen(3000);