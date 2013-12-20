var fs = require('fs');
var csv = require('csv');
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/fittr-dev");
require('./app/models/user.js');
require('./app/models/fitbitSteps.js');

var User = mongoose.model('User');
var FitbitSteps = mongoose.model('FitbitSteps');

var userData = [
  { name: 'Nick Loveridge', email: 'nick@fusemedia.ca', username: 'nick', password: 'test', provider: 'local', 
    devices: [{ name: 'flex', company: 'fitbit', active: true, visible: true }]
  },
  { name: 'Fred', email: 'fred@hackreactor.com', username: 'fred', password: 'test', provider: 'local',
    devices: [{ name: 'flex', company: 'fitbit', active: true, visible: true }]
  }
];



// opts is optional
// var opts = ;
var deviceData = [];
// var deviceData = [{
//   deviceId: deviceId, 
//   date: '2013-04-01',
//   caloriesBurned: 0,
//   steps: 0, 
//   distance: 0, 
//   seditaryMin: 1,440, 
//   lightActMin: 0, 
//   fairlyActMin: 0, 
//   fairlyActMin: 0, 
//   veryActMin: 0 
// }];

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

var findUser = function(username, cb) {
  User.findOne({ 'username': username }, 'name _id devices', function (err, person) {
    if (err) return handleError(err);
    console.log('Found %s %s', person.name, person._id); 
    var deviceId = person.devices[0]._id;
    cb(deviceId);
  });
}

var saveDeviceData = function(deviceId, cb) {
  console.log('Seeding device data');

  
  
  for(var i = 0; i < deviceData.length; i++) {
    deviceData[i].deviceId = deviceId;
    // Remove commas from strings.
    for(var key in deviceData[i]) {
      if(key !== 'date' && key !== 'deviceId') {
        // console.log('Replacing comma on key', key, deviceData[i][key]);
        deviceData[i][key] = deviceData[i][key].replace(/,/g, "");
      }
    }

    var steps = new FitbitSteps(deviceData[i]);
    steps.save(function(err) {
      if(err) return console.log('Error saving device data', err);
      // cb();
    });
  }

};

csv()
.from.path(__dirname + '/test/data/FredFitBitActivities.csv', { delimiter: ',', escape: '"' })
.to.stream(fs.createWriteStream(__dirname+'/sample.out'))
.transform( function(row){
  row.unshift(row.pop());
  return row;
})
.on('record', function(row,index){
  console.log(JSON.stringify(row));
  // Skip the header file.
  if( index > 0 ) {
    obj = {
      date: row[1],
      caloriesBurned: row[2],
      steps: row[3],
      distance: row[4], 
      seditaryMin: row[6], 
      lightActMin: row[7], 
      fairlyActMin: row[8], 
      veryActMin: row[9] 
    };
    deviceData.push(obj);
  }

  // console.log('Pushed', obj);
})
.on('close', function(count){

  fs.unlink(__dirname+'/sample.out', function (err) {
    if (err) throw err;
    console.log('successfully deleted ' + __dirname + '/sample.out');
  });
  // when writing to a file, use the 'close' event
  // the 'end' event may fire before the file has been written
  console.log('Number of lines: ' + count);
  console.log('Deleting database');
  mongoose.connection.collections['users'].drop( function(err) {

    console.log('Users collection dropped');

    mongoose.connection.collections['fitbitsteps'].drop( function(err) {
      console.log('fitbitsteps collection dropped');
      saveUsers(function() {
        
        console.log('All users saved.');
        // saveDeviceData(function(){
        //   console.log('Saved device data to collection.');
        // });
        findUser('fred', function(deviceId) {
          saveDeviceData(deviceId, function(){
            console.log('Saved device data to collection.');
          });
        });

      });

    });

  });

})
.on('error', function(error){
  console.log(error.message);
});





