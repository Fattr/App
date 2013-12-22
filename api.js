var express = require('express'),
    config = require('./public/api_config');



var app = express();
app.use(express.bodyParser());
app.use(express.cookieParser('sess'));
app.use(config.allowCrossDomain);



var PORT = process.argv[4] || 8553;

var fitbitClient = require('fitbit-js')(config.consumerKey, config.consumerSecret,
                                  'http://localhost:' + PORT);

var token;
app.get('/', function (req, res) {
  console.log(req.method);
  fitbitClient.getAccessToken(req, res, function (error, newToken) {
    if(newToken) {
      token = newToken;
      // res.writeHead(200, {'Content-Type':'text/html'});
      res.redirect('http://127.0.0.1:3000/#!/dashboard');
    }
  });
});

app.get('/getStuff', function (req, res) {
  fitbitClient.apiCall('GET', '/user/-/activities/date/2011-05-25.json',
    {token: {oauth_token_secret: token.oauth_token_secret,
             oauth_token: token.oauth_token}},
    function(err, resp, json) {
      console.log("Bang!",arguments)
      if (err) return res.send(err, 500);
      res.json(json);
  });
});

app.get('/cookie', function(req, res) {
  res.send('wahoo!');
});


app.listen(PORT);
console.log('listening at http://localhost:' + PORT + '/');
