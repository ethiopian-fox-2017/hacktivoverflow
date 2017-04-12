var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var answerSchema = new Schema ({
  "content"    : {type: String, required: true},
  "created_by" : [{type: Schema.Types.ObjectId, ref: 'User' }],
  "thread"     : [{type: Schema.Types.ObjectId, ref: 'Thread' }],
  "created_at" : {type: Date},
  "update_at"  : {type: Date},
  "upvote"     : [{type: Schema.Types.ObjectId, ref: 'User' }],
  "downvote"   : [{type: Schema.Types.ObjectId, ref: 'User' }]
});

var Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer
