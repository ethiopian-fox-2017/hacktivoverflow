var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Answers = require('./jawaban');

var questionSchema = new Schema({
	title: String,
	content: String,
	answer: [{type: Schema.Types.ObjectId, ref:'Answer'}]
	// available_at: [{type: Schema.Types.ObjectId, ref:'Restaurants'}]
});
var Question = mongoose.model('Question', questionSchema);

module.exports = Question;