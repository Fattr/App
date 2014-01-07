/*
 * Look at memberSince property on user
 * Build an array from that date up until the day before yesterday
 */

var mongoose      = require('mongoose'),
    db            = mongoose.connect('mongodb://localhost/fittr'),
    User          = require('./app/models/users.js'),
    Steps         = require('./app/models/fbSteps.js'),
    config        = require('./config/auth.js').fitbit,
    fitbitClient  = require('fitbit-js')(config.consumerKey, config.consumerSecret, config.callbackURL);

// Find all users
User.find({}, function(err, users){
  if (err) {
    console.log('error:', err);
  }

  if (users) {

  }
});

// Each do a fitbitClient call to grab the memberSince date
var dates = function(user, memberSince) {
  var results = [];

  for (var i = 1; i < 151; i++) { // fitbit api rate limit
    var date = new Date();
    date.setDate(date.get() - i);

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    // add 0 in front of single digit nums
    if (month < 10) {
      month = 0 + String(month);
    }
    if (day < 10) {
      day = 0 + String(day);
    }

    results.push(year + '-' + month + '-' + day);
  }

  return results;
};

// Build the array of dates to use for the fitbitClient call for grabbing daily activity
  // count the number of days < 150 (rate limit)

// Make the actual calls and add to the db