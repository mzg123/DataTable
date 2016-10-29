
/* GET home page. */

function initRoute(app){
   app.use('/',  require('../routes/login/login')(app));
   app.use('/',  require('../routes/auth/auth')(app));
   app.use('/',  require('../routes/index/index')(app));
   //app.use('/',  require('../routes/index/index_db')(app));
   app.use('/users', require('../routes/user/users')(app));
};

module.exports = initRoute;
