var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/fittr-dev");
require('./app/models/user.js');

console.log('Deleting database');
mongoose.connection.collections['users'].drop( function(err) {
    console.log('Users collection dropped');
});

console.log('Seeding users database');

var User = mongoose.model('User');
var userData = [
  { name: 'Nick Loveridge', email: 'nick@fusemedia.ca', username: 'nick', password: 'test', provider: 'local' },
  { name: 'Fred', email: 'fred@hackreactor.com', username: 'fred', password: 'test', provider: 'local' }
];

for(var i = 0; i < userData.length; i++) {
  console.log('Saving user', userData[i])
  var testUser = new User(userData[i]);
  testUser.save(function(err) {
    if(err) console.log('There was an error creating a user', err);
    console.log('User saved!');
  });
}