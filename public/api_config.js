module.exports = {
  consumerKey: '5f870af02f9b4d91bb78d5019712d2f5',
  consumerSecret: '9fbfae13f0f74514bfb2022581576bdd',
  callback: 'http://127.0.0.1:3000/#!/dashboard',

  allowCrossDomain: function(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if (req.method == 'OPTIONS') {
      res.send(200);
    }
    else {
      next();
    }
  }
};



