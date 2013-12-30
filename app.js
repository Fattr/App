
var express = require('express');
var passport = require('passport');
var configEnv = require('./config/environment.js');
var mongoose = require('mongoose');
var configDB = require('./config/database.js');
// var fitbitClient = require('fitbit-js')(config.fitbit.consumerKey, config.fitbit.consumerSecret);

mongoose.connect(configDB.url);

require('./config/passport.js')(passport);

var app = express();


app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(configEnv.allowCrossDomain);
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({secret: 'super_fit'}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));

  // development only
  if ('development' == app.get('env')) {
      app.use(express.errorHandler());
  }
});

require('./app/routes.js')(app, passport);

// var token = {};
// app.get('/getStuff', function (req, res) {
//   fitbitClient.apiCall('GET', '/user/-/activities/date/2011-05-25.json',
//     {token: token},
//     function(err, resp, json) {
//       if (err) return res.send(err, 500);
//       res.json(json);
//   });
// });

app.listen(app.get('port'));
console.log('I hears ya on localhost:3000');