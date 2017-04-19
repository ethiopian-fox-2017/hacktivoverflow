var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var answerSchema = new Schema({
  user : {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  content : {
    type: String,
    required: true
  },
  upVotes : [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  downVotes : [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

module.exports = answerSchema
