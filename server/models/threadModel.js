var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var threadSchema = new Schema ({
  "title"      : {type: String, required: true},
  "content"    : {type: String, required: true},
  "author"     : [{type: Schema.Types.ObjectId, ref: 'User' }],
  "createdAt"  : {type: Date},
  "updatedAt"  : {type: Date},
  "upvote"     : [{type: Schema.Types.ObjectId, ref: 'User' }],
  "downvote"   : [{type: Schema.Types.ObjectId, ref: 'User' }]
});

var Thread = mongoose.model('Thread', threadSchema);

module.exports = Thread
