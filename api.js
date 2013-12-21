var express = require('express'),
    fitbitClient = require('fitbit-js');

    console.log('fit',fitbitClient);

var api = express();


var token;
api.get('/auth/fitbit', function (req, res) {
  fitbitClient.getAccessToken(req, res, function (error, newToken) {
    if(newToken) {
      token = newToken;
    }
  });
});

api.get('/getStuff', function (req, res) {
  fitbitClient.apiCall('GET', '/user/-/activities/date/2013-12-19.json',
    {token: {oauth_token_secret: token.oauth_token_secret,
             oauth_token: token.oauth_token}},
    function(err, resp, json) {
      if (err) return res.send(err, 500);
      res.json(json);
  });
});

api.get('/cookie', function(req, res) {
  res.send('wahoo!');
});

var port = 8000;
api.listen(port);
console.log('running');