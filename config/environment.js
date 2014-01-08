module.exports = {
  allowCrossDomain: function(req, res, next) {
    res.set('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
    res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
      res.send(200);
    }
    else {
      return next();
    }
  }
};