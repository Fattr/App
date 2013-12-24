/**
 * Module dependencies.
 */
 var mongoose = require('mongoose'),
 User = mongoose.model('User'),
 FitbitSteps = mongoose.model('FitbitSteps');

/**
 * Auth callback
 */
 exports.authCallback = function(req, res, next) {
  res.redirect('/');
};

/**
 * Show login form
 */
 exports.signin = function(req, res) {
  res.render('users/signin', {
    title: 'Signin',
    message: req.flash('error')
  });
};

/**
 * Show sign up form
 */
 exports.signup = function(req, res) {
  res.render('users/signup', {
    title: 'Sign up',
    user: new User()
  });
};

/**
 * Logout
 */
 exports.signout = function(req, res) {
  req.logout();
  res.redirect('/');
};

/**
 * Session
 */
 exports.session = function(req, res) {
  res.redirect('/');
};

/**
 * Create user
 */
 exports.create = function(req, res) {
  var user = new User(req.body);
  var message = null;

  user.provider = 'local';
  user.save(function(err) {
    if (err) {
      switch(err.code){
        case 11000:
        case 11001:
        message = 'Username already exists';
        break;
        default: 
        message = 'Please fill all the required fields';
      }

      return res.render('users/signup', {
        message: message,
        user: user
      });
    }
    req.logIn(user, function(err) {
      if (err) return next(err);
      return res.redirect('/');
    });
  });
};

/**
 * Send User
 */
 exports.me = function(req, res) {
  res.jsonp(req.user || null);
};

/**
 * List of user devices
 */
 exports.devices = function(req, res) {
  console.log('devices');
  res.jsonp(req.user.devices || null);
};

// Helper function
// FIXME: Find a better place for this.
exports.canAccessDevice = function(userId, deviceId, callback) {
  if(!userId) return false;
  if(!deviceId) return false;
  var hasAccess = false;

  var query = { _id: userId, 'devices._id': deviceId };
  User.find(query, function(err, devices){
    if(err) {
      console.log('Error retrieving device list', err);
    } else {
      console.log('Devices length:', devices.length);
      if(devices.length > 0) {
        hasAccess = true;
      }
    }
    callback(hasAccess);
  });
};

// FIXME: handle no data returned.
// FIXME: find better way to hand auth on a per-device basis - abstract it out.
exports.deviceData = function(req, res, deviceId, dateFrom, dateTo) {

    // No user logged in.
    if(!req.user) {
      res.jsonp(null);
      return;
    }

    // console.log('User info', req.user);
    exports.canAccessDevice(req.user._id, deviceId, function(hasAccess) {
      if(!hasAccess) {
        console.log('WARNING: User id:', req.user._id, 'is trying to access device', deviceId);
        res.jsonp(null);
        return;
      }

      var query = { deviceId: deviceId };

      dateFrom = (dateFrom === '-') ? undefined : dateFrom;
      dateTo = (dateTo === '-') ? undefined : dateTo;

      if(dateFrom !== undefined && dateTo !== undefined) {
        query.date = { $gte: dateFrom, $lte: dateTo };
      } else {
        if(dateFrom !== undefined) {
          query.date = { $gte: dateFrom };
        }

        if(dateTo !== undefined) {
          query.date = { $lte: dateTo };
        }
      }

      FitbitSteps.find(query, function(err, stats){
        if(err) {
                // return console.log('Error retrieving stats', err)
                console.log('Error retrieving stats', err);
                res.jsonp(null);
              }
              res.jsonp(stats || null);
            });

    });

  };

/**
 * Find user by id
 */
 exports.user = function(req, res, next, id) {
  User
  .findOne({
    _id: id
  })
  .exec(function(err, user) {
    if (err) return next(err);
    if (!user) return next(new Error('Failed to load User ' + id));
    req.profile = user;
    next();
  });
};
