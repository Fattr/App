var express = require('express');
var app			= express();


app.configure(function(){ 
  app.set('port', process.env.PORT || 3000);
  
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));

  // development only
  if ('development' == app.get('env')) {
      app.use(express.errorHandler());
  }
});

app.get('/', function(req, res) {
	res.sendfile(__dirname + '/public/index.html');
});




app.listen(3000);
console.log('I hears ya on localhost:3000');