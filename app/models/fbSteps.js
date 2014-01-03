var mongoose = require('mongoose');
// ================================
// fitbit steps schema for user
// user has many steps :))
// ================================


var fbStepsSchema = mongoose.Schema({
  // associate a user id with steps
   userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
   },
   date: String,
   steps: Number,
   distances: Array,
   caloriesBurned: Number,
   sedentaryMins: Number,
   lightActMins: Number,
   fairlyActMins: Number,
   veryActMins: Number
});

module.exports = mongoose.model('fitbitSteps', fbStepsSchema);
