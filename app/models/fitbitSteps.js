/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema

/**
 * Device Data Schema
 */
var fitbitStepsSchema = new Schema({
    deviceId: String,
    date: Date,
    steps: Number,
    caloriesBurned: Number,
    distance: Number,
    seditaryMin: Number,
    lightActMin: Number,
    fairlyActMin: Number,
    veryActMin: Number
});

// fitbitStepsSchema.pre('save', function() {
// });

mongoose.model('FitbitSteps', fitbitStepsSchema);