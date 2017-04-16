var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var answerSchema = new Schema ({
  "content"    : {type: String, required: true},
  "author"     : [{type: Schema.Types.ObjectId, ref: 'User' }],
  "thread"     : {type: String, required: true},
  "createdAt"  : {type: Date},
  "updatedAt"  : {type: Date},
  "upvote"     : [{type: Schema.Types.ObjectId, ref: 'User' }],
  "downvote"   : [{type: Schema.Types.ObjectId, ref: 'User' }]
});

var Answer = mongoose.model('Answer', answerSchema);


module.exports = Answer
