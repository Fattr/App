/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema
    // crypto = require('crypto'),
    // _ = require('underscore'),
    // authTypes = ['github', 'twitter', 'facebook', 'google'];


/**
 * Device Data Schema
 */
var DeviceDataSchema = new Schema({
    deviceId: String,
    // data: Schema.Types.Mixed
    data: {}
});

mongoose.model('DeviceData', DeviceDataSchema);