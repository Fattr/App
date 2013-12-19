var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fittr');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  sex: String,
  email: String
});

// ex: Fitbit Aria, Fitbit Flex, Moves Android App
var DeviceSchema = new Schema({
  name: String,
  company: String
});

var WeightSchema = new Schema({
  weight: Number,
  userId: ObjectId,
  deviceId: ObjectId,
  createdAt: Date,
  updatedAt: Date
});

// FIXME: Decide on actual storage design for data input.
// var StepsSchema = new Schema({
//   data: Mixed,
//   userId: ObjectId,
//   deviceId: ObjectId,
//   createdAt: Date
//   updatedAt: Date
// });

var User = mongoose.model('User', UserSchema);
var Device = mongoose.model('Device', DeviceSchema);