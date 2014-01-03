/**
 * UPDATES DB WITH PREVIOUS DAY'S FITBIT DATA
 */

var mongoose      = require('mongoose'),
    db            = mongoose.connect('mongodb://localhost/fittr-dev'),
    User          = require('./app/models/users.js'),
    Steps         = require('./app/models/fbSteps.js'),
    config        = require('./config/auth');
    fitbitClient  = require('fitbit-js')(config.fitbit.consumerKey, config.fitbit.consumerSecret);


var fetch = function() {

  function userData(userCred) {
    // get yesterday's date for the fitbit API call
    var yesterday = function() {
      var date = new Date();
      date.setDate(date.getDate() - 1);
      return date;
    }();

    // fitbit json response comes with an activities array
    // that contains an obj with type of activity and dist
    // following func is a summation of all those dists
    var totalDist = function(userAct) {
      var totalDist = 0;
      var distances = user.summary.distances;
      for (var i = 0; i < distances.length; i++) {
        totalDist += distances[i].distance;
      }
      return totalDist;
    };

    // updates db with formatted user activity
    function updateDB(userAct) {
      var dailyAct = new Steps({
        user:         userAct.id,
        steps:        userAct.summary.steps,
        distance:     userAct.distance,
        seditaryMin:  userAct.summary.sedentaryMinutes,
        fairlyActMin: userAct.summary.fairlyActiveMinutes,
        veryActMin:   userAct.summary.veryActiveMinutes
      });
      dailyAct.save(function(err) {
        if (err) throw err;
      });
    }

    // get JSON blob of daily user activity
    fitbitClient.apiCall(
      'GET',
      '/user/-/activities/date/' + yesterday + '.json',
      userCred.token,
      function(err, resp, userAct) {
        // if (err) return res.send(err, 500);

        userAct.id = userCred.id;
        userAct.distance = totalDist(userAct);

        // send the userData to the DB
        updateDB(userAct);
    });
  }

  // SET OFF
  User.find({}, function(err, users) {
    for (var i = 0; i < users.length; i++) {
      var user = users[i];
      // create user credentials (id, tokens)
      var userCred = {};
      userCred.id = user.fitbit.id;
      userCred.token = {
        oauth_token_secret: user.fitbit.tokenSecret,
        oauth_token: user.fitbit.token
      };
      userData(userCred);
    }
  });
};

/** 
 * invoke the worker to update data for all users
 */
fetch();
