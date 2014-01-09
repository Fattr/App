/*
 * worker script for pulling all user fitbit
 * data-points since join date (memberSince)
 */

// Defaults / Configs
var mongoose      = require('mongoose'),
    db            = mongoose.connect('mongodb://localhost/fittr'),
    User          = require('./app/models/users.js'),
    Steps         = require('./app/models/fbSteps.js'),
    config        = require('./config/auth.js').fitbit,
    fitbitClient  = require('fitbit-js')(config.consumerKey, config.consumerSecret, config.callbackURL),
    moment        = require('moment');


// Write activites to DB
var updateDb = function(dailyActivity) {
  var dailyActivities = new Steps({
    userId:           dailyActivity.id,
    date:             dailyActivity.date,
    steps:            dailyActivity.summary.steps,
    distances:        dailyActivity.distances,
    caloriesBurned:   dailyActivity.caloriesOut,
    sedentaryMins:    dailyActivity.summary.sedentaryMinutes,
    lightActMins:     dailyActivity.summary.lightlyActiveMinutes,
    fairlyActMins:    dailyActivity.summary.fairlyActiveMinutes,
    veryActMins:      dailyActivity.summary.veryActiveMinutes
  });

  dailyActivities.save(function(err, activities, numAffected) {
    if (err) throw err;
    else {
      console.log('activities', activities);
      console.log('number affected', numAffected);
    }
  });
};

// Find all users that have been 
var getUsers = function(callback) {
  User.find({}, function(err, users){
    if (err) {
      console.log('error:', err);
    } else {
      callback(users);
    }
  });
};

// The actual Fitbit API call for user's daily activities
var getDailyAct = function(user, date, callback) {
  var token = {
    oauth_token: user.fitbit.token,
    oauth_token_secret: user.fitbit.tokenSecret
  };

  fitbitClient.apiCall(
    'GET', '/user/-/activities/date/' + date + '.json',
    {token: token},
    function(err, resp, dailyActivity) {
      if (err) console.log(err);
      else {
        dailyActivity.id = user._id;
        dailyActivity.date = date;
        callback(dailyActivity);
      }
    }
  );
};

// getDates sends every date, 
// user's join date (user.memberSince),
// and sends it to a callback (fitbit api).
// The date format is "YYYY-MM-DD"
var getDates = function(user, callback) {
  var dateLimit = moment().subtract('days', 150).format('YYYY-MM-DD');
  var memberSince = moment("2014-01-01"); // !!! HARD-CODED !!!

  var loopDays = function(daysNeeded) {
    for (var numDays = 2; numDays < daysNeeded; numDays++) {
      var date = moment().subtract('days', numDays).format('YYYY-MM-DD');
      callback(user, date);
    }
  };

  if ( memberSince.isBefore(dateLimit) ) { // a member > 150 days
    loopDays(152);
  } else { // a member < 150 days
    var daysNeeded = moment().subtract('days', 2).diff(memberSince, 'days');
    loopDays(daysNeeded);
  }
};

/* 
 * THE KICK-OFF!!!
 */
var allActivities = function() {
  getUsers(function(users) {
    users.forEach(function(user) {
      getDates(user, function(user, date) {
        getDailyAct(user, date, function(activities) {
          updateDb(activities);
        });
      });
    });
  });
};
// SCRIPT INVOCATION
allActivities();
