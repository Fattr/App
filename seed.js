var fs = require('fs');
var csv = require('csv');
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/fittr");
require('./app/models/users.js');
require('./app/models/fbSteps.js');

// FIXME: Look-up the only user in the database and apply data.
var userId = '52c526e2a74a13c647000004';

var User = mongoose.model('User');
var FitbitSteps = mongoose.model('fitbitSteps');

// var userData = [
//   // { name: 'Nick Loveridge', email: 'nick@fusemedia.ca', username: 'nick', password: 'test', provider: 'local',
//   //   devices: [{ name: 'flex', company: 'fitbit', active: true, visible: true }]
//   // },
//   { name: 'Fred', email: 'fred@hackreactor.com', username: 'fred', password: 'test', provider: 'local',
//     devices: [{ name: 'flex', company: 'fitbit', active: true, visible: true }]
//   }
// ];
var userData = [];



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


var findUser = function(userId, cb) {
  User.findOne({ '_id': userId }, 'name _id devices', function (err, person) {
    if (err) return handleError(err);

    console.log('Found %s %s', person.name, person._id); 
    // var deviceId = person.devices[0]._id;
    cb(person._id);
  });
}


var saveDeviceData = function(userId, cb) {
  console.log('Seeding device data');

  for(var i = 0; i < deviceData.length; i++) {
    deviceData[i].userId = userId;
    // Remove commas from strings.
    for(var key in deviceData[i]) {
      if(key !== 'date' && key !== 'userId') {
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
.from.path(__dirname + '/csv-data/FredFitBitActivities.csv', { delimiter: ',', escape: '"' })
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
  // mongoose.connection.collections['users'].drop( function(err) {

    // console.log('Users collection dropped');

    mongoose.connection.collections['fitbitsteps'].drop( function(err) {
      console.log('fitbitsteps collection dropped');
      // saveUsers(function() {

        console.log('All users saved.');
        // saveDeviceData(function(){
        //   console.log('Saved device data to collection.');
        // });
        findUser(userId, function(deviceId) {
          saveDeviceData(deviceId, function(){
            console.log('Saved device data to collection.');
          });
        });

      // });

    });

  // });

})
.on('error', function(error){
  console.log('Error!!!', error.message);
});





