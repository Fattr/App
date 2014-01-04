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

  // ========================
  // Post user email here
  // ========================
  app.post('/fitbit/update/email', function(req, res) {
    var query = {id: req.user._id};
    var email = req.body.email;

    User.findById(query.id, function(err, user) {
      if(err) {
        console.log('could not find user to update email', err);
        return err;
      }
      console.log('user', user);
      user.email = email;
      user.save(function(err) {
        if(err) {
          console.log('could not save ' + user.name + ' email', err);
        }
      });
    });
    res.send(201);
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

  app.get('/users/activity/:from?/:to?', authCheck, function(req, res, next){
    var dateFrom = req.params.from;
    var dateTo   = req.params.to;

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

  // ===========================
  // query DB to get single user
  // steps
  // ===========================
  app.get('/user/activity/:from?/:to?', authCheck, function(req, res) {
    // capture incoming user in order to query out DB
    var dateFrom = req.params.from,
        dateTo   = req.params.to,
        query    = {userId: req.user._id};

    dateFrom = (dateFrom === '-') ? undefined : dateFrom;
    dateTo   = (  dateTo === '-') ? undefined : dateTo;

    if( dateFrom !== undefined && dateTo !== undefined) {
      query.date = { $gte: dateFrom, $lte: dateTo };
    } else {
      if( dateFrom !== undefined) {
        query.date = { $gte: dateFrom};
      }

      if( dateTo !== undefined) {
        query.date = { $lte: dateTo};
      }
    }

    // use the current user's id to find associated steps data and return it
    Steps.findOne(query, function(err, steps) {
      if(err) {
        console.log('error getting ' + currentUser.displayName + "'s steps data", err);
        res.send(500, err);
      } else if(steps) {
        console.log('got ' + currentUser.name +' step data.', steps.steps);
        res.json(steps.steps);
      }
    })
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