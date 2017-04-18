var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Questions = require('./pertanyaan');

var answerSchema = new Schema({
	title: String,
	content: String,
	question: [{type: Schema.Types.ObjectId, ref:'Question'}]
	// available_at: [{type: Schema.Types.ObjectId, ref:'Restaurants'}]
});
var Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;