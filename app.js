var config  = require('./oauth');
var express = require('express');
var app			= express();
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

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

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// config
passport.use(new FacebookStrategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  callbackURL: config.facebook.callbackURL
},
  function(accessToken, refreshToken, profile, done) {
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

var auth = function(req, res, next) {
  if(!req.isAuthenticated()) {
    res.send(401);
  } else {
    next();
  }
};

//--------------------------------------------------------//

// app.get('views/*', auth, function(req, res) {
//   console.log('dash auth', req.isAuthenticated());
//   res.sendfile(__dirname + '/public/index.html');
// });

app.get('/', function(req, res) {
  console.log('auth',req.isAuthenticated());
	res.sendfile(__dirname + '/public/index.html');
});

//---------------------------------------------------------//

app.get('/loggedin', function(req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');
});

app.get('/auth/facebook',
  passport.authenticate('facebook'),
  function(req, res){
    res.send(req.user);
  }
);

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  }
);


app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.listen(3000);
console.log('I hears ya on localhost:3000');