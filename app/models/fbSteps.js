var mongoose = require('mongoose');
// ================================
// fitbit steps schema for user
// user has many steps :))
// ================================


var fbStepsSchema = mongoose.Schema({
	// assoscite user ID woth steps
	 user: {
	 	type: mongoose.Schema.ObjectId,
	 	ref: 'User'
	 },
	 //date: String,
	 steps: Number,
	 distance: Number,
	 seditaryMin: Number,
   fairlyActMin: Number,
   veryActMin: Number
});

module.exports = mongoose.model('fitbitSteps', fbStepsSchema);
