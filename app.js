var config  = require('./oauth');
var express = require('express');
var app			= express();
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

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


app.configure(function(){ 
  app.set('port', process.env.PORT || 3000);
  
  app.use(express.favicon());
  app.use(express.logger('dev'));
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

app.get('/', function(req, res) {
	res.sendfile(__dirname + '/public/index.html');
});

app.get('/auth/facebook',
  passport.authenticate('facebook'),
  function(req, res){
  }
);

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  }
);



app.listen(3000);
console.log('I hears ya on localhost:3000');