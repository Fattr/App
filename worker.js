var mongoose      = require('mongoose');
    db            = mongoose.connect('mongodb://localhost/fittr');
    User          = require('./app/models/users.js');
    Steps         = require('./app/models/fbSteps.js');
    config        = require('./config/auth.js').fitbit;
    fitbitClient  = require('fitbit-js')(config.consumerKey, config.consumerSecret, config.callbackURL);

// =================================
// get all users fibit access tokens
// retrieve prior days info and save
// to database
// =================================
var yesterday = function() {
  var date = new Date();
  date.setDate(date.getDate() - 1);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  if (month < 10) {
    month = 0 + String(month);
  }
  var day = date.getDate();
  if (day < 10) {
    day = 0 + String(day);
  }
  return '' + year + '-' + month + '-' + day;
}();

var updateDb = function(userActivities) {
  var dailyActivities = new Steps({
    user:             userActivities.id,
    date:             userActivities.date,
    steps:            userActivities.summary.steps,
    distances:        userActivities.distances,
    caloriesBurned:   userActivities.caloriesOut,
    sedentaryMins:    userActivities.summary.sedentaryMinutes,
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

var getActivities = function(users) {
  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    var token = {
      oauth_token: user.fitbit.token,
      oauth_token_secret: user.fitbit.tokenSecret
    };
    // console.log('token', token);
    fitbitClient.apiCall(
      'GET', '/user/-/activities/date/' + yesterday + '.json',
      {token: token},
      function(err, resp, userActivities) {
        if (err) throw err;
        else {
          userActivities.id = user._id;
          userActivities.date = yesterday;
          console.log('----- User ----');
          console.log(userActivities);
          updateDb(userActivities);
        }
      }
    );
  }
};

// Grab all users from DB
User.find({}, function(err, users) {
  if (err) {
    console.log('could not find users', err);
    return err;
  }

  if (users) {
    getActivities(users);
  }
});


