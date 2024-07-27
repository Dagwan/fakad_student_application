const mongoose = require('mongoose');
const crypto = require('crypto');

// Define a Mongoose schema for the 'create account' collection
const createAccountSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: false
  },
  dob: {
    type: Date,
    required: false
  },
  gender: {
    type: String,
    required: false,
    enum: ['male', 'female', 'other']
  },
  terms: {
    type: Boolean,
    required: true
  },
  privacy: {
    type: Boolean,
    required: true
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

// Create and export a Mongoose model for the 'create account' collection
module.exports = mongoose.model('CreateAccount', createAccountSchema);




















// const mongoose = require('mongoose');

// // Define a Mongoose schema for the 'create account' collection
// const createAccountSchema = new mongoose.Schema({
//   fullName: {
//     type: String,
//     required: true
//   },
//   username: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   phone: {
//     type: String,
//     required: false
//   },
//   dob: {
//     type: Date,
//     required: false
//   },
//   gender: {
//     type: String,
//     required: false,
//     enum: ['male', 'female', 'other']
//   },
//   terms: {
//     type: Boolean,
//     required: true
//   },
//   privacy: {
//     type: Boolean,
//     required: true
//   }
// });

// // Create and export a Mongoose model for the 'create account' collection
// module.exports = mongoose.model('CreateAccount', createAccountSchema);
