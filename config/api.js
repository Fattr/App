var User = require('../app/models/users.js');
var config = require('./auth.js').fitbit;
var fitbitClient = require('fitbit-js')(config.consumerKey, config.consumerSecret);

// ================================
// functions to get data from fibit
// ================================

module.exports = {
  activity: function(req, res) {
    var currentUser = req.user;
    console.log('currentUser', currentUser);
    var token = {oauth_token: currentUser.fitbit.token, oauth_token_secret: currentUser.fitbit.tokenSeret};
    User.findById(currentUser._id, function(err, user) {
      fitbitClient.apiCall('GET', 'user/activities/data/2013-12-29.json',
        {token: token},
        function(err, resp, json) {
          if(err){
            console.log('err', err);
            res.send(err, 500);
          }
          res.json(json);
        });
    });
  }
};