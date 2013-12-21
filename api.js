var express = require('express'),
    fitbitClient = require('fitbit-js')('5f870af02f9b4d91bb78d5019712d2f5', '9fbfae13f0f74514bfb2022581576bdd', 'http://127.0.0.1:3000/#!/dashboard');

var api = express();

var allowCrossDomain = function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // intercept OPTIONS method
  if (req.method == 'OPTIONS') {
    res.send(200);
  }
  else {
    next();
  }
};

api.use(allowCrossDomain);
api.use(express.bodyParser());
api.use(express.methodOverride());


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