var mongoose = require('mongoose');

// =====================
// Schema for user model
// =====================

var userSchema = mongoose.Schema({
	name: String,
  email: String,
  username: {
    type: String,
    unique: true
  },
	fitbit: {
		id: String,
		token: String,
		tokenSecret: String,
		displayName: String
	},
	// other passport strategies if we need them
	devices: [
		mongoose.Schema({
			name: String,
			type: String,
			company: String,
			active: Boolean,
			visible: Boolean
		})
	],
	active: Boolean,
	showPublicly: Boolean
});

// =============================================
// create a model for our users and give our app
// access to it
// =============================================

module.exports = mongoose.model('User', userSchema);	