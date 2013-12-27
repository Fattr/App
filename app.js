var config  = require('./oauth');
var express = require('express');
var app			= express();
var passport = require('passport');
var FitbitStrategy = require('passport-fitbit').Strategy;
var fitbitClient = require('fitbit-js')(config.fitbit.consumerKey, config.fitbit.consumerSecret);

var auth = function(req, res, next) {
  if(!req.isAuthenticated()) {
    res.send(401);
  } else {
    next();
  }
};

var allowCrossDomain = function(req, res, next) {
  res.set('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
  res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  console.log('cors', req.method);
  if (req.method === 'OPTIONS') {
    res.send(200);
  }
  else {
    next();
  }
};

var token = {};

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// config
passport.use(new FitbitStrategy({
  consumerKey: config.fitbit.consumerKey,
  consumerSecret: config.fitbit.consumerSecret,
  callbackURL: config.fitbit.callbackURL
},
  function(otoken, tokenSecret, profile, done) {
    token.oauth_token_secret = tokenSecret;
    token.oauth_token = otoken;
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));
//-------------------------------------------------//

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(allowCrossDomain);
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

//--------------------------------------------------------//


var token = {};
app.get('/getStuff', function (req, res) {
  fitbitClient.apiCall('GET', '/user/-/activities/date/2011-05-25.json',
    {token: token},
    function(err, resp, json) {
      if (err) return res.send(err, 500);
      res.json(json);
  });
});

app.get('/', function(req, res) {
  console.log('auth',req.isAuthenticated());
  res.sendfile(__dirname + '/public/index.html');
});

//---------------------------------------------------------//

app.get('/loggedin', function(req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');
});

app.get('/auth/fitbit',
  passport.authenticate('fitbit'),
  function(req, res){
    res.send(req.user);
  }
);

app.get('/auth/fitbit/callback',
  passport.authenticate('fitbit', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  }
);

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.get('/test', auth, function(req, res) {
  res.send('you are auth');
});



app.listen(app.get('port'));
console.log('I hears ya on localhost:3000');