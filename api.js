var express = require('express'),
    fitbit = ('fitbit-js');

var api = express();


var token;
app.get('/auth/fitbit', function (req, res) {
  fitbitClient.getAccessToken(req, res, function (error, newToken) {
    if(newToken) {
      token = newToken;
    }
  });
});

app.get('/getStuff', function (req, res) {
  fitbitClient.apiCall('GET', '/user/-/activities/date/2013-12-19.json',
    {token: {oauth_token_secret: token.oauth_token_secret,
             oauth_token: token.oauth_token}},
    function(err, resp, json) {
      if (err) return res.send(err, 500);
      res.json(json);
  });
});

app.get('/cookie', function(req, res) {
  res.send('wahoo!');
});

var port = 8000;
api.listen(port);
console.log('running');