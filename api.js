var express = require('express');
var api = express();

api.get('/', function(req, res) {
  res.send('wassup');
});

var port = 8000;
api.listen(port);
console.log('running');