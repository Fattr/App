var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fittr');
var User = require('./app/models/users.js');
var Steps = require('./app/models/fbSteps.js');
var config = require('./config/auth.js').fitbit;
var fitbitClient = require('fitbit-js')(config.consumerKey, config.consumerSecret, config.callbackURL);

// =================================
// get all users fibit access tokens
// retrieve prior days info and save
// to database
// =================================
var updateUsers = function(users) {
  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    var token = {
      oauth_token: user.fitbit.token,
      oauth_token_secret: user.fitbit.tokenSecret
    };
    console.log('token', token);
    fitbitClient.apiCall('GET', '/user/-/activities/date/2013-11-29.json',
      {token: token},
      function(err, resp, json) {
        console.log('api call');
        if(err) {
          console.log('err', err);
          return err;
        }
        console.log(json);
      });
  }
};

User.find({}, function(err, users) {
  if(err) {
    console.log('could not find users', err);
    return err;
  }

  if(users) {
    updateUsers(users);
  }
})


