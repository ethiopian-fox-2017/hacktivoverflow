require('../config/mongo')

const mongoose = require('mongoose'),
      uniqueValidator = require('mongoose-unique-validator'),
      Schema = mongoose.Schema,
      captainHook  = require('captain-hook'),


      userSchema = new Schema({
        username : {
          type : String,
          unique : true
        },
        password : String,
        questions : [{type : Schema.Types.ObjectId, ref : 'Question'}],
        token : {type : String}
      });

userSchema.plugin(uniqueValidator, { message: 'Error, data {PATH} sudah ada.' });
const User = mongoose.model('User', userSchema)

module.exports = User
