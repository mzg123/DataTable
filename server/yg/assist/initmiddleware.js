var logger = require('morgan');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');




function initmiddleware(app){
    //app.use(favicon("/public/images/favicon.png"));
    //app.use(logger('dev'));
    //app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(app.express.static(app.path.join(__dirname, 'public')));
};

module.exports = initmiddleware;
