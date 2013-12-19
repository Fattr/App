var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/fittr-dev");
require('./app/models/user.js');
require('./app/models/deviceData.js');


var User = mongoose.model('User');
var userData = [
  { name: 'Nick Loveridge', email: 'nick@fusemedia.ca', username: 'nick', password: 'test', provider: 'local', 
    devices: [{ name: 'flex', company: 'fitbit', active: true, visible: true }]
  },
  { name: 'Fred', email: 'fred@hackreactor.com', username: 'fred', password: 'test', provider: 'local',
    devices: [{ name: 'flex', company: 'fitbit', active: true, visible: true }]
  }
];

var total = userData.length, result = [];

function saveUsers(callback){
  var user = new User(userData.pop());

  user.save(function(err, saved){
    if (err) throw err; //handle error

    if (--total) {
      saveUsers(callback);
    } else {
      // make the callback
      callback();
    }

  });
}

var saveDeviceData = function(cb) {
  console.log('Seeding device data');

  // find fred and get his fitbit device id.
}


console.log('Deleting database');
mongoose.connection.collections['users'].drop( function(err) {
  console.log('Users collection dropped');

  saveUsers(function() {
    console.log('All users saved.');
  });
});


// Seed the test devices
