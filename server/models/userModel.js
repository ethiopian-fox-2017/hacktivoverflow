var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema ({
  "username"  : {type: String, required: true},
  "password"  : {type: String, required: true},
  "joined_at" : {type: Date},
  "thread"    : [{ type: Schema.Types.ObjectId, ref: 'Thread' }],
  "answer"    : [{ type: Schema.Types.ObjectId, ref: 'Answer' }]
});

var User = mongoose.model('User', userSchema);

module.exports = User
