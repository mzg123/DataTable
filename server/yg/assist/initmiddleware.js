var logger = require('morgan');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var log4js = require("log4js");


var LogFile = log4js.getLogger('log_file');


function initmiddleware(app){
    //app.use(favicon("/public/images/favicon.png"));
    //app.use(logger('dev'));
    //app.use(bodyParser.json());
    log4js.configure(app.config.logger);
    app.logger=log4js.getLogger('log_file');
    app.datelogger=log4js.getLogger('log_date');
    app.datelogger.info("New Start!");
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(app.express.static(app.path.join(__dirname, 'public')));
};

module.exports = initmiddleware;

