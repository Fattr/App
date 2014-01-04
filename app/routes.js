// var User = require('./models/users.js');
// var Steps = require('./models/fbSteps.js');
// var config = require('../config/auth.js').fitbit;
// var fitbitClient = require('fitbit-js')(config.consumerKey, config.consumerSecret);
var helpers = require('../config/routeHelpers.js');


module.exports = function(app, passport) {

  app.get('/', helpers.index);

  app.get('/loggedin', helpers.loggedin);

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

  app.post('/update/email', helpers.updateEmail);

  app.get('/logout', helpers.logout);

  app.get('/users/activity/:from?/:to?', authCheck, helpers.allUsersActivity);

  app.get('/user/activity/:from?/:to?', authCheck, helpers.userActivity);
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