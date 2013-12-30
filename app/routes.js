
var User = require('./models/users.js');
var config = require('../config/auth.js').fitbit;
var fitbitClient = require('fitbit-js')(config.consumerKey, config.consumerSecret);


module.exports = function(app, passport) {
	// =========================
	// Home page 
	// =========================
	app.get('/', function(req, res) {
		console.log('auth: ', req.isAuthenticated());
		res.sendfile('index.html', {root:__dirname + '/../public/'})
	});

	// =========================
	// Check to see if user is auth, used to
	// protect our angular routes from unauth
	// users
	// =========================

	app.get('/loggedin', function(req, res) {
		res.send(req.isAuthenticated() ? req.user : '0');
	});

	// ===========================
	// Fitbit authentication route 
	// ===========================

	app.get('/auth/fitbit', passport.authenticate('fitbit'),
			function(req, res) {
				res.send(req.user); // send the user along to angualr if auth is successful
			}
	);

	app.get('/auth/fitbit/callback', passport.authenticate('fitbit',
			{failureRedirect: '/'}),
		function(req, res) {
			console.log('req user here', req.user);
			res.redirect('/');
		}
	);

	app.get('/fitbit/activity', authCheck, function(req, res) {
		var currentUser = req.user;
		User.findById(currentUser._id, function(err, user) {
			var token = {oauth_token: user.fitbit.token, oauth_token_secret: user.fitbit.tokenSecret};
		  fitbitClient.apiCall('GET', '/user/-/activities/date/2013-12-29.json',
		    {token: token},
		    function(err, resp, json) {
		      if (err) return res.send(err, 500);
		      console.log('data', json);
		      res.json(json);
		  });
		});
	});

	// =========================
	// logout route 
	// =========================

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	// =========================
	// DB routes
	// =========================

	app.get('/db', authCheck, function(req, res) {// use created middleware to check auth before granting access to DB
		res.send('db data'); // FIXME: add db queries here
	});
};

// ====================================
// auth middleware to protect DB routes
// ====================================
function authCheck(req, res, next) {
	if(!req.isAuthenticated()) {
		res.send(401); // send back 401 for angular $http interceptor if not auth
	} else {
		return next();
	}
};