var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var answerSchema = require('./answer.js');

var questionSchema = new Schema({
  title : {
    type: String,
    required: true
  },
  content : {
    type: String,
    required: true
  },
  author : {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  answer : [answerSchema],
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

var Question = mongoose.model('Question', questionSchema);

module.exports = Question;
