
/* GET home page. */

function initRoute(app){
   app.use('/',  require('../routes/index/index')(app));
   app.use('/users', require('../routes/user/users')(app));
};

module.exports = initRoute;
