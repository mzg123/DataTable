
/* GET home page. */

function initRoute(app){
   app.use('/',  require('../routes/index/index')(app.route));
   app.use('/users', require('../routes/user/users')(app.route));
};

module.exports = initRoute;
