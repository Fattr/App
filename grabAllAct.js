/*
 * worker script for pulling all user fitbit
 * data-points since join date (memberSince)
 */

var mongoose      = require('mongoose'),
    db            = mongoose.connect('mongodb://localhost/fittr'),
    User          = require('./app/models/users.js'),
    Steps         = require('./app/models/fbSteps.js'),
    config        = require('./config/auth.js').fitbit,
    fitbitClient  = require('fitbit-js')(config.consumerKey, config.consumerSecret, config.callbackURL),
    moment        = require('moment');

/*
 * IDEAL call signature
*/
var allActivities = function() {
  var users = getUsers();
  users.forEach(function(user) {
    var date = getDate(user);
    getDailyAct(date, writeDb);
  });
};

// Write activites to DB
var writeDb = function(activities) {
  var dailyActivities = new Steps({
    userId:           userActivities.id,
    date:             userActivities.date,
    steps:            userActivities.summary.steps,
    distances:        userActivities.distances,
    caloriesBurned:   userActivities.caloriesOut,
    sedentaryMins:    userActivities.summary.sedentaryMinutes,
    lightActMins:     userActivities.summary.lightlyActiveMinutes,
    fairlyActMins:    userActivities.summary.fairlyActiveMinutes,
    veryActMins:      userActivities.summary.veryActiveMinutes
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
var getUsers = function() {
  User.find({}, function(err, users){
    if (err) {
      console.log('error:', err);
    } else {
      grabAllAct(users);
    }
  });
};

var getDailyAct = function(date, next) {
  fitbitClient.apiCall(
    'GET', '/user/-/activities/date/' + date + '.json',
    {token: token},
    function(err, resp, userActivities) {
      if (err) console.log(err);
      else {
        userActivities.id = user._id;
        userActivities.date = date;
        console.log('user: ' + user.name + '; userActivities.date: ' + userActivities.date);
        allUserActs.push(userActivities);
      }
    }
  );
};

var getDates = function(users) {
  for (var i = 0; i < users.length; i++) {
    (function(index) {
      var user = users[index];
      var token = {
        oauth_token: user.fitbit.token,
        oauth_token_secret: user.fitbit.tokenSecret
      };

      var dateLimit = moment().subtract('days', 150).format('YYYY-MM-DD');
      var memberSince = moment(user.memberSince);

      for (var j = 0; j < dates.length; j++) {
        (function(idx) {
          var date = dates[idx];
          getDailyAct(date);
        })(j);
      }
    })(i);
  }
};
