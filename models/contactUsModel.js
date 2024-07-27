// Import Mongoose library
const mongoose = require('mongoose');

// Define a Mongoose schema for the 'createAccount' collection
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
  }
});

// Create and export a Mongoose model for the 'createAccount' collection
module.exports = mongoose.model('CreateAccount', createAccountSchema);
