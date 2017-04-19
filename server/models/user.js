'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
  username : {
    type: String,
    required: [true, 'Username is required']
  },
  password : {
    type: String,
    required: [true, 'Password is required']
  }
});

var User = mongoose.model('User', userSchema);

module.exports = User;
