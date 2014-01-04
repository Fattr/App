var fitbitStrategy = require('passport-fitbit').Strategy;
var config         = require('./auth.js');

// load up the user model
var User           = require('../app/models/users.js');

module.exports = function(passport) {

  // ===============================
  // passport session config
  // passport has to be able to
  // serialize and eserialize users
  // in / out the session
  // ===============================

  // use to serialize for the session
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  // use to deserialize user out the session
  passport.deserializeUser(function(id, done) {
    User.findById(id._id, function(err, user) {
      done(err, user);
    });
  });


  // ========================
  // Fitbit Strategy
  // ========================

  passport.use(new fitbitStrategy({
    consumerKey: config.fitbit.consumerKey,
    consumerSecret: config.fitbit.consumerSecret,
    callbackURL: config.fitbit.callbackURL
  },
    function(token, tokenSecret, profile, done) {
      process.nextTick(function() {
        console.log('profile', profile);
        // find user in DB based on there fitbit id
        User.findOne({'fitbit.id': profile.id}, function(err, user) {
          // if there is an error, halt everything and return that
          if(err) return done(err);

          // if user is found then log them in
          if(user) {
            return done(null, user); // this is the user
          } else {
            console.log('new user');
            // if there is not a user with that fitbit id, make one
            var newUser = new User();

            // set all our user data to db
            newUser.name = profile._json.user.fullName;
            newUser.email = null;
            //set all our fitbit data to our user model
            newUser.fitbit.id = profile.id;
            newUser.fitbit.token = token;
            newUser.fitbit.tokenSecret = tokenSecret;
            newUser.fitbit.displayName = profile.displayName;
            newUser.fitbit.profilePic = profile._json.user.avatar;

            // save that new user
            newUser.save(function(err) {
              if(err) throw err;
              return done(null, newUser);
            });
          }
        });
      });
    }
  ));
};










