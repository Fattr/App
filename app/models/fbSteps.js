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
	 caloriesBurned: Number,
	 distance: Number,
	 seditaryMin: Number,
	 lightActMin: Number,
	 fairlyActMin: Number,
	 veryActMin: Number
});

module.exports = mongoose.model('fitbitSteps', fbStepsSchema);
