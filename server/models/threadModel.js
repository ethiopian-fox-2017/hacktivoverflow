var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var threadSchema = new Schema ({
  "title"      : {type: String, required: true},
  "content"    : {type: String, required: true},
  "author"     : [{type: Schema.Types.ObjectId, ref: 'User' }],
  "created_at" : {type: Date},
  "update_at"  : {type: Date},
  "answer"     : [{type: Schema.Types.ObjectId, ref: 'Answer' }]
});

var Thread = mongoose.model('Thread', threadSchema);

module.exports = Thread
