var User = require('./models/users.js');
var Steps = require('./models/fbSteps.js');
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

	// ======================================
	// Check to see if user is auth, used to
	// protect our angular routes from unauth
	// users
	// ======================================

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
			{failureRedirect: 'http://127.0.0.1:3000/#/signup'}),
		function(req, res) {
			console.log('req user here', req.user);
			res.redirect('http://127.0.0.1:3000/#/dashboard');
		}
	);

	app.get('/fitbit/activity', authCheck, function(req, res) {
		// capture incoming user in order to query out DB
		var currentUser = req.user;

		// find user by associated "._id" property in out DB
		User.findById(currentUser._id, function(err, user) {

			// create a new token with credititanls from from user in our DB
			var token = {oauth_token: user.fitbit.token, oauth_token_secret: user.fitbit.tokenSecret};
		  fitbitClient.apiCall('GET', '/user/-/activities/date/2013-11-29.json',
		    {token: token},
		    function(err, resp, json) {
		    	// json is the data back from fitbit
		      if (err) return res.send(err, 500);

		      // create a new steps instance and set all its
		      // data to the fitbit data we just got
		      // not all data is being saved yet, just for
		      // testing right now

		      var steps = new Steps();
		      steps.user = currentUser._id;

		      // 'summary' is an object Fitbit returns with the data we need
		      steps.steps = json.summary.steps;
		      steps.distance = json.summary.distances;

		      // save the updated steps schema into our DB
		      steps.save(function(err) {
		      	if(err) return err;
		      });
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


	// List user data.
	// FIXME: Don't display tokens.
	app.get('/users/me', function(req, res) {
    res.jsonp(req.user || null);
	});


	app.get('/users/activity/:from?/:to?', authCheck, function(req, res, next){
    var dateFrom = req.params.from;
    var dateTo   = req.params.to;

    // Use authCheck custom middleware to check for auth
    // to send back a 401 for angular interceptors
    // No user logged in.
    // if(!req.user) {
    //   res.jsonp(null);
    //   return;
    // }

	 	var query = { userId: req.user._id };

	 	// Set the proper date range if needed.
    dateFrom = (dateFrom === '-') ? undefined : dateFrom;
    dateTo = (dateTo === '-') ? undefined : dateTo;

    if(dateFrom !== undefined && dateTo !== undefined) {
        query.date = { $gte: dateFrom, $lte: dateTo };
    } else {
        if(dateFrom !== undefined) {
            query.date = { $gte: dateFrom };
        }

        if(dateTo !== undefined) {
            query.date = { $lte: dateTo };
        }
    }

    Steps.find(query, function(err, stats){
        if(err) {
          console.log('Error retrieving stats', err);
          res.jsonp(null);
        }
        res.jsonp(stats || null);
    });

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