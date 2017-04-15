var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema ({
  "username"  : {type: String, required: true},
  "password"  : {type: String, required: true},
  "joined_at" : {type: Date}
});

var User = mongoose.model('User', userSchema);

module.exports = User
